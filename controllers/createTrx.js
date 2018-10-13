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

	server.get('/createTrx', urlencoderParser, function(req, res){
		data = req.query;
		con.query('INSERT INTO transactions SET ?', data, function (error) {
			if (error) throw error;
			console.log('Visit\'s invoice created');
			});
		con.query("select * from (select bookings.id as bookingID, patients.patientName, patients.age, services.name as service, employees.empName as doctor from bookings join patients on bookings.patientName = patients.id join services on bookings.service = services.id join employees on bookings.doctor = employees.id) as a join (select bookingNum, payment, visits.id as visitID, transactions.id, transactions.trxDate from visits join transactions on visits.id = transactions.visit) as b on a.bookingID = b.bookingNum where b.visitID = ?", data.visit, function (err, data) {
			if (err) throw err;
			console.log(data)
			res.render('invoice', {data: data});
			});
		// res.render('invoice')
		});
};