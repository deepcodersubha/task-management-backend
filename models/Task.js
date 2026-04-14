const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,    // validation: this field must exist
    trim: true,        // removes leading/trailing spaces
  },
  completed: {
    type: Boolean,
    default: false,    // new tasks start as incomplete
  }
}, { timestamps: true }); // auto-adds createdAt and updatedAt fields

module.exports = mongoose.model('Task', taskSchema);