const fs = require('fs');
const readline = require('readline');
const md5 = require('md5');
const Spinner = require('node-spintax');

var answers = ["e4820b45d2277f3844eac66c903e84be",
  "23170acc097c24edb98fc5488ab033fe",
  "665e5bcb0c20062fe8abaaf4628bb154"
]

// anagram of:
var letters = "poultry outwits ants"
// split into letters
var brokenLetters = letters.split("");
// arrange alphabetical
var alphabetical = brokenLetters.sort();

var res, l, keys = [];

fs.readFile('newList.txt', (err, data) => {
  if (err) throw err;
  res = JSON.parse(data);

  do {
    stringCreator();
  } while (keys.length < 3);

  console.log(keys);

});

function r() {
  // console.log(res.length);
  return (Math.floor(Math.random() * res.length));
};


function stringCreator() {
  var word1 = r();
  var word2 = r();
  var word3 = r();

  var spinner = new Spinner(`{${res[word1]}|${res[word2]}|${res[word3]}} {${res[word1]}|${res[word2]}|${res[word3]}} {${res[word1]}|${res[word2]}|${res[word3]}}`);

  // // add 3 random words together
  var newString = spinner.unspin();

  // console.log(newString);
  md5Buster(newString);

};

function md5Buster(arr) {

  arr.forEach((item, i) => {
    if (item.length != 20) {
      return;
    } else {
      var md = md5(item);
      if (answers.includes(md)) {
        keys.push(item);
        console.log(item);
      }
    }
  });

}

function uniq_fast(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = a[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}
