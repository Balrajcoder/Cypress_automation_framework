import UsefulFunctionsUtils from "../../Utility/usefulFunctionsUtils";

class KamDepositsPage {
    elements = {
        yourLedgerTab: () => cy.get("button[data-cy='component.tabs.tab-0']"),
        previousDataTab: () => cy.get("button[data-cy='component.tabs.tab-1']"),
        cashInHandAmount: () => cy.get("div[data-cy='collection.landing.total-amount']"),
        totalCashInHandLabel: () => cy.get("div[data-cy='collection.landing.total-amount-label']"),
        depositNowButton: () => cy.get("button[data-cy='kam.landing.depositNow']"),
        ledgerTable: () => cy.get("table[data-cy='kam.deposit.ledgerTable']"),
        ledgerTableHeader: () => cy.get("thead[data-cy='kam.deposit.ledger.tableHead']"),
        ledgerTableBody: () => cy.get("tbody[data-cy='kam.deposit.ledger.tableBody']"),
        depositDrawerTitle: () => cy.get("p[data-cy='drawer-title']"),
        drawerCloseIcon: () => cy.get("[data-cy='drawer-close-icon']"),
        depositAmountInput: () => cy.get("div[data-cy='deposit.create.form.amount']"),
        remarksTextFieldInDrawer: () => cy.get("div[data-cy='deposit.create.form.remarks']"),
        paymentMethodDropdown: () => cy.get("div[data-cy='deposit.create.form.paymentMethod']"),
        paymentMethods: () => cy.get("ul[role='listbox']"),
        imagePreview: () => cy.get("[data-cy='kam.collection.form.noImg-preview']"),
        uploadImageInput: () => cy.get("#attachments"),
        attachedImages: () => cy.get("div[data-cy='attachedImages']"),
        deleteButton: () => cy.get("button[data-cy='confirmModalDeleteButton']"),
        imageDeleteIcon: () => cy.get("img[data-cy='kam.imageViewer.deleteIcon']"),
        uploadImageButtonInDrawer: () => cy.get("span[data-cy='kam.deposit.drawer.uploadImageButton']"),
        imageCountInDrawer: () => cy.get("p[data-cy='kam.deposit.form.imgCount']"),
        finishButtonInDrawer: () => cy.get("button[data-cy='kam.deposit.create.finishButton']"),
        cancelButtonInDrawer: () => cy.get("button[data-cy='kam.deposit.create.cancelButton']"),
        panelCards: () => cy.get("div[data-cy='kam.deposit.panelCards']"),
        viewMoreDeposits: () => cy.get("a[data-cy='kam.deposits.viewMoreDeposits']"),
        viewMoreCollections: () => cy.get("a[data-cy='kam.deposits.viewMoreCollections']"),
        viewMorePeerTransactions: () => cy.get("a[data-cy='kam.deposits.viewMorePeerTransactions']"),
        paymentProofsPrevData: () => cy.get("div[data-cy*='kam.deposit.landing.'][data-cy*='.payment_proofs_preview']"),
        virtualPaymentProofsPrevData: () => cy.get("div[data-cy*='kam.deposit.landing.'][data-cy*='.payment_proofs_wrapper']"),
        viewProofsPrevData: () => cy.get("div[data-cy*='kam.deposit.landing.'][data-cy*='.payment_proofs_view_all']"),
        depositedAmountsPrevData: () => cy.get("div[data-cy='depositAmount']"),
        transferMethodsPrevData: () => cy.get("div[data-cy='transferMethod']"),
        paymentTimesPrevData: () => cy.get("p[data-cy='transferTime']"),
        paymentStatusesPrevData: () => cy.get("div[data-cy='statusLabel']"),
        paymentProofImagesPrevData: () => cy.get("img[data-cy='kam.imageViewer.image']"),
        paymentCard: () => cy.get("div[data-cy*='kam.deposit.landing.'][data-cy*='.card']"),
        upiDrawer: () => cy.get("div[data-cy='kam.deposit_upiDrawer']"),
        upiPlatforms: () => cy.get("div[data-cy='kam.deposit.upiPlatforms']"),
        upiPayButton: () => cy.get("button[data-cy='kam.deposit.upiPaymentButton']"),
        upiRadioButton: () => cy.get("span[data-cy='kam.deposit.upiRadioButton']"),
        virtualPaymentConfirmationDrawer: () => cy.get("div[data-cy='virtualPaymentConfirmation']"),
        virtualPaymentStatusDrawer: () => cy.get("div[data-cy='virtualPaymentStatusDrawer']"),
        paymentStatusDrawer: () => cy.get("p[data-cy='paymentStatus']"),
        paymentOf: () => cy.get("p[data-cy='paymentOf']"),
        virtualPaymentDescription: () => cy.get("p[data-cy='virtualPaymentDescription']"),
        goiItButton: () => cy.get("button[data-cy='gotItButton']"),
        dialIcon: () => cy.get("a[data-cy='kam.customers.customer-poc-phone-number']"),
        customerName: () => cy.get("div[data-cy*='collection.landing.collection-due.'][data-cy*='customer-name']"),
        collectedAmount: () => cy.get("div[data-cy='collectedAmount']"),
        peerTransactionCard: () => cy.get("div[data-cy='peerTransactionCard']"),
        profileIcon: () => cy.get("div[data-cy='profileIcon']"),
        peerName: () => cy.get("div[data-cy='peerName']"),
        peerTransactionAmount: () => cy.get("div[data-cy='peerTransactionAmount']"),
        peerTransactionTime: () => cy.get("div[data-cy='peerTransactionTime']"),
        collectionType: () => cy.get("div[data-cy='collectionType']")
    }

