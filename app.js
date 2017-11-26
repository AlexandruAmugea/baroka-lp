const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;


app.use("/", express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + "/dist/index.html");
})

app.get('/faq', function(req, res){
    res.sendFile(__dirname + "/dist/faq.html");
})

app.get('/privacy-policy', function(req, res){
    res.sendFile(__dirname + "/dist/privacy-policy.html");
})

app.get('/refund', function(req, res){
    res.sendFile(__dirname + "/dist/refund.html");
})

app.get('/risk-warning', function(req, res){
    res.sendFile(__dirname + "/dist/risk-warning.html");
})

app.get('/terms', function(req, res){
    res.sendFile(__dirname + "/dist/terms.html");
})

app.get('/anti-fraud-policy', function(req, res){
    res.sendFile(__dirname + "/dist/anti-fraud-policy.html");
})

app.listen(port);
