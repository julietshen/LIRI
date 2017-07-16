//including the npm packages

const myKeys = require("./keys.js");

var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

// Spotify keys and whatnot

// taking in command line arguments
var command1 = process.argv[2];
var searchTerm1 = process.argv[3];
console.log(command1);

var commandsArray = [
  "my-tweets",
  "spotify-this-song",
  "movie-this",
  "do-what-it-says"
]

liriBot(command1, searchTerm1);

// checks if command line argument matches a value in the array
function liriBot(command, searchTerm) {
  if (command === "my-tweets") {
    console.log("Initializing Twitter bot");
    commandTwitter();
  } else if (command === "spotify-this-song") {
    console.log("Initializing Spotify bot");
    commandSpotify(searchTerm);
  } else if (command === "movie-this") {
    console.log("Initializing movie bot");
    commandMovie(searchTerm);
  } else if (command === "do-what-it-says") {
    console.log("Initializing random bot");
    commandRandom();
  } else {
    console.log("Didn't quite get that. What do you want me to do?");
  }
};

function commandTwitter() {

  var client = new Twitter(myKeys.twitterKeys)
  client.get('statuses/user_timeline', function(error, tweets, response) {
    if (error) {
      console.log(error);
      throw error;
    }

    //console.log(tweets); // The favorites.
    //console.log(response, null, 2); // Raw response object.

    for (var i = 0; i < tweets.length; i++) {
      console.log("-------------------------------");
      console.log("Tweet: " + tweets[i].text + "\nTime: " + tweets[i].created_at + "\n");
    }
  });
}

//If no song is provided then my program will default to "The Sign" by Ace of Base.


function commandSpotify(searchTerm) {
  var spotify = new Spotify(myKeys.spotifyKeys);
  console.log(searchTerm);

  if (searchTerm == undefined) {
    searchTerm = "The Sign ace of base";
  }

  spotify.search({
    type: 'track',
    query: searchTerm,
    limit: 1
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    if (data) {
      var tracks = data.tracks.items;
      var track = tracks[0];
      console.log("-------------------------------");
      console.log(track.name)
      console.log(track.artists[0].name)
      console.log(track.album.name)
      console.log(track.href)
    }
  })
};

//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

function commandMovie(movieSearch) {
  var request = require("request");
  console.log(movieSearch);

  if (movieSearch == undefined) {
    movieSearch = "Mr+Nobody";
    console.log(movieSearch);
  }
  var queryURL = "http://www.omdbapi.com/?t=" + movieSearch + "&apiKey=40e9cece"

  request(queryURL,
    function(err, response, body) {
        console.log("-------------------------------");
        console.log("Movie title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
          if (JSON.parse(body).Ratings[i].Source === "Internet Movie Database") {
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[i].value);
          } else if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[i].value);
          }
        }
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language : " + JSON.parse(body).Language);
        console.log("Plot is: " + JSON.parse(body).Plot);
        console.log("Actors include: " + JSON.parse(body).Actors);
    });
};

//do what it says = i want it that way
function commandRandom() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);

    }
    var read = data.split(",");
    var newCommand = read[0];
    var arg = read[1];
    liriBot(newCommand, arg);
  });
}


//saves the console logs into a txt file
function writeSomething(something) {
  fs.appendFile("log.txt", something + "\n", function(err) {
    if (err) {
      console.log(err);
    }
    console.log("Logs saved.");
  });
}
