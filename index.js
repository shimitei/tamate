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

//app.use(express.static('public'));

router.get('/', function (req, res) {
    res.send('Hello world');
});
router.get('/api/ls', function (req, res) {
    dbx.filesListFolder({path: req.param('path')})
        .then(function(response) {
            res.send(response);
        })
        .catch(function(error) {
            res.send(error);
        });
});
router.get('/api/link', function (req, res) {
    dbx.sharingCreateSharedLink({path: req.param('path')})
        .then(function(response) {
            res.send(response);
        })
        .catch(function(error) {
            res.send(error);
        });
});
router.get('/api/dl', function (req, res) {
    dbx.sharingCreateSharedLink({path: req.param('path')})
        .then(function(response) {
            res.redirect(url=response.url.replace('?dl=0', '?dl=1'));
        })
        .catch(function(error) {
            res.send(error);
        });
});
app.use(router);

var port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log('listening on *:', port);
});