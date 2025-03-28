import KamOrderPage from "../../../components/pages/KamOrderPage";
import BtrHomePage from "../../../components/pages/BtrHomePage";
import KamEnquiryPage from "../../../components/pages/KamEnquiry";
import SoTestData from "../../../Utility/apiTestData/SoAPITestData";

describe('Enquiry Tab component level testcases', function() {

  let data;

  before(function() {
    cy.fixture("kamOrderFlow").then(function(userdata) {
      data = userdata;
    });
  });

  beforeEach(function() {
    cy.LoginKAM(data.kam_username, data.kam_password); 
  });

  it("To validate Enquiry tab is present inside orders page", () => {
    BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton();

    KamOrderPage
      .validateEnquiryTab();
  });

  it("To validate Enquiry tab is clickable and landing us to Enquiry page", () => {
    BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton();

    KamOrderPage
      .validateEnquiryLabel()
      .validateEnquiryTab()
      .clickEnquiryTab();

    KamEnquiryPage
      .validateOrderTitle();
  });

  it("To validate Enquiry tab icon", () => {
    BtrHomePage
      .validateOrderLandingButton()
      .clickOrderLandingButton();

    KamOrderPage
      .validateEnquiryLabel()
      .validateEnquiryTab()
      .validateEnquiryIcon();
  });

  it("To check whether creating a sale enquiry will end up in the enquiry tab", () => {
    BtrHomePage
      .clickOrderCard();

    SoTestData
      .Authentication()
      .SECreationFromApi();

    cy.get('@createdSeId').then((seId) => {
      BtrHomePage
        .clickOrderLandingButton();

      KamOrderPage
        .clickEnquiryTab();

      KamEnquiryPage
        .validateEnquiryId(seId);
    });
  });

  it("To check searching customer is working and giving correct results", () => {
    BtrHomePage
      .clickOrderCard();

    SoTestData
      .Authentication()
      .SECreationFromApi();

    cy.get('@createdSeId').then((seId) => {
      BtrHomePage
        .clickOrderLandingButton();

      KamOrderPage
        .clickEnquiryTab();

      KamEnquiryPage
        .enterSearch(data.customer)
        .validateCustomerName(data.customer, seId);
    });
  });

  it("To check before approval of sale enquiry its in Awaiting Confirmation state", () => {
    BtrHomePage
      .clickOrderCard();

    SoTestData
      .Authentication()
      .SECreationFromApi();

    cy.get('@createdSeId').then((seId) => {
      BtrHomePage
        .clickOrderLandingButton();

      KamOrderPage
        .clickEnquiryTab();

      KamEnquiryPage
        .validateEnquiryTab(seId);
    });
  });

  it("To validate clicking on Orders tab will take user to details page", () => {
    BtrHomePage
      .clickOrderCard();

    SoTestData
      .Authentication()
      .SECreationFromApi();

    cy.get('@createdSeId').then((seId) => {
      BtrHomePage
        .clickOrderLandingButton();

      KamOrderPage
        .clickEnquiryTab();

      KamEnquiryPage
        .validateEnquiryTab(seId)
        .clickOnSeTab(seId)
        .validateCustomerNameDetailPage(data.customer);
    });
  });

});
