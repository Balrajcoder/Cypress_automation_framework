import {KAM_URL} from "../../../constants/kamUrls";
import KamDepositsPage from "../../../components/pages/KamDepositsPage";
import HeaderComponent from "../../../components/common/header_component";
import {ATTACHMENTS} from "../../../constants/attachments";
import FooterComponent from "../../../components/common/footer_component";
import KamHomePage from "../../../components/pages/KamHomePage";
import {MESSAGES} from "../../../constants/messages";
import {ENDPOINTS} from "../../../constants/endpoints";

describe('Deposits-3', function () {
    const testDevice = "samsung-s10";
    let depositsData;
    before(() => {
        cy.fixture('kam_deposits_flow').then((userdata) => {
            depositsData = userdata;
            cy.loginAuth(depositsData.users.kam.username_1, depositsData.users.kam.password);
        });
    })

    beforeEach(() => {
        switch (Cypress.currentTest.title) {
            case 'Verify user is able to deposit an amount by clicking Deposit Now button in home page':
                // Login to KAM app
                cy.sessionLogin(depositsData.users.kam.username_2, depositsData.users.kam.password);
                break;
            case 'Verify negative value can be visible as Total cash in hand amount in home page':
                // Login to KAM app
                cy.sessionLogin(depositsData.users.kam.username_3, depositsData.users.kam.password);
                break;
            case 'Verify user can deposit an amount by clicking Deposit now button in Deposits page':
                // Login to KAM app
                cy.sessionLogin(depositsData.users.kam.username_4, depositsData.users.kam.password);
                break;
            case 'Verify user is able to complete deposit without providing Remarks':
                // Login to KAM app
                cy.sessionLogin(depositsData.users.kam.username_5, depositsData.users.kam.password);
                break;
            default:
                // Login to KAM app
                cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);
                break;
        }
    })

    it('Verify the deposit drawer gets closed after clicking on cross(x) icon', {tags: '@regression'}, () => {

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);

        // Visiting homepage
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits icon
        KamDepositsPage.clickDepositNowButton();

        // Verify the drawer title
        KamDepositsPage.verifyDepositDrawerTitle();

        // Click on the close icon of the deposit drawer
        KamDepositsPage.clickDrawerCloseIcon();

        // Verify that the deposit drawer gets removed
        KamDepositsPage.elements.depositDrawerTitle().should('not.exist');

        // Verify that the user is on the deposit page
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);
    });

    it('Verify the provided values are not getting cached after clicking on cancel button', {tags: '@regression'}, () => {
        const paymentMethod = 'NEFT';

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);

        // Visiting homepage
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits icon
        KamDepositsPage.clickDepositNowButton();

        // Fill the fields in deposit drawer
        KamDepositsPage.enterAmount(depositsData.deposit_amount.positive)
            .enterRemarks(depositsData.remarks)
            .selectPaymentMethod(paymentMethod)
            .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)

        // Clicking on cancel button of deposit drawer and verify that the deposit drawer gets removed
        KamDepositsPage.clickCancelButtonInDrawer()
            .elements.depositDrawerTitle().should('not.exist');

        // Verify that the user is on the deposit page and click on deposit now button
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);
        KamDepositsPage.clickDepositNowButton();

        // Verify the all the fields are not having the previously entered values
        KamDepositsPage.verifyEmptiedFieldInDepositDrawer();
    });

    it('Verify the deposit drawer gets closed after clicking on cancel button', {tags: '@regression'}, () => {

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);

        // Visiting homepage
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits icon
        KamDepositsPage.clickDepositNowButton();

        // Verify that the deposit drawer is opened when clicks on deposit now button of home page
        KamDepositsPage.verifyDepositDrawer();

        // Clicking on cancel button of deposit drawer and verify that the deposit drawer gets removed
        KamDepositsPage.clickCancelButtonInDrawer()
            .elements.depositDrawerTitle().should('not.exist');

        // Verify that the user is on the deposit page
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

        // Navigate to home page
        FooterComponent.clickHomeButton();

        // Clicking on deposits now button of home page
        KamHomePage.clickDepositNowButton();

        // Verify that the deposit drawer is opened when clicks on deposit now button of home page
        KamDepositsPage.verifyDepositDrawer();

        // Clicking on cancel button of deposit drawer and verify that the deposit drawer gets removed
        KamDepositsPage.clickCancelButtonInDrawer()
            .elements.depositDrawerTitle().should('not.exist');

        // Verify that the user is on the deposit page
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);
    });

    it('Verify the payment method field gets cleared after selecting the None option', {tags: '@regression'}, () => {
        const paymentMethod = 'None';

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);

        // Visiting deposit page
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamDepositsPage.clickDepositNowButton();

        // Verify user is not able to deposit the amount
        KamDepositsPage.enterAmount(depositsData.deposit_amount.positive)
            .enterRemarks(depositsData.remarks)
            .selectPaymentMethod(paymentMethod);

        // Verify user can clear the payment method by selecting none option
        KamDepositsPage.clearPaymentMethod();
    });

    it('Verify user is not able to complete deposit after providing the amount as negative value', {tags: '@regression'}, () => {
        const paymentMethod = 'NEFT';

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);

        // Visiting homepage
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamDepositsPage.clickDepositNowButton();

        // Verify user is not able to deposit the amount with negative amount
        KamDepositsPage.enterAmount(depositsData.deposit_amount.negative)
            .enterRemarks(depositsData.remarks)
            .selectPaymentMethod(paymentMethod)
            .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinishButton();

        // Verify error message
        cy.verifyToastMessage(MESSAGES.OBJECT_ERROR);
    });

    it('Verify user is able to deposit an amount by clicking Deposit Now button in home page', {tags: ['@smoke', '@regression']}, () => {
        const paymentMethod = 'NEFT';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Intercepting the executive ledger, cash payments, executive outstanding APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CASH_PAYMENTS}?**`,
            'cashPayments'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.EXECUTIVE_LEDGER}/**`,
            'executiveLedger'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_EXECUTIVE_OUTSTANDING}/**`,
            'executiveOutstanding'
        );

        // Visiting homepage
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamHomePage.clickDepositNowButton();
        cy.wait('@cashPayments');
        cy.wait(3000);

        // Deposit the amount
        KamDepositsPage.enterAmount(depositsData.deposit_amount.positive)
            .enterRemarks(depositsData.remarks)
            .selectPaymentMethod(paymentMethod)
            .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinishButton();

        // Verify success message
        cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
        cy.wait('@executiveLedger');
        cy.wait(3000);

        // Verify the ledger table having the data before depositing the amount, here receive amount is the cash
        // in hand amount and balance amount is (initial balance amount - deposit amount) or
        // (initial balance amount + received amount)
        KamDepositsPage.verifyLedgerTableData(
            1,      // rowIndex will change to 1 from 0 after new entry is added
            receivedAmount,  // receive amount is the cash in hand amount
            0,  // Deposit amount will be 0 as we are validating the data before depositing the amount
            balanceAmountBeforeDeposit
        );

        // Verify the ledger table having the data after depositing the amount
        KamDepositsPage.verifyLedgerTableData(
            0,      // rowIndex will be 0 as the latest entry will always be on the top
            0,  // receive amount is 0 as we are validating the data after depositing the amount
            depositAmount,
            balanceAmountAfterDeposit
        );

        // Verify total cash in hand amount deducted immediately after depositing the amount
        KamDepositsPage.getTotalCashInHandAmount().should('eq', (balanceAmountAfterDeposit).toFixed(2));

        // Validating the data in the previous collection tab
        KamDepositsPage.clickPreviousDataTab();
        cy.wait('@executiveOutstanding');
        cy.wait(3000);

        // Verify cash deposits amount remains 0, not changed to deposit amount
        KamDepositsPage.verifyCashDepositsPanelCard();

        // Navigate to deposit details page and verify the deposit card
        KamDepositsPage.clickChevronAndMoreDetailsOnPanelCard('Cash Deposits');
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

        // Verify the elements in the amount card
        KamDepositsPage.verifyDepositsCardInPreviousData(
            ATTACHMENTS.IMAGE_PATH_1.split('/').pop(),
            depositAmount,
            paymentMethod,
            depositsData.verification_status.pending
        );

        // Verify that the image will open in new tab after clicking on it
        KamDepositsPage.verifyOpeningImageInNewTab();
    });

    it('Verify negative value can be visible as Total cash in hand amount in home page', {tags: '@regression'}, () => {
        const paymentMethod = 'NEFT';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = parseInt(depositsData.cash_in_hand_amount.username_1 + 1700);
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Intercepting the executive ledger, cash payments, executive outstanding APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CASH_PAYMENTS}?**`,
            'cashPayments'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.EXECUTIVE_LEDGER}/**`,
            'executiveLedger'
        );

        // Visiting homepage
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamHomePage.clickDepositNowButton();
        cy.wait('@cashPayments');
        cy.wait(3000);

        // Deposit the amount
        KamDepositsPage.completeDeposit(
            depositAmount,
            depositsData.remarks,
            paymentMethod,
            ATTACHMENTS.IMAGE_PATH_1,
            MESSAGES.COLLECTION_SUCCESS_MESSAGE
        );
        cy.wait('@executiveLedger');
        cy.wait(3000);

        // Verify the negative balance amount in ledger table and negative cash in hand amount
        KamDepositsPage.verifyNegativeCashInHandAmountAndBalanceAmount(balanceAmountAfterDeposit);
    });

    it('Verify user can deposit an amount by clicking Deposit now button in Deposits page', {tags: '@regression'}, () => {
        const paymentMethod = 'NEFT';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Intercepting the executive ledger, executive outstanding APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.EXECUTIVE_LEDGER}/**`,
            'executiveLedger'
        );

        // Visiting homepage
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamDepositsPage.clickDepositNowButton();

        // Deposit the amount
        KamDepositsPage.enterAmount(depositsData.deposit_amount.positive)
            .enterRemarks(depositsData.remarks)
            .selectPaymentMethod(paymentMethod)
            .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinishButton();

        // Verify success message
        cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
        cy.wait('@executiveLedger');
        cy.wait(3000);

        // Verify the ledger table having the data before depositing the amount, here receive amount is the cash
        // in hand amount and balance amount is (initial balance amount - deposit amount) or
        // (initial balance amount + received amount)
        KamDepositsPage.verifyLedgerTableData(
            1,      // rowIndex will change to 1 from 0 after new entry is added
            receivedAmount,  // receive amount is the cash in hand amount
            0,  // Deposit amount will be 0 as we are validating the data before depositing the amount
            balanceAmountBeforeDeposit
        );

        // Verify the ledger table having the data after depositing the amount
        KamDepositsPage.verifyLedgerTableData(
            0,      // rowIndex will be 0 as the latest entry will always be on the top
            0,  // receive amount is 0 as we are validating the data after depositing the amount
            depositAmount,
            balanceAmountAfterDeposit
        );

        // Verify total cash in hand amount deducted immediately after depositing the amount
        KamDepositsPage.getTotalCashInHandAmount().should('eq', (balanceAmountAfterDeposit).toFixed(2));

        // Validating the data in the previous collection tab
        KamDepositsPage.clickPreviousDataTab();

        // Verify cash deposits amount remains 0, not changed to deposit amount
        KamDepositsPage.verifyCashDepositsPanelCard();

        // Navigate to deposit details page and verify the deposit card
        KamDepositsPage.clickChevronAndMoreDetailsOnPanelCard('Cash Deposits');
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

        // Verify the elements in the amount card
        KamDepositsPage.verifyDepositsCardInPreviousData(
            ATTACHMENTS.IMAGE_PATH_1.split('/').pop(),
            depositAmount,
            paymentMethod,
            depositsData.verification_status.pending
        );
    });

    it('Verify user is able to complete deposit without providing Remarks', {tags: '@regression'}, () => {
        const paymentMethod = 'NEFT';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Intercepting the executive ledger, executive outstanding APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.EXECUTIVE_LEDGER}/**`,
            'executiveLedger'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_EXECUTIVE_OUTSTANDING}/**`,
            'executiveOutstanding'
        );

        // Visiting homepage
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamDepositsPage.clickDepositNowButton();

        // Deposit the amount without proving remarks
        KamDepositsPage.enterAmount(depositsData.deposit_amount.positive)
            .selectPaymentMethod(paymentMethod)
            .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinishButton();

        // Verify success message
        cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
        cy.wait('@executiveLedger');
        cy.wait(3000);

        // Verify the ledger table having the data after depositing the amount
        KamDepositsPage.verifyLedgerTableData(
            0,      // rowIndex will be 0 as the latest entry will always be on the top
            0,  // receive amount is 0 as we are validating the data after depositing the amount
            depositAmount,
            balanceAmountAfterDeposit
        );

        // Verify total cash in hand amount deducted immediately after depositing the amount
        KamDepositsPage.getTotalCashInHandAmount().should('eq', (balanceAmountAfterDeposit).toFixed(2));

        // Validating the data in the previous collection tab
        KamDepositsPage.clickPreviousDataTab();
        cy.wait('@executiveOutstanding');
        cy.wait(3000);

        // Verify cash deposits amount remains 0, not changed to deposit amount
        KamDepositsPage.verifyCashDepositsPanelCard();

        // Navigate to deposit details page and verify the deposit card
        KamDepositsPage.clickChevronAndMoreDetailsOnPanelCard('Cash Deposits');
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

        // Verify the elements in the amount card
        KamDepositsPage.verifyDepositsCardInPreviousData(
            ATTACHMENTS.IMAGE_PATH_1.split('/').pop(),
            depositAmount,
            paymentMethod,
            depositsData.verification_status.pending
        );
    });
});