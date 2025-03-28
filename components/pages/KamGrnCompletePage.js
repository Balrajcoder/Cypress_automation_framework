

class KamGrnCompletePage
{
    elements={
        orderTitle: () => cy.get('[data-cy="btr.app.title"]'),
        ordersTab :(orderId) => cy.get(`[data-cy="kam.orderListingPage.ordersCard-${orderId}"]`),
        performaInvoiceCta:()=>cy.get('[data-cy="kam.ctaButtons.proformaInvoiceButton"]'),
        
    }

    validateGrnCompleteOrderPage()
    {
        this.elements.orderTitle()
            .should('be.visible')
            .should('exist') 
            .and('have.text', 'Orders'); 
        return this;
    }

    clickOrderFromlistings(orderId)
    {
        this.elements.ordersTab(orderId).click();
        return this;
    }

    validatePerformaInvoice()
    {
        this.elements.performaInvoiceCta().should('be.visible')
        .should('be.enabled')
        return this;
    }

}
module.exports=new KamGrnCompletePage()