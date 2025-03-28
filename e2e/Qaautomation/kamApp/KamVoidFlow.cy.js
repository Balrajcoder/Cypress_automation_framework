import BtrHomePage from "../../../components/pages/BtrHomePage";
import KamOrderPage from "../../../components/pages/KamOrderPage";
import SoTestData from "../../../Utility/apiTestData/SoAPITestData";
import KamOrderFlowTestData from "../../../Utility/createTestData/KamOrderFlowTestData"




describe('Void Tab component level changes testcases', function() {
    let data;
    before(function () {
        cy.fixture("kamOrderFlow").then(function (userdata) {
          data = userdata;
          cy.LoginKAM(data.kam_username, data.kam_password);
        });
      });
    

    it('To Validate Void Tab component level is present inside orders page', () => {
    cy.visit(`${Cypress.env('B2Renv')}`)
    BtrHomePage.clickOrderCard();
    KamOrderPage.validateVoidedTab();
    })

    it('To Validate Voided tab is clickable and lands on voided page  ', () => {
    cy.LoginKAM(data.kam_username, data.kam_password);
    BtrHomePage.clickOrderCard();
    KamOrderPage.validateVoidedTab()
    .clickVoidedTab()
    .validateOrderTitle()
    })

    it('To Validate Created Sale Enquiry rejection/Void' ,()=>
    {
    SoTestData.Authentication();
    SoTestData.SECreationFromApi();
    cy.get('@createdSeId').then((SaleEnquiryId) => 
    {
    cy.LoginVelynk(data.mandimanager_username, data.kam_password, data.title1)
    KamOrderFlowTestData.PerformSaleEnquiryRejection(SaleEnquiryId)
    .ValidateRejectedSaleEnquiryInVoidStatus(SaleEnquiryId)
    cy.visit(`${Cypress.env('B2Renv')}`)
    BtrHomePage.clickOrderCard()
    KamOrderFlowTestData.ValidateRejectedSaleEnquiryInVoidTabInKamApp(SaleEnquiryId)
     })
     })    

   

    










})