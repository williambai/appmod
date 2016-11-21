var program = require('commander');
var config = require('../config');

program
	.command('project <cmd> [name]')
	.description('project list,add,remove,pull,push.')
	.action(function(cmd, name, options){
		console.log('begin: %s project "%s".',cmd.toUpperCase(),name);
		if(cmd == 'add'){
			var projectHandler = new (require('../client/project_handler'))(config);
			projectHandler.add({
				name: name,
			},function(err,result){
				if(err) console.log(err);
				else console.log(result);
				console.log('end: %s project "%s".',cmd.toUpperCase(),name);
			});
		}else if(cmd == 'remove'){
			var projectHandler = new (require('../client/project_handler'))(config);
			projectHandler.remove({
				id: name,
			},function(err,result){
				if(err) console.log(err);
				else console.log(result);
				console.log('end: %s project "%s".',cmd.toUpperCase(),name);
			});			
		}else if(cmd == 'list'){
			var projectHandler = new (require('../client/project_handler'))(config);
			projectHandler.list({},function(err,result){
				if(err) console.log(err);
				else console.log(result);
				console.log('end: %s project "%s".',cmd.toUpperCase(),name);
			});			
		}else if(cmd == 'pull'){
			var projectHandler = new (require('../client/project_handler'))(config);
			projectHandler.pull({
				id: name,
			},function(err,result){
				if(err) console.log(err);
				else console.log(result);
				console.log('end: %s project "%s".',cmd.toUpperCase(),name);
			});			
		}else if(cmd == 'push'){
			var projectHandler = new (require('../client/project_handler'))(config);
			projectHandler.push({
				id: name,
			},function(err,result){
				if(err) console.log(err);
				else console.log(result);
				console.log('end: %s project "%s".',cmd.toUpperCase(),name);
			});			
		}
	}).on('--help', function(){
		console.log('  Examples:');
		console.log();
		console.log('    $ appmod project list');
		console.log('    $ appmod project add "project_name"');
		console.log('    $ appmod project remove "project_id"');
		console.log('    $ appmod project pull "project_id"');
		console.log('    $ appmod project push "project_id"');
		console.log();
	});
