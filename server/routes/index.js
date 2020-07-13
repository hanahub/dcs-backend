const express = require('express');

// Routers
const main = express.Router();

const metricController = require('../controllers/metric.controller');

main.get('/', (req, res) => res.send('OK'));

main.post(
  '/metric/:key',
  metricController.log
);

main.get(
  '/metric/:key/sum',
  metricController.sum
);

module.exports = main;
