//including the npm packages

const myKeys = require("./keys.js");


var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

// Spotify keys and whatnot





// taking in command line arguments
var command = process.argv[2];

var commandsArray = [
    "my-tweets",
    "spotify-this-song",
    "movie-this",
    "do-what-it-says"
]

// checks if command line argument matches a value in the array

console.log(command);

//twitter
if (command == "my-tweets") {
    commandTwitter();
} else if (command == "spotify-this-song") {
    commandSpotify();
} else if (command == "movie-this") {
    console.log("Movies coming soon");
} else if (command == "do-what-it-says") {
    console.log("Robots coming soon");
} else {
    console.log("something is wrong");
}

function commandTwitter() {
    var client = new Twitter(myKeys.twitterKeys)
    client.get('statuses/user_timeline', function(error, tweets, response) {
        if (error) {
            console.log(error);
            throw error;
        }

        //console.log(tweets); // The favorites. 
        //console.log(response, null, 2); // Raw response object. 

        for (var i = 0; i <tweets.length; i++) {
            console.log("Tweet: " + tweets[i].text + "\nUser: " + tweets[i].screen_name + "\n");
        }
    });
}


function commandSpotify() {
    var spotify = new Spotify(myKeys.spotifyKeys);

    spotify.search({ type: 'track', query: process.argv[3], limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        if(data) {
        	var tracks = data.tracks.items;
        	var track = tracks[0];
        	console.log(track.name)
        	console.log(track.artists[0].name)
        	console.log(track.album.name)
        	console.log(track.href)
        }

        
    });
}

function commandMovie() {
	var request = require("request");

	var options = {
		url: "http://www.omdbapi.com/?apikey=40e9cece&"
	}
	request("https://", function(error, response, body) {
		console.log("error: ", error);
		console.log("statusCode: ", response && response.statusCode);
		console.log("body: ", body);
	})
}


//saves the console logs into a txt file

// var fs = require("fs");
// fs.writeFile("/liri-node-app/log.txt", function(err) {
// 	if(err) {
// 		console.log(err);
// 	}
// 	console.log("Logs saved.");
//  });


