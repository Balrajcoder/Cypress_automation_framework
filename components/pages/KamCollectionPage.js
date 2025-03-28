import UsefulFunctionsUtils from "../../Utility/usefulFunctionsUtils";

class KamCollectionPage {
    elements = {
        searchTextField: () => cy.get("div[data-cy='btr.app.searchInput']>input"),
        searchFieldCloseIcon: () => cy.get("[data-cy='btr.app.searchCloseIcon']"),
        totalAmountLabel: () => cy.get("div[data-cy='collection.landing.total-amount-label']"),
        totalOutstanding: () => cy.get("div[data-cy='collection.landing.total-amount']>span"),
        collectNowButton: () => cy.get("button[data-cy='collection.landing.collectNow']"),
        collectNowButtonCustomerSpecific: () => cy.get(`button[data-cy*='collection.landing.collection-due.'][data-cy*='.collect-now-btn']`),
        collectionDueTab: () => cy.get("button[data-cy='component.tabs.tab-0']"),
        prevCollectionsTab: () => cy.get("button[data-cy='component.tabs.tab-1']"),
        customerName: () => cy.get("div[data-cy*='kam.collection.landing.collection-due.'][data-cy*='.customer-name']"),
        customerAddress: () => cy.get("span[data-cy*='collection.landing.collection-due.'][data-cy*='.address']"),
        seeMoreButton: () => cy.get("span[data-cy='expandable-text-toggle']"),
        dialIcon: () => cy.get("img[data-cy='kam.collection.customer-poc-phone-icon']"),
        outstandingLabel: () => cy.get("p[data-cy*='collection.landing.collection-due.'][data-cy*='.outstanding-label']"),
        customerOutstanding: (customerName) => cy.get(`p[data-cy='collection.landing.collection-due.${customerName}.outstanding-amount']`),
        daysPastDueLabel: () => cy.get("p[data-cy*='collection.landing.collection-due.'][data-cy*='.past-due-label']"),
        daysPastDue: () => cy.get("p[data-cy*='collection.landing.collection-due.'][data-cy*='.past-due-days']"),
        customerCard: () => cy.get("div[data-cy*='collection.landing.cd.'][data-cy*='.wrapper']"),
        paymentDrawerTitle: () => cy.get("p[data-cy='drawer-title']"),
        customerInput: () => cy.get("div[data-cy='kam.collection.drawer.form.customer-input']"),
        uploadPhotos: () => cy.get("span:contains('Upload more photos')"),
        amountInput: () => cy.get("div[data-cy='kam.collection.drawer.form.amount-input']"),
        customerTextField: () => cy.get("#customer"),
        customerListBox: (customerName) => cy.get("#customer-listbox > div > div").contains(customerName),
        customerCardInDrawer: () => cy.get("div[data-cy='component.custom-card']"),
        customerNameLogoInDrawer: () => cy.get("div[data-cy='kam.collection.customer-card.user-cirlce']"),
        customerNameInDrawer: () => cy.get("div[data-cy='kam.collection.customer-card.username']"),
        customerNumberInDrawer: () => cy.get("div[data-cy='kam.collection.customer-card.user-mobile-number']"),
        dialIconInDrawer: () => cy.get("div[data-cy='kam.collection.customer.phone']"),
        outstandingAmountLabelInDrawer: () => cy.get("p[data-cy='kam.collection.customer.outstanding-label']"),
        outstandingAmountInDrawer: () => cy.get("p[data-cy='kam.collection.customer.outstanding-amt']>span"),
        closeButtonInDrawer: () => cy.get("div[data-cy='kam.collection.customer-card.close-btn']"),
        paymentMethodDropdownInDrawer: () => cy.get("div[data-cy='kam.collection.drawer.form.paymentMethodSelect']"),
        paymentMethodInDrawer: () => cy.get("ul[role='listbox']"),
        paymentMethodField: () => cy.get("#outlined-age-native-simple"),
        paymentTextField: () => cy.get("div[data-cy='kam.collection.drawer.form.paymentMethodSelect']>div>p"),
        receivedAmountInDrawer: () => cy.get("div[data-cy='kam.collection.drawer.form.amount-input']>div>input"),
        remarksTextFieldInDrawer: () => cy.get("div[data-cy='kam.collection.drawer.form.remark-input']>div>textarea[placeholder='Add Remarks']"),
        uploadImageButtonInDrawer: () => cy.get("input[data-cy='kam.collection.form.uploadInput']"),
        finishButtonInDrawer: () => cy.get("button[data-cy='kam.collection.drawer.finishBtn']"),
        imageCountInDrawer: () => cy.get("p[data-cy='kam.collection.form.imgCount']"),
        uploadScreenshotPanelInDrawer: () => cy.get("div[data-cy='kam.collection.drawer.form.proof-wrapper']"),
        cashDrawerTitle: () => cy.get("p[data-cy='cashPayment']"),
        cashDrawerContent: () => cy.get("h6[data-cy='kam.collection.cashdrawer.content']"),
        cashDrawerDeclinedButton: () => cy.get("button[data-cy='kam.collection.cashdrawer-footer.deniedButton']"),
        proceedButtonInDrawer: () => cy.get("button[data-cy='kam.collection.cashdrawer-footer.proceedButton']"),
        cancelButtonInDrawer: () => cy.get("button[data-cy='kam.collection.drawer.cancelBtn']"),
        customerFieldCloseIcon: () => cy.get("button[title='Clear']"),
        customerCardCloseIcon: () => cy.get("div[data-cy='kam.collection.customer-card.close-btn']"),
        customerNameInVirtualPaymentDrawer: () => cy.get("span[data-cy='kam.collection.vpa.customerName']"),
        vpaLabelInVirtualPaymentDrawer: () => cy.get("span[data-cy='kam.collection.vpa.customerVpa']"),
        virtualPaymentIdInVirtualPaymentDrawer: () => cy.get("span[data-cy='kam.collection.vpa.customerVpa']>span"),
        qrScannerInVirtualPaymentDrawer: () => cy.get("div[data-cy='kam.collection.vpa.qrScanner']"),
        qrTimerInVirtualPaymentDrawer: () => cy.get("div[data-cy='kam.collection.vpa.qrTimer-wrapper']"),
        qrNote: () => cy.get("span[data-cy='kam.collection.vpa.qrNote']>b"),
        vegrowImage: () => cy.get("div[data-cy='kam.collection.vpa.vgLogo']>img"),
        virtualPaymentDrawerCloseIcon: () => cy.get("[data-cy='drawer-close-icon']"),
        customerNamesPrevCollectionTab: () => cy.get("[data-cy*='collection.landing.collection-prev.'][data-cy*='.customer-name']"),
        transactionTimesPrevCollectionTab: () => cy.get("[data-cy*='collection.landing.collection-prev.'][data-cy*='.transaction_time']"),
        transactionAmountsPrevCollectionTab: () => cy.get("[data-cy*='collection.landing.collection-prev.'][data-cy*='.transaction_amount']>span"),
        paymentModesPrevCollectionTab: () => cy.get("p[data-cy*='kam.customer.payment-chip-']"),
        transactionStatusesPrevCollectionTab: () => cy.get("[data-cy*='collection.landing.collection-prev.'][data-cy*='.transaction_status']>div"),
        dialIconPrevCollectionTab: () => cy.get("a[data-cy*='collection.landing.collection-prev.'][data-cy*='.phone-icon-wrpper']"),
        proofsInPrevCollectionTab: () => cy.get("img[data-cy*='collection.landing.collection-prev.'][data-cy*='payment_proofs_img']"),
        viewAllProofPrevCollectionTab: () => cy.get("div[data-cy*='collection.landing.collection-prev.'][data-cy*='.payment_proofs_view_all']"),
        expandedImagePrevCollectionTab: () => cy.get("img[data-cy='kam.imageViewer.image']"),
        rightChevronPrevCollectionTab: () => cy.get("[data-testid='KeyboardArrowRightIcon']")
    }

