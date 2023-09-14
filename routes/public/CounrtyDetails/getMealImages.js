// to use env require dotenv and use it as process.env.VARIABLE_NAME

const SerpApi = require('google-search-results-nodejs');
console.log(process.env.SREPAPI);
const search = new SerpApi.GoogleSearch(process.env.SREPAPI);

const params = {
  q: "macbook",
  engine: "google_images"
};

const callback = function(data) {
  console.log(data["related_searches"]);
};

// Show result as JSON
search.json(params, callback);
