var request = require('./request'),
  endpoint = 'https://auth.api.rackspacecloud.com/v1.1/auth';

module.exports = function (username, apikey, cb) {

  var options = {
    url: endpoint,
    body: JSON.stringify({
      credentials: {
        username: username,
        key: apikey
      }
    })
  };

  request.post(options, function (error, response, body) {
    var parsedBody = JSON.parse(body),
      token = parsedBody.auth.token.id,
      endpoint = parsedBody.auth.serviceCatalog.cloudMonitoring[0].publicURL;
    cb(token, endpoint);
  });
};
