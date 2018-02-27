const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const tasks = require('./routes/tasks');

const port = 3000;

const app = express();

//Setting up the view engine, lets system know what folder to use for Views

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Setting static folder

app.use(express.static(path.join(__dirname, 'client')))

// Use body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function() {

    console.log('Server sterted on port ' + port);
});