import { ENDPOINTS } from "../../constants/endpoints";

class CheckInAPITestData {

    CheckInCreateAPI()
    {
        cy.fixture("apiFixtures/checkIn.json").then((checkIn) => {
            this.checkInData = checkIn
     
        this.checkInData .body.checkin.due_date_time= new Date().toISOString()
        cy.log(this.checkInData.body.checkin.due_date_time) 
        cy.ApiRequest("POST",ENDPOINTS.CREATE_CHECK_IN,this.checkInData.body,this.checkInData.headers,"")

        .then((resp) => {
            expect(resp.status).to.equal(200);
            cy.log(resp.body)
        })
})
    }
}
module.exports = new CheckInAPITestData();