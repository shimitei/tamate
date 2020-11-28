const express = require('express');
const app = express();
const router = express.Router();
const http = require('http').Server(app);
const Dropbox = require('dropbox').Dropbox;

const env = process.env.NODE_ENV || 'development';
if (env == 'development') {
    require('dotenv').config();
}
const dbx = new Dropbox({ accessToken: process.env.DBX_ACCESS_TOKEN });

app.use(express.static('public'));

router.get('/', function (req, res) {
    res.redirect(302, 'sample.html');
});
router.get('/api/ls', function (req, res) {
    dbx.filesListFolder({path: decodeURIComponent(req.query.path)})
        .then(function(response) {
            !response.result.entries || response.result.entries.forEach(function(item){
                item.path_display = encodeURIComponent(item.path_display);
            });
            res.send(response.result);
        })
        .catch(function(error) {
            res.send(error);
        });
});
router.get('/api/link', function (req, res) {
    dbx.sharingCreateSharedLinkWithSettings({path: decodeURIComponent(req.query.path)})
        .then(function(response) {
            res.send(response.result);
        })
        .catch(function(error) {
            if (error.error && error.error.error && error.error.error.shared_link_already_exists) {
                res.send(error.error.error.shared_link_already_exists.metadata);
            } else {
                res.send(error);
            }
        });
});
router.get('/api/dl', function (req, res) {
    dbx.sharingCreateSharedLinkWithSettings({path: decodeURIComponent(req.query.path)})
        .then(function(response) {
            res.redirect(response.result.url.replace('?dl=0', '?dl=1'));
        })
        .catch(function(error) {
            if (error.error && error.error.error && error.error.error.shared_link_already_exists) {
                res.redirect(error.error.error.shared_link_already_exists.metadata.url.replace('?dl=0', '?dl=1'));
            } else {
                res.send(error);
            }
        });
});
router.get('/api/more', function (req, res) {
    dbx.sharingCreateSharedLinkWithSettings({path: decodeURIComponent(req.query.path)})
        .then(function(response) {
            res.redirect(response.result.url); // ?dl=0
        })
        .catch(function(error) {
            if (error.error && error.error.error && error.error.error.shared_link_already_exists) {
                res.redirect(error.error.error.shared_link_already_exists.metadata.url); // ?dl=0
            } else {
                res.send(error);
            }
        });
});
app.use(router);

const port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log('listening on *:', port);
});
