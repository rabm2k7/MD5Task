const fs = require('fs');
const readline = require('readline');

var includeLetters = [
  'a', 'i', 'l', 'n',
  'o', 'p', 'r', 's',
  't', 'u', 'w', 'y'
];

var excludeLetters = [
  'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'j', 'k', 'm',
  'q', 'v', 'x', 'z'
];

var list = [];

const readInterface = readline.createInterface({
  input: fs.createReadStream('wordlist.txt'),
});

readInterface.on('line', function(line) {
  var x = removeNoPossibleResults(line, excludeLetters, includeLetters);
  // console.log(x);
  if (x) {
    list.push(x);
  }

});

readInterface.on('close', function(data) {
  console.log(list);
  writeOut(JSON.stringify(list));
});



function removeNoPossibleResults(word, excludeLetters, includeLetters) {

  var excludes = containsAny(word, excludeLetters);
  var includes = containsAny(word, includeLetters);


  if ((!excludes) && (includes)) {
    // console.log(word, includes, excludes);
    return word;
  }
}


function containsAny(string, stringArray) {
  //split string
  var brokenString = string.split("");

  var d = diff(brokenString, stringArray);

  return d;

}

function writeOut(text) {
  fs.open('newList.txt', 'a', 666, function(e, id) {
    fs.write(id, text + '\r\n', null, 'utf8', function() {
      fs.close(id, function() {
        console.log("File updated");
      });
    });
  });
}

function diff(arr, arr2) {

  var ret = [];
  arr.sort();
  arr2.sort();
  for (var i = 0; i < arr.length; i += 1) {
    if (arr2.indexOf(arr[i]) > -1) {
      ret.push(arr[i]);
    }
  }

  if (ret.length > 0) {
    return true;
  } else {
    return false;
  }

};
