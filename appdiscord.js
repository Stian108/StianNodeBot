var async   = require('async'),
    fs      = require('fs'),
    discord     = require('discord.js'),
    //discordconfig.json contains the config.server, config.email, config.pass and config.prefix property
    config  = JSON.parse(fs.readFileSync('discordconfig.json')),
    client  = new discord.Client(),
    discordModules = []
;

client.login(config.email, config.pass);

fs.readdir('./modules/', function (err, files) {
  //Checks ./modules for modules
  async.each(files, function (file, cb) {
    //Requires each module under the name modulejs and pushes it to discordModules
    var name = file.replace('.','');
    name = require('./modules/' + file);
    discordModules.push(name);
    cb();
  }, function () {
    client.on('message', function (msg) {
      async.each(discordModules, function (discordModule, cb) {
        if (msg.content.indexOf(config.prefix + discordModule.trigger) === 0) {
          client.reply(msg, discordModule.run(msg));
        }
        cb();
      });
    });
  });
});
