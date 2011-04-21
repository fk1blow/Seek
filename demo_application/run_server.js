var Connect = require('connect');
var Seek = require('Seek').Initializer;

var SeekApplication = new Seek();

Connect.createServer(function(req, res) {
	ActiveServer.deliverRequest(req, res);
}).listen(3000);
