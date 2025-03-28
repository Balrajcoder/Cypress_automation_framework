import apiCommands from "../../support/apiCommands"

class LoginTestData
{
    Authentication() {

        cy.fixture("apiFixtures/authentication.json").then((auth) => {
            this.authData = auth

            cy.ApiRequest("POST", this.authData.url, this.authData.body, this.authData.headers, "")

                .then((resp) => {
                    expect(resp.status).to.equal(201);
                    this.Auth = resp.headers['authorization'];
                    cy.log("succesfull");
                    cy.log(this.Auth);

                })


        })
    }

    Login()
    {
        cy.fixture("apiFixtures/spLogin").then((login) => {
            this.loginData = login
         
            cy.ApiRequest("POST",this.loginData.url,this.loginData.body,this.loginData.headers,"")

            .then((resp) => {
                expect(resp.status).to.equal(201);
            })
                


    })
}

}
module.exports = new LoginTestData();