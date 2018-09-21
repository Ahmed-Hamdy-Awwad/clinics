var bodyparser = require('body-parser');
var urlencoderParser = bodyparser.urlencoded({extended: false});
var db = require('mysql');

var con = db.createConnection({
	host: "localhost",
	user: "root",
	password: "123456",
	database: "clinics",
	port: 3306
  });

  con.connect(function(err) {
	if (err) throw err;
	console.log("Patients' view connected to mysql.");
  });

  module.exports = function(server){
	server.get('/patients', function(req, res){
		con.query("select patientName, age, sex, address, mobileNum from patients", function (err, data) {
			if (err) throw err;
			res.render('patients', {data: data});
			console.log('Patients\' data retrieved.')
			});
		//con.end(function(){console.log('Connection ended')});
	});

	server.post('/patients', urlencoderParser, function(req, res){
		data = req.body;
		con.query('INSERT INTO patients SET ?', data, function (error, results) {
			if (error) throw error;
			console.log(results);
		  });
		  con.query("select patientName, age, sex, address, mobileNum from patients", function (err, data) {
			if (err) throw err;
			res.render('patients', {data: data});
			console.log('Patients\' data retrieved.')
			});
	});
};