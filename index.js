exports = module.exports = function(serve){
	//** api router
	require('./restful')(serve);

	//** apps router
	require('../apps/admin')(serve);
	require('../apps/default')(serve);
	require('../apps/common')(serve);
};
