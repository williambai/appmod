var program = require('commander');

program
	.command('device <cmd>')
	.description('device add,remove,find,update.')
	.option('-p,--project <project_name>', 'project name')
	.option('-n, --name <device_name>','device name')
	.action(function(cmd,options){
		console.log('%s device "%s" in project "%s".',cmd.toUpperCase(),options.name, options.project);
	}).on('--help', function(){
		console.log('  Examples:');
		console.log();
		console.log('    $ appmod device add -n "device_name" -p "project_name"');
		console.log('    $ appmod device remove -n "device_name" -p "project_name"');
		console.log();
	});
