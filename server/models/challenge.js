const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  title: {
    type: String,
    index: { unique: true }
  },
  points: String,
  plus: Boolean,
  details: Array
});

module.exports = mongoose.model('Challenge', ChallengeSchema);