class KamCustomerListPage {
  elements = {
    customer: (customerName) => cy.get(`[data-cy^="kam.customer.${customerName}-name-text"]`),
  }
  clickCustomerCard(customerName) {
    this.elements.customer(customerName).click();
    return this;
  }


}
module.exports =new KamCustomerListPage();
