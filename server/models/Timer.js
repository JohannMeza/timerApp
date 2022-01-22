const { Schema, model } = require('mongoose');

const timerSchema = new Schema({
  time: {
    type: String,
    required: true,
    trim: true
  }
},{
  versionKey: false
})

const Timer = model('Timer', timerSchema);

module.exports = Timer;