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
	console.log("Visits' view connected to mysql.");
  });

module.exports = function(server){

	// query1 = ""

	server.get('/createVisit', function(req, res){
		id = req.query;
		console.log(id);
		res.render('createVisit', {"data": id});
		});

	server.post('/createVisit', urlencoderParser, function(req, res){
		data = req.body;
		// console.log(data);
		con.query('INSERT INTO visits SET ?', data, function (error) {
			if (error) throw error;
			console.log('Visit\'s data created');
			});
		res.redirect('bookings');
		console.log('bookings\' data retrieved.')
	});
};