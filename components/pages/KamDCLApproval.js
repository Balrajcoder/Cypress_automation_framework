class KamDCLApproval {
    elements = {
        tempLimitBoosterscount: () => cy.get('[data-cy="kam.approvals.dcl-accordion-title"]'),
        verifyApprovalRecordExist: (DCLRequestCount) => cy.get(`[data-cy="kam.myApproval.entries.${DCLRequestCount}.customer-name"]`),
        clickMoreDetails: (DCLRequestCount) => cy.get(`[data-cy="kam.myApproval.entries.${DCLRequestCount}.more-details-btn"]`),
        verifyRequestedByuserName: (DCLRequestCount) => cy.get(`[data-cy="kam.myApproval.landing.${DCLRequestCount}.requestor_name"]`),
        verifyRequesterRemarks: (DCLRequestCount) => cy.get(`[data-cy="kam.approvals.landing.${DCLRequestCount}.requestor_remarks"]`),
        verifyTempLimitboosterType: (DCLRequestCount) => cy.get(`[data-cy="kam.myApproval.entries.${DCLRequestCount}.dcl-type"]`),
        clickLessDetails: (DCLRequestCount) => cy.get(`[data-cy="kam.myApproval.entries.${DCLRequestCount}.more-details-btn"]`),
        tempLimitBoostersCountMyRequest: () => cy.get('[data-cy="kam.myRequest.dcl-accordion-title"]'),
        clickApproveButton: () => cy.get(`[data-cy$="approve-btn"]`),
        verifyApproveConfirmationPopup: () => cy.get(`[data-cy="kam.my-approval.drawer.form"]`),
        clickCancelButton: () => cy.get(`[data-cy="kam.my-approval.drawer.cancelBtn"]`),
        confirmApproveButton: () => cy.get(`[data-cy="kam.my-approval.drawer.finishBtn"]`),
        verifySuccessMessageOnMyApprovalPage: () => cy.contains('b', 'Temp. Limit Booster request sent for Credit Head approval',{timeout: 20000}),
        enterRemarks: () => cy.get('textarea[name="remark"]'),
        clickConfirmRejectButton: () => cy.get(`[data-cy="kam.my-approval.drawer.finishBtn"]`),
        clickRejectButton: () => cy.get(`[data-cy$="reject-btn"]`),
        clickReasonDropdown: () => cy.get(`[data-cy="kam.my-approval.drawer.form.customer-input"]`),
        selectReason: () => cy.get('div#reason-option-0'),
        verifyRejectionMessage: () => cy.contains('h5', 'Temp. Limit Booster request Rejected!!',{timeout: 20000}),
        clickApproveOrRejectTab: () => cy.get(`[data-cy="component.tabs.tab-1"]`),
        verifyRejectedCustomername: () => cy.get(`[data-cy$="customer-name"]`),
        verifyRejectedsLabel: () => cy.get(`[data-cy$="status"]`),
        okayButton: () => cy.get(`[data-cy="kam.landing.depositNow"]`),
        clearValidatyField: () => cy.get('svg[data-testid="CloseIcon"]'),
        verifyValidityMandatoryFieldError: () => cy.get('p[id="dcl_validity_days-helper-text"]'),
        clickvalidtyField: () => cy.get('input#dcl_validity_days'),
        verifyReasonMandatoryFieldError: () => cy.get('p#reason-helper-text'),
        verifyRemarkMandatoryFieldError: ()=> cy.get('p.MuiFormHelperText-root-ilyJmf.fHTrkh.MuiFormHelperText-root.Mui-error.MuiFormHelperText-sizeSmall.MuiFormHelperText-contained'),
        enterRemarks: () =>cy.get('textarea[name="remark"]'),
        verifySuccessMessageCreditHeadApproval: () => cy.contains('b', 'Temp. Limit Booster request Approved!!'),
        verifyApprovedCustomername: () => cy.get(`[data-cy$="customer-name"]`),
        verifyApprovedLabel: () => cy.get(`[data-cy$="status"]`),
        verifyApprovalExpiryMessage: () => cy.contains('div', 'will be expired once the new request is approved. Please consider it while approving the Temp Limit Booster.'),
    }

    getTempLimitBoostersCount() {
        cy.wait(2000)
        return this.elements.tempLimitBoosterscount()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const count = text.match(/\((\d+)\)/)[1]; // Extract number inside parentheses
                cy.log(`Extracted count: ${count}`);
                //expect(count).to.not.be.empty; // Ensure it's not empty
                const Value = parseInt(count, 10);
                return cy.wrap(Value); // Wrap the value to continue chaining
            });
    }


    verifyApprovalRecordExist(CustomerName, DCLRequestCount) {


        this.elements.verifyApprovalRecordExist(DCLRequestCount)
            .should('be.visible')
            .invoke('text') // Get the text inside the element
            .then((text) => {
                expect(text.trim()).to.eq(CustomerName); // Trim to remove extra spaces and compare
            });

        return this;
    }

    clickMoreDetails(DCLRequestCount) {
        this.elements.clickMoreDetails(DCLRequestCount).click();
        return this;

    }

    verifyRequestedByuserName(DCLRequestCount, requesterName) {
        this.elements.verifyRequestedByuserName(DCLRequestCount).should('have.text', requesterName);
        return this;

    }

    verifyRequesterRemarks(DCLRequestCount, requesterRemark) {

        this.elements.verifyRequesterRemarks(DCLRequestCount).should('have.text', requesterRemark);

        return this;

    }

    verifyTempLimitboosterType(DCLRequestCount, BoosterType = 'Payment Terms Breach') {
        this.elements.verifyTempLimitboosterType(DCLRequestCount).should('have.text', BoosterType);

        return this;


    }

    clickLessDetails(DCLRequestCount) {
        this.elements.clickLessDetails(DCLRequestCount).click();
        return this;

    }

    verifyRequestedByuserNameNotExist(DCLRequestCount) {
        this.elements.verifyRequestedByuserName(DCLRequestCount).should('not.exist')
        return this;
    }
    clickApproveButton() {
        this.elements.clickApproveButton().eq(0).click()
        return this;
    }
    verifyApproveConfirmationPopup() {
        this.elements.verifyApproveConfirmationPopup().should('be.visible');
        return this;
    }
    clickCancelButton() {
        this.elements.clickCancelButton().click();
        return this;
    }
    verifyApproveConfirmationPopupNotExist() {
        this.elements.verifyApproveConfirmationPopup().should('not.exist');
        return this;
    }
    clickConfirmApproveButton() {
        this.elements.confirmApproveButton().eq(0).click();
        return this;
    }
    verifySuccessMessageOnMyApprovalPage() {
        this.elements.verifySuccessMessageOnMyApprovalPage().should('be.visible');
        return this;
    }
    enterRemarks(remarks) {
        this.elements.enterRemarks().type(remarks);
        return this;
    }
    clickConfirmRejectButton() {
        this.elements.clickConfirmRejectButton().eq(0).click();
        return this;
    }
    clickRejectButton() {
        this.elements.clickRejectButton().eq(0).click();
        return this;
    }
    clickReasonDropdown(index) {
        this.elements.clickReasonDropdown().eq(index).click();
        return this;
    }
    selectReason() {
        this.elements.selectReason().eq(0).click();
        return this;
    }
    verifyRejectionMessage() {
        cy.wait(7000);
        this.elements.verifyRejectionMessage().should('be.visible')
            .and('contain.text', 'Temp. Limit Booster request Rejected!!');
    }
    clickApproveOrRejectTab() {
        this.elements.clickApproveOrRejectTab().click();
        return this;
    }
    verifyRejectedCustomername(CustomerName) {
        this.elements.verifyRejectedCustomername().eq(0).should('have.text', CustomerName);
        return this;
    }
    verifyRejectedsLabel() {
        this.elements.verifyRejectedsLabel().eq(0).should('have.text', 'Rejected');
        return this;
    }
    clickOkay() {
        this.elements.okayButton().click()
        return this;
    }
    clickvalidtyField(){
        this.elements.clickvalidtyField().click()
        return this
    }
    clearValidatyField() {
        this.elements.clearValidatyField().click();
        return this;
    }
    verifyValidityMandatoryFieldError() {
        this.elements.verifyValidityMandatoryFieldError().should('have.text', 'Required');
        return this;
    }
    verifyReasonMandatoryFieldError() {
        this.elements.verifyReasonMandatoryFieldError().click();
        return this;
    }
    verifyRemarkMandatoryFieldError(){
        this.elements.verifyRemarkMandatoryFieldError().eq(0).click();
        return this;
    }
    enterRemarks(remarks) {
        this.elements.enterRemarks().type(remarks);
        return this;
    }
    verifySuccessMessageCreditHeadApproval() {  
        this.elements.verifySuccessMessageCreditHeadApproval().should('have.text','Temp. Limit Booster request Approved!!');
        return this;
    }
    verifyApprovedCustomername(customerName){
        this.elements.verifyApprovedCustomername().eq(0).should('have.text',customerName);
        return this;
    }
    verifyApprovedLabel(){  
        this.elements.verifyApprovedLabel().eq(0).should('have.text','Approved');
        return this;
    }
    verifyApprovalExpiryMessage(){
        this.elements.verifyApprovalExpiryMessage().should('contain.text', 'Existing Temp. Limit Booster (value:')
            .and('contain.text', 'will be expired once the new request is approved. Please consider it while approving the Temp Limit Booster.');
        return this;
    }
   }
module.exports = new KamDCLApproval();