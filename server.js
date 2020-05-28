/*
# API Project: Timestamp Microservice for FCC

### User stories:

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the api returns a JSON having the structure
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
5. If the date string is **invalid** the api returns a JSON having the structure `{"error" : "Invalid Date" }`.

#### Example usage:
* https://curse-arrow.glitch.me/api/timestamp/2015-12-25
* https://curse-arrow.glitch.me/api/timestamp/1451001600000

#### Example output:
* {"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
*/

// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your timestamp API endpoint...
app.get("/api/timestamp/:datestring?", (req, res) => {
  const datestring = req.params.datestring

  let date
  if (!datestring) {
    date = new Date()
  } else if (isNaN(Number(datestring))) {
    date = new Date(datestring)
  } else {
    date = new Date(Number(datestring))
  }

  console.log({datestring, date})

  if (date.toString() === 'Invalid Date') {
    res.json({error: 'Invalid Date'});
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