    verifyCollectionPageElements(
        totalOutstandingAmount,
        customerName,
        customerLocation,
        customerOutstandingAmount,
        creditPastDays
    ) {
        this.elements.searchTextField().should('exist');
        this.elements.totalAmountLabel().should('have.text', 'Total Amount to be Collected');
        this.elements.totalOutstanding()
            .should('have.text', UsefulFunctionsUtils.formatAmount(totalOutstandingAmount));
        this.elements.collectNowButton().should('exist');
        this.elements.collectionDueTab().should('exist');
        this.elements.prevCollectionsTab().should('exist');
        this.elements.collectNowButtonCustomerSpecific().should('exist');
        this.elements.customerName().should('have.text', customerName);
        this.elements.customerAddress().should('contain', customerLocation);
        this.elements.seeMoreButton().should('exist');
        this.elements.dialIcon().should('be.visible');
        this.elements.outstandingLabel().should('exist');
        this.elements.customerOutstanding(customerName).find('span')
            .should('have.text', UsefulFunctionsUtils.formatAmount(customerOutstandingAmount));
        this.elements.daysPastDueLabel().should('exist');
        this.elements.daysPastDue().should('have.text', creditPastDays);
        return this;
    }

    enterCustomerNameInSearchField(customerName) {
        this.elements.searchTextField().type(customerName);
        this.elements.customerCard().should('have.length', 1);
        return this;
    }

    clearCustomerNameInSearchField() {
        this.elements.searchFieldCloseIcon().click();
        return this;
    }

    verifyCollectionDueTabIsSelected() {
        this.elements.collectionDueTab().should('have.attr', 'aria-selected', 'true');
        return this;
    }

    selectPrevCollectionTab() {
        this.elements.prevCollectionsTab().click();
        this.elements.prevCollectionsTab().should('have.attr', 'aria-selected', 'true');
        return this;
    }

    verifyDialIconIsClickable(phonePrefix, contactNumber) {
        this.elements.dialIcon().parent()
            .should('have.attr', 'href', `tel:+${phonePrefix}${contactNumber}`)
            .and('be.visible')
            .and('not.be.disabled');
        return this;
    }

    verifyCustomerCardDialIconIsClickable(phonePrefix, contactNumber) {
        this.elements.dialIconInDrawer().parent()
            .should('have.attr', 'href', `tel:+${phonePrefix}${contactNumber}`)
            .and('be.visible')
            .and('not.be.disabled');
        return this;
    }

    clickCollectNowButton() {
        this.elements.collectNowButton().click();
        return this;
    }

    clickCollectNowButtonOfCustomerCard() {
        this.elements.collectNowButtonCustomerSpecific().click();
        return this;
    }

    enterCustomerName(drawerTitle, customerName) {
        this.elements.paymentDrawerTitle().should('have.text', drawerTitle);
        this.elements.customerTextField().clear().type(customerName);
        this.elements.customerListBox(customerName).click();
        this.elements.paymentDrawerTitle().should('have.text', `${drawerTitle}from ${customerName}`);
        return this;
    }

    verifyPreselectedCustomerNameAndCustomerCard(customerName) {
        this.elements.customerTextField().should('have.value', customerName);
        this.elements.customerCardInDrawer().should('exist');
        this.elements.customerNameLogoInDrawer().should('be.visible');
        this.elements.customerNameInDrawer().should('have.text', customerName);
        return this;
    }

    clearCustomerName() {
        this.elements.customerTextField().click();
        this.elements.customerFieldCloseIcon().should('be.visible').click();
        this.elements.customerTextField().should('be.empty');
        this.elements.customerCardInDrawer().should('not.exist')
        return this;
    }

    removeCustomerCard() {
        this.elements.customerCardCloseIcon().click();
        this.elements.customerTextField().should('be.empty');
        this.elements.customerCardInDrawer().should('not.exist')
        return this;
    }

    enterPaymentMethod(paymentMethod) {
        this.elements.paymentMethodDropdownInDrawer().click();
        this.elements.paymentMethodInDrawer().contains(paymentMethod).click();
        this.elements.paymentTextField().should('have.text', paymentMethod);
        return this;
    }

    verifyAbsenceOfCashPaymentMethod() {
        this.elements.paymentMethodDropdownInDrawer().click();
        this.elements.paymentMethodInDrawer().should('not.contain', 'Cash');
        return this;
    }

    clearPaymentMethod() {
        this.elements.paymentMethodDropdownInDrawer().click();
        this.elements.paymentMethodInDrawer().contains('None').click();
        this.elements.paymentMethodField().should('have.value', "");
        return this;
    }

    enterAmountToBeReceived(amount) {
        this.elements.receivedAmountInDrawer().clear().type(amount);
        return this;
    }

    enterRemarks(remarks) {
        this.elements.remarksTextFieldInDrawer().clear().type(remarks);
        return this;
    }

    uploadAndVerifyNumberOfSingleImage(imagePath) {
        this.elements.imageCountInDrawer().should('have.text', '0 images');
        this.elements.uploadImageButtonInDrawer().selectFile(imagePath, {force: true});
        this.elements.imageCountInDrawer().should('have.text', '1 images');
        return this;
    }

    uploadAndVerifyMultipleImages(imagePath, imagePath1, imagePath2) {
        this.elements.imageCountInDrawer().should('have.text', '0 images');
        this.elements.uploadImageButtonInDrawer().selectFile(imagePath, {force: true});
        this.elements.imageCountInDrawer().should('have.text', '1 images');
        this.elements.uploadImageButtonInDrawer().selectFile(imagePath1, {force: true});
        this.elements.imageCountInDrawer().should('have.text', '2 images');
        this.elements.uploadImageButtonInDrawer().selectFile(imagePath2, {force: true});
        this.elements.imageCountInDrawer().should('have.text', '3 images');
        return this;
    }

    clickFinishButton() {
        this.elements.finishButtonInDrawer().click();
        return this;
    }

    clickCancelButton() {
        this.elements.cancelButtonInDrawer().click();
        return this;
    }

    verifyCustomerCardInPaymentDrawer(drawerTitle, customerName, contactNumber, phonePrefix, outstandingAmount) {
        this.elements.customerCardInDrawer().should('be.visible');
        this.elements.paymentDrawerTitle().should('have.text', `${drawerTitle}from ${customerName}`);
        this.elements.customerNameLogoInDrawer().should('be.visible');
        this.elements.customerNameInDrawer().should('have.text', customerName);
        this.elements.customerNumberInDrawer().should('contain', contactNumber);
        this.elements.dialIconInDrawer().parent()
            .should('have.attr', 'href', `tel:+${phonePrefix}${contactNumber}`)
            .and('be.visible')
            .and('not.be.disabled');
        this.elements.outstandingAmountLabelInDrawer().should('have.text', 'Outstanding Amount');
        this.elements.outstandingAmountInDrawer().should('have.text', UsefulFunctionsUtils.formatAmount(outstandingAmount));
        this.elements.closeButtonInDrawer().should('be.visible').and('not.be.disabled');
        return this;
    }

    verifyCollectionDrawerForVirtualPayment(drawerTitle, customerName) {
        this.elements.paymentDrawerTitle().should('have.text', `${drawerTitle}from ${customerName}`);
        this.elements.searchTextField().should('exist');
        this.elements.customerCardInDrawer().should('exist');
        this.elements.receivedAmountInDrawer().should('exist');
        this.elements.remarksTextFieldInDrawer().should('exist');
        this.elements.uploadScreenshotPanelInDrawer().should('not.exist');
        this.elements.finishButtonInDrawer().should('have.text', 'Generate QR code');
        return this;
    }

    verifyVirtualPaymentDrawer(drawerTitle, customerName, vpaPlatform, timerContent, qrNote) {
        this.elements.customerNameInVirtualPaymentDrawer().should('have.text', customerName);
        this.elements.vpaLabelInVirtualPaymentDrawer().should('exist');
        this.elements.virtualPaymentIdInVirtualPaymentDrawer().should('contain.text', 'vegrow').and('contain.text', vpaPlatform);
        this.elements.qrScannerInVirtualPaymentDrawer().should('exist');
        this.elements.qrTimerInVirtualPaymentDrawer().should('contain.text', timerContent);
        this.elements.qrNote().should('have.text', qrNote);
        this.elements.vegrowImage().should('exist');
        return this;
    }

    clickCloseIconOfVirtualPaymentDrawer() {
        this.elements.virtualPaymentDrawerCloseIcon().click();
        return this;
    }

    getTotalOutstandingAmount() {
        return this.elements.totalOutstanding().invoke('text').then(($text) => {
            return UsefulFunctionsUtils.cleanFormattedAmount($text);
        });
    }

    fetchCustomerOutstandingAmount(customerName) {
        return this.elements.customerOutstanding(customerName).find('span')
            .invoke('text') // Extract the text content
            .then((text) => {
                return UsefulFunctionsUtils.cleanFormattedAmount(text);
            });
    }

    verifyAbsenceOfCashDrawer() {
        this.elements.cashDrawerTitle().should('not.exist');
        this.elements.cashDrawerContent().should('not.exist');
        return this;
    }

    clickProceedButton() {
        this.elements.proceedButtonInDrawer().click();
        return this;
    }

    clickCashDrawerDeclinedButton() {
        this.elements.cashDrawerDeclinedButton().should('have.text', 'No, I Will Collect via UPI');
        this.elements.cashDrawerDeclinedButton().click();
    }

    verifyPaymentMethodErrorMessage(errorMessage) {
        this.elements.paymentMethodDropdownInDrawer().next('p').should('have.text', errorMessage);
    }

    verifyCustomerNameErrorMessage(errorMessage) {
        this.elements.customerInput().find('p').should('have.text', errorMessage);
    }

    verifyReceivedAmountErrorMessage(errorMessage) {
        this.elements.amountInput().find('p').should('contain.text', errorMessage);
    }

    verifyEmptiedFieldInCollectionDrawer() {
        this.elements.customerTextField().should('be.empty');
        this.elements.customerCardInDrawer().should('not.exist');
        this.elements.paymentMethodField().should('be.empty');
        this.elements.receivedAmountInDrawer().should('be.empty');
        this.elements.remarksTextFieldInDrawer().should('be.empty');
        this.elements.imageCountInDrawer().should('have.text', '0 images');
    }

    verifyImageUploadErrorMessage(errorMessage) {
        this.elements.uploadPhotos().next('p').should('have.text', errorMessage);
    }

    verifyCustomerCardInPrevCollectionTab(
        customerName,
        phonePrefix,
        contactNumber,
        receivedAmount,
        paymentMode,
        transactionStatus
    ) {
        this.elements.searchTextField().type(customerName);
        cy.wait(3000);
        this.elements.dialIconPrevCollectionTab().eq(0)
            .should('have.attr', 'href', `tel:+${phonePrefix}${contactNumber}`)
            .and('be.visible')
            .and('not.be.disabled');
        this.elements.customerNamesPrevCollectionTab().eq(0).should('have.text', customerName);
        this.elements.transactionTimesPrevCollectionTab().eq(0).invoke('text')
            .should((text) => {
                // Extract text after "Payment collected at "
                const extractedText = text.match(/Payment collected at (.+)/)[1];
                expect(UsefulFunctionsUtils.isValidDateTime(extractedText)).to.be.true;
            });
        this.elements.transactionAmountsPrevCollectionTab().eq(0)
            .should('have.text', UsefulFunctionsUtils.formatAmount(receivedAmount));
        this.elements.paymentModesPrevCollectionTab().eq(0).should('have.text', paymentMode);
        this.elements.transactionStatusesPrevCollectionTab().eq(0).should('have.text', transactionStatus);
        this.elements.proofsInPrevCollectionTab().eq(0).should('exist');
        this.elements.viewAllProofPrevCollectionTab().eq(0).should('have.text', 'View all proofs');
        return this;
    }

    completeCollection(drawerTitle, customerName, paymentMethod, receivedAmount, remarks, imagePath) {
        this
            .enterCustomerName(drawerTitle, customerName)
            .enterPaymentMethod(paymentMethod)
            .enterAmountToBeReceived(receivedAmount)
            .enterRemarks(remarks)
            .uploadAndVerifyNumberOfSingleImage(imagePath)
            .clickFinishButton();
        return this;
    }

    clickSeeMoreSeeLessButton(customerAddress) {
        this.elements.seeMoreButton().click();
        this.elements.customerAddress().should('have.text', customerAddress);
        return this;
    }

    verifyViewAllProofInPrevCollectionTab(customerName, ...fileNames) {
        this.elements.searchTextField().type(customerName);
        this.elements.viewAllProofPrevCollectionTab().eq(0).click();

        // Loop through the provided filenames and verify them
        fileNames.forEach((expectedFileName, index) => {
            this.elements.expandedImagePrevCollectionTab()
                .invoke('attr', 'src')
                .then((src) => {
                    const actualFileName = src.split('/').pop(); // Extract the file name
                    expect(actualFileName).to.equal(expectedFileName);
                });

            // Navigate to the next image if it's not the last one
            if (index < fileNames.length - 1) {
                this.elements.rightChevronPrevCollectionTab().parent().focus().click("center");
            }
        });

        return this;
    }
}

export default new KamCollectionPage();