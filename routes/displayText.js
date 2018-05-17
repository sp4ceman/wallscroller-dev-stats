var express = require('express');
var router = express.Router();
var path = require('path');

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


function random_item() {
    return dataSet[Math.floor(Math.random() * dataSet.length)];
}

/* GET home page. */
router.get('/', function (req, res, next) {
    var returner = random_item();
    res.json({ text: returner });
});

/* GET home page. */
router.get('/allText', function (req, res, next) {
    res.json({ allText: dataSet });
});



module.exports = router;
