var home = require('./controllers/home');
var express = require('express');
var server = express();

server.set('view engine', 'ejs');
server.use(express.static(__dirname + '/statics'));
server.listen(3000, function(){
	console.log('The web server started on port 3000')
});

home(server);


  
