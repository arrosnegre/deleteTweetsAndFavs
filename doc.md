# Documentation
para correr el script se necesita tener instalado
To run the script, needs Nodejs and npm installed:
```
Nodejs and npm https://nodejs.org/en/download/
```

Then, go to twitter apps, to create a 'new app'
```
twitter apps: https://apps.twitter.com/
```
We need a 'twitter app', to get 'Keys' and 'Tokens'.
Go to the tab 'Keys and Access Tokens', and there generate Consumer Key and Secret.
The Keys and Tokens generated, need to go in the twitterConfig.js file:
```js
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'here the consumer key',
  consumer_secret: 'here the consumer secret',
  access_token_key: 'here the access token key',
  access_token_secret: 'here the access token secret'
});
module.exports = client;
```


And then, just go to the folder of this repository, open a new terminal window, and type:
```
npm start
```
This will download the libraries ('node modules') to the folder 'node_modules', and after, will start the script.

### Be carefully, the script will delete all your tweets, retweets and likes.


- doc.md last update: Fri Jan 13 2017 09:08:38 GMT+0100 (CET)
