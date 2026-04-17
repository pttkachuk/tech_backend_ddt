const express = require("express");
const multer = require("multer");
const ExcelJS = require("exceljs");

const { getDataFormattata } = require("../utilities/NameFile");
const transform = require("../suppliers/vaccani/transform");

const router = express.Router();

// Configurazione storage (dove salvare file)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const data = getDataFormattata();
    cb(null, data + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// TEST
router.get("/test", (req, res) => {
  res.json({ message: "Backend funzionante 🚀" });
});

// 👉 UPLOAD FILE
router.post("/upload", upload.single("file"),async (req, res) => {
  try {
    const filePath = req.file.path;

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0]; // primo foglio

    let data = [];
    
    const rows = data.slice(1);

    worksheet.eachRow((row, rowNumber) => {
      data.push(row.values);
    });

    const transformedData = transform(rows);
    const workbookOut = new ExcelJS.Workbook();
    await workbookOut.xlsx.readFile("templates/templateAHE.xlsx");

    const worksheetOut = workbookOut.worksheets[0];

    let startRow = 2;

    transformedData.forEach((item, index) => {
      const row = worksheetOut.getRow(startRow + index);

      row.getCell(1).value = item.codice;
      row.getCell(2).value = item.descrizione;
      row.getCell(3).value = item.quantita;
      row.getCell(4).value = item.prezzo;

    row.commit();
    });

    const outputPath = "uploads/output.xlsx";
    await workbookOut.xlsx.writeFile(outputPath);

    console.log("Sto per inviare il file...");
    res.download(outputPath);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore lettura file" });
  }
});

module.exports = router;
