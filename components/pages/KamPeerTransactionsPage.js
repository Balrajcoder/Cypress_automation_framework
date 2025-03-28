class KamPeerTransactionsPage
{
    elements={
        depositsTab:()=> cy.get('[data-cy="component.tabs.tab-1"]'),
        initiatePeerCollection: () => cy.get('[data-cy="kam.peer-transactions.landing-initiate-collection-button"]'),
        collectButton:()=> cy.get('.justify-between > .MuiButton-contained'),
        selectErrorMsg:()=> cy.get('p[id="peer-helper-text"]'),
        amountErrorMsg:()=> cy.get('div[data-cy="kam.peer-transactions.initiate-collection-drawer-form-amount-input"] p'),
        remarksErrorMsg:()=> cy.get('div[data-cy="kam.peer-transactions.initiate-collection-drawer-form-remarks-input"] p'),
        drawerTitle:()=> cy.get('[data-cy="drawer-title"]'),
        cancelButton:()=> cy.get('button').contains('Cancel'),
        selectPeerDD:()=> cy.get('div[data-cy="kam.peer-transactions.initiate-collection-drawer-form-peer-input"] input'),
        selectPeerInDDList:()=> cy.get('#peer-listbox'),
        amountField:()=> cy.get('div[data-cy="kam.peer-transactions.initiate-collection-drawer-form-amount-input"]'),
        remarksField:()=> cy.get('div[data-cy="kam.peer-transactions.initiate-collection-drawer-form-remarks-input'),
        saveButton:()=> cy.get('div[data-cy="custom-modal-body"] button').contains('Save'),
        peerNameInList:()=> cy.get('.justify-between > .MuiTypography-root-hjKMqV'),
        amountInList:()=> cy.get('span').contains('₹').eq(0),
        popUpCrossIcon:() => cy.get('[data-cy="custom-modal-close-icon"]'),
        popUpTitle:()=> cy.get('[data-cy="custom-modal-title"]'),
        popUpCancelBtn:()=> cy.get('div[data-cy="custom-modal-body"] button').contains('Cancel'),
        peerListing:()=> cy.get('#peer-listbox'),

    }


    clickDepositsTab(){
        this.elements.depositsTab().click();
        return this;
    }

    clickInitiatePeerCollection(){
        this.elements.initiatePeerCollection().click();
        return this;
    }

    clickCollectButton(){
        this.elements.collectButton().click();
        return this;
    }

    verifyRequiredErrorMsg(text)
    {
        this.elements.selectErrorMsg().should('have.text', text);
        this.elements.amountErrorMsg().should('include.text', text);
        this.elements.remarksErrorMsg().should('include.text', text);
        return this;
    }

    verifyDrawerTitle(text)
    {
        this.elements.drawerTitle().should('have.text', text);
        return this;
    }

    clickCancelButton(){
        this.elements.cancelButton().click();
        return this;
    }

    verifyDrawerIsClosed(){
        this.elements.drawerTitle().should('not.exist');
        return this;
    }

    clickSelectPeerDD(){
        this.elements.selectPeerDD().click();
        return this;
    }

    enterPeerName(text){
        this.clickSelectPeerDD();
        this.elements.selectPeerDD().type(text);
        return this;
    }

    selectPeerInDD(){
        this.elements.selectPeerInDDList().click();
        return this;
    }

    enterAmount(text){
        this.elements.amountField().type(text);
        return this;
    }

    enterRemarks(text){
        this.elements.remarksField().type(text);
        return this;
    }

    clickSaveButton(){
        this.elements.saveButton().click();
        return this;
    }

    verifyPeerNameInList(peerName){
        this.elements.peerNameInList().should('have.text', peerName);
        return this;
    }

    verifyAmountInList(amount){
        this.elements.amountInList().should('have.text', '₹' + amount);
        return this;
    }

    verifyAmountShouldNotInNegativeErrorMsg(text){
        this.elements.amountErrorMsg().should('include.text', text);
        return this;
    }

    clickPopUpCrossIcon(){
        this.elements.popUpCrossIcon().click();
        return this;
    }

    verifyPopUpIsClosed(){
        this.elements.popUpTitle().should('not.exist');
        return this;
    }

    clickPopUpCancelBtn(){
        this.elements.popUpCancelBtn().click();
        return this;
    }

    verifyPeerList(peerList) {
        let concatenatedText = '';

        this.elements.peerListing().each(($el) => {
            concatenatedText += $el.text() + ' '; // Append text with a space
        }).then(() => {
            // Assert that the peerList string is included in the concatenatedText
            expect(concatenatedText).to.include(peerList);
        });
    }
}

module.exports=new KamPeerTransactionsPage();