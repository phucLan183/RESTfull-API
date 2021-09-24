require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3333;

// Connect Database
const connectDB = require('./common/mongoose')();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Import routers
const authRouter = require('./routers/auth');
app.use(authRouter)

const indexRouter = require('./routers/index');
app.use(indexRouter)

app.listen(process.env.PORT, () => {
  console.log(`App running in URL: http://localhost:${process.env.PORT}`);
})