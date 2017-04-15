var sentiments = require('./ernost-6728d-export.json');

function suggestAnnotation(){
  data = sentiments.books.sherlock.data;

  // list of {dist, index} pairs
  topN = [];

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

  for(i = 3; i < data.length; i++) {
    d0 = distance(data[i-3].sentiment, data[i-2].sentiment);
    d1 = distance(data[i-1].sentiment, data[i-2].sentiment);
    d2 = distance(data[i-1].sentiment, data[i].sentiment);
    d = d0 + d1 + d2;

    topN.push({dist: d, index: i});

    // Line search for maxima
    if(curOpt < d) {
      curOpt = d;
      curInd = i;
    }
  }

  topN = topN.sort(function(a, b) {
      return b.dist - a.dist;
  });

  console.log(topN);

  // Return index

  console.log(data[topN[3].index].sentence);

  return topN.slice(0,5);
}
