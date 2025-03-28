class KamCustomerDetailsPage {
    elements = {
        creditDetails: () => cy.get('[data-cy="kam.customers.quick-action-CREDIT_DETAILS"]'),
        dclGivenCount: () => cy.get('[data-cy="kam.customers.customer-health-dcl-count"]'),
        dclGivenAmount: () => cy.get('[data-cy="kam.customers.customer-health-dcl-amount"]'),
    }
    clickCreditDetails() {
        this.elements.creditDetails().click();
        return this;
    }
    verifyDCLGivenCount(count) {
        this.elements.dclGivenCount().should('have.text', '#' + count);
        return this;
    }
    verifyDCLGivenAmount(amount) {
        this.elements.dclGivenAmount().should('have.text', '₹' + amount);
        return this;
    }
}
module.exports =new KamCustomerDetailsPage();
