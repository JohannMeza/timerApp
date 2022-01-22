const Pomodoro = require('../models/Pomodoro.js');

const index = async (req, res) => {
  const pomodoro = await Pomodoro.find();
  res.json(pomodoro);
};

const store = async (req, res) => {
  const { hour, rest, music, title, description } = req.body;
  if (!hour && !rest && !music && !title && !description) return res.status(404).json({ "Data incomplete": "Incomplete data to add" })
  const pomodoro = new Pomodoro({ hour, rest, music, title, description })
  await pomodoro.save();
  res.json(pomodoro)
}

const show = async (req, res) => {
  try {
    const pomodoro = await Pomodoro.findById(req.params.id);
    if (!pomodoro) return res.status(404).json({ "Not Found": "Not found by your id" });
    res.json(pomodoro)
  } catch (err) {
    return res.status(500).send(err)
  }
};

const updated = async (req, res) => {
  try {
    const pomodoro = await Pomodoro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pomodoro) return res.status(404).json({ "Not found": "Not found to update" });
    res.json(pomodoro)
  } catch (err) {
    return res.status(500).send(err)
  }
}

const deleted = async (req, res) => {
  try {
    const pomodoro = await Pomodoro.findByIdAndDelete(req.params.id);
    if (!pomodoro) return res.status(404).json({ "Not found": "Not found to delete" })
    res.json(pomodoro)
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