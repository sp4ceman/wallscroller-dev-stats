var fs = require('fs');
var path = require('path');
var directoryFolder = path.join(__dirname, "../peopleList");
var filePath = path.join(directoryFolder, 'cibDig.json');
var cibDirectory = JSON.parse(fs.readFileSync(filePath, 'utf8'));
var authorAndMails = cibDirectory.directory;

var cleanGroupAuthors = function (objReport) {

    var objDict = {};

    for (var i = 0, len = objReport.changes.authors.length; i < len; i++) {
        var author = objReport.changes.authors[i];
        var totalMatch = false;

        for (var jj = 0, _len = authorAndMails.length; jj < _len; jj++) {
            var authorMail = authorAndMails[jj];

            var match = false;
            var _foundMail = '';

            for (var kk = 0, authorMailLength = authorMail.emails.length; kk < authorMailLength; kk++) {
                var _email = authorMail.emails[kk];
                if (author.email.toLowerCase().trim() == _email.toLowerCase().trim()) {
                    _foundMail = _email.toLowerCase().trim();
                    match = true;
                    totalMatch = true;
                }
            }

            if (match) {

                if (objDict[authorMail.author] != null) {
                    var _objectAuthor = objDict[authorMail.author];
                    _objectAuthor.commits += author.commits;
                    _objectAuthor.percentage_of_changes += author.percentage_of_changes;
                    _objectAuthor.percentage_of_changes = Math.round(_objectAuthor.percentage_of_changes * 100) / 100;
                    objDict[authorMail.author] = _objectAuthor;
                    _objectAuthor = null;
                }
                else {
                    var _objectAuthor = {};
                    _objectAuthor.name = authorMail.author;
                    _objectAuthor.author = authorMail.author;
                    _objectAuthor.gravatar = authorMail.gravatar;
                    _objectAuthor.commits = author.commits;
                    _objectAuthor.percentage_of_changes = Math.round(author.percentage_of_changes * 100) / 100;
                    objDict[authorMail.author] = _objectAuthor;
                    _objectAuthor = null;
                }

            }
        }

        if (!totalMatch) {
            console.log(author.name + ' ' + author.email + ' never matched ever');
            console.log('creating new directory entry for : ' + author.name);
            var newEntry = createNewCIBDigEntry(author);
            authorAndMails.push(newEntry);

            var _objectAuthor = {};
            _objectAuthor.name = author.name;
            _objectAuthor.author = newEntry.name;
            _objectAuthor.gravatar = newEntry.gravatar;
            _objectAuthor.commits = author.commits;
            _objectAuthor.percentage_of_changes = Math.round(author.percentage_of_changes * 100) / 100;
            objDict[authorMail.name] = _objectAuthor;
            _objectAuthor = null;
        }
    }

    writeDirectoryToFile();

    var keyNames = Object.keys(objDict);
    var returnArray = new Array();
    for (var i = 0; i < keyNames.length; i++) {
        var keyName = keyNames[i];
        returnArray.push(objDict[keyName]);
    }
    return returnArray;

}

var createNewCIBDigEntry = function (author) {

    var newEntry = {
        author: author.name,
        gravatar: author.gravatar,

    };

    var emails = new Array();
    emails.push(author.email);

    newEntry.emails = emails;

    return newEntry;

};

var writeDirectoryToFile = function () {
    const content = JSON.stringify(cibDirectory);
    console.log(filePath);
    fs.writeFile(filePath, content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}



module.exports = {
    cleanGroupAuthors: cleanGroupAuthors
}