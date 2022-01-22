const { Schema, model } = require('mongoose');

const alarmSchema = new Schema({
  hour: {
    type: String,
    required: true,
    trim: true
  },
  interval: {
    type: String,
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