require("dotenv").config();
const mongoose = require('mongoose');
const uri = process.env.MongoUrl;

// const mongoSanitize = require('express-mongo-sanitize');
const schema = require("../models/message")


exports.connectToDB = async () => {
  try {
    mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true ,  useFindAndModify: false,});
    console.log('Connected to MongoDB database');
  } catch (err) {
    console.error(err);
  }
};

exports.closeConnection = async () => {
  await mongoose.connection.close();
  console.log(`MongoDB disconnected`);
};

exports.jwtSecret = {
  jwtSecret: 'abraka-dabra',
};