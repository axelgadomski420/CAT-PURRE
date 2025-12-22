const mongoose = require('mongoose');

const BreederSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  catteryName: { type: String, required: true },
  prefix: String,
  organization: String,
  verified: { type: Boolean, default: false },
  verificationDate: Date,
  address: {
    street: String,
    city: String,
    postalCode: String,
    voivodeship: String
  },
  contact: {
    phone: String,
    email: String,
    website: String,
    facebook: String,
    instagram: String
  },
  breeds: [String],
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  activeCats: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 }
});

module.exports = mongoose.model('Breeder', BreederSchema);
