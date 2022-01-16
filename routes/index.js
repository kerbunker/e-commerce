// imports the data for the server for the routes to connect to
const router = require('express').Router();
const apiRoutes = require('./api');

// sends to the api routes
router.use('/api', apiRoutes);

// alert if the wrong route is used
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;