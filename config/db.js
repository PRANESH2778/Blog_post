const mongoose = require('mongoose');

async function db() {
  await mongoose.connect(process.env.MONGODB_URI);
}
module.exports = db;