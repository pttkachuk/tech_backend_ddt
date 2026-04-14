const express = require("express");
const multer = require("multer");

const { getDataFormattata } = require("../utilities/NameFile");

const router = express.Router();

// Configurazione storage (dove salvare file)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const data = getDataFormattata ()
    cb(null, data + "_" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// TEST
router.get("/test", (req, res) => {
  res.json({ message: "Backend funzionante 🚀" });
});

// 👉 UPLOAD FILE
router.post("/upload", upload.single("file"), (req, res) => {
  console.log("File ricevuto:", req.file);

  res.json({
    message: "File caricato con successo",
    file: req.file
  });
});

module.exports = router;