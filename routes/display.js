var express = require('express');
var router = express.Router();
var fs = require('fs');
var dir = require('node-dir');
var path = require('path');

var dataSet = new Array();

var initDisplayText = function () {

  var displayFolder = path.join(__dirname, "../onStart/displays");


  dir.readFiles(displayFolder,
    function (err, content, next) {

      if (err) throw err;

      var contArr = content.split("\n");

      contArr.forEach(function (item, index) {
        dataSet.push(item);
      });

      next();
    },
    function (err, files) {
      if (err) throw err;
      console.log('finished reading files:', files); // get filepath 
    });


};

initDisplayText();

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
  console.log(dataSet);
  var viewToRender = 'animations';
  res.render(viewToRender, {
    title: 'Express',
  });
});

router.get('/newText', function (req, res, next) {
  var returner = random_item(dataSet);
  res.json({ text: returner });
});

/* GET home page. */
router.get('/allText', function (req, res, next) {
  res.json({ allText: dataSet });
});


module.exports = router;
