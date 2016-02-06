var async   = require('async'),
    fs      = require('fs'),
    irc     = require('irc'),
    config  = JSON.parse(fs.readFileSync('config.json')),
    client  = new irc.Client(config.server, config.name, config),
    ircModules = []
;

fs.readdir('./modules/', function (err, files) {
  async.each(files, function (file, cb) {
      var name = file.replace('.','');
      name = require('./modules/' + file);
      ircModules.push(name);
      cb();
    }, function () {
      client.addListener('message', function (from, to, text) {
          async.each(ircModules, function (ircModule, cb) {
             if (text.indexOf(config.bot.prefix + ircModule.trigger) === 0) {
               if (to.indexOf('#') !== -1) {client.say(to, ircModule.run(text));}
               else {client.say(from, ircModule.run(text));}
             }
             cb();
           });
        });
    }
  );
});