    clickDepositNowButton() {
        this.elements.depositNowButton().click();
        return this;
    }

    verifyYourLedgerTabIsSelected() {
        this.elements.yourLedgerTab().should('have.attr', 'aria-selected', 'true');
        return this;
    }

    clickPreviousDataTab() {
        this.elements.previousDataTab().click();
        return this;
    }

    verifyPreviousDataTabIsSelected() {
        this.elements.previousDataTab().should('have.attr', 'aria-selected', 'true');
        return this;
    }

    getTotalCashInHandAmount() {
        return this.elements.cashInHandAmount().find('span').invoke('text')
            .then(($text) => {
                return UsefulFunctionsUtils.cleanFormattedAmount($text);
            });
    }

    verifyElementsInAmountCard() {
        this.elements.totalCashInHandLabel().should('have.text', 'Total cash in hand');
        this.elements.depositNowButton().should('exist');
        return this;
    }

    verifyLedgerTable() {
        this.elements.ledgerTable().should('exist');
        this.elements.ledgerTableHeader().find('tr').find('th').eq(0).should('have.text', 'Date and Time');
        this.elements.ledgerTableHeader().find('tr').find('th').eq(1).should('have.text', 'Received');
        this.elements.ledgerTableHeader().find('tr').find('th').eq(2).should('have.text', 'Deposited');
        this.elements.ledgerTableHeader().find('tr').find('th').eq(3).should('have.text', 'Balance');
        return this;
    }

    verifyLedgerTableData(rowIndex, receivedAmount, depositedAmount, balanceAmount) {
        this.elements.ledgerTableBody().find('tr').eq(rowIndex).find('td').eq(0)
            .invoke('text').then((text) => {
            expect(UsefulFunctionsUtils.isValidDateTime(text.trim())).to.be.true;
            this.elements.ledgerTableBody().find('tr').eq(rowIndex).find('td').eq(1)
                .invoke('text').then((text) => {
                expect(text.trim()).to.equal(UsefulFunctionsUtils.formatAmount(receivedAmount));
                this.elements.ledgerTableBody().find('tr').eq(rowIndex).find('td').eq(2)
                    .invoke('text')
                    .then((text) => {
                        expect(text.trim()).to.equal(UsefulFunctionsUtils.formatAmount(depositedAmount));
                        this.elements.ledgerTableBody().find('tr').eq(rowIndex).find('td').eq(3)
                            .invoke('text')
                            .then((text) => {
                                expect(text.trim()).to.equal(UsefulFunctionsUtils.formatAmount(balanceAmount));
                            })
                    })
            })
        })
        return this;
    }

    verifyDepositDrawerTitle() {
        this.elements.depositDrawerTitle().should('have.text', 'New cash deposit');
        return this;
    }

