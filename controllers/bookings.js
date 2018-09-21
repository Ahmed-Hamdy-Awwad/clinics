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
	console.log("Bookings' view connected to mysql.");
  });

module.exports = function(server){
server.get('/bookings', function(req, res){
	query1 = "SELECT bookings.id, bookings.bookingDate, patients.patientName, services.name as serviceName, employees.empName, services.cost, notes, discount, installments FROM bookings join patients on bookings.patientName = patients.id join services on bookings.service = services.id join employees on bookings.doctor = employees.id;"
	query2 = "select * from patients;"
	con.query(query1, function (err, data) {
		if (err) throw err;
		res.render('bookings', {data: data});
		console.log('bookings\' data retrieved.')
		});
});

server.post('/bookings', urlencoderParser, function(req, res){
	data = req.body;
	con.query('INSERT INTO bookings SET ?', data, function (error) {
		if (error) throw error;
		console.log('booking\'s data created');
		});
		con.query("select * from bookings", function (err, data) {
		if (err) throw err;
		res.render('bookings', {data: data});
		console.log('bookings\' data retrieved.')
		});
});
};