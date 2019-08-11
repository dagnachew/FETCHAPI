// Giphy API
const queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=SyFrfcdyzuaywQoMApTmo3rvUzTFQx14";

fetch(queryURL).then(function(response) {
  return response.json()
}).then(function(responseJson) {
  console.log(responseJson);
});

// Initial array of movies
var animals = [];
