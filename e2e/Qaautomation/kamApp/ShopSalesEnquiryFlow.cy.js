
import BtrHomePage from "../../../components/pages/BtrHomePage"
import ShopSalesHomePage from "../../../components/pages/ShopSalesHomePage"
import KamNewOrderPage from "../../../components/pages/KamNewOrderPage"
import HomePage from "../../../components/pages/HomePage"
import SaleEnquiryPage from "../../../components/pages/SaleEnquiryPage"


describe('Shop Sales Enquiry Tab component level testcases', function () {

  let data;

  before(function () {
    cy.fixture("shopSalesFlow").then(function (userdata) {
      data = userdata;
    });
  });

  beforeEach(function () {
    cy.LoginBtr(data.shopSales_username, data.shopSales_password, data.title);
  });


  it("To Validate ShopSales Enquiry icon is present on Home Page", () => {
    BtrHomePage
      .validateShopSalesIcon()
  });

  it("To Validate ShopSales Enquiry icon click lands on ShopSales Page", () => {
    BtrHomePage
      .clickShopSalesIcon()
    ShopSalesHomePage.validateShopSalesTitle()
  });

  it("To validate Enquiry tab is present inside ShopSales page", () => {
    BtrHomePage
      .clickShopSalesIcon()
    ShopSalesHomePage.validateSalesEnquiryTabVisiblity()
  })

  it("To validate Enquiry tab is clickable and landing to Shopsales Enquiry page", () => {
    BtrHomePage
      .clickShopSalesIcon()
    ShopSalesHomePage.validateShopSalesEnquiryTabClickable()
    ShopSalesHomePage.validateShopSalesTitle()
  })

  it("Validate Creation of ShopSales Enquiry through cash full payment without discount and lands on payment successfull screen and creats Sale Order for credit customer ", () => {
    BtrHomePage
      .clickShopSalesIcon()
    ShopSalesHomePage.clickShopSalesIconAndEnterCustomer(data.shopSales_customer)
    KamNewOrderPage.selectProduct(data.productCategoryId)
      .addProductsfromCatalogue()
      .clickProceed()
      .selectDeliveryDate()
      .UploadBill()
      .clickRequesdtForApproval()
     ShopSalesHomePage.selectShopSalesPaymentTypeAndProceed('cash')
     .validateCashPaymentSuccessfull()
     ShopSalesHomePage.clickGotoOrders()

      cy.LoginVelynk(data.shopSales_username, data.shopSales_password, data.title1);
      HomePage.clickHamburger()
      .clickSaleEnquiry()
      cy.get('@ShopSalesSoId').then((ShopSalesSoId) => {
      SaleEnquiryPage.enterEnquiryId(ShopSalesSoId)
      .clickConvertedSO()
      })
    })


    it("Validate Creation of ShopSales Enquiry through cash full payment without discount and lands on payment successfull screen and creats Sale Order for cash customer ", () => {
      BtrHomePage
        .clickShopSalesIcon()
      ShopSalesHomePage.clickShopSalesIconAndEnterCustomer(data.shopSales_cash_customer)
      KamNewOrderPage.selectProduct(data.productCategoryId)
        .addProductsfromCatalogue()
        .clickProceed()
        .selectDeliveryDate()
        .UploadBill()
        .clickRequesdtForApproval()
       ShopSalesHomePage.selectShopSalesPaymentTypeAndProceed('cash')
        .validateCashPaymentSuccessfull()
       ShopSalesHomePage.clickGotoOrders()
        cy.LoginVelynk(data.shopSales_username, data.shopSales_password, data.title1);
        HomePage.clickHamburger()
        .clickSaleEnquiry()
        cy.get('@ShopSalesSoId').then((ShopSalesSoId) => {
        SaleEnquiryPage.enterEnquiryId(ShopSalesSoId)
        .clickConvertedSO()
        })
      })  
    

      it("Validate Creation of ShopSales Enquiry through cash split payment without discount and lands on taken payment screen and creats Sale Order for credit customer ", () => {
        BtrHomePage
          .clickShopSalesIcon()
        ShopSalesHomePage.clickShopSalesIconAndEnterCustomer(data.shopSales_customer)
        KamNewOrderPage.selectProduct(data.productCategoryId)
          .addProductsfromCatalogue()
          .clickProceed()
          .selectDeliveryDate()
          .UploadBill()
          .clickRequesdtForApproval()
          ShopSalesHomePage .selectSplitPaymentAndEnterCash()
         .validateSplitCashPaymentSuccessfull()
         .clickGotoOrders()
          cy.LoginVelynk(data.shopSales_username, data.shopSales_password, data.title1);
          HomePage.clickHamburger()
          .clickSaleEnquiry()
          cy.get('@ShopSalesSoId').then((ShopSalesSoId) => {
          SaleEnquiryPage.enterEnquiryId(ShopSalesSoId)
          .clickConvertedSO()
          })
        }) 
     
   it.skip("Validate Creation of ShopSales Enquiry through cash split payment without discount and lands on taken payment screen and creats Sale Order for Cash customer ", () => {
          BtrHomePage
            .clickShopSalesIcon()
          ShopSalesHomePage.clickShopSalesIconAndEnterCustomer(data.shopSales_cash_customer)
          KamNewOrderPage.selectProduct(data.productCategoryId)
            .addProductsfromCatalogue()
            .clickProceed()
            .selectDeliveryDate()
            .UploadBill()
            .clickRequesdtForApproval()
            ShopSalesHomePage .selectSplitPaymentAndEnterCash()
           .validateSplitCashPaymentSuccessfull()
           .clickGotoOrders()
            cy.LoginVelynk(data.shopSales_username, data.shopSales_password, data.title1);
            HomePage.clickHamburger()
            .clickSaleEnquiry()
            cy.get('@ShopSalesSoId').then((ShopSalesSoId) => {
            SaleEnquiryPage.enterEnquiryId(ShopSalesSoId)
            cy.log(ShopSalesSoId)
            SaleEnquiryPage.clickConvertedSO()
            .validateShopSalesEnquiryId(ShopSalesSoId)
            })
          }) 





  })





