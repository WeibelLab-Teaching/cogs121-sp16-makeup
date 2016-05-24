/* Node.js dependencies: look at node_modules */
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const handlebars = require("express-handlebars");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);

require("dotenv").load();

var models = require("./models");
var db = mongoose.connection;

var router = {
  /* TODO: insert your routes here */
};

var parser = {
    body: require("body-parser"),
    cookie: require("cookie-parser")
};

var strategy = {
    /* TODO: initialize your passport strategy here */
};

// Database Connection
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/cogs121');
db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function(callback) {
    console.log("Database connected succesfully.");
});

// session middleware
var session_middleware = session({
    key: "session",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection: db })
});

// Middleware
app.set("port", process.env.PORT || 3000);
app.engine('html', handlebars({ defaultLayout: 'layout', extname: '.html' }));
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.cookie());
app.use(parser.body.urlencoded({ extended: true }));
app.use(parser.body.json());
app.use(require('method-override')());
app.use(session_middleware);

/* TODO: Passport Middleware Here*/

/* TODO: Use a Strategy for Passport here */

/* TODO: Passport serialization here */

// Routes
app.get("/", router.index.view);
/* TODO: routes for authentication here */

app.get("/api/delphi", router.api.delphi);
app.get("/logout", router.authentication.logout);

// Start Server
http.listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});
