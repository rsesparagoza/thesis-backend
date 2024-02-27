require('dotenv').config(); 
const mongoose = require('mongoose'); 

const {MONGODB_URI} = process.env;

console.log(MONGODB_URI, process.env.MONGODB_URI);

mongoose.connect(MONGODB_URI, {autoIndex: false})
  .then(() => {
    console.log('Database is connected');
  })
  .catch(
    err => console.error('Error connecting to the database:', err.message));
