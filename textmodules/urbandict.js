var request = require('request'),
    async   = require('async')
;

module.exports.trigger = 'ud';
module.exports.help    = 'Syntax: ud [Term]. Get the urban dictionary definition';

module.exports.run = function (input) {
  term = input.split(' ');
  term.splice(0, 1);
  term = encodeURIComponent(term.join(' '));
  return request('http://api.urbandictionary.com/v0/define?term=' + term, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      return JSON.parse(body).list[0].definition;
    }
  });
};
