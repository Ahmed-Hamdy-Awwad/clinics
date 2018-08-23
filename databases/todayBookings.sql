select * from (select bookings.id as bookingID, patients.patientName, services.name as service, employees.empName as doctor from bookings
join patients on bookings.patientName = patients.id
join services on bookings.service = services.id
join employees on bookings.doctor = employees.id) as a
join (select bookingNum, visitDate, payment from visits) as b
on a.bookingID = b.bookingNum
