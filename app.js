var express = require("express");
var mongoose = require("mongoose");
var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://shmigi:par0ll@ds115553.mlab.com:15553/node-demo", { useNewUrlParser: true });

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});