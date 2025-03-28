class HeaderComponent {
    elements = {
        title: () => cy.get("h1[data-cy='btr.app.title']"),
        backButton: () => cy.get("svg[data-testid='ArrowBackIosIcon']+span")
    }

    verifyHeaderTitle(title) {
        this.elements.title().should('have.text', title);
        return this;
    }

    clickBackButton() {
        this.elements.backButton().click({force: true});
        return this;
    }
}

export default new HeaderComponent();