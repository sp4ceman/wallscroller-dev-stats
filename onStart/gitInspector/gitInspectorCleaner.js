var fs = require('fs');
var path = require('path');
var directoryFolder = path.join(__dirname, "../peopleList");
var filePath = path.join(directoryFolder, 'directory.json');
var directoryList = {};

try
{
    directoryList = JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
catch(err)
{
    directoryList = {
        directory : []
    };

}

var cleanGroupAuthors = function (objReport) {

    var objDict = {};
    var repoName = objReport.repository;

    for (var i = 0, len = objReport.changes.authors.length; i < len; i++) {
        var author = objReport.changes.authors[i];
        var totalMatch = false;

        for (var jj = 0, _len = directoryList.directory.length; jj < _len; jj++) {
            var _directoryEntry = directoryList.directory[jj];

            var match = false;
            var _foundMail = '';

            for (var kk = 0, _directoryEntryEmailCount = _directoryEntry.emails.length; kk < _directoryEntryEmailCount; kk++) {
                var _email = _directoryEntry.emails[kk];
                if (author.email.toLowerCase().trim() == _email.toLowerCase().trim()) {
                    _foundMail = _email.toLowerCase().trim();
                    match = true;
                    totalMatch = true;
                }
            }

            if (match) {

                if (objDict[_directoryEntry.author] != null) {
                    var _objectAuthor = objDict[_directoryEntry.author];
                    _objectAuthor.commits += author.commits;
                    _objectAuthor.percentage_of_changes += author.percentage_of_changes;
                    _objectAuthor.percentage_of_changes = Math.round(_objectAuthor.percentage_of_changes * 100) / 100;
                    objDict[_directoryEntry.author] = _objectAuthor;
                    _objectAuthor = null;
                }
                else {
                    var _objectAuthor = {};
                    _objectAuthor.name = _directoryEntry.author;
                    _objectAuthor.author = _directoryEntry.author;
                    _objectAuthor.gravatar = _directoryEntry.gravatar;
                    _objectAuthor.commits = author.commits;
                    _objectAuthor.percentage_of_changes = Math.round(author.percentage_of_changes * 100) / 100;
                    objDict[_directoryEntry.author] = _objectAuthor;
                    _objectAuthor = null;
                }

            }
        }

        if (!totalMatch) {
            console.log(author.name + ' ' + author.email + ' never matched ever');
            console.log('creating new directory entry for : ' + author.name);
            var newEntry = createNewDirectoryEntry(author);
            directoryList.directory.push(newEntry);

            var _objectAuthor = {};
            _objectAuthor.name = author.name;
            _objectAuthor.author = newEntry.name;
            _objectAuthor.gravatar = newEntry.gravatar;
            _objectAuthor.commits = author.commits;
            _objectAuthor.percentage_of_changes = Math.round(author.percentage_of_changes * 100) / 100;
            objDict[author.name] = _objectAuthor;
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

var createNewDirectoryEntry = function (author) {

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
    const content = JSON.stringify(directoryList);
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