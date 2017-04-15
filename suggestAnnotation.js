var sentiments = require('./ernost-6728d-export.json');

data = sentiments.books.sherlock.data;

function distance(a, b) {
  var sum = 0;

  for(j = 0; j < a.length; j++) {
     sum += Math.pow((a[j] - b[j]), 2);
  }
  console.log(Math.sqrt(sum));
  return Math.sqrt(sum);
}

var curInd = -1;
var curOpt = -1;
var d = 0;

for(i = 1; i < data.length; i++) {
  d = distance(data[i-1].sentiment, data[i].sentiment);

  //console.log(d);

  // Get max in sentiment space
  if(curOpt < d) {
    curOpt = d;
    curInd = i;
  }
}

console.log(data[curInd].sentence);
