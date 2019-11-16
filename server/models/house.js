const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HouseSchema = new Schema({
  house: {
    type: String,
    index: { unique: true }
  },
  head: String,
  points: Number,
  weekpoints: Number,
  owl: Boolean,
  image: String
});

module.exports = mongoose.model('House', HouseSchema);