    verifyDepositDrawer() {
        this.verifyDepositDrawerTitle();
        this.elements.drawerCloseIcon().should('exist').and('be.visible');
        this.elements.depositAmountInput().should('exist');
        this.elements.depositAmountInput().parent().find('label')
            .should('have.text', 'Amount being deposited');
        this.elements.remarksTextFieldInDrawer().find('textarea').should('exist');
        this.elements.remarksTextFieldInDrawer().parent().find('label')
            .should('have.text', 'Remarks');
        this.elements.paymentMethodDropdown().should('exist');
        this.elements.paymentMethodDropdown().find("div").should('exist')
            .and('have.attr', 'aria-haspopup', 'listbox');
        this.elements.paymentMethodDropdown().find('input').should('exist');
        this.elements.paymentMethodDropdown().parent().parent().find('label')
            .should('have.text', 'Select payment method');
        this.elements.paymentMethodDropdown().click();
        this.elements.paymentMethods().should('be.visible');
        this.elements.paymentMethods().find('li').should('have.length', 9);
        this.elements.paymentMethods().find('li').find('em').should('have.text', 'None')
        this.elements.paymentMethods().find('li').find('p').eq(0)
            .should('have.text', 'Virtual Payment');
        this.elements.paymentMethods().find('li').find('p').eq(1)
            .should('have.text', 'ATM');
        this.elements.paymentMethods().find('li').find('p').eq(2)
            .should('have.text', 'NEFT');
        this.elements.paymentMethods().find('li').find('p').eq(3)
            .should('have.text', 'RTGS');
        this.elements.paymentMethods().find('li').find('p').eq(4)
            .should('have.text', 'IMPS');
        this.elements.paymentMethods().find('li').find('p').eq(5)
            .should('have.text', 'CHEQUE');
        this.elements.paymentMethods().find('li').find('p').eq(6)
            .should('have.text', 'BANK DEPOSIT');
        this.elements.paymentMethods().find('li').find('p').eq(7)
            .should('have.text', 'UPI');
        this.elements.paymentMethods().find('li').contains('None').click();
        this.elements.imagePreview().should('exist').and('be.visible');
        this.elements.uploadImageInput().should('exist');
        this.elements.uploadImageButtonInDrawer().should('exist')
            .and('have.text', 'Upload more photos');
        this.elements.imageCountInDrawer().should('have.text', '0 images');
        this.elements.finishButtonInDrawer().should('exist');
        this.elements.cancelButtonInDrawer().should('exist');
        return this;
    }

    clickCancelButtonInDrawer() {
        this.elements.cancelButtonInDrawer().click();
        return this;
    }

    verifyNumberOfPanelCards() {
        this.elements.panelCards().should('have.length', 3);
        return this;
    }

    verifyCashDepositsPanelCard(cashDepositAmount = 0) {
        this.elements.panelCards().eq(0).find('h6').should('have.text', 'Cash Deposits');
        this.elements.panelCards().eq(0).find('p').eq(0)
            .should('have.text', UsefulFunctionsUtils.formatAmount(cashDepositAmount));
        this.elements.panelCards().eq(0).find('p').eq(1)
            .should('have.text', 'Deposited');
        this.elements.panelCards().eq(0).find('div').find('svg').should('exist');
        return this;
    }

    verifyCashCollectionsPanelCard(cashCollectionAmount = 0) {
        this.elements.panelCards().eq(1).find('h6').should('have.text', 'Cash Collections');
        this.elements.panelCards().eq(1).find('p').eq(0)
            .should('have.text', UsefulFunctionsUtils.formatAmount(cashCollectionAmount));
        this.elements.panelCards().eq(1).find('p').eq(1)
            .should('have.text', 'Collected');
        this.elements.panelCards().eq(1).find('div').find('svg').should('exist');
        return this;
    }

    verifyPeerTransactionsPanelCard(peerTransactionAmount = 0) {
        this.elements.panelCards().eq(2).find('h6')
            .should('have.text', 'Peer Transactions');
        this.elements.panelCards().eq(2).find('p').eq(0)
            .should('have.text', UsefulFunctionsUtils.formatAmount(peerTransactionAmount));
        this.elements.panelCards().eq(2).find('p').eq(1)
            .should('have.text', 'transferred by Peers');
        this.elements.panelCards().eq(2).find('div').find('svg').should('exist');
        return this;
    }

    enterAmount(amount) {
        this.elements.depositAmountInput().clear().type(amount);
        return this;
    }

    enterRemarks(remarks) {
        this.elements.remarksTextFieldInDrawer().find('textarea').eq(0).clear().type(remarks);
        return this;
    }

    selectPaymentMethod(paymentMethod) {
        this.elements.paymentMethodDropdown().click();
        this.elements.paymentMethods().find('li').contains(paymentMethod).click();
        return this;
    }

    uploadAndVerifyNumberOfSingleImage(imagePath) {
        this.elements.imageCountInDrawer().should('have.text', '0 images');
        this.elements.uploadImageInput().selectFile(imagePath, {force: true});
        this.elements.imageCountInDrawer().should('have.text', '1 images');
        return this;
    }

    deleteAndVerifyZeroImages() {
        this.elements.attachedImages().find('img').click();
        this.elements.imageDeleteIcon().click();
        this.elements.deleteButton().click();
        this.elements.imageCountInDrawer().should('have.text', '0 images');
        return this;
    }

    clickFinishButton() {
        this.elements.finishButtonInDrawer().click();
        return this;
    }

    clickChevronAndMoreDetailsOnPanelCard(cardTitle) {
        switch (cardTitle) {
            case 'Cash Deposits':
                this.elements.panelCards().eq(0).find('div').find('svg').click();
                this.elements.viewMoreDeposits().click();
                break;
            case 'Cash Collections':
                this.elements.panelCards().eq(1).find('div').find('svg').click();
                this.elements.viewMoreCollections().click();
                break;
            case 'Peer Transactions':
                this.elements.panelCards().eq(2).find('div').find('svg').click();
                this.elements.viewMorePeerTransactions().click();
                break;
        }
    }

    clickRandomPlacesOnPanelCard(cardTitle) {
        switch (cardTitle) {
            case 'Cash Deposits':
                this.elements.panelCards().eq(0).click("center");
                this.elements.viewMoreDeposits().click();
                break;
            case 'Cash Collections':
                this.elements.panelCards().eq(1).click("center");
                this.elements.viewMoreCollections().click();
                break;
            case 'Peer Transactions':
                this.elements.panelCards().eq(2).click("center");
                this.elements.viewMorePeerTransactions().click();
                break;
        }
    }

    verifyDepositsCardInPreviousData(fileName, depositedAmount, paymentMethod, paymentStatus) {
        this.elements.paymentProofsPrevData().eq(0).should('exist');
        this.elements.paymentProofsPrevData().eq(0).find('img').should('have.attr', 'src')
            .and('include', fileName);
        this.elements.viewProofsPrevData().eq(0).should('exist');
        this.elements.depositedAmountsPrevData().eq(0).find('span')
            .should('have.text', UsefulFunctionsUtils.formatAmount(depositedAmount));
        this.elements.transferMethodsPrevData().eq(0).should('have.text', paymentMethod);
        this.elements.paymentTimesPrevData().eq(0).invoke('text')
            .should((text) => {
                // Extract text after "Payment deposited at "
                const extractedText = text.match(/Payment deposited at (.+)/)[1];
                expect(UsefulFunctionsUtils.isValidDateTime(extractedText)).to.be.true;
            });
        this.elements.paymentStatusesPrevData().eq(0).should('have.text', paymentStatus);
        this.elements.viewProofsPrevData().eq(0).click();
        this.elements.paymentProofImagesPrevData().should('exist');
        return this;
    }

    verifyCashCollectionsCardInPreviousData(customerName, collectedAmount, paymentStatus) {
        this.elements.paymentCard().eq(0).should('exist').and('be.visible');
        this.elements.dialIcon().eq(0).should('exist').and('be.visible');
        this.elements.customerName().eq(0).should('have.text', customerName);
        this.elements.collectedAmount().eq(0).find('span')
            .should('have.text', UsefulFunctionsUtils.formatAmount(collectedAmount));
        this.elements.paymentTimesPrevData().eq(0).invoke('text')
            .should((text) => {
                // Extract text after "Payment deposited at "
                const extractedText = text.match(/Payment collected at (.+)/)[1];
                expect(UsefulFunctionsUtils.isValidDateTime(extractedText)).to.be.true;
            });
        this.elements.paymentStatusesPrevData().eq(0).should('have.text', paymentStatus);
        return this;
    }

    verifyPeerTransactionCardInPreviousData(collectorName, depositorName, depositedAmount, collectedAmount) {
        this.elements.peerTransactionCard().should('have.length', 2);
        this.elements.profileIcon().eq(0).should('exist');
        this.elements.profileIcon().eq(1).should('exist');
        this.elements.peerName().eq(0).invoke('text')
            .should((text) => {
                expect(text.trim()).to.equal(collectorName)
            });
        this.elements.peerName().eq(0).invoke('text')
            .should((text) => {
                expect(text.trim()).to.equal(depositorName)
            });
        this.elements.dialIcon().eq(0).should('exist');
        this.elements.dialIcon().eq(1).should('exist');
        this.elements.peerTransactionAmount().eq(0)
            .should('have.text', UsefulFunctionsUtils.formatAmount(depositedAmount));
        this.elements.peerTransactionAmount().eq(1)
            .should('have.text', UsefulFunctionsUtils.formatAmount(collectedAmount));
        this.elements.peerTransactionTime().eq(0).invoke('text').should((text) => {
            expect(UsefulFunctionsUtils.isValidDateTime(text)).to.be.true;
        });
        this.elements.peerTransactionTime().eq(1).invoke('text').should((text) => {
            expect(UsefulFunctionsUtils.isValidDateTime(text)).to.be.true;
        });
        this.elements.collectionType().eq(0).should('have.text', 'Deposited');
        this.elements.collectionType().eq(1).should('have.text', 'Collected');
        return this;
    }

    verifyOpeningImageInNewTab() {
        this.elements.viewProofsPrevData().eq(0).click({force: true});
        this.elements.paymentProofImagesPrevData().invoke('attr', 'src').then((url) => {
            cy.window().then((win) => {
                cy.stub(win, 'open').as('windowOpen');

                // Click the image
                this.elements.paymentProofImagesPrevData().click("center");

                // Verify that window.open was called
                cy.get('@windowOpen').should('be.always.calledWithExactly', url, "_blank");
            })
        })
    }

    verifyDepositsCardInPreviousDataForVirtualPayment(depositedAmount, paymentStatus) {
        this.elements.virtualPaymentProofsPrevData().eq(0).should('exist');
        this.elements.virtualPaymentProofsPrevData().eq(0).find('img')
            .should('have.attr', 'src').and('include', "gallery.svg");
        this.elements.depositedAmountsPrevData().eq(0).find('span')
            .should('have.text', UsefulFunctionsUtils.formatAmount(depositedAmount));
        this.elements.transferMethodsPrevData().eq(0).should('have.text', 'VIRTUAL_PAYMENT');
        this.elements.paymentTimesPrevData().eq(0).invoke('text')
            .should((text) => {
                // Extract text after "Payment deposited at "
                const extractedText = text.match(/Payment deposited at (.+)/)[1];
                expect(UsefulFunctionsUtils.isValidDateTime(extractedText)).to.be.true;
            });
        this.elements.paymentStatusesPrevData().eq(0).should('have.text', paymentStatus);
        return this;
    }

    completeDeposit(depositAmount, remarks, paymentMethod, imagePath, successMessage) {
        this.enterAmount(depositAmount)
            .enterRemarks(remarks)
            .selectPaymentMethod(paymentMethod)
            .uploadAndVerifyNumberOfSingleImage(imagePath)
            .clickFinishButton();
        cy.verifyToastMessage(successMessage);
        return this;
    }

    verifyNegativeCashInHandAmountAndBalanceAmount(amount) {
        this.elements.cashInHandAmount().find('b')
            .should('have.text', `(-) ${UsefulFunctionsUtils.formatAmount(amount)}`);
        this.elements.ledgerTableBody().find('tr').eq(0).find('td').eq(3).find('b')
            .should('have.text', `(-) ${UsefulFunctionsUtils.formatAmount(amount)}`);
        return this;
    }

