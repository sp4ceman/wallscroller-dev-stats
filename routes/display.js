var express = require('express');
var router = express.Router();

var viewArray = [];
viewArray.push('a1');

var dataSet =
  ['6 people have authored code to "git-stats with 93 commits made',
    '93 commits to "git-stats by 6 authors',
    'git-stats has been modified by 6 authors over  93 commits made',
    'Ionică Bizău is the top committer for "git-stats" with 98.3 percentage of all the changes',
    'Joey Hipolito contributed 0.12 of all changes to "git-stats"',
    'Joey Hipolito contributed 1 commits to  "git-stats"',
    'Justin Hurley contributed 0.12 of all changes to "git-stats"',
    'Justin Hurley contributed 1 commits to  "git-stats"',
    'Ryan Seys contributed 0.12 of all changes to "git-stats"',
    'Ryan Seys contributed 1 commits to  "git-stats"',
    'Sanket Dasgupta contributed 0.12 of all changes to "git-stats"',
    'Sanket Dasgupta contributed 1 commits to  "git-stats"',
    'as0n contributed 1.23 of all changes to "git-stats"',
    'as0n contributed 1 commits to  "git-stats"']


function random_item(_arr) {
  _arr = shuffle(_arr);
  return _arr[Math.floor(Math.random() * _arr.length)];
}

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


/* GET home page. */
router.get('/', function (req, res, next) {

  var viewToRender = 'animations'; //random_item(viewArray);
  var textToRender = random_item(dataSet);

  res.render(viewToRender, {
    title: 'Express',
    text: textToRender
  });
});

router.get('/newText', function (req, res, next) {
  var returner = random_item(dataSet);
  res.json({ text: returner });
});


module.exports = router;
