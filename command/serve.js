var program = require('commander');
var config = require('../config');
var path = require('path');
var pm2 = require('pm2');

var SERVE_EXEC_FILE = path.join(__dirname,'../serve/index.js');

program
	.command('start')
	.option('-p --port <port>', 'port number')
	.action(function(options){
		var port = options.port || config.port;
		pm2.start(SERVE_EXEC_FILE,options,function(err){
			if(err) {
				console.log(err);
			}else{
				console.log('serve deamon is running at port ' + port);
			}
			pm2.disconnect();
		});
	});

program
	.command('stop')
	.action(function(options){
		pm2.delete(0,function(err){
			if(err){
				console.log(err);
			}else{
				console.log('serve deamon is stopped.');
			}
			pm2.disconnect();
		});
	});