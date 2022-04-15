// Sets up mongoose
const mongoose = require('mongoose');

// Connects to MONGODB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/devshelp',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Exports mongoose
module.exports = mongoose.connection;