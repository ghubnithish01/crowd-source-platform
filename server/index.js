const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images so frontend can display them
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// JSON Database file
const dbFile = "data.json";

// Create data.json if missing
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify({ reports: [] }, null, 2));
}

// Read DB
function readDB() {
  return JSON.parse(fs.readFileSync(dbFile, "utf8"));
}

// Write DB
function writeDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

// ---------------------------------------------------------------
// 📌 ADD NEW PLACE
// ---------------------------------------------------------------
app.post("/report", upload.single("image"), (req, res) => {
  const db = readDB();

  const newPlace = {
    id: Date.now(),
    name: req.body.name,
    category: req.body.category || "",
    location: req.body.location,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
    likes: 0
  };

  db.reports.push(newPlace);
  writeDB(db);

  res.json({ message: "Place saved successfully!", place: newPlace });
});

// ---------------------------------------------------------------
// 📌 FETCH ALL PLACES
// ---------------------------------------------------------------
app.get("/reports", (req, res) => {
  const db = readDB();
  res.json(db.reports);
});

// ---------------------------------------------------------------
// 📌 LIKE A PLACE
// ---------------------------------------------------------------
app.post("/reports/:id/like", (req, res) => {
  const db = readDB();
  const place = db.reports.find((p) => p.id == req.params.id);

  if (place) {
    place.likes += 1;
    writeDB(db);
    res.json({ message: "Liked!", place });
  } else {
    res.status(404).json({ message: "Place not found!" });
  }
});

// ---------------------------------------------------------------
// SERVER START
// ---------------------------------------------------------------
app.listen(5000, () =>
  console.log("🚀 Server running on port 5000 (JSON storage mode)")
);