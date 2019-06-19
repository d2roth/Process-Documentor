const mongoose = require( 'mongoose' );

// Our Schema
const ProcedureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  content: {
    type: Array,
    required: true
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

module.exports = mongoose.model( 'Procedure', ProcedureSchema );