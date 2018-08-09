const express = require('express');
const port = process.env.PORT || '3000';
var bodyParser = require('body-parser');

// Creating Server
app = express();

// Configuring the body parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Routes
const router = require('./src/router');
app.use('/', router);

app.listen(port, function () {
  console.log(`Server started on Port ${port}.`)
});