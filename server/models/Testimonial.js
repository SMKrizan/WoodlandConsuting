// update, delete testimonial
const mongoose = require('mongoose');

const { Schema } = mongoose;

const testimonialSchema = new Schema({
  tstName: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  tstMessage: {
    type: String,
    required: true,
    trim: true
  },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
