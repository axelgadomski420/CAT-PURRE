const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  birthDate: { type: Date, required: true },
  price: { type: Number, required: true },
  color: String,
  description: String,
  images: [String],
  videos: [String],
  status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available' },
  breeder: { type: mongoose.Schema.Types.ObjectId, ref: 'Breeder' },
  pedigree: {
    number: String,
    organization: String,
    father: String,
    mother: String
  },
  health: {
    vaccinations: [{ name: String, date: Date }],
    tests: [{ name: String, result: String, date: Date }],
    microchip: String
  },
  location: {
    city: String,
    voivodeship: String,
    coordinates: { lat: Number, lng: Number }
  },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cat', CatSchema);
