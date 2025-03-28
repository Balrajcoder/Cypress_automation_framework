

class ShopSalesHomePage
{
    elements={
        shopSalesTitle:()=>cy.get('[data-cy="btr.app.title"]'),
        shopSalesEnquirytab:()=>cy.get('[data-cy="kam.OrderLandingPage.enquiriesTab"]'),
        shopSalesNewOrderIcon:()=>cy.get('[data-cy="kam.OrderLandingPage.newOrder"]'),
        shopSalesCustomerEntry:()=>cy.get('[data-cy="kam.ShopSalesCustomerForm.customer"]'),
        shopSaleCustomerSelect:(customerName)=>cy.get("div").contains(`${customerName}`),
        proceed:()=>cy.get('[data-cy="kam.customDrawer.submitButton"]'),
        shopSalesPaymentType:(paymentType)=>cy.get(`[id*="paymentMethod-${paymentType}"]`),
        shopSalesproccedToPay:()=>cy.contains("Proceed to pay"),
        paymentSuccessfull:()=>cy.contains("Payment Successful!"),
        goToOrderButton: () => cy.get('[data-cy="kam.SEPendingApprovalDialog.okayButton"]'),
        soSEId: () => cy.get('[data-cy="kam.orderDetails.id"]'),
        splitPayment: () => cy.get("[value='split']"),
        enterCash: () => cy.get("[name='CASH']"),
        tokenPayment: () => cy.contains('Token amount paid successfully!')
    } 

    validateShopSalesTitle()
    {
     return this.elements.shopSalesTitle().should('be.visible');

    }

    validateSalesEnquiryTabVisiblity()
    {
     return this.elements.shopSalesEnquirytab().should('be.visible');
    }

    validateShopSalesEnquiryTabClickable()
    {
        return this.elements.shopSalesEnquirytab().click();
   
    }

    validateShopSalesTitle() {
        return  this.elements.shopSalesTitle().should('exist').and('have.text', 'Shop Sales');
  
    }

    

    clickShopSalesIconAndEnterCustomer(shopSaleCustomer)
    {
        this.elements.shopSalesNewOrderIcon().click()
        cy.interceptRequest('GET','customers.json?*','CustomerOptions')
        cy.interceptRequest('GET','catalogue.json?*','CatalogueView')
        this.elements.shopSalesCustomerEntry().type(shopSaleCustomer)
        cy.wait('@CustomerOptions')
        this.elements.shopSaleCustomerSelect(shopSaleCustomer).click()
        this.elements.proceed().click()
        cy.wait('@CatalogueView')
        return this
    }

    selectShopSalesPaymentTypeAndProceed(paymentType)
    {
       this.elements.shopSalesPaymentType(paymentType.toUpperCase()).click()
        this.elements.shopSalesproccedToPay().click()
        cy.wait(9000)
        return this
    }

    validateCashPaymentSuccessfull()
    {
        this.elements.goToOrderButton().should('be.visible').and('not.be.disabled')
        return this
    }

    clickGotoOrders() {
        this.elements.goToOrderButton().click();

        this.elements.soSEId().invoke('text').then((text) => {
            cy.wrap(text).as('ShopSalesSoId')
        });
        return this
    }

    selectSplitPaymentAndEnterCash() {
        this.elements.splitPayment().click()
        this.elements.enterCash().type('10')
        cy.wait(3000)
        this.elements.shopSalesproccedToPay().click()
        cy.wait(7000)
        return this

    }

    validateSplitCashPaymentSuccessfull() {
        this.elements.goToOrderButton().should('be.visible').and('not.be.disabled')
        return this
    }
}

module.exports=new ShopSalesHomePage()
