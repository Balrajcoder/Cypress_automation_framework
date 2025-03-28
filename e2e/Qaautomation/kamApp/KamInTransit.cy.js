import KamOrderPage from "../../../components/pages/KamOrderPage";
import BtrHomePage from "../../../components/pages/BtrHomePage";
import SoTestData from "../../../Utility/apiTestData/SoAPITestData";
import { KAM_URL } from "../../../constants/kamUrls";
import KamInTransit from "../../../components/pages/KamInTransit";


describe('Intransit Tab component level changes', function() {

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
});

  it("To validate InTransit tab is present inside Orders page",()=>{
      BtrHomePage
        .validateOrderLandingButton()
        .clickOrderLandingButton();
      KamOrderPage
        .validateInTransitTab();
  })

  it("To validate InTransit tab label",()=>{
    BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton();
    KamOrderPage
      .validateInTransitTab()
      .validateInTransitLabel();
})

it("To validate InTransit tab icon",()=>{
    BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
    KamOrderPage
    .validateInTransitTab()
    .validateInTransitIcon();
 })

 it("To validate InTransit tab is clickable and lands on the targeted page",()=>{
   BtrHomePage
     .validateOrderLandingButton()
     .clickOrderLandingButton();
   KamOrderPage
     .validateInTransitTab()
     .clickIntransit();
   KamInTransit
     .validateInTransitOrderPage();
   
  })

  it("To check whether after dispatching the vehicle for a sale order will end up in the InTransit tab",()=>{
    BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton();
    KamOrderPage
      .validateInTransitLabel()
      .validateInTransitTab();
  
      SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .ChangeUserToMandiManager() 
      .getVehicleIndentId()
      .AddFareFromApi()
      .AcceptFareFromApi()
      .RecordTimeUpdate()
      .getShipmentID()
      .FullAllot()
      .createTrip()
      .TruckArrival()
      .initiateLoading()
      .completeLoading()
      .TruckDispatch();
  
    KamOrderPage
    .clickIntransit();
  
    cy.get('@createdSoID').then((soID) => {
        KamInTransit
         .validateInTransitOrderID(soID);
       });
   })

   it("To check whether an order in the InTransit tab has the correct status",()=>{
    BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton();
    KamOrderPage
      .validateInTransitLabel()
      .validateInTransitTab();
  
      SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .ChangeUserToMandiManager() 
      .getVehicleIndentId()
      .AddFareFromApi()
      .AcceptFareFromApi()
      .RecordTimeUpdate()
      .getShipmentID()
      .FullAllot()
      .createTrip()
      .TruckArrival()
      .initiateLoading()
      .completeLoading()
      .TruckDispatch();
  
    KamOrderPage
    .clickIntransit();
  
    cy.get('@createdSoID').then((soID) => {
        KamInTransit
         .validateInTransitOrderID(soID)
         .enterCustomerSearch(data.customer)
         .validateCustomerName(soID)
         .validateSoInTransitState(soID);
       });
   })

   it("To check searching a customer in InTransit tab is working and giving correct results",()=>{
    BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton();
    KamOrderPage
      .validateInTransitLabel()
      .validateInTransitTab();
  
      SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .ChangeUserToMandiManager() 
      .getVehicleIndentId()
      .AddFareFromApi()
      .AcceptFareFromApi()
      .RecordTimeUpdate()
      .getShipmentID()
      .FullAllot()
      .createTrip()
      .TruckArrival()
      .initiateLoading()
      .completeLoading()
      .TruckDispatch();
  
    KamOrderPage
    .clickIntransit();
  
    cy.get('@createdSoID').then((soID) => {
        KamInTransit
         .validateInTransitOrderID(soID)
         .enterCustomerSearch(data.customer)
         .validateCustomerName(soID);
       });
   })
   
   it("To validate that the notification button (InTransit) is clicking and working",()=>{
    BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton();
    KamOrderPage
      .validateInTransitLabel()
      .validateInTransitTab()
      .clickIntransit();

    KamInTransit
      .validateNotificationIcon()
      .clickNotificationIcon()
      .validateNotificationPage(); 
   }) 


   it("To check whether after dispatching the vehicle, The record arrival button is present",()=>{
    BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton();
    KamOrderPage
      .validateInTransitLabel()
      .validateInTransitTab();
  
      SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .ChangeUserToMandiManager() 
      .getVehicleIndentId()
      .AddFareFromApi()
      .AcceptFareFromApi()
      .RecordTimeUpdate()
      .getShipmentID()
      .FullAllot()
      .createTrip()
      .TruckArrival()
      .initiateLoading()
      .completeLoading()
      .TruckDispatch();
  
    KamOrderPage
    .clickIntransit();
  
    cy.get('@createdSoID').then((soID) => {
        KamInTransit
         .validateInTransitOrderID(soID)
         .enterCustomerSearch(data.customer)
         .validateCustomerName(soID)
         .clickOrdersCard(soID)
         .validateRecordArrivalButton();
       });
   })


   it("To check whether after dispatching the vehicle, The record arrival button is working",()=>{
    BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton();
    KamOrderPage
      .validateInTransitLabel()
      .validateInTransitTab();
  
      SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .ChangeUserToMandiManager() 
      .getVehicleIndentId()
      .AddFareFromApi()
      .AcceptFareFromApi()
      .RecordTimeUpdate()
      .getShipmentID()
      .FullAllot()
      .createTrip()
      .TruckArrival()
      .initiateLoading()
      .completeLoading()
      .TruckDispatch();
  
    KamOrderPage
    .clickIntransit();
  
    cy.get('@createdSoID').then((soID) => {
        KamInTransit
         .validateInTransitOrderID(soID)
         .enterCustomerSearch(data.customer)
         .validateCustomerName(soID)
         .clickOrdersCard(soID)
         .validateRecordArrivalButton()
         .clickRecordArrival()
         .validateConfirmationMessage();
       });
   })

   it("To check whether after dispatching the vehicle for a consumer logistics sale order will end up in the InTransit tab",()=>{
    BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton();
    KamOrderPage
      .validateInTransitLabel()
      .validateInTransitTab();
  
      SoTestData
      .Authentication()
      .SaleEnquiryCreationConsumerVehicle()
      .SOCreationFromApi()
      .ChangeUserToMandiManager() 
      .getShipmentID()
      .FullAllot()
      .createTripConsumerVehicle()
      .TruckArrival()
      .initiateLoading()
      .completeLoading()
      .TruckDispatch();
      
  
    KamOrderPage
    .clickIntransit();

    cy.get('@createdSoID').then((soID) => {
      KamInTransit
       .validateInTransitOrderID(soID);
     });

})

it("To check whether a Consumer vehicle sale order in the InTransit tab has the correct status",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateInTransitLabel()
    .validateInTransitTab();

    SoTestData
    .Authentication()
    .SaleEnquiryCreationConsumerVehicle()
    .SOCreationFromApi()
    .ChangeUserToMandiManager() 
    .getShipmentID()
    .FullAllot()
    .createTripConsumerVehicle()
    .TruckArrival()
    .initiateLoading()
    .completeLoading()
    .TruckDispatch();
    

  KamOrderPage
  .clickIntransit();

  cy.get('@createdSoID').then((soID) => {
    KamInTransit
     .validateInTransitOrderID(soID)
     .enterCustomerSearch(data.customer)
     .validateCustomerName(soID)
     .validateSoInTransitState(soID);
   });

})

it("To check whether after dispatching the consumer vehicle, The record arrival button is present",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateInTransitLabel()
    .validateInTransitTab();

    SoTestData
    .Authentication()
    .SaleEnquiryCreationConsumerVehicle()
    .SOCreationFromApi()
    .ChangeUserToMandiManager() 
    .getShipmentID()
    .FullAllot()
    .createTripConsumerVehicle()
    .TruckArrival()
    .initiateLoading()
    .completeLoading()
    .TruckDispatch();
    

  KamOrderPage
  .clickIntransit();

  cy.get('@createdSoID').then((soID) => {
    KamInTransit
     .validateInTransitOrderID(soID)
     .enterCustomerSearch(data.customer)
     .validateCustomerName(soID)
     .clickOrdersCard(soID)
     .validateRecordArrivalButton();
   });

})

it("To check whether after dispatching the consumer vehicle, The record arrival button is working",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateInTransitLabel()
    .validateInTransitTab();

    SoTestData
    .Authentication()
    .SaleEnquiryCreationConsumerVehicle()
    .SOCreationFromApi()
    .ChangeUserToMandiManager() 
    .getShipmentID()
    .FullAllot()
    .createTripConsumerVehicle()
    .TruckArrival()
    .initiateLoading()
    .completeLoading()
    .TruckDispatch();
    

  KamOrderPage
  .clickIntransit();

  cy.get('@createdSoID').then((soID) => {
    KamInTransit
     .validateInTransitOrderID(soID)
     .enterCustomerSearch(data.customer)
     .validateCustomerName(soID)
     .clickOrdersCard(soID)
     .validateRecordArrivalButton()
     .clickRecordArrival()
     .validateConfirmationMessage();
   });
})

})