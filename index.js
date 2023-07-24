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
  let date = req.params.date;
  let dateFormat = new Date(date);
  const dateObj = {};
  console.log(dateFormat);
  if (date === undefined) {
    dateObj["unix"] = dateFormat.getTime();
    res.json(dateObj);
    return;
  }
  if (dateFormat === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }
  if (date === undefined) {
    dateObj["unix"] = dateFormat.getTime();
    res.json(dateObj);
    return;
  }

  if (date.includes("-")) {
    dateObj["unix"] = dateFormat.getTime();
    dateObj["utc"] = dateFormat.toUTCString();
  } else {
    dateFormat = parseInt(date);
    dateObj["unix"] = new Date(dateFormat).getTime();
    dateObj["utc"] = new Date(dateFormat).toUTCString();
  }

  if(!dateObj["unix"] || !dateObj["utc"]){
    res.json({ error: "Invalid Date" });
    return;
  }
  res.json(dateObj);



});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
  console.log("http://localhost:" + listener.address().port);
});
