import KamOrderPage from "../../../components/pages/KamOrderPage"
import BtrHomePage from "../../../components/pages/BtrHomePage"
import KamNotification from "../../../components/pages/KamNotification";


describe('KAM HomePage', function() {


  let data;

  before(function() {
    cy.fixture("kamOrderFlow").then(function(userdata) {
      data = userdata;
    });
  });


 
  beforeEach(function(){
    cy.LoginKAM(data.kam_username, data.kam_password); 

     })


  it("To Validate User is at Homepage",()=>{
    cy.title().should('include', data.homepageTitle);
    BtrHomePage.validateHomeScreen();
    })

  it("To check where the orders tab is clickable",()=>{
    BtrHomePage.validateOrdersCard();
    BtrHomePage.validateOrdersDetails();  
    KamOrderPage.validateOrderTitle();         
  })

  it('To validate the order landing button is clickable',()=>{
   BtrHomePage.validateOrderLandingButton();
   BtrHomePage.clickOrderLandingButton();
   KamOrderPage.validateOrderTitle();         
  })

  it('To validate that the notification button is clickable and working',()=>{
   BtrHomePage.validateNotification();
   BtrHomePage.clickNotification();
   KamNotification.validateNotificationHeader();
  })

  it('To validate that the notification close button is clickable and working',()=>{
    BtrHomePage.validateNotification();
    BtrHomePage.clickNotification();
    KamNotification.validateNotificationHeader();
    KamNotification.clickNotificationClose();
    BtrHomePage.validateHomeScreen();
  })


})
