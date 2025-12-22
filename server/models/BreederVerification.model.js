const mongoose = require('mongoose');

const breederVerificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  catteryName: {
    type: String,
    required: true
  },
  organizations: [{
    name: {
      type: String,
      enum: ['FPL', 'TICA', 'WCF', 'FIFe'],
      required: true
    },
    registrationNumber: {
      type: String,
      required: true
    },
    registrationDate: Date,
    expiryDate: Date,
    verified: {
      type: Boolean,
      default: false
    },
    verificationMethod: {
      type: String,
      enum: ['ai_check', 'manual_review', 'api_verification'],
      default: 'ai_check'
    },
    verifiedAt: Date,
    verifiedBy: String, // AI or admin name
    documentUrl: String,
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected', 'expired'],
      default: 'pending'
    },
    rejectionReason: String
  }],
  location: {
    address: String,
    city: String,
    region: String,
    postalCode: String,
    country: { type: String, default: 'Poland' },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  breeds: [String],
  documents: [{
    type: {
      type: String,
      enum: ['certificate', 'license', 'pedigree', 'vet_inspection', 'photo_id']
    },
    url: String,
    uploadedAt: { type: Date, default: Date.now },
    verified: Boolean
  }],
  overallStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'suspended'],
    default: 'pending'
  },
  verificationScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  aiChecks: [{
    checkType: String,
    result: String,
    confidence: Number,
    checkedAt: { type: Date, default: Date.now },
    details: Object
  }],
  manualReviewNotes: String,
  lastVerificationCheck: Date
}, {
  timestamps: true
});

// Check if verification is still valid
breederVerificationSchema.methods.isValid = function() {
  if (this.overallStatus !== 'verified') return false;
  
  // Check if any organization registration expired
  const hasExpired = this.organizations.some(org => {
    if (!org.expiryDate) return false;
    return new Date(org.expiryDate) < new Date();
  });
  
  return !hasExpired;
};

module.exports = mongoose.model('BreederVerification', breederVerificationSchema);
