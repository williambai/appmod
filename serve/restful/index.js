//** RESTful
var project = require('./project');
var docker = require('./docker');

exports = module.exports = function(api){
//** initialize RESTful
project.init();
docker.init();

api.get('/projects', project.get);
api.post('/projects', project.post);
api.put('/projects/:id', project.put);
api.delete('/projects/:id', project.delete);

api.get('/dockers',docker.get);
api.post('/dockers',docker.post);
api.put('/dockers/:id', docker.put);
api.delete('/dockers/:id', docker.delete);

};