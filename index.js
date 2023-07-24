// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) { 
  const date = req.params.date;
  const dateObj = {};
  console.log(date);
  if (date === undefined) {
    dateObj["unix"] = new Date().getTime();
    res.json(dateObj);
    return;
  }
  if (date === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }

  if (date.includes("-")) {
    dateObj["unix"] = new Date(date).getTime();
    dateObj["utc"] = new Date(date).toUTCString();
    res.json(dateObj);
  } else {
    const dateInt = parseInt(date);
    dateObj["unix"] = new Date(dateInt).getTime();
    dateObj["utc"] = new Date(dateInt).toUTCString();
    res.json(dateObj);
  }

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
  console.log("http://localhost:" + listener.address().port);
});
