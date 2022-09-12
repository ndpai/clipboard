const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Employee = require("../models/Employee");
const config = process.env;

chai.should();
chai.use(chaiHttp);

let defaultUser = {
    email: "user@email.com",
    password: "Pass1234"
};

let token;

describe('Employee APIs', () => {
    beforeEach((done) => {
        chai.request(server)
            .post("/user/login")
            .send(defaultUser)
            .end((err, response) => {
                token = response.body.token;
                response.should.have.status(200);
                done();
            });
    });
    describe("Test GET route to get all employees", () => {
        it("Should return a list of all employees", (done) => {
            chai.request(server)
                .get("/employee/get-all")
                .set({'x-access-token': token})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });
    });

    describe("Test GET route to get summary stats (mean, min, max)", () => {
        it("Should return an object consisting the summary stats", (done) => {
            chai.request(server)
                .get("/employee/get-summary-stats")
                .set({'x-access-token': token})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("Test GET route to get summary stats by department (mean, min, max)", () => {
        it("Should return an object consisting the summary stats grouped by department", (done) => {
            chai.request(server)
                .get("/employee/get-summary-stats-dept")
                .set({'x-access-token': token})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });
    });

    describe("Test GET route to get summary stats by department and sub-department combination (mean, min, max)", () => {
        it("Should return an object consisting the summary stats grouped by department and sub-department", (done) => {
            chai.request(server)
                .get("/employee/get-summary-stats-dept-sub")
                .set({'x-access-token': token})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });
    });

    describe("Test DELETE route", () => {
        it("Should return a list of employees after deletion", (done) => {
            let obj = {id: null};
            chai.request(server)
                .delete("/employee/delete")
                .send(obj)
                .set({'x-access-token': token})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        });
    });

    describe("Test POST route", () => {
        it("Should return a list of employees after addition of new record", (done) => {
            let emp = new Employee({
                "name": "Ninaad",
                "salary": 100000,
                "currency": "USD",
                "department": "Engineering",
                "sub_department": "Platform",
                "on_contract": 0
            });
            chai.request(server)
                .post("/employee/add")
                .send(emp)
                .set({'x-access-token': token})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });
    });
});
