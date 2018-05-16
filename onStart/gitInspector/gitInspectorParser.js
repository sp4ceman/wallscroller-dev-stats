var fs = require('fs');
var path = require('path');

var readFiles = function () {

  var _dumpFolder = path.join(__dirname, "gitInspector_dumps");

  fs.readdir(_dumpFolder, (err, files) => {
    files.forEach(file => {
      var filePath = path.join(_dumpFolder, file);
      var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      var simpleReport = parseGitInspectorReport(obj.gitinspector);
      var english = someSimpleEnglish(simpleReport)

      console.log(english);

    });
  })

};


var parseGitInspectorReport = function (objReport) {

  var simpleReport = {
    repo: objReport.repository
  };

  var _authors = new Array();
  var _topAuthor = null;
  var _leastAuthor = null;
  var _totalCommitCount = 0;

  for (var i = 0, len = objReport.changes.authors.length; i < len; i++) {
    var author = objReport.changes.authors[i];
    if (_topAuthor == null) {
      _topAuthor = author;
    }

    if (_leastAuthor == null) {
      _leastAuthor = author;
    }

    if (author.percentage_of_changes < _leastAuthor.percentage_of_changes) {
      _leastAuthor = author;
    }

    _totalCommitCount += author.commits;

    _authors.push(author);
  }

  simpleReport.AuthorCount = objReport.changes.authors.length;
  simpleReport.Authors = _authors;
  simpleReport.topAuthor = _topAuthor
  simpleReport.leastAuthor = _leastAuthor
  simpleReport.totalCommits = _totalCommitCount;
  return simpleReport;

};

var someSimpleEnglish = function (objSimpleReport) {

  var _totalAuthorsSentences = totalAuthorsSentences(objSimpleReport);

  var _individualAuthorSentences = individualAuthorSentences(objSimpleReport);


  var simpleSentences = _totalAuthorsSentences.concat(_individualAuthorSentences); // Merges both arrays


  return simpleSentences;

}

var individualAuthorSentences = function (objSimpleReport) {


  var authorSentences = new Array();

  var topAuthor = topAuthorSentence(objSimpleReport.repo, objSimpleReport.topAuthor);
  authorSentences.push(topAuthor);

  for (var i = 0, len = objSimpleReport.Authors.length; i < len; i++) {

    var _currentAuthor = objSimpleReport.Authors[i];
    if (_currentAuthor.email != objSimpleReport.topAuthor.email) {
      authorSentences.push(_currentAuthor.name + ' contributed ' + _currentAuthor.percentage_of_changes + ' of all changes to "' + objSimpleReport.repo + '"');
      authorSentences.push(_currentAuthor.name + ' contributed ' + _currentAuthor.commits + ' commits to  "' + objSimpleReport.repo + '"');
    }
  }
  return authorSentences;

}


var topAuthorSentence = function (repo, objAuthor) {
  var topSentence = objAuthor.name + ' is the top committer for "' + repo + '" with ' + objAuthor.percentage_of_changes + ' percentage of all the changes';
  return topSentence;
};



var totalAuthorsSentences = function (objSimpleReport) {
  var totalAuthorsSentences = new Array();

  var sentence1 = objSimpleReport.AuthorCount + ' people have authored code to "' + objSimpleReport.repo + ' with ' + objSimpleReport.totalCommits + ' commits made';
  totalAuthorsSentences.push(sentence1);

  var sentence2 = objSimpleReport.totalCommits + ' commits to "' + objSimpleReport.repo + ' by ' + objSimpleReport.AuthorCount + ' authors';
  totalAuthorsSentences.push(sentence2);

  var sentence3 = objSimpleReport.repo + ' has been modified by ' + objSimpleReport.AuthorCount + ' authors over  ' + objSimpleReport.totalCommits + ' commits made';
  totalAuthorsSentences.push(sentence3);

  return totalAuthorsSentences;

}



module.exports = {
  readFiles: readFiles
}




