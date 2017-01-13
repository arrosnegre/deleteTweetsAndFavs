# deleteTweetsAndFavs
Script to delete tweets and favs

To run it, just need Nodejs installed, and run 'npm start', and npm will install the node_modules, and then will run te script.

in the terminal:
```
npm start
```
All the tweets are stored only in the debug file .log

This script is a beta, when Twitter detects X number of gets and posts, blocks the api and you'll need to wait 15 minutes.

You'll need to have the tokens in the twitterConfig.js file


## Configuration
create a file in the folder containing the tokens in this format:
filename: "twitterConfig.js"

```javascript
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
module.exports = client;

```

    Arròs Negre - 2017/01/13
