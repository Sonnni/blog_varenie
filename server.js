const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(3000, function() {
    console.log('Server is running on port 3000.');
});

// spustenie servera
let server = app.listen(3000, () => console.log(`Server počúva na adrese http://localhost:${server.address().port}`));
