const Timer = require('../models/Timer.js');

const index = async (req, res) => {
  const timer = await Timer.find();
  res.json(timer);
}

const store = async (req, res) => {
  const { time } = req.body;
  if (!time) return res.status(404).json({ "Data incomplete": "Incomplete data to add" })
  const timer = new Timer({ time });
  await timer.save();
  res.json(timer);
}

const show = async (req, res) => {
  try {
    const timer = await Timer.findById(req.params.id);
    if (!timer) return res.status(404).json({ "Not Found": "Not found by your id" }) ;
    res.json(timer);
  } catch (err) {
    return res.status(500).send(err);
  }
}

const updated = async (req, res) => {
  try {
    const timer = await Timer.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    if (!timer) return res.status(404).json({ "Not Found": "Not found to update" })
    res.json(timer);
  } catch (err) {
    return res.status(500).send(err)
  }
}

const deleted = async (req, res) => {
  try {
    const timer = await Timer.findByIdAndDelete(req.params.id);
    if (!timer) return res.status(404).json({ "Not Found": "Not found to delete" });
    res.json(timer);
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