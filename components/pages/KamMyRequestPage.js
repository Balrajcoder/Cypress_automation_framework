import axios from 'axios';

class KamMyRequestPage {
    elements = {
        tempLimitBoostersCountMyRequest: () => cy.get('[data-cy="kam.myRequest.dcl-accordion-title"]'),
        verifyRequestedByuserName: ()=>cy.get('[data-cy="kam.myRequest.dcl-accordion"]'),
        clickPullback: ()=> cy.get('[data-cy$="pull-back"]'),
        clickConfirmPullback: ()=> cy.get('[data-cy$="delete-drawer-btn"]'),
        clickCancelButton: ()=> cy.get('[data-cy$="delete-drawer-cancelbtn"]'),
        deleteConfirmationPopUp:()=>cy.get('[data-cy="kam.myRequest.2.delete-drawer.confirmation-msg"]'),
        verifyMyrequestTabLabel: ()=>cy.get('[data-cy="btr.app.title"]'),
        VerifyCreditHeadlabel: ()=>cy.get('[data-cy$="status"]')

    }

    verifyRequestedCount(expectedCount) {
        cy.wait(2000);
        return this.elements.tempLimitBoostersCountMyRequest()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const count = text.match(/\((\d+)\)/)[1]; // Extract number inside parentheses
                const value = parseInt(count, 10);
                cy.log(`Extracted count: ${value}`);
                // Cypress assertion to check if extracted value matches expectedCount
                return cy.wrap(expect(value).to.equal(expectedCount));
            });
    }
    expandTempLimitSection(){
        this.elements.verifyRequestedByuserName().click();
        return this;
    }
    clickPullback(){
        this.elements.clickPullback().eq(0).click();
        return this;
    }
    clickConfirmPullback(){
        this.elements.clickConfirmPullback().click();
        return this;
    }
    clickCancelButton(){
        this.elements.clickCancelButton().click();
        return this;
    }
    verifyDeletePopupClosed() {
       this.elements.deleteConfirmationPopUp() .should('not.exist');
       return this;
    }
    verifyMyrequestTabLabel(){
        this.elements.verifyMyrequestTabLabel().should('have.text','My Requests');
        return this;
    }

    verifyCreditHeadlabel(){
        this.elements.VerifyCreditHeadlabel().eq(0).should('have.text','Pending Credit Head Approval');
        return this;
    }

}

module.exports = new KamMyRequestPage();