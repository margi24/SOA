const express = require('express');
const userRoute = require('./routes/api-gateway')

const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.urlencoded());
app.use(express.json());
app.use('/',userRoute)

const port = process.env.PORT || 8094;


var server = app.listen(port,"0.0.0.0", () => {
    console.log(`Server listening to port ${port}`);
});

app.get('/foo', function (req, res) {
  res.send("Hi000");
})