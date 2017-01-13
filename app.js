/*
Hi, this is a script to delete the tweets, retweets and likes.

To run it, just need Nodejs installed, and run 'npm start', and npm will install the node_modules, and then will run te script.

All te tweets are stored only in the debug file .log

This script is a beta, when Twitter detects X number of gets and posts, blocks the api and you'll need to wait 15 minutes.

You'll need to have the tokens in the twitterConfig.js file
twitterConfig.js file content:
        var Twitter = require('twitter');
        var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
        });
        module.exports = client;

    Arròs Negre - 2017/01/13
*/

var colors = require('colors/safe');

console.log(colors.green("Hi, this is a script to delete the tweets, retweets and likes."));
console.log(colors.cyan('All te tweets are stored only in the /debug_app_deleteTweets_' + Date() + '.log file'));
console.log(colors.magenta("This script is a beta, when Twitter detects X number of gets and posts, blocks the api and you'll need to wait 15 minutes."));
console.log(colors.grey("You'll need to put the tokens in the twitterConfig.js file"));
console.log("");
console.log(colors.yellow("Arròs Negre - 2017/01/13"));
console.log("");

var Twitter = require('twitter');
var twitterClient = require('./twitterConfig');


// make all the console.log save in the debug file .log
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug_app_deleteTweets_' + Date() + '.log', {
    flags: 'w'
});
var log_stdout = process.stdout;
console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};
// end of make all the console.log save in the debug file .log



function deletingFunction() {
    //DELETE TWEET and RT
    var intervalCounter_tw = 0;
    var deletedCounter_tw = 0;
    var statusesInterval = setInterval(function() {
        console.log("-----------");
        console.log("[intervalCounter_tw]: " + intervalCounter_tw);
        console.log("-----------");
        intervalCounter_tw++;
        twitterClient.get('statuses/user_timeline', {
            count: 200
        }, function(error, tweets, response) {
            if (error) {
                console.log(colors.red("[ERROR getting]:"));
                console.log(colors.red(error));
            }
            //console.log(tweets);  // The tweet.
            //console.log(response);  // Raw response object.
            //console.log("deleting");
            for (var i = 0; i < tweets.length; i++) {
                console.log("deleteing tweet date: " + tweets[i].created_at);
                //console.log("deleting: " + tweets[i].text);
                twitterClient.post('statuses/destroy/' + tweets[i].id_str, function(error, deleteds, response) {
                    if (error) {
                        console.log(colors.red("[ERROR]:"));
                        console.log(colors.red(error));
                    }
                    console.log(colors.green("DELETED: " + deleteds.text));
                    deletedCounter_tw++;
                    console.log("[actual date]: " + Date());
                    console.log("[DELETED COUNTER]: " + deletedCounter_tw);
                });
            }

        });
    }, 3000);

    // UNFAV
    var intervalCounter_fav = 0;
    var deletedCounter_fav = 0;
    var favsInterval = setInterval(function() {
        console.log("-----------");
        console.log("[intervalCounter_fav]: " + intervalCounter_fav);
        console.log("-----------");
        intervalCounter_fav++;
        twitterClient.get('favorites/list', {
            count: 200
        }, function(error, tweets, response) {
            if (error) {
                console.log(colors.red("[ERROR getting]:"));
                console.log(colors.red(error));
            }
            for (var i = 0; i < tweets.length; i++) {
                console.log("unfaving tweet date: " + tweets[i].created_at);
                //console.log("unfaving: " + tweets[i].text);

                twitterClient.post('favorites/destroy', {
                    id: tweets[i].id_str
                }, function(error, deleteds, response) {
                    if (error) {
                        console.log(colors.red("[ERROR posting]:"));
                        console.log(colors.red(error));
                        //throw error;
                    }
                    console.log(colors.cyan("UNFAV: " + deleteds.text));
                    deletedCounter_fav++;
                    console.log("[actual date]: " + Date());
                    console.log("[UNFAV COUNTER]: " + deletedCounter_fav);
                });
            }

        });
    }, 3000);
}


deletingFunction();
console.log("----- script running -----");
