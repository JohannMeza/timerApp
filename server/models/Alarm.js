const { Schema, model } = require('mongoose');

const alarmSchema = new Schema({
  hour: {
    type: String,
    required: true,
    trim: true
  },
  interval: {
    type: Number,
    required: true,
    trim: true
  },
  status: {
    type: Number,
    required: true,
    trim: true,
    default: 0
  },
  notification: {
    type: Boolean,
    required: true,
    trim: true
  },
  music: {
    type: String,
    required: true,
    trim: true
  },
  title: { 
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,    
  }
},{
  versionKey: false
})

const Alarm = model('Alarm', alarmSchema);

module.exports = Alarm;