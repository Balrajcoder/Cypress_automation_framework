import KamOrderPage from "../../../components/pages/KamOrderPage";
import BtrHomePage from "../../../components/pages/BtrHomePage";
import KamEnquiryPage from "../../../components/pages/KamEnquiry";
import SoTestData from "../../../Utility/apiTestData/SoAPITestData";
import KamConfirmedSo from "../../../components/pages/KamConfirmedSo";
import { KAM_URL } from "../../../constants/kamUrls";


describe('Confirmed SO component level changes', function() {

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
    cy.on("uncaught:exception", (e, runnable) => {
    console.log("error", e);
    console.log("runnable", runnable);
    return false;
})
});

 it("To validate Confirmed SO tab is present inside orders page",()=>{
    BtrHomePage.validateOrderLandingButton();
    BtrHomePage.clickOrderLandingButton();
    KamConfirmedSo.validateConfirmedSo();
})

 it("To validate Confirmed SO tab is clickable and landing us to the targeted page",()=>{
   
   BtrHomePage
   .validateOrderLandingButton()
   .clickOrderLandingButton();

   KamConfirmedSo
   .validateConfirmedSo()
   .clickConfirmedSO()
   .validateConfirmedOrderPage();

 })

 it("To validate Confirmed SO tab icon",()=>{
   
   BtrHomePage
   .validateOrderLandingButton()
   .clickOrderLandingButton();

   KamConfirmedSo
   .validateConfirmedSo()
   .validateConfirmedSoIcon();

 })

 it("To check whether confirming a sale order will end up in the Confirmed SO tab",()=>{

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID);
   });

})

it("To check whether confirming a consumer vehicle sale order will end up in the Confirmed SO tab",()=>{

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SaleEnquiryCreationConsumerVehicle()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID);
   });

})

it("To check searching a customer in Confirmed SO is working and giving correct results", () => {

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .enterCustomerSearch(data.customer)
         .validateCustomerName(soID);
   });

});

it("To check searching a customer in Confirmed SO for consumer vehicle is working and giving correct results", () => {

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SaleEnquiryCreationConsumerVehicle()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .enterCustomerSearch(data.customer)
         .validateCustomerName(soID);
   });

});


it("To check if after approving a sale enquiry, the sale order is in Pending Allotment state", () => {

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .validateSoPendingAllotmentState(soID);
   });

});

it("To check if after approving a consumer vehicle sale enquiry, the sale order is in Pending Allotment state", () => {

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SaleEnquiryCreationConsumerVehicle()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .validateSoPendingAllotmentState(soID);
   });

});


it("To validate the expected delivery date in the Confirmed SO tab", () => {

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .validateSoPendingAllotmentState(soID)
         .clickOrdersCard(soID)
         .validateDateAndTime();
   });

});


it("To validate the presence of timeline section in the SO and toggling the Timeline tab", () => {

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .validateTimelineTab();
   });

});


it("To validate the presence of items section in the SO and toggling the items tab", () => {

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .validateTimelineTab()
         .toggleToItemsTab()
         .validateItemsTab();
   });

});


it("To validate the presence of items section in the SO and toggling the payment tab", () => {

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .validateTimelineTab()
         .toggleToItemsTab()
         .validateItemsTab()
         .toggleToPaymentTab()
         .validatePaymentsTab();
   });

});


it("To validate the items in the Items section of the Confirmed SO tab", () => {

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .validateTimelineTab()
         .toggleToItemsTab()
         .validateItemsTab()
         .getItemName(data.FruitName);
   });

});


it("To validate the total payment in the Confirmed SO tab against the Sales Enquiry", () => {

   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .toggleToPaymentTab()
         .ValidateNetAmount(data.actualFare);
   });

});


it("To validate the total payment in the Confirmed SO tab against the Sales Enquiry", () => {
   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .toggleToPaymentTab()
         .ValidateNetAmount(data.actualFare);
   });

});


it("To check the logistics price button is present once vehicle fare gets added", () => {
   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .getVehicleIndentId()
      .AddFareFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .validateAcceptPriceButton();
   });
});


it("To check the change delivery method from vegrow logistics to customer logistics", () => {
   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .getVehicleIndentId()
      .AddFareFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .validateChangeDeliveryMethod();
   });
});


it("To check the Accept price is clickable and working", () => {
   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .getVehicleIndentId()
      .AddFareFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .validateAcceptPriceButton()
         .clickAcceptPriceButton()
         .validateConfirmationMessage();
   });
});


it("To complete the Accept price fare for vegrow logistics", () => {
   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .getVehicleIndentId()
      .AddFareFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .validateAcceptPriceButton()
         .clickAcceptPriceButton()
         .validateConfirmationMessage()
         .clickSubmitButton();
   });
});


it("To check the Change delivery method is clickable", () => {
   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .getVehicleIndentId()
      .AddFareFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .validateChangeDeliveryMethod()
         .clickChangeDeliveryMethod()
         .validateChangeDeliveryTitle();
   });
});


it("To check the Change delivery method is working", () => {
   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .getVehicleIndentId()
      .AddFareFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .validateChangeDeliveryMethod()
         .clickChangeDeliveryMethod()
         .validateChangeDeliveryTitle()
         .enterDeliveryMethod()
         .clickSubmitButton();
   });
});


it("To validate until we accept fare it reflects under payments tab", () => {
   BtrHomePage
      .clickOrderCard();

   SoTestData
      .Authentication()
      .SECreationFromApi()
      .SOCreationFromApi()
      .getVehicleIndentId()
      .AddFareFromApi();

   cy.get('@createdSoID').then((soID) => {
      KamConfirmedSo
         .clickConfirmedSO()
         .validateSaleOrderID(soID)
         .clickOrdersCard(soID)
         .validateAcceptPriceButton()
         .clickAcceptPriceButton()
         .validateConfirmationMessage()
         .clickSubmitButton()
         .toggleToPaymentTab()
         .validateTransportPriceValue();
   });
});

 
})
