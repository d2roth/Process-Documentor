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
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'DRAFT'
  }
},
{
  timestamps: true
});

// Query Helpers
ProcedureSchema.query.drafts = function () {
  return this.where({
    status: 'DRAFT'
  });
}

ProcedureSchema.query.published = function () {
  return this.where({
    status: 'PUBLISHED'
  });
}


module.exports = mongoose.model( 'Procedure', ProcedureSchema );