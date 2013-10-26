var application_root = __dirname,
    express = require("express"),
    mongoose = require('mongoose'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    config = { 'secrets':
      {
        'clientId': 'LDBNDR0RMFMATKC20N3QYHZRJBZO5NWFBXB20QZTF5QWJTWF',
        'clientSecret': '0WB3W4CMLLV20WV2GMDGJB1ZH21CX2VOTKW50Z11J3MQLUXG',
        'redirectUrl': 'http://localhost:5000'
      }
    },
    foursquare = require("node-foursquare")(config);

var app = express();

// Configure server
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

// MongoDB
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/crunchbase';

mongoose.connect(mongoUri, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
  } else {
    console.log ('Succeeded connection to: ' + mongoUri);
  }
});

var options = {
  key: fs.readFileSync('keys/key.pem'),
  cert: fs.readFileSync('keys/cert.pem')
};

// Setup routes
require("./routes")(app, foursquare);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});