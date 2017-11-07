const request = require('request');
const accessToken = require('./secrets');
const fs = require('fs');
const repoOwner = process.argv[2];
const repoName = process.argv[3];


const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
};

function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + accessToken.GITHUB_TOKEN
    },
    json: true
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByUrl(url, filePath){
  request.get(url)
       .on('error', function (err) {
         throw console.log('rip', err);
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, function(err, contributors) {
  console.log("Errors:", err);
  contributors.forEach(function(contributor) {
    var url = contributor.avatar_url;
    var filePath = 'avatars/' + contributor.login + '.jpg';
    downloadImageByUrl(url, filePath);
  });
});



// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");


