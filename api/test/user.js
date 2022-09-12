const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

let defaultUser = {
    email: "user@email.com",
    password: "Pass1234"
};

describe("User APIs", () => {
    describe("User Login POST route", () => {
        it("Should return an object with JWT", (done) => {
            chai.request(server)
                .post("/user/login")
                .send(defaultUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                });
        });
    });
});
