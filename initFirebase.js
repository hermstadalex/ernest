var sherlock = require('./sherlock.json');
var parsedSherlock = sherlock.text.match( /[^\.!\?]+[\.!\?]+/g );
//console.log(parsedSherlock);

var book = {};
book.title = "sherlock";
book.data = [];

for(i = 0; i < parsedSherlock.length; i++) {
  book.data.push({sentence: parsedSherlock[i], sentiment: []});
}


var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyA2iVse8I-m5yD6v21cDTa0x3oYtjjuwT8",
  authDomain: "ernost-6728d.firebaseapp.com",
  databaseURL: "https://ernost-6728d.firebaseio.com/",
  storageBucket: "ernost-6728d.appspot.com",
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();


var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new NaturalLanguageUnderstandingV1({
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api',
  username: '7d440409-f7d2-485b-bd3c-cda12c5aeb52',
  password: 'yOXM05qfBtdc',
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});




// Push initial unanalyzed book data
firebaseRef.child('books').set({sherlock: book});


function emotionalAnalysis(str, index) {
  var emotion = {};

  nlu.analyze({
    'html': str, // Buffer or String
    'features': {
      'emotion': {},
    }
  }, function(err, response) {
       if (err)
         console.log('error:', err);
       else
         console.log(JSON.stringify(response, null, 2));
         // Get sentiment vector
         var sentimentVect = [
           response.emotion.document.emotion.sadness,
           response.emotion.document.emotion.joy,
           response.emotion.document.emotion.fear,
           response.emotion.document.emotion.disgust,
           response.emotion.document.emotion.anger,
         ]

         // Update bookref
         firebaseRef.child('books')
                    .child('sherlock')
                    .child('data')
                    .child(index.toString())
                    .child('sentiment').set(sentimentVect)
   });

   return;
}


for(i = 0; i < book.data.length; i++) {
  emotionalAnalysis(book.data[i].sentence, i);
  setTimeout(function(){}, 300);
}
