const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

let route = require('./routes/route')

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://sarthak:K3rhbWfAU10MCbSA@cluster0.ne6rr.mongodb.net/products', { useNewUrlParser: true })
    .then(() => console.log('MongoDB is connected..'))
    .catch((err) => console.log(err));

app.use('/', route);

app.listen(3000, () => {
    console.log('Express running on port 3000');
})