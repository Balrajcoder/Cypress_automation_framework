import KamOrderPage from "../../../components/pages/KamOrderPage";
import BtrHomePage from "../../../components/pages/BtrHomePage";
import SoTestData from "../../../Utility/apiTestData/SoAPITestData";
import { KAM_URL } from "../../../constants/kamUrls";
import KamDelievredPage from "../../../components/pages/KamDeliveredPage";
import KamOrderFlowTestData from "../../../Utility/createTestData/KamOrderFlowTestData"


describe(' Delivered Tab component level changes', function() {

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
     
      
       
});

  it("To validate Delivered tab is present inside Orders page",()=>{
      
      KamOrderPage
        .validateDeliveredTab();
  })

  it("To validate Delivered tab label",()=>{
    KamOrderPage
      .validateDeliveredTab()
      .validateDeliveredLabel();
})

it("To validate Delivered tab icon",()=>{
    KamOrderPage
    .validateDeliveredTab()
    .validateDeliveredIcon();
 })

 it("To validate Delivered tab is clickable and lands on the targeted page",()=>{
   KamOrderPage
     .validateDeliveredTab()
     .clickDeliveredTab();
     KamDelievredPage
     .validateDeliveredOrderPage();
  })

it("To check whether after record arrival, Sale order state is Delivered (Vegrow Logistics)",()=>{
    KamOrderFlowTestData.CreationOfOutsationSaleOrder("VegrowVehicle")
    cy.get('@createdSoID').then((soID) =>{
      KamDelievredPage
      .validateDeliveredOrderId(soID);
      });
    
     })
   

it("To check whether after record arrival, Sale order state is Delivered (Customer Logistics)",()=>
{
KamOrderFlowTestData.CreationOfOutsationSaleOrder("CustomerVehicle")
cy.get('@createdSoID').then((soID) =>{
  KamDelievredPage
  .validateDeliveredOrderId(soID);
  });
 })

 it("To check whether an order in the Delivered tab as the correct status (Vegrow Logistics) ",()=>
 {
 KamOrderFlowTestData.CreationOfOutsationSaleOrder("VegrowVehicle")
 cy.get('@createdSoID').then((soID) =>{
   KamDelievredPage
   .validateDeliveredOrderId(soID)
   .enterCustomerSearch(data.customer)
          .enterCustomerSearch(data.customer)
          .validateCustomerName(soID);
   });
 
 
 })

it("To check whether an order in the Delivered tab as the correct status (Customer Logistics) ",()=>
{
KamOrderFlowTestData.CreationOfOutsationSaleOrder("CustomerVehicle")
cy.get('@createdSoID').then((soID) =>{
  KamDelievredPage
  .validateDeliveredOrderId(soID)
  .enterCustomerSearch(data.customer)
         .enterCustomerSearch(data.customer)
         .validateCustomerName(soID);
  });


})

it("To check searching a customer in Delivered tab is working and giving correct results",()=>{
  KamOrderFlowTestData.CreationOfOutsationSaleOrder("CustomerVehicle")
  cy.get('@createdSoID').then((soID) =>{
    KamDelievredPage
    .validateDeliveredOrderId(soID)
    .enterCustomerSearch(data.customer)
    .validateCustomerName(soID)
    .validateSoDeliveredState(soID)
          
    });
})

it("To validate that the notification button in Delivered Tab is clicking and working",()=>{
  KamOrderPage
    .validateDeliveredLabel()
    .validateDeliveredTab()
    .clickDeliveredTab();

    KamDelievredPage
    .validateNotificationIcon()
    .clickNotificationIcon()
    .validateNotificationPage(); 
 }) 

 it("To check whether after record arrival the vehicle, The Initiate GRN CTA is present (Vegrow Logistics)",()=>{
  KamOrderFlowTestData.CreationOfOutsationSaleOrder("VegrowVehicle")
    cy.get('@createdSoID').then((soID) =>{
      KamDelievredPage
      .validateDeliveredOrderId(soID)
      .enterCustomerSearch(data.customer)
     .validateCustomerName(soID)
     .clickOrdersCard(soID)
     .validateInitiateGrnCta()
      });  
})

it("To check whether after record arrival the vehicle, The Initiate GRN CTA is present (Customer Logistics) ",()=>{
  KamOrderFlowTestData.CreationOfOutsationSaleOrder("CustomerVehicle")
    cy.get('@createdSoID').then((soID) =>{
      KamDelievredPage
      .validateDeliveredOrderId(soID)
      .enterCustomerSearch(data.customer)
     .validateCustomerName(soID)
     .clickOrdersCard(soID)
     .validateInitiateGrnCta()
      });  
})

it("To validate initiate Grn Cta click lands on initiate Grn page and can perform initiate Grn action (Vegrow Logistics)",()=>{
  cy.viewport('samsung-note9')  
KamOrderFlowTestData.CreationOfOutsationSaleOrder("VegrowVehicle")
cy.get('@createdSoID').then((soID) =>{
  KamDelievredPage.clickOrdersCard(soID)
  .validateInitiateGrnCtaLanding()
  .validateInitiateGrnAction(0)
 })
})

it("To validate initiate Grn Cta click lands on initiate Grn page and can perform initiate Grn action (Customer Logistics)",()=>{
  cy.viewport('samsung-note9')
  KamOrderFlowTestData.CreationOfOutsationSaleOrder("CustomerVehicle")
  cy.get('@createdSoID').then((soID) =>{
    KamDelievredPage.clickOrdersCard(soID)
    .validateInitiateGrnCtaLanding()
    .validateInitiateGrnAction(0)
   })
  })

  it("To Check  Cta  after initiate Grn action (Vegrow Logistics",()=>
  {
    cy.viewport('samsung-note9')
    KamOrderFlowTestData.CreationOfOutsationSaleOrder("VegrowVehicle")
  cy.get('@createdSoID').then((soID) =>{
    KamDelievredPage.clickOrdersCard(soID)
    .validateInitiateGrnCtaLanding()
    .validateInitiateGrnAction(0)
    .CheckCtaInDeliveredState
  })
})
  it("To Check  Cta after initiate Grn action (Customer Logistics",()=>
  {
    cy.viewport('samsung-note9')
    KamOrderFlowTestData.CreationOfOutsationSaleOrder("CustomerVehicle")
  cy.get('@createdSoID').then((soID) =>{
    KamDelievredPage.clickOrdersCard(soID)
    .validateInitiateGrnCtaLanding()
    .validateInitiateGrnAction(0)
    .CheckCtaInDeliveredState()
  })
})

  it("To validate AcknowledegeGrn with Upload  after initiate Grn action (Vegrow Logistics",()=>
  {
    cy.viewport('samsung-note9')
    KamOrderFlowTestData.CreationOfOutsationSaleOrder("VegrowVehicle")
     cy.get('@createdSoID').then((soID) =>{
      KamDelievredPage.clickOrdersCard(soID)
      .validateInitiateGrnCtaLanding()
      .validateInitiateGrnAction(0)
      .validateAcknowlegeGrn()
    })
  })

  it("To validate AcknowledegeGrn with Upload  after initiate Grn action (Customer Logistics",()=>
  {
    cy.viewport('samsung-note9')
    KamOrderFlowTestData.CreationOfOutsationSaleOrder("CustomerVehicle")
     cy.get('@createdSoID').then((soID) =>{
      KamDelievredPage.clickOrdersCard(soID)
      .validateInitiateGrnCtaLanding()
      .validateInitiateGrnAction(0)
      .validateAcknowlegeGrn()
    })
  })






  })





 
