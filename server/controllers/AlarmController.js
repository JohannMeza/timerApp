const Alarm = require('../models/Alarm.js');

const index = async (req, res) => {
  const alarm = await Alarm.find();
  res.json(alarm);
}

const store = async (req, res) => {
  const { hour, interval, music, title, description } = req.body;
  if (!hour && !interval && !music && !title && !description) return res.status(404).json({ "Data incomplete": "Datos incompletos"});
  const alarm = new Alarm({ hour, interval, music, title, description });
  await alarm.save();
  res.json(alarm);
}

const show = async (req, res) => {
  try {
    console.log(req.params.id)
    const alarm = await Alarm.findOne({ _id: req.params.id });
    if (!alarm) return res.status(404).json({ "Not found": "Alarm Not Found" })
    res.json(alarm)
  } catch (err) {
    return res.status(500).send(err)
  }
}

const updated = async (req, res) => {
  try {
    const alarm = await Alarm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alarm) return res.status(404).json({ "Not Found": "Alarm Update Not Found" });
    res.json(alarm)
  } catch (err) {
    return res.status(500).send(err);
  }
}

const deleted = async (req, res) => {
  try {
    const alarm = await Alarm.deleteOne({ _id: req.params.id });
    if (!alarm) return res.status(404).json({ "Not Found": "Delete Alarm Not Found" });
    res.json(alarm);
  } catch (err) {
    return res.status(500).send(err)
  }
}

module.exports = {
  index,
  store,
  show,
  updated,
  deleted
}