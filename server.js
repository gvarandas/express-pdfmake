const express = require('express');
const port = process.env.PORT || '3000';
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

// Creating Server
app = express();

// Configuring the body parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors()); // add CORS headers
app.use(helmet()); // add security headers

// Routes
const router = require('./src/router');
app.use('/', router);

app.listen(port, function () {
  console.log(`Server started on Port ${port}.`)
});