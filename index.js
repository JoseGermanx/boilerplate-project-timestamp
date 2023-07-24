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

let dateObj = {}

app.get('/api/:dateInput?', (req, res) => {
  let dateInput = req.params.dateInput;
  let dateGet = new Date(dateInput);
  
  if(dateInput.includes('-')){
    /* Date String */
    dateObj['unix'] = new Date(dateInput).getTime()
    dateObj['utc'] = new Date(dateInput).toUTCString()
  }else{
    /* Timestamp */
    dateInput = parseInt(dateInput)
    
    dateObj['unix'] = new Date(dateInput).getTime()
    dateObj['utc'] = new Date(dateInput).toUTCString()
  }
  
  if(!dateObj['unix'] || !dateObj['utc']){
    res.json({error: 'Invalid Date'})
  }
  
  
  res.json(dateObj)
})

app.get('/api/', (req, res) => {
  dateObj['unix'] = new Date().getTime()
  dateObj['utc'] = new Date().toUTCString()
  
  res.json(dateObj)
})

// listen for reqs :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
  console.log("http://localhost:" + listener.address().port);
});
