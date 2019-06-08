const mongoose = require( 'mongoose' );

// Our Schema
const ProcessSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'DRAFT'
  }
},
{
  timestamps: true
});

module.exports = mongoose.model( 'Process', ProcessSchema );