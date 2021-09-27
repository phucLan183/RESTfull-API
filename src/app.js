require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

// Connect Database
const connectDB = require('./common/mongoose');
connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Import routers
const authRouter = require('./routers/auth');
app.use(authRouter)

const indexRouter = require('./routers/index');
app.use(indexRouter)

const upload = require('./routers/upload');
app.use("/file", upload);

app.listen(process.env.PORT, () => {
  console.log(`App running in URL: http://localhost:${process.env.PORT}`);
})