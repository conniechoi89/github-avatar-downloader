const request = require('request');
const accessToken = require('./secrets');

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

getRepoContributors("jquery", "jquery", function(err, contributors) {
  console.log("Errors:", err);
  contributors.forEach(function(contributor) {
    console.log(contributor.avatar_url);
  });
});
