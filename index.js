// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// ...existing code...

app.get("/api/:date?", function(req, res) {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
  } else if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    // If format is dd-mm-yyyy
    let [day, month, year] = dateString.split('-');
    date = new Date(`${year}-${month}-${day}`);
  } else if (!isNaN(dateString)) {
    // If it's a unix timestamp
    date = new Date(parseInt(dateString));
  } else {
    // Try to parse as ISO or other date string
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
