class KamCheckinPage {
    elements = {
        headerTitle: () => cy.get('[data-cy="btr.app.title"]'),
        existingTab: () => cy.get("button").contains("Existing"),
        search: () => cy.get("[data-cy='kam.checkin.customer-field']").eq(0),
        searchList: (customerName) => cy.get('#customer-listbox').contains(customerName),
        recordEntry: () => cy.get('[data-cy="kam.checkin.drawer.record-entry-btn"]'),
        purposeOfVisitErrorMsg: () => cy.get('.MuiFormHelperText-root-ilyJmf'),
        deliveryOfFruitCheckbox: () => cy.contains("Delivery of fruit"),
        crateCollectionCheckbox: () => cy.contains("Crates collection"),
        confirmButton: () => cy.get('[data-cy="kam.customer.profile.address-edit.drawer.record-entry-btn"]'),
        successToastMsg: () => cy.get("div[id='notistack-snackbar']"),
        crossButton: () => cy.get('button[data-cy="kam.check-in.preview.header-close-icon"]'),
        locationFetchedPopup: () => cy.get('[data-cy="kam.checkin.drawer.confirmation-title-text"]'),
        clickCancelButton: () => cy.get('button[data-cy="kam.check-in.form-action-buttons-cancel-btn"]'),
        newButton: () => cy.get("button").contains("New"),
        newCustomerField: () => cy.get("input[name='customer']"),
        cancelButtonDrawer: () => cy.get('button[data-cy="kam.check-in.preview.cancel-button"]'),
        pendingSection: () => cy.get('[data-cy="component.tabs.tab-0"]'),
        completedSection: () => cy.get('[data-cy="component.tabs.tab-1"]'),
        unsuccesfulSection: () => cy.get('[data-cy="component.tabs.tab-2"]'),
        newCheckInButton: () => cy.get('[data-cy="kam.checkins.landing.new-checkins-btn"]'),
        maplocation: () => cy.contains("Click here"),
        addresses: () => cy.get('[data-cy="kam.customer.more-data.accordion-addresses_data.summary"]'),
        editAdress: () => cy.get('[data-cy="kam.customer.profile.address-card-2.edit-icon"]'),
        currentLocation: () => cy.get('[data-cy="kam.customer.address-edit-form.gps-icon"]'),
        checkIncard: () => cy.get('[data-cy="kam.checkins.card-2.customer-name"]'),
        checkInCardCompletedTab: () => cy.get("[data-cy$='.customer-name']"),
        visitReason: () => cy.get("[data-cy$='.visit-reasons']")
    }

    verifyExisitingßTabIsSelectedDefault() {
        this.elements.existingTab().should('have.attr', 'aria-selected', 'true');
        return this;
    }

    enterTheCustomerNameInSearch(customerName) {
        this.elements.search().click();
        this.elements.search().type(customerName);
        cy.wait(5000)
        return this;
    }

    selectTheCustomerInSearchDD(customerName) {
        this.elements.searchList(customerName).click();
        return this;
    }

    clickRecordEntry() {
        this.elements.recordEntry().click();
        return this;
    }

    verifyPurposeVisitErrorMsg(msg) {
        this.elements.purposeOfVisitErrorMsg().should('have.text', msg);
        return this;
    }

    checkPurposeOfVisitFields() {
        this.elements.deliveryOfFruitCheckbox().click();
        this.elements.crateCollectionCheckbox().click();
        return this;
    }

    clickConfirm() {
        this.elements.confirmButton().click();
        return this;
    }

    verifySuccessToastMsg(msg) {
        this.elements.successToastMsg().should('have.text', msg);
        return this;
    }

    clickCrossButton() {
        this.elements.crossButton().click({force: true});
        return this;
    }

    verifyLocationFetchedPopup() {
        this.elements.locationFetchedPopup().should('be.visible');
        return this;
    }

    clickCancelButton() {
        this.elements.clickCancelButton().click();
        return this;
    }

    verifyCustomerNameInAccordionIsNotVisible() {
        this.elements.search().should('be.visible');
        return this;
    }

    clickNewButton() {
        this.elements.newButton().click();
        return this;
    }

    enterNewCustomerName(customerName) {
        this.elements.newCustomerField().click();
        this.elements.newCustomerField().type(customerName);
        return this;
    }

    clickCancelButtonInDrawer() {
        this.elements.cancelButtonDrawer().click();
        return this;
    }

    verifyCeckInheaderTitle(Title) {
        this.elements.headerTitle().should('have.text', Title);
        return this;
    }

    verifySectionVisibility() {
        this.elements.pendingSection().should('be.visible');
        this.elements.completedSection().should('be.visible');
        this.elements.unsuccesfulSection().should('be.visible');
        return this;
    }

    verifyNewCheckInButtonVisibility() {
        this.elements.newCheckInButton().should('be.visible');
        return this;
    }

    clickNewCheckInButton() {
        this.elements.newCheckInButton().click();
        return this;

    }

    editToAddCurrentLocation() {
        this.elements.maplocation().click();
        // this.elements.addresses().click();
        cy.wait(1000)
        this.elements.editAdress().click();
        this.elements.currentLocation().click();
        cy.wait(3000)
        return this;
    }

    clickCompleteTab() {
        this.elements.completedSection().click();
        return this;
    }

    verifyPresenceOfCheckInKamApp() {
        this.elements.checkIncard().should('have.text', 'KAM Order Customer one');
        return this;
    }

    verifyCheckInActivityCardCompletedTab(customerName, reason, index = 0) {
        this.elements.checkInCardCompletedTab().should('have.text', customerName);
        this.elements.visitReason().eq(index).should('have.text', reason);
        return this;
    }
}

module.exports = new KamCheckinPage()