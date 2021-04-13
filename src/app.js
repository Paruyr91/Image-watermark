const express = require('express');
const app = express();

const bodyParser = require("body-parser");
require('dotenv').config();


const winston = require('winston');
const expressWinston = require('express-winston');
const sequelize = require('./models/index');
const router = require('./routers/apirouter');
const PORT = process.env.PORT || 3030;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(bodyParser.json());
app.use(express.json());

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

app.use(router);

app.listen(PORT, async () => {
    try {
    await sequelize.authenticate();
    console.log(`server started at${PORT}`)
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})