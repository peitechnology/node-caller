// [START app]

"use strict";

require("babel-polyfill"); // Required for babel async/await
const compression = require("compression");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override"); // simulate DELETE and PUT (express4)

app.set("view engine", "ejs");
app.set("view cache", true);

app.set("trust proxy", true);

app.use(compression());
app.use(express.static(__dirname + "/images"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.json({type: "application/vnd.api+json"})); // parse application/vnd.api+json as json
app.use(bodyParser.text()); // support raw text
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.use(methodOverride());

require("./routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("App listening on port " + PORT);
  console.log("Press Ctrl+C to quit.");
});

// [END app]
