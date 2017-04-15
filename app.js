var express = require('express');
var app = express();

var bookText = require('./sherlock.json')

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', 'views');
app.set('view engine', 'hbs');

app.get('/', function(request, response) {
    response.render('index', {
        title: 'Homepage'
    });
});

app.get('/book', function(request, response) {
    response.render('kbook', {
        bookText: bookText["text"]
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});