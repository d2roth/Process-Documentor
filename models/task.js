const mongoose = require( 'mongoose' );

const BlockSchema = require('./block.js').schema
// Our Schema
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  /*
  // These should be in the submissions not in the builder
  status: {
    type: String,
    enum: ['NOTSTARTED', 'INPROGRESS', 'COMPLETED'],
    default: 'NOTSTARTED'
  },
  */
  blocks: [BlockSchema]
},
{
  timestamps: true
});

module.exports = mongoose.model( 'Task', TaskSchema );