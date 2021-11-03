const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes=require('./routes/user_routes')
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://fathima:developer@cluster0.zrxej.mongodb.net/UsersDB?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected....')
    mongoose.connection.on('error', err => {
        console.log(`DB connection error: ${err.message}`);
    })
})

const app = express();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.static('./public'));
app.use('/uploads',express.static('./uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',routes);
app.listen(3000, () => {
    console.log('server start 3000')
})
