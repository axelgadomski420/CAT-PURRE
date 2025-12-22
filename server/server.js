const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Load env vars
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Import routes
const authRoutes = require('./routes/auth.routes');
const catsRoutes = require('./routes/cats.routes');
const breedersRoutes = require('./routes/breeders.routes');
const paymentsRoutes = require('./routes/payments.routes');
const auctionsRoutes = require('./routes/auctions.routes');
const socialRoutes = require('./routes/social.routes');
const breedingRoutes = require('./routes/breeding.routes');
const cattokRoutes = require('./routes/cattok.routes');
const dnaRoutes = require('./routes/dna.routes');
const transportRoutes = require('./routes/transport.routes');
const reservationsRoutes = require('./routes/reservations.routes');
const messagesRoutes = require('./routes/messages.routes');
const notificationsRoutes = require('./routes/notifications.routes');
const adminRoutes = require('./routes/admin.routes');
const subscriptionsRoutes = require('./routes/subscriptions.routes');
const aiRoutes = require('./routes/ai.routes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/cats', catsRoutes);
app.use('/api/breeders', breedersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/auctions', auctionsRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/breeding', breedingRoutes);
app.use('/api/cattok', cattokRoutes);
app.use('/api/dna', dnaRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// API documentation
app.get('/api', (req, res) => {
  res.json({
    message: '🐱 CAT PURRE API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      cats: '/api/cats',
      breeders: '/api/breeders',
      ai: '/api/ai',
      payments: '/api/payments'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/catpurre')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Socket.IO
const { initializeSocket } = require('./socket');
initializeSocket(server);
console.log('✅ Socket.IO initialized');

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(\`\n╔════════════════════════════════════════╗\`);
  console.log(\`║  🐱 CAT PURRE API Server Running      ║\`);
  console.log(\`╚════════════════════════════════════════╝\`);
  console.log(\`\n🚀 Server: http://localhost:\${PORT}\`);
  console.log(\`📚 API Docs: http://localhost:\${PORT}/api\`);
  console.log(\`🏥 Health: http://localhost:\${PORT}/health\n\`);
});

module.exports = app;

const referralRoutes = require('./routes/referral.routes');
app.use('/api/referral', referralRoutes);

const aiBehavioristRoutes = require('./routes/ai.behaviorist.routes');
const uberRoutes = require('./routes/uber.routes');
const vetsRoutes = require('./routes/vets.routes');

app.use('/api/ai', aiBehavioristRoutes);
app.use('/api/uber', uberRoutes);
app.use('/api/vets', vetsRoutes);

const verificationRoutes = require('./routes/verification.routes');
app.use('/api/verification', verificationRoutes);
