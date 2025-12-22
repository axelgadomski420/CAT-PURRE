const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  achievements: [{
    id: String,
    name: String,
    description: String,
    icon: String,
    unlockedAt: Date,
    points: Number
  }],
  totalPoints: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  badges: [String],
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastVisit: Date
  }
}, {
  timestamps: true
});

// Available achievements
achievementSchema.statics.ACHIEVEMENTS = {
  FIRST_LOGIN: {
    id: 'first_login',
    name: 'Pierwszy krok',
    description: 'Zalogowałeś się pierwszy raz',
    icon: '👋',
    points: 10
  },
  FIRST_CAT: {
    id: 'first_cat',
    name: 'Mój pierwszy kot',
    description: 'Kupiłeś swojego pierwszego kota',
    icon: '🐱',
    points: 50
  },
  STREAK_7: {
    id: 'streak_7',
    name: 'Tygodniowy entuzjasta',
    description: 'Zaloguj się 7 dni z rzędu',
    icon: '🔥',
    points: 100
  },
  REFERRAL_5: {
    id: 'referral_5',
    name: 'Ambasador kotów',
    description: 'Zaproś 5 znajomych',
    icon: '🎁',
    points: 200
  },
  DAILY_CAT_WIN: {
    id: 'daily_cat_win',
    name: 'Kot-ekspert',
    description: 'Wygraj Daily Cat Match',
    icon: '🏆',
    points: 30
  }
};

module.exports = mongoose.model('Achievement', achievementSchema);
