const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    console.log('Could not connect to database');
  }
}

module.exports = connectDB;