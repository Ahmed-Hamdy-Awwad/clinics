var moment = require('moment');
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
	console.log("Visits view connected to mysql.");
  });

module.exports = function(server){
	server.get('/visits', function(req, res){
		con.query("select * from (select bookings.id as bookingID, patients.patientName, services.name as service, employees.empName as doctor from bookings join patients on bookings.patientName = patients.id join services on bookings.service = services.id join employees on bookings.doctor = employees.id) as a join (select id, bookingNum, visitDate, payment from visits) as b on a.bookingID = b.bookingNum where visitDate >= curdate()", function (err, data) {
			if (err) throw err;
			res.render('visits', {data: data, moment: moment});
			console.log('Visits view data retrieved.')
		  });
		//con.end(function(){console.log('Connection ended')});
	});
};