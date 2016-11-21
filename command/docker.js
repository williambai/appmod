var program = require('commander');
var config = require('../config');

program
	.command('docker <cmd> [name]')
	.description('docker add,remove,list,start,stop.')
	.action(function(cmd, name, options){
		console.log('begin: %s docker "%s".',cmd.toUpperCase(),name ? name: '');
		if(cmd == 'add'){
			var dockerHandler = new (require('../client/docker_handler'))(config);
			dockerHandler.add({
				name: name,
			},function(err,result){
				if(err) console.log(err);
				else console.log(result);
				console.log('end: %s docker "%s".',cmd.toUpperCase(),name);
			});
		}else if(cmd == 'remove'){
			var dockerHandler = new (require('../client/docker_handler'))(config);
			dockerHandler.remove({
				id: name,
			},function(err,result){
				if(err) console.log(err);
				else console.log(result);
				console.log('end: %s docker "%s".',cmd.toUpperCase(),name);
			});			
		}else if(cmd == 'list'){
			var dockerHandler = new (require('../client/docker_handler'))(config);
			dockerHandler.list({},function(err,result){
				if(err) console.log(err);
				else console.log(result);
				console.log('end: %s docker "%s".',cmd.toUpperCase(),name ? name: '');
			});			
		}else if(cmd == 'start'){
			var dockerHandler = new (require('../client/docker_handler'))(config);
			dockerHandler.start({
				id: name,
			},function(err,result){
				if(err) console.log(err);
				else console.log(result);
				console.log('end: %s docker "%s".',cmd.toUpperCase(),name);
			});			
		}else if(cmd == 'stop'){
			var dockerHandler = new (require('../client/docker_handler'))(config);
			dockerHandler.stop({
				id: name,
			},function(err,result){
				if(err) console.log(err);
				else console.log(result);
				console.log('end: %s docker "%s".',cmd.toUpperCase(),name);
			});			
		}
	}).on('--help', function(){
		console.log('  Examples:');
		console.log();
		console.log('    $ appmod docker list');
		console.log('    $ appmod docker add "container_name"');
		console.log('    $ appmod docker remove "container_id"');
		console.log('    $ appmod docker start "container_id"');
		console.log('    $ appmod docker stop "container_id"');
		console.log();
	});
