'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var serve = express();

var port = (process && process.argv && process.argv[2]) || 3500;

//** api router
require('./restful')(serve);

//** apps router
require('../apps/admin')(serve);
require('../apps/default')(serve);
require('../apps/common')(serve);

serve.listen(port,function(){
	console.log('serve deamon is running on port ' + port);
});
