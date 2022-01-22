const Alarm = require('../models/Alarm.js');

const index = async (req, res) => {
  const alarm = await Alarm.find();
  res.json(alarm);
}

const store = async (req, res) => {
  const { hour, interval, title, description } = req.body;
  const music = req.file.path
  if (!hour && !interval && !music && !title && !description) return res.status(404).json({ "Data incomplete": "Incomplete data to add"});
  const alarm = new Alarm({ hour, interval, music, title, description });
  await alarm.save();
  res.json(alarm);
}

const show = async (req, res) => {
  try {
    const alarm = await Alarm.findOne({ _id: req.params.id });
    if (!alarm) return res.status(404).json({ "Not found": "Not found by your id" })
    res.json(alarm)
  } catch (err) {
    return res.status(500).send(err)
  }
}

const updated = async (req, res) => {
  try {
    const alarm = await Alarm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alarm) return res.status(404).json({ "Not Found": "Not found to update" });
    res.json(alarm)
  } catch (err) {
    return res.status(500).send(err);
  }
}

const deleted = async (req, res) => {
  try {
    const alarm = await Alarm.findByIdAndDelete(req.params.id);
    if (!alarm) return res.status(404).json({ "Not Found": "Not found to delete" });
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