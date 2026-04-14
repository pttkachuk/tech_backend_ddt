const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const uploadRoute = require("./routes/upload");

app.use("/api", uploadRoute);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});