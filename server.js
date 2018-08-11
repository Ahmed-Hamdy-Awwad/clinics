module.exports;
var express = require('express');
var server = express();

server.set('view engine', 'ejs');

server.get('/home', function(req, res){
	res.render('home')
});

server.listen(3000, function(){
	console.log('The web server started on port 3000')
});