var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
    _displayFile(res, 'display.html');
    //res.sendFile('display.html', { root: path.join(__dirname, '../views_html') });
});

var _displayFile = function (res, file) {
    res.sendFile(file, { root: path.join(__dirname, '../views_html') });
};

module.exports = router;