    verifyAmountTextFieldErrorMessage(errorMessage) {
        this.elements.depositAmountInput().find('p').should('have.text', errorMessage);
        return this;
    }

    verifyPaymentMethodErrorMessage(errorMessage) {
        this.elements.paymentMethodDropdown().next('p').should('have.text', errorMessage);
        return this;
    }

    verifyImageUploadErrorMessage(errorMessage) {
        this.elements.uploadImageInput().parent().find('p').should('have.text', errorMessage);
        return this;
    }

    clearPaymentMethod() {
        this.elements.paymentMethodDropdown().click();
        this.elements.paymentMethods().find('li').contains('None').click();
        this.elements.paymentMethodDropdown().find('input').should('have.value', "");
        return this;
    }

    completeDepositWithVirtualPayment(depositAmount, remarks) {
        this.enterAmount(depositAmount)
            .enterRemarks(remarks)
            .selectPaymentMethod('Virtual Payment');

        // Verify the image upload section is not present
        this.elements.imagePreview().should('not.exist');
        this.elements.uploadImageInput().should('not.exist');
        this.elements.uploadImageButtonInDrawer().should('not.exist');
        this.elements.imageCountInDrawer().should('not.exist');

        this.clickFinishButton();
        this.elements.upiDrawer().parent().should('exist');
        this.elements.drawerCloseIcon().should('exist');
        this.elements.upiPlatforms().should('have.length', 3);
        const platforms = ['Google Pay', 'Paytm', 'PhonePe'];
        platforms.forEach((platform, index) => {
            this.elements.upiPlatforms().eq(index).contains(platform).should('exist');
            this.elements.upiRadioButton().find('input').eq(index).should('exist')
                .and(index === 0 ? 'be.checked' : 'not.be.checked');
        });
        this.elements.upiDrawer().find('p').contains('Other UPI App').should('exist');

        // Intercept window.open and prevent it
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen');

            // Click the button
            cy.wait(2000);
            this.elements.upiPayButton().click();

            // Verify that window.open was called
            cy.get('@windowOpen').should('have.been.called');

            // Verify the virtual payment drawer
            this.elements.virtualPaymentConfirmationDrawer().find('h6').eq(1)
                .should('have.text', 'UPI Payment initiated, Please complete the payment in your UPI App and return to this page in');
            this.elements.virtualPaymentConfirmationDrawer().find('div').find('h6')
                .should('contain.text', 'Total Amount to be paid');
            this.elements.virtualPaymentConfirmationDrawer().find('div').find('h6').find('span')
                .invoke('text').should((text) => {
                expect(UsefulFunctionsUtils.isValidDateTime(text)).to.be.true;
            });
            this.elements.virtualPaymentConfirmationDrawer().find('h4')
                .should('have.text', UsefulFunctionsUtils.formatAmount(depositAmount));
            this.elements.virtualPaymentConfirmationDrawer().find('h5').invoke('text')
                .should((initialText) => {
                    const countdown = parseInt(initialText.match(/(\d+)\sSec/)[1], 10);
                    expect(countdown).to.be.a('number');
                })
            this.elements.drawerCloseIcon().eq(0).click();
            this.elements.virtualPaymentStatusDrawer().find('div').eq(2).should('exist');
            this.elements.drawerCloseIcon().should('exist');
            this.elements.paymentStatusDrawer().should('have.text', 'Payment in_progress');
            this.elements.paymentOf().should('have.text', `Payment of ₹ ${depositAmount} is in Progress`);
            this.elements.virtualPaymentDescription()
                .should(
                    'have.text',
                    'If amount is deducted from your account, please check the previous data tab after few minutes. Otherwise please retry the payment'
                );
            this.elements.goiItButton().click();
        });
    }

    verifyEmptiedFieldInDepositDrawer() {
        this.verifyDepositDrawerTitle();
        this.elements.depositAmountInput().find('input').should('have.value', '');
        this.elements.remarksTextFieldInDrawer().find('textarea').eq(0).should('have.text', '');
        this.elements.paymentMethodDropdown().find('input').should('have.value', "");
        this.elements.imageCountInDrawer().should('have.text', '0 images');
    }

    clickDrawerCloseIcon() {
        this.elements.drawerCloseIcon().click();
        return this;
    }
}

export default new KamDepositsPage();