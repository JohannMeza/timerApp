const Alarm = require('../models/Alarm.js');

const index = async (req, res) => {
  const alarm = await Alarm.find().sort({ hour: 1 });
  res.json(alarm);
}

const store = async (req, res) => {
  console.log(JSON.parse(req.body.archivos))
  const { hour, interval, title, description, notification } = JSON.parse(req.body.archivos);
  const music = req.file ? req.file.path : "musica por default";
  if (!hour || !interval || !music || !title || !description) return res.status(404).json({ "Data incomplete": "Incomplete data to add"});
  const alarm = new Alarm({ hour, interval, music, title, description, notification });
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

const uploadHour = async (req, res) => {
  console.log(req.params.id, req.body)
  try {
    const alarm = await Alarm.updateOne({ _id: req.params.id }, req.body, { new: true })
    if (!alarm) return res.status(404).json({ "Not Found": "Not Found to upload" })
    res.json(alarm)
  } catch(err) {
    return res.status(500).send(err)
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
  uploadHour,
  deleted
}