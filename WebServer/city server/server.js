const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// BodyParser MiddleWare
app.use(bodyParser.json());


// DB Config

const db = require('./config/keys').mongoURI;

// Mongo connect

mongoose
    .connect(db)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

// use routes

app.use('/api/items', items);

const port =  process.env.PORT || 8080;

app.listen(port, () => console.log(`Server start on port : ${port}`));
