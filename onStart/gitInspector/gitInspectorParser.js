var fs = require('fs');
var path = require('path');
var cleaner = require('./gitInspectorCleaner');

const MINUMUM_PERCENTAGE_THRESHOLD = 0; //if anyone has less than 8% of commits then won't be shown


var readFiles = function () {

  var _dumpFolder = path.join(__dirname, "gitInspector_dumps");
  var simpleReportCollection = new Array();

  fs.readdir(_dumpFolder, (err, files) => {
    files.forEach(file => {
      var filePath = path.join(_dumpFolder, file);
      var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      var simpleReport = parseGitInspectorReport(obj.gitinspector);
      simpleReportCollection.push(simpleReport);
      var prettyWordsInEnglish = someSimpleEnglish(simpleReport)
      writeToFile(prettyWordsInEnglish, simpleReport.repo);

    });

    var crossProjectStats = searchThroughAllReports(simpleReportCollection);
    var crossProjectStatSentences = someSimpleEnglishForCrossProjectStats(crossProjectStats);
    writeToFile(crossProjectStatSentences, 'crossProjectStats');
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

  var sortedAuthors = cleaner.cleanGroupAuthors(objReport);

  for (var i = 0, len = sortedAuthors.length; i < len; i++) {
    var author = sortedAuthors[i];

    if (_topAuthor == null) {
      _topAuthor = author;
    }

    if (_leastAuthor == null) {
      _leastAuthor = author;
    }

    if (author.percentage_of_changes > _topAuthor.percentage_of_changes) {
      _topAuthor = author;
    }

    if (author.percentage_of_changes < _leastAuthor.percentage_of_changes) {
      _leastAuthor = author;
    }

    _totalCommitCount += author.commits;

    _authors.push(author);
  }

  simpleReport.AuthorCount = sortedAuthors.length;
  simpleReport.Authors = _authors;
  simpleReport.topAuthor = _topAuthor
  simpleReport.leastAuthor = _leastAuthor
  simpleReport.totalCommits = _totalCommitCount;

  return simpleReport;

};

var someSimpleEnglishForCrossProjectStats = function (crossProjectStats) {

  var sentences = new Array();

  sentences.push(crossProjectStats.biggestContributer.name + ' has contributed to the most projects (' + crossProjectStats.biggestContributer.projectsCount + ')');
  sentences.push('On average we commit changes to ' + crossProjectStats.avgProjectsPerAuthor + ' projects');
  sentences.push(crossProjectStats.biggestProject.name + ' has the most contributors out of all our projects');
  sentences.push(crossProjectStats.biggestProject.authorCount + ' people have contributed to ' + crossProjectStats.biggestProject.name);
  sentences.push(crossProjectStats.smallestProject.name + ' has the least contributors out of all our projects.');
  sentences.push(crossProjectStats.smallestProject.authorCount + ' people have contributed to ' + crossProjectStats.smallestProject.name);

  return sentences;


}

var biggestContributerSentences = function (objBiggestContributer) {


  return sentences;
}

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
    if (_currentAuthor.name != objSimpleReport.topAuthor.name) {

      if (_currentAuthor.percentage_of_changes >= MINUMUM_PERCENTAGE_THRESHOLD) {
        authorSentences.push(_currentAuthor.name + ' contributed ' + _currentAuthor.percentage_of_changes + '% of all code to ' + objSimpleReport.repo);
      }

      authorSentences.push(_currentAuthor.name + ' contributed ' + _currentAuthor.commits + ' commits to ' + objSimpleReport.repo);
    }
  }

  return authorSentences;
}

var topAuthorSentence = function (repo, objAuthor) {
  var topSentence = objAuthor.name + ' is the top committer for ' + repo + ' with ' + objAuthor.percentage_of_changes + ' % of all the changes';
  return topSentence;
};

var totalAuthorsSentences = function (objSimpleReport) {
  var totalAuthorsSentences = new Array();

  var sentence1 = objSimpleReport.AuthorCount + ' people have authored code to ' + objSimpleReport.repo + ' with ' + objSimpleReport.totalCommits + ' commits made';
  totalAuthorsSentences.push(sentence1);

  var sentence2 = objSimpleReport.totalCommits + ' commits to ' + objSimpleReport.repo + ' by ' + objSimpleReport.AuthorCount + ' authors';
  totalAuthorsSentences.push(sentence2);

  var sentence3 = objSimpleReport.repo + ' has been modified by ' + objSimpleReport.AuthorCount + ' authors over ' + objSimpleReport.totalCommits + ' commits made';
  totalAuthorsSentences.push(sentence3);

  return totalAuthorsSentences;

}

var writeToFile = function (sentenceArr, project) {

  var _outFolder = path.join(__dirname, "../displays");
  var filePath = path.join(_outFolder, project + ".txt");

  var stream = fs.createWriteStream(filePath);

  sentenceArr.forEach(function (item, index) {
    stream.write(item + "\n");
  });

  stream.end();


};

var searchThroughAllReports = function (reportCollection) {


  var allAuthors = new Array();
  var _biggestContributer = null;
  var _biggestProject = null;
  var _smallestProject = null;

  for (var i = 0, reportCollectionLength = reportCollection.length; i < reportCollectionLength; i++) {

    var _reportItem = reportCollection[i];

    //the biggest and smallest are not technically correct because they might have duplicate authors
    //need to git mailmap to fix

    if (_biggestProject == null || _reportItem.Authors.length > _biggestProject.authorCount) {
      _biggestProject = {
        name: _reportItem.repo,
        authorCount: _reportItem.Authors.length
      };
    }

    if (_smallestProject == null || _reportItem.Authors.length < _smallestProject.authorCount) {
      _smallestProject = {
        name: _reportItem.repo,
        authorCount: _reportItem.Authors.length
      };
    }

    for (var j = 0, authorCollectionLength = _reportItem.Authors.length; j < authorCollectionLength; j++) {

      var _reportAuthorItem = _reportItem.Authors[j];

      var match = false;
      for (var kk = 0; kk < allAuthors.length; kk++) {
        if (allAuthors[kk].name == _reportAuthorItem.name) {
          allAuthors[kk].projects.push(_reportItem.repo);
          allAuthors[kk].projectsCount = allAuthors[kk].projectsCount + 1;
          match = true;


          if (allAuthors[kk].projectsCount > _biggestContributer.projectsCount) {
            _biggestContributer = allAuthors[kk];
          }

          break;
        }
      }

      if (!match) {
        //not found insert
        var newEntry = {
          name: _reportAuthorItem.name,
          projectsCount: 1,
          projects: new Array()
        };


        newEntry.projects.push(_reportItem.repo);
        allAuthors.push(newEntry);

        if (_biggestContributer == null) {
          _biggestContributer = newEntry;
        }
      }
    }
  }

  var projectSum = 0;
  for (var i = 0; i < allAuthors.length; i++) {
    projectSum += allAuthors[i].projectsCount;
  }

  var avgProjects = projectSum / allAuthors.length;

  var crossProjectStats = {
    biggestContributer: _biggestContributer,
    avgProjectsPerAuthor: avgProjects,
    biggestProject: _biggestProject,
    smallestProject: _smallestProject
  };

  console.log(crossProjectStats);
  return crossProjectStats;

};

module.exports = {
  readFiles: readFiles
}




