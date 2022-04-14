const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
const userRoutes = require('./routes/users');
const msgRoutes = require('./routes/msgs');

const app = express();
const PORT = 
// process.env.PORT || 
3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

app.use('/api/users', userRoutes);
app.use('/api/msgs', msgRoutes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});