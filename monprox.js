var request = require('./lib/request'),
    http = require('http'),
    fs = require('fs'),
    auth = require('./lib/auth'),
    config;

config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

function startServer(port, address, token, endpoint) {

  http.createServer(function (req, res) {

    request({
      url: endpoint + req.url,
      method: req.method,
      headers: {
        'X-Auth-Token': token
      }
    },
    function (err, resp, body) {
      var headers = resp.headers;
      headers['Access-Control-Allow-Origin'] = '*';
      res.writeHead(resp.statusCode, resp.headers);
      res.end(body);
    });

  }).listen(port, address);
  console.log('Server running at ' + address + ':' + port);
}

auth(config.username, config.apikey, function (token, endpoint) {
  startServer(config.port, config.address, token, endpoint);
  console.log('token: ' + token);
  console.log('endpoint: ' + endpoint);
});
