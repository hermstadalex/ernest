var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var sherlock = require('./sherlock.txt');

var text_to_speech = new TextToSpeechV1({
  "url": "https://stream.watsonplatform.net/text-to-speech/api",
  "username": "09cf6e08-ab9b-48ef-bc60-8d7bd11a1eff",
  "password": "IOcgpgPYNyvN"
});

var params = {
  text: sherlock,
  voice: 'en-US_AllisonVoice', // Optional voice
  accept: 'audio/wav'
};

// Pipe the synthesized text to a file
text_to_speech.synthesize(params).pipe(fs.createWriteStream('sherlock.wav'));
