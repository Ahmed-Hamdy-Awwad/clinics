var bodyparser = require('body-parser');
var urlencoderParser = bodyparser.urlencoded({extended: false});
var db = require('mysql');

var con = db.createConnection({
	host: "localhost",
	user: "root",
	password: "123456",
	database: "clinics",
	port: 3306,
  });

  con.connect(function(err) {
	if (err) throw err;
	console.log("Transactions Creation' view connected to mysql.");
  });

module.exports = function(server){

	server.get('/createTrx', function(req, res){
		data = req.query;
		con.query('INSERT INTO transactions SET ?', data, function (error) {
			if (error) throw error;
			console.log('Visit\'s invoice created');
			});
		res.redirect('home');
		});
};