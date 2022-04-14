const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
const userRoutes = require('./routes/users')

const cors = require("cors");
require("dotenv").config({ path: "./config.env" }); // ** db ** //

const app = express();
// const PORT = process.env.PORT || 3001;
const PORT = process.env.PORT || 5000;

app.use(cors()); // ** db ** //

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ** db ** //
app.use(require("./routes/record")); 

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});
// ** db ** //


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

app.use('/api/users', userRoutes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});