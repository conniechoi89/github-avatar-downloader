const request = require('request');
const accessToken = require('./secrets');
const fs = require('fs');

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

// getRepoContributors("jquery", "jquery", function(err, contributors) {
//   console.log("Errors:", err);
//   contributors.forEach(function(contributor) {
//     console.log(contributor.avatar_url);
//   });
// });

function downloadImageByURL(url, filePath) {
  request
    .get(url)
    .on('end', () => {console.log("end");})
    .pipe(fs.createWriteStream(filePath));
};


downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");


