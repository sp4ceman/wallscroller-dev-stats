var express = require('express');
var router = express.Router();
var path = require('path');

var dataSet = [
    'Zebra Swallowtail', 'Great Southern White', 'Falcate Orangetip',
    'Southern Dogface', 'Barred Yellow', 'Harvester', 'American Copper',
    'Eastern Pine Elfin', 'Atlantic Holly Azure', 'Northern Metalmark',
    'American Snout', 'Pearl Crescent', 'Red Admiral', 'Painted Lady',
    'Goatweed Leafwing', 'Georgia Satyr', 'Tawny Emperor', 'Sleepy Duskywing',
    'Arctic Skipper', 'Mulberry Wing', 'Monarch', 'Lorquin\'s Admiral',
    'Lotus Hairstreak', 'Little Glassywing', 'Chryxus Arctic',
    'Rocky Mountain Parnassian', 'Zebra Heliconian', 'Hackberry Emperor'
];

function random_item() {
    return dataSet[Math.floor(Math.random() * dataSet.length)];
}

/* GET home page. */
router.get('/', function (req, res, next) {
    var returner = random_item();
    res.json({ text: returner });
});



module.exports = router;
