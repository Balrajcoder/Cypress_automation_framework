import KamOrderPage from "../../../components/pages/KamOrderPage";
import BtrHomePage from "../../../components/pages/BtrHomePage";
import KamEnquiryPage from "../../../components/pages/KamEnquiry";
import SoTestData from "../../../Utility/apiTestData/SoAPITestData";
import { KAM_URL } from "../../../constants/kamUrls";
import KamAlloted from "../../../components/pages/KamAlloted";


describe('Alloted Tab component level changes', function() {

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

 it("To validate Alloted tab is present inside Orders page",() => {
    BtrHomePage
       .validateOrderLandingButton()
       .clickOrderLandingButton();
    KamOrderPage
        .validateAllottedTab();   
 })

 it("To validate Alloted tab is clickable and lands on the targeted page",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
    .clickAlotted()
  KamAlloted
    .validateAllotedOrderPage();
  
 })

 it("To validate Alloted tab icon",()=>{
  BtrHomePage
  .validateOrderLandingButton()
  .clickOrderLandingButton();
  KamOrderPage
  .validateAllottedTab();
  KamAlloted
  .validateAllottedIcon();
 })

 it("To validate Alloted tab label",()=>{
  BtrHomePage
  .validateOrderLandingButton()
  .clickOrderLandingButton();
  KamOrderPage
  .validateAllottedTab()
  .validateAllotedLabel();
 })

 it("To check whether allotting items for a sale order will end up in the Alloted tab",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
  SoTestData
    .Authentication()
    .SECreationFromApi()
    .SOCreationFromApi()
    .getVehicleIndentId()
    .AddFareFromApi()
    .AcceptFareFromApi()
    .RecordTimeUpdate()
    .getShipmentID()
    .FullAllot();

  KamOrderPage
  .clickAlotted();

  cy.get('@createdSoID').then((soID) => {
      KamAlloted
       .validateAllotedOrderID(soID)
     });
 })

 it("To check whether allotting items for a consumer vehicle sale order will end up in the Alloted tab",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
    

  SoTestData
    .Authentication()
    .SaleEnquiryCreationConsumerVehicle()

    .SOCreationFromApi()
    
    .getShipmentID()
    .FullAllot();

  KamOrderPage
  .clickAlotted();

  cy.get('@createdSoID').then((soID) => {
      KamAlloted
       .validateAllotedOrderID(soID)
     });
 })

 it("To validate that the notification button is present",()=>{
  BtrHomePage
  .validateOrderLandingButton()
  .clickOrderLandingButton();
  KamOrderPage
  .validateAllottedTab()
  .validateAllotedLabel()
  .clickAlotted()
  
  KamAlloted
  .validateNotificationIcon()
 })

 it("To validate that the notification button is clicking and working",()=>{
  BtrHomePage
  .validateOrderLandingButton()
  .clickOrderLandingButton();
  KamOrderPage
  .validateAllottedTab()
  .validateAllotedLabel()
  .clickAlotted()
  
  KamAlloted
  .validateNotificationIcon()
  .clickNotificationIcon()
  .validateNotificationPage()
 })

 it("To check searching a customer in Alloted tab is working and giving correct results",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
    

  SoTestData
    .Authentication()
    .SECreationFromApi()
    .SOCreationFromApi()
    .getVehicleIndentId()
    .AddFareFromApi()
    .AcceptFareFromApi()
    .RecordTimeUpdate()
    .getShipmentID()
    .FullAllot();

  KamOrderPage
  .clickAlotted();

  cy.get('@createdSoID').then((soID) => {
      KamAlloted
       .validateAllotedOrderID(soID)
       .enterCustomerSearch(data.customer)
       .validateCustomerName(soID);
     });
 })

 it("To check searching a customer with consumer vehicle sale order in Alloted tab is working and giving correct results",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
    

  SoTestData
    .Authentication()
    .SaleEnquiryCreationConsumerVehicle()
    .SOCreationFromApi()
    .getShipmentID()
    .FullAllot();

  KamOrderPage
  .clickAlotted();

  cy.get('@createdSoID').then((soID) => {
      KamAlloted
       .validateAllotedOrderID(soID)
       .enterCustomerSearch(data.customer)
       .validateCustomerName(soID);
     });
 })

 it("To validate that a sale order with all items allotted shows a Fully Allotted tag in the Alloted tab",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
    

  SoTestData
    .Authentication()
    .SECreationFromApi()
    .SOCreationFromApi()
    .getVehicleIndentId()
    .AddFareFromApi()
    .AcceptFareFromApi()
    .RecordTimeUpdate()
    .getShipmentID()
    .FullAllot();

  KamOrderPage
  .clickAlotted();

  cy.get('@createdSoID').then((soID) => {
      KamAlloted
       .validateAllotedOrderID(soID)
       .enterCustomerSearch(data.customer)
       .validateCustomerName(soID)
       .validateSoFullAllotmentState(soID);
     });
 })

 it("To validate that a consumer vehicle sale order with all items allotted shows a Fully Allotted tag in the Alloted tab",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
    

  SoTestData
  .Authentication()
  .SaleEnquiryCreationConsumerVehicle()
  .SOCreationFromApi()
  .getShipmentID()
  .FullAllot();

  KamOrderPage
  .clickAlotted();

  cy.get('@createdSoID').then((soID) => {
      KamAlloted
       .validateAllotedOrderID(soID)
       .enterCustomerSearch(data.customer)
       .validateCustomerName(soID)
       .validateSoFullAllotmentState(soID);
     });
 })

 it("To validate the presence of timeline section in the SO and toggling the Timeline tab in Alloted tab",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
    

  SoTestData
    .Authentication()
    .SECreationFromApi()
    .SOCreationFromApi()
    .getVehicleIndentId()
    .AddFareFromApi()
    .AcceptFareFromApi()
    .RecordTimeUpdate()
    .getShipmentID()
    .FullAllot();

  KamOrderPage
  .clickAlotted();

  cy.get('@createdSoID').then((soID) => {
      KamAlloted
       .validateAllotedOrderID(soID)
       .clickOrdersCard(soID)
       .validateTimelineTab();
     });
 })

 it("To validate the presence of the Items section in the SO and toggling the Items tab",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
    

  SoTestData
    .Authentication()
    .SECreationFromApi()
    .SOCreationFromApi()
    .getVehicleIndentId()
    .AddFareFromApi()
    .AcceptFareFromApi()
    .RecordTimeUpdate()
    .getShipmentID()
    .FullAllot();

  KamOrderPage
  .clickAlotted();

  cy.get('@createdSoID').then((soID) => {
      KamAlloted
       .validateAllotedOrderID(soID)
       .clickOrdersCard(soID)
       .validateTimelineTab()
       .toggleToItemsTab()
       .validateItemsTab();
     });
 })


 it("To validate the presence of the Payments section in the SO and toggling the Payments tab",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
    

  SoTestData
    .Authentication()
    .SECreationFromApi()
    .SOCreationFromApi()
    .getVehicleIndentId()
    .AddFareFromApi()
    .AcceptFareFromApi()
    .RecordTimeUpdate()
    .getShipmentID()
    .FullAllot();

  KamOrderPage
  .clickAlotted();

  cy.get('@createdSoID').then((soID) => {
      KamAlloted
       .validateAllotedOrderID(soID)
       .clickOrdersCard(soID)
       .validateTimelineTab()
       .toggleToItemsTab()
       .validateItemsTab()
       .toggleToPaymentTab()
       .validatePaymentsTab();
     });
 })

 it("To validate the items in the Items section of the Alloted SO tab",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
    

  SoTestData
    .Authentication()
    .SECreationFromApi()
    .SOCreationFromApi()
    .getVehicleIndentId()
    .AddFareFromApi()
    .AcceptFareFromApi()
    .RecordTimeUpdate()
    .getShipmentID()
    .FullAllot();

  KamOrderPage
  .clickAlotted();

  cy.get('@createdSoID').then((soID) => {
      KamAlloted
       .validateAllotedOrderID(soID)
       .clickOrdersCard(soID)
       .validateTimelineTab()
       .toggleToItemsTab()
       .validateItemsTab()
       .getItemName(data.FruitName);
     });
 })

 it("To validate the total payment in the Alloted tab against the sale Enquiry",()=>{
  BtrHomePage
    .validateOrderLandingButton()
    .clickOrderLandingButton();
  KamOrderPage
    .validateAllottedTab()
    

  SoTestData
    .Authentication()
    .SECreationFromApi()
    .SOCreationFromApi()
    .getVehicleIndentId()
    .AddFareFromApi()
    .AcceptFareFromApi()
    .RecordTimeUpdate()
    .getShipmentID()
    .FullAllot();

  KamOrderPage
  .clickAlotted();

  cy.get('@createdSoID').then((soID) => {
      KamAlloted
       .validateAllotedOrderID(soID)
       .clickOrdersCard(soID)
       .toggleToPaymentTab()
       .ValidateNetAmount(data.NetPayable);
     });
 })
 
})