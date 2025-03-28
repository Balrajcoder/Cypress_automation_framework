class FooterComponent {
    elements = {
        homeButton: () => cy.get('[data-cy="btr.landing.Home"]'),
        collectionFooter: () => cy.get("div[data-cy='btr.landing.Collections']"),
        customerButton: () => cy.get("div[data-cy='btr.landing.Customers']")
    }

    clickHomeButton() {
        this.elements.homeButton().click();
        return this;
    }

    clickCollectionFooter() {
        this.elements.collectionFooter().click();
        return this;
    }

    clickCustomerButton() {
        this.elements.customerButton().click();
        return this;
    }
}

export default new FooterComponent();