const mongoose = require( 'mongoose' );

// Our Schema
const TaskSchema = new mongoose.Schema({
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
    enum: ['NOTSTARTED', 'INPROGRESS', 'COMPLETED'],
    default: 'NOTSTARTED'
  },
  blocks: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }
},
{
  timestamps: true
});

module.exports = mongoose.model( 'Task', TaskSchema );