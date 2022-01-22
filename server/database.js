const { connect } = require('mongoose');

const startConnection = async () => {
  try {
    const db = connect('mongodb://localhost/TimerApp');
    console.log("Connection database successfully", db)
  } catch (err) {
    console.error("Connection error", err)
  }
}

module.exports = startConnection;