import KamHomePage from "../../../components/pages/KamHomePage"
import KamCheckinPage from "../../../components/pages/KamCheckinPage"
import CheckInAPITestData from "../../../Utility/apiTestData/CheckInAPITestData"
import CheckInTestData from "../../../Utility/createTestData/CheckInTestData";


describe('Checkin flow', function() {

    let data;

    before(function() {
        // Load user data from fixture
        cy.fixture("kamLoginPage").then(function(userdata) {
          data = userdata;
          
        });
      });
    
    beforeEach(()=> {

          cy.LoginKAM(data.userCheckin01, data.password)

    });

    it('Verify Checkin page Visibility and Landing Page', ()=> { //done
        KamHomePage.verifyVisiblityOfCheckin();
        KamHomePage.clickCheckin();
        KamCheckinPage.verifyCeckInheaderTitle(data.CheckInTitle)
        .verifySectionVisibility()
        .verifyNewCheckInButtonVisibility();
        
     });


    it.skip('Verify Successfull Checkin', ()=> {
       
        KamHomePage.clickCheckin()
        CheckInTestData.CreateCheckInForNewLocation(data.CheckInCustomer)
        CheckInTestData.CreateCheckInAfterEditingLocation(data.CheckInCustomer)
        
    });

   it.skip('Verify Successfull Checkin for  Customer from Credit head', ()=> {
        CheckInAPITestData.CheckInCreateAPI()
        KamHomePage.clickCheckin()
        KamCheckinPage.verifyPresenceOfCheckInKamApp()


        
    });

});
