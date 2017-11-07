const request = require('request');
const accessToken = require('./secrets');
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

function getRepoContributors(repoOwner, repoName, cb) {


   const options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",

    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + accessToken.GITHUB_TOKEN
    }
  };
    request(options, function(err, res, body) {
    cb(err, body);
  });
}

