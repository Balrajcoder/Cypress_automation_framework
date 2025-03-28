class KAM_SaleOrderConfirmedPage {
    elements = {
        SO_Id: (ID) => cy.xpath(`//div[@data-cy='kam.orderListingPage.ordersCard-${ID}']`),
        acceptPrice: () => cy.xpath("//button[@data-cy='kam.acceptPriceCTA.acceptPriceButton']"),
        yes:()=>cy.xpath("//button[@data-cy='kam.customDrawer.submitButton']"),
        record_Arrival:()=>cy.xpath("//button[@data-cy='kam.recordArrivalCTA.recordArrivalButton']"),
        initiateGRN:()=>cy.xpath("//button[@data-cy='kam.ctaButtons.initiateGRNButton']")
    };

    clickAcceptPrice() {
        this.elements.acceptPrice().click();
        this.elements.yes().click()

        return this;
    }

    
    clickSO_ID(ID) {
        this.elements.SO_Id(ID).click();
        
        return this;
    }
 
   clickRecordArrival()
   {
    this.elements.record_Arrival().click();
    this.elements.yes().click()
    return this;
   }

   clickInitiateGRN()
   {
    this.elements.initiateGRN().click()
    return this;
   }







}

module.exports = new KAM_SaleOrderConfirmedPage();
