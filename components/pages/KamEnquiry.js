class KamEnquiryPage {
    elements = {
        orderTitle: () => cy.get('[data-cy="btr.app.title"]'),
        SEPendingApprovalDialog: () => cy.get('[data-cy="kam.SEPendingApprovalDialog.okayButton"]'),
        orderListing: (EnquiryID) => cy.get(`[data-cy="kam.orderListingPage.soSeState-${EnquiryID}"]`),
        seSearch: () => cy.get('[data-cy="kam.orderListingPage.searchBar"]'),
        seSearchInput: () => cy.get('[data-cy="btr.app.searchInput"]'),
        customerName: (EnquiryID) => cy.get(`[data-cy="kam.orderListingPage.customerName-${EnquiryID}"]`),
        orderPageCustomerName: () => cy.get('[data-cy="kam.orderDetails.customerName"]'),
    }

    validateOrderTitle() {
        this.elements.orderTitle().should('exist').and('have.text', 'Orders');
        return this;
    }

    clickPendingApprovalDialog() {
        this.elements.SEPendingApprovalDialog().click();
        return this;
    }

    validateEnquiryId(seId) {
        this.elements.orderListing(seId).should('exist');
        return this;
    }

    validateEnquiryTab(seId) {
        this.elements.orderListing(seId)
            .should('exist')
            .should('have.text', 'Awaiting confirmation');
        return this;
    }

    enterSearch(customer) {
        this.elements.seSearchInput()
            .should('exist')
            .type(customer);
        cy.wait(1000);
        return this;
    }

    validateCustomerName(customer, seId) {
        this.elements.customerName(seId)
            .should('exist')
            .should('have.text', customer);
        return this;
    }

    clickOnSeTab(seId) {
        this.elements.orderListing(seId).click();
        return this;
    }


    validateCustomerNameDetailPage(customer) {
        this.elements.orderPageCustomerName().should('have.text', customer);
        return this;
    }
}

module.exports = new KamEnquiryPage();
