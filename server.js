// Imports data to use express and sequelize and the info for the api routes
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

// data for starting the express server
const app = express();
const PORT = process.env.PORT || 3001;

// middleware for express for the server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connects to the api routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

