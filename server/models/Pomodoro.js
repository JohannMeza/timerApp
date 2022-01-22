const { Schema, model } = require('mongoose');

const pomodoroSchema = new Schema({
    hour: {
      type: String,
      required: true,
      trim: true
    },
    rest: {
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
      trim: true
    }
},{
  versionKey: false
})

const Pomodoro = model('Pomodoro', pomodoroSchema);

module.exports = Pomodoro