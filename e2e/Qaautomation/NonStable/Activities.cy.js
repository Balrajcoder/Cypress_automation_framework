import KamHomePage from "../../../components/pages/KamHomePage"
import KamActivitiesPage from "../../../components/pages/KamActivitiesPage"
import KamCheckinPage from "../../../components/pages/KamCheckinPage"
import shared_component from "../../../components/common/shared_component";
import header_component from "../../../components/common/header_component";


describe("KAM_Activities", function () {
    let data;

    before(function() {
        // Load user data from fixture
        cy.fixture("kamLoginPage").then(function(userdata) {
            data = userdata;

        });
    });

    beforeEach(()=> {

        cy.LoginKAM(data.userActivity01, data.password)

    });

    it('Verify Activities page Header', ()=> {
        let title = "Activities";
        KamHomePage.verifyVisibilityOfActivities();
        KamHomePage.clickActivities();
        header_component.verifyHeaderTitle(title);
    });

    it('Verify Todays Date is shown by default', ()=> {
       KamHomePage.clickActivities();
       KamActivitiesPage.verifyDate();
    });

    it('Verify No Activities text', ()=> {
        let text = "No Activities recorded";
        KamHomePage.clickActivities();
        shared_component.verifyNoDataText(text);
    });

    it('Verify Activities listing', ()=> {
        let msg = "Check-in is recorded.";
        let customerName = "Customer Checkin 01";
        let purpose = "Delivery of fruit, Crates collection";
        let activity = "Manual Check In";
        KamHomePage.clickCheckin();
        KamCheckinPage.enterTheCustomerNameInSearch(customerName)
            .selectTheCustomerInSearchDD(customerName)
            .checkPurposeOfVisitFields()
            .clickRecordEntry()
            .clickConfirm();
        shared_component.verifyToastSuccessMsg(msg);
        KamHomePage.clickActivities();
        KamActivitiesPage.verifyCustomerNameInListing(customerName)
            .verifyPurposeInListing(purpose)
            .verifyActivityInListing(activity);
    });



    
});
