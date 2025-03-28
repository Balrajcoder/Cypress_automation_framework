import { KAM_URL } from "../../../constants/kamUrls";
import KamDelievredPage from "../../../components/pages/KamDeliveredPage";
import KamOrderFlowTestData from "../../../Utility/createTestData/KamOrderFlowTestData";
import SoTestData from "../../../Utility/apiTestData/SoAPITestData";
import KamOrderPage from "../../../components/pages/KamOrderPage";
import BtrHomePage from "../../../components/pages/BtrHomePage";


describe(' Delivered Tab component level changes-2', function() {

  let data;
  var seId;

  before(function() {
    cy.fixture("kamOrderFlow").then(function(userdata) {
      data = userdata;
    });
  });

  beforeEach(function(){
    cy.sessionLogin(data.kam_username, data.kam_password);
    cy.visit(KAM_URL.HOME_PAGE);
    SoTestData.Authentication()
    cy.viewport ('samsung-s10') 
    BtrHomePage
        .validateOrderLandingButton()
        .clickOrderLandingButton();
     })

it("To validate EditGrn after initiate Grn action (Vegrow Logistics)" ,()=>
{ 
    cy.viewport('samsung-note9')
    KamOrderFlowTestData.CreationOfOutsationSaleOrder("VegrowVehicle")
     cy.get('@createdSoID').then((soID) =>{
      KamDelievredPage.clickOrdersCard(soID)
      .validateInitiateGrnCtaLanding()
      .validateInitiateGrnAction(0)
      .CheckCtaInDeliveredState()
      .validateEditGrn(0)
     })
    })

    it("To validate EditGrn after initiate Grn action (Customer Logistics)" ,()=>
    { 
        cy.viewport('samsung-note9')
        KamOrderFlowTestData.CreationOfOutsationSaleOrder("CustomerVehicle")
         cy.get('@createdSoID').then((soID) =>{
          KamDelievredPage.clickOrdersCard(soID)
          .validateInitiateGrnCtaLanding()
          .validateInitiateGrnAction(0)
          .CheckCtaInDeliveredState()
          .validateEditGrn(0)
         })
        })





    it.skip("To validate Raise PDD after initiate Grn action (Vegrow Logistics)" ,()=>
    {
        cy.viewport('samsung-note9')
        KamOrderFlowTestData.CreationOfOutsationSaleOrder("VegrowVehicle")
         cy.get('@createdSoID').then((soID) =>{
          KamDelievredPage.clickOrdersCard(soID)
          .validateInitiateGrnCtaLanding()
          .validateInitiateGrnAction(0)
          .CheckCtaInDeliveredState()
          .performAndValidatePdd(0,10,0)
          cy.origin('http://localhost:9001', () => {  
       cy.on('uncaught:exception', (e) => {  
        if (e.message.includes('FS is not defined')) {  
            return false; 
        }  

          cy.visit(`${Cypress.env('Velynkenv')}/login`);
          KamDelievredPage.performPddAproval(soID)
          cy.visit('/app/landing')
          BtrHomePage
          .validateOrderLandingButton()
          .clickOrderLandingButton()
          KamOrderPage.clickDeliveredTab()
         KamDelievredPage.clickOrdersCard(soID)
         .validatePddCtaAfterApproval()
        }) 
      })  
    })
}) 

it.skip("To validate Raise PDD after initiate Grn action (Customer Logistics)" ,()=>
{
    cy.viewport('samsung-note9')
    KamOrderFlowTestData.CreationOfOutsationSaleOrder("CustomerVehicle")
     cy.get('@createdSoID').then((soID) =>{
      KamDelievredPage.clickOrdersCard(soID)
      .validateInitiateGrnCtaLanding()
      .validateInitiateGrnAction(0)
      .CheckCtaInDeliveredState()
      .performAndValidatePdd(0,10,0)
      cy.visit(`${Cypress.env('Velynkenv')}/login`);
      KamDelievredPage.performPddAproval(soID)
      cy.visit('/app/landing')
      BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton()
      KamOrderPage.clickDeliveredTab()
     KamDelievredPage.clickOrdersCard(soID)
     .validatePddCtaAfterApproval()
    })   
})




})
