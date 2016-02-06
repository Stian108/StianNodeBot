var irc       = require('irc'),
    client    = new irc.Client(
                'irc.heylisten.net',
                'StianBot',
                {channels: ['#bots']}
                ),
    temp      = require('./modules/temp.js'),
    len       = require('./modules/length.js'),
    currency  = require('./modules/currency.js');

client.addListener('message', function (from, to, text, message) {
  var response = '';
  //Temperature
  if (text.indexOf('!temp') === 0) {
    response += temp(text);
  }
  //Length
  if (text.indexOf('!len') === 0) {
    response += len(text);
  }
  //Currency exchange
  if (text.indexOf('!money') === 0) {
    response += currency(text);
  }


  //Help command
  if (text.indexOf('!help') === 0) {
    response +=
    'You can do !len to convert imperial units to the one true metric, or !temp to convert to the holy Celsius. I can cleanse this world of miles, feet, inches, yards and Fahrenheit. ';
  }

  //Useless - for fun commands
  if (text.indexOf('!boyf') === 0) {
    response += 'I can be your boyfriend, ' + from + '! Your robotic lover, at your service ;)';
  }
  if (text.test('qctm?')) {
    response += ' Is someone using that obscure qctm? Do not worry, it means "Quietly Chuckling To Myself"';
  }

  //Respond
  if (to.test('#')) {
    client.say(to, response);
  } else {
    client.say(from, response);
  }

});
