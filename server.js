const express = require('express');
const dotenv = require('dotenv').config({path: 'config.env'});
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

//log request
app.use(morgan('tiny'));

//mongooseDB connection
connectDB();

//parse request to body parser
app.use(bodyParser.urlencoded({extended: true}));

//set view engine
app.set("view engine", "ejs");
// app.set("view engine", path.join(__dirname,"views/ejs"));

//load asset
app.use('/css', express.static(path.resolve(__dirname,"assets/css")));
app.use('/js', express.static(path.resolve(__dirname,"assets/js")));
app.use('/img', express.static(path.resolve(__dirname,"assets/img")));

//load router
app.use('/', require('./server/routes/router.js'));


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));