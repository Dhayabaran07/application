const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = `${req.body.name?.replace(/\s+/g, "_")}_${Date.now()}`;
    const dir = path.join(__dirname, "submissions", folderName);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post("/submit", upload.fields([{ name: "photos" }, { name: "videos" }]), (req, res) => {
  const formData = req.body;
  const files = req.files;
  console.log("New submission:", formData.name);

  res.send("Application submitted successfully!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
