const mongoose = require('mongoose');

const Session = mongoose.model('Session', new mongoose.Schema({
  board: {
    type: Array,
    required: true,
    minlength: 64,
    maxlength: 64,
  }
}));

exports.Session = Session;