const express = require("express");
const router = express.Router();
const uploadMiddleware = require('../middlewares/upload');
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

let gfs;
const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});


router.post("/upload", uploadMiddleware.single("file"), async (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
  return res.send(imgUrl);
});


router.get("/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream({
      _id: file._id
    })
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.send("not found");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const uploadId = req.params.id
    await gfs.files.deleteOne({ _id: uploadId });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});
module.exports = router;