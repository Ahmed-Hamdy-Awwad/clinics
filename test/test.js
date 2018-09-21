var request = require('supertest');
var app = require('../server');

describe("patients", function() {
	it("testing post", function() {
		request(app).post("/patients")
			.expect("Good")
	})
})