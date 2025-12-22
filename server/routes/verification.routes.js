const express = require('express');
const router = express.Router();
const BreederVerification = require('../models/BreederVerification.model');
const verificationService = require('../services/breederVerification.service');
const multer = require('multer');

const upload = multer({ dest: 'uploads/verification/' });

// Submit verification request
router.post('/submit', async (req, res) => {
  try {
    const verification = new BreederVerification(req.body);
    await verification.save();

    // Start AI verification
    const result = await verificationService.runFullVerification(verification._id);

    res.json({
      success: true,
      verification: result,
      message: result.overallStatus === 'verified' 
        ? 'Weryfikacja zakończona pomyślnie!'
        : 'Weryfikacja w toku - wymagana dodatkowa weryfikacja'
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Upload verification documents
router.post('/upload-document', upload.single('document'), async (req, res) => {
  try {
    const { verificationId, documentType, organization } = req.body;
    
    const verification = await BreederVerification.findById(verificationId);
    if (!verification) {
      return res.status(404).json({ error: 'Verification not found' });
    }

    // Add document
    const documentUrl = \`/uploads/verification/\${req.file.filename}\`;
    verification.documents.push({
      type: documentType,
      url: documentUrl
    });

    // AI verify document
    const docVerification = await verificationService.verifyDocument(
      documentUrl,
      documentType,
      organization
    );

    verification.aiChecks.push({
      checkType: 'document_verification',
      result: docVerification.legitimate ? 'pass' : 'fail',
      confidence: docVerification.confidence,
      details: docVerification
    });

    await verification.save();

    res.json({
      success: true,
      documentVerification: docVerification
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get verification status
router.get('/status/:verificationId', async (req, res) => {
  try {
    const verification = await BreederVerification.findById(req.params.verificationId)
      .populate('user');

    if (!verification) {
      return res.status(404).json({ error: 'Verification not found' });
    }

    res.json({
      verification,
      isValid: verification.isValid()
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Re-verify (for expired verifications)
router.post('/reverify/:verificationId', async (req, res) => {
  try {
    const result = await verificationService.runFullVerification(req.params.verificationId);

    res.json({
      success: true,
      verification: result
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Manual verification
router.post('/admin/manual-verify/:verificationId', async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const verification = await BreederVerification.findById(req.params.verificationId);
    verification.overallStatus = status;
    verification.manualReviewNotes = notes;
    verification.lastVerificationCheck = new Date();

    await verification.save();

    res.json({ success: true, verification });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
