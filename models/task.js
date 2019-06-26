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