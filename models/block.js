const mongoose = require( 'mongoose' );

const BlockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: ['WYSIWYG', 'INPUT'],
    required: true
  }
});

module.exports = mongoose.model( 'Block', BlockSchema );