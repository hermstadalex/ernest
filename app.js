var express = require('express');
var app = express();
var favicon = require('serve-favicon')
var path = require('path')
var bookText = require('./sherlock.json')
var aiMiddleware = require('./suggestAnnotation.js')

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// views is directory for all template files
app.set('views', 'views');
app.set('view engine', 'hbs');

app.get('/', function(request, response) {
    response.render('index', {
        title: 'Homepage'
    });
});

app.get('/collection', function(request, response) {
  response.render('collection', {
      title: 'Collection'
  });
});

app.get('/book', function(request, response) {
    bookText["text"] = aiMiddleware.suggestAnnotationFormatted();
    response.render('kbook', {
        title: 'The Adventures of Sherlock Holmes',
        bookText: bookText["text"]
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
