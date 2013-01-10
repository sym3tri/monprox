// wrap request.js with some defaults

module.exports = require('request').defaults({
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
