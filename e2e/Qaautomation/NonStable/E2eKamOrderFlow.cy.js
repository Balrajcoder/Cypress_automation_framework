import KamOrderPage from "../../../components/pages/KamOrderPage"
import BtrHomePage from "../../../components/pages/BtrHomePage"
import KamNewOrderPage from "../../../components/pages/KamNewOrderPage"
import KamOrderFlowTestData from "../../../Utility/createTestData/KamOrderFlowTestData"
import SoTestData from "../../../Utility/apiTestData/SoAPITestData"


describe('E2e Kam Order Flow', function () {


  let data;
  var SaleEnquiryId;


  before(function () {
    cy.fixture("kamOrderFlow").then(function (userdata) {
      data = userdata;
    });
  });

  beforeEach(function () {
    cy.LoginKAM(data.kam_username, data.kam_password);
    BtrHomePage.clickOrderCard();
    KamOrderPage.clickNewOrderIcon()
  })


  it('E2e Kam Order Flow with Vegrow logistic from KAM APP', () => {
    KamOrderFlowTestData.CreateSaleEnquiry("VegrowLogistic", data.customer);
  
    KamNewOrderPage.copySaleEnquiryID().then((SaleEnquiryId1) => {
      const SaleEnquiryId = KamNewOrderPage.saleEnquiryID.match(/\d+/)[0];
  
      cy.LoginVelynk(data.mandimanager_username, data.kam_password, data.title1);
  
      KamOrderFlowTestData.ApprovalOfSaleEnquiry(SaleEnquiryId).then((SOID) => {
        cy.log(`Final Sale Order ID: ${SOID}`);
  
        KamOrderFlowTestData
          .AddFareToVehicleRequest(data.reason)
          .PriceAcceptanceByKam(SOID)
          .EnterReportingTime(SOID)
          .AddTrip(
            data.partner,
            data.driver_name,
            data.driver_phone1,
            data.driver_phone2,
            data.vehicle_number,
            data.transportation_cost
          )
          .TruckactionForSaleOrder(data.qty)
          .RecordArrivalByKam(SOID)
          .InitiateGrnByKam()
          .AcknowledegeGrnByKam();
      });
    });
  });
  
  it('E2e Kam Order Flow With Customer Logistic From Kam App', () => {
    KamOrderFlowTestData.CreateSaleEnquiry("CustomerLogistic", data.customer);
  
    KamNewOrderPage.copySaleEnquiryID().then(() => {
      const SaleEnquiryId = KamNewOrderPage.saleEnquiryID.match(/\d+/)[0];
  
      cy.LoginVelynk(data.mandimanager_username, data.kam_password, data.title1);
  
      KamOrderFlowTestData.ApprovalOfSaleEnquiry(SaleEnquiryId).then((SOID) => {
        cy.log(`Final Sale Order ID: ${SOID}`);
  
        KamOrderFlowTestData
          .PerformTruckActionForCustomerLogistic(SOID, data.driver_name, data.driver_phone1, data.driver_phone2, data.vehicle_number)
          .TruckactionForSaleOrder(data.qty)
          .RecordArrivalByKam(SOID)
          .InitiateGrnByKam()
          .AcknowledegeGrnByKam();
      });
    });
  });
  

  it('E2e Kam Order Flow With Vegrow Logistic From Kam App Along With Outside Inventory', () => {
    KamOrderFlowTestData.CreateSaleEnquiry(
      "VegrowLogistic", 
      data.customer, 
      "OutSideInventory",
      data.product,
      data.Sku,
      data.Packaging,
      data.UnitType,
      data.AvgWeight,
      data.Comments,
      data.ExpectedPrice
    );
  
    KamNewOrderPage.copySaleEnquiryID().then(() => {
      const SaleEnquiryId = KamNewOrderPage.saleEnquiryID.match(/\d+/)[0];
  
      cy.LoginVelynk(data.mandimanager_username, data.kam_password, data.title1);

      KamOrderFlowTestData.ApprovalOfSaleEnquiry(SaleEnquiryId).then((SOID) => {
        cy.log(`Final Sale Order ID: ${SOID}`);
  
        KamOrderFlowTestData
          .AddFareToVehicleRequest(data.reason)
          .PriceAcceptanceByKam(SOID)
          .EnterReportingTime(SOID)
          .AddTrip(
            data.partner, 
            data.driver_name, 
            data.driver_phone1, 
            data.driver_phone2, 
            data.vehicle_number, 
            data.transportation_cost
          )
          .TruckactionForSaleOrder(data.qty)
          .RecordArrivalByKam(SOID)
          .InitiateGrnByKam()
          .AcknowledegeGrnByKam();
      });
    });
  });
  
  it('E2e Kam Order Flow With Customer Logistic From Kam App Along With Outside Inventory', () => {
    KamOrderFlowTestData.CreateSaleEnquiry(
      "CustomerLogistic", 
      data.customer, 
      "OutSideInventory",
      data.product,
      data.Sku,
      data.Packaging,
      data.UnitType,
      data.AvgWeight,
      data.Comments,
      data.ExpectedPrice
    );
  
    KamNewOrderPage.copySaleEnquiryID().then(() => {
      const SaleEnquiryId = KamNewOrderPage.saleEnquiryID.match(/\d+/)[0];
      cy.log(SaleEnquiryId);
  
      cy.LoginVelynk(data.mandimanager_username, data.kam_password, data.title1);
  
      KamOrderFlowTestData.ApprovalOfSaleEnquiry(SaleEnquiryId).then((SOID) => {
        cy.log(`Final Sale Order ID: ${SOID}`);
  
        KamOrderFlowTestData
          .PerformTruckActionForCustomerLogistic(
            SOID, 
            data.driver_name, 
            data.driver_phone1, 
            data.driver_phone2, 
            data.vehicle_number
          )
          .TruckactionForSaleOrder(data.qty)
          .RecordArrivalByKam(SOID)
          .InitiateGrnByKam()
          .AcknowledegeGrnByKam();
      });
    });
  });
  
})














