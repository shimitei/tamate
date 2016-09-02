var express = require('express');
var app = express();
var router = express.Router();
var http = require('http').Server(app);
var Dropbox = require('dropbox');

var env = process.env.NODE_ENV || 'development';
if (env == 'development') {
    require('dotenv').config();
}
var dbx = new Dropbox({ accessToken: process.env.DBX_ACCESS_TOKEN });
dbx.filesListFolder({path: ''})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

//app.use(express.static('public'));

router.get('/', function (req, res) {
    res.send('Hello world');
});
app.use(router);

var port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log('listening on *:', port);
});