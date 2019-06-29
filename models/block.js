const mongoose = require( 'mongoose' );
const slug = require('slug');

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

// Virtual property
BlockSchema.virtual('slug')
  .get(function (){ return this.title ? slug(this.title, '_') : this.title});

module.exports = mongoose.model( 'Block', BlockSchema );