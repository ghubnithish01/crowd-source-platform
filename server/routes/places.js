const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const images = req.files.map(file => file.path);
    const place = new Place({ ...req.body, images });
    await place.save();
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const places = category ? await Place.find({ category }) : await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/like', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    place.likes += 1;
    await place.save();
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: 'Place deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
