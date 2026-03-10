const mongoose = require('mongoose');

const scanLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['url', 'email'],
    required: true
  },
  input: {
    type: String,
    required: true,
    trim: true
  },
  result: {
    type: String,
    enum: ['safe', 'suspicious', 'dangerous'],
    required: true
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  features: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
scanLogSchema.index({ user: 1, createdAt: -1 });
scanLogSchema.index({ type: 1 });
scanLogSchema.index({ result: 1 });

module.exports = mongoose.model('ScanLog', scanLogSchema);
