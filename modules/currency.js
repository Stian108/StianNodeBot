var request = require('request');

//Curency api http://fixer.io/

var currRates = undefined;

request('http://api.fixer.io/latest', function (err, response, body) {
   if (!err && response.statusCode == 200) {
    currRates = JSON.parse(body);
  }
});

setInterval(function () {
  request('http://api.fixer.io/latest', function (err, response, body) {
    if (!err && response.statusCode == 200) {
      currRates = JSON.parse(body);
    }
  });
}, 12*60*60*1000);

//RegEx checking all supported curencies in the API
var currReg =
 /(-?\d+\.?\d*)\s?(AUD|BGN|BRL|CAD|CHF|CNY|CZK|DKK|GBP|HKD|HRK|HUF|IDR|ILS|INR|JPY|KRW|MXN|MYR|NOK|NZD|PHP|PLN|RON|RUB|SEK|SGD|THB|TRY|USD|ZAR|EUR)[(?:to)\s]*(AUD|BGN|BRL|CAD|CHF|CNY|CZK|DKK|GBP|HKD|HRK|HUF|IDR|ILS|INR|JPY|KRW|MXN|MYR|NOK|NZD|PHP|PLN|RON|RUB|SEK|SGD|THB|TRY|USD|ZAR|EUR)/i;

function curr(value, from, to) {
  //Fix input
  value = parseFloat(value);
  to = to.toUpperCase();
  from = from.toUpperCase();
  //Convert to EUR
  if (from === 'EUR') {
    eur = value;
  } else {
    eur = value / currRates.rates[from];
  }
  //Convert to output
  if (to === 'EUR') {
    return value + ' ' + from + ' to ' + Math.round(eur *100)/100 + ' ' + to;
  } else {
    return value + ' ' + from + ' = ' + Math.round(eur * currRates.rates[to] *100)/100 + ' ' + to;
  }
}

module.exports.trigger = 'money';
module.exports.help    = 'Syntax: money [Value][Currency]to[Currency], updates every 12hrs. Data from fixer.io';

module.exports.run = function (input) {
  currArray = currReg.exec(input);
  if (currRates === undefined) {
    return 'Can not connect to API';
  } else {
    if (currArray !== null) {
      return curr(currArray[1], currArray[2], currArray[3]);
    } else {
      return 'Not valid! ';
    }
  }
};
