var express = require('express');

var app = express();

port = (process && process.argv && process.argv.port) || 3500;
//** RESTful
var project = require('./restful/project');
var docker = require('./restful/docker');
//** initialize RESTful
project.init();
docker.init();

//** router
app.get('/projects', project.get);
app.post('/projects', project.post);
app.put('/projects/:id', project.put);
app.delete('/projects/:id', project.delete);

app.get('/dockers',docker.get);
app.post('/dockers',docker.post);
app.put('/dockers/:id', docker.put);
app.delete('/dockers/:id', docker.delete);

app.listen(port,function(){
	console.log('serve deamon is running on port ' + port);
});
