import {ENDPOINTS} from "../../../constants/endpoints";
import {KAM_URL} from "../../../constants/kamUrls";
import KamDepositsPage from "../../../components/pages/KamDepositsPage";
import {ATTACHMENTS} from "../../../constants/attachments";
import {MESSAGES} from "../../../constants/messages";
import HeaderComponent from "../../../components/common/header_component";
import KamHomePage from "../../../components/pages/KamHomePage";
import DateTimeUtils from "../../../Utility/dateTimeUtils";

describe('Deposits-2', function () {
    const testDevice = 'samsung-s10';
    let depositsData;
    let depositVerificationPayload;
    let depositRejectionPayload;
    let depositId;
    let transactionTime;
    before(() => {
        cy.fixture('kam_deposits_flow').then((userdata) => {
            depositsData = userdata;
            cy.loginAuth(depositsData.users.kam.username_1, depositsData.users.kam.password);
        });
        cy.fixture('kamPayload').then((payload) => {
            depositVerificationPayload = payload.deposit_verification;
            depositRejectionPayload = payload.deposit_rejection;
        })
    })

    it('Verify user is able to complete the deposit by selecting the payment method as Virtual Payment', {tags: ['@smoke', '@regression']}, () => {
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_6, depositsData.users.kam.password);

        // Intercepting the executive ledger, executive outstanding, cash payments APIs
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
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CASH_PAYMENTS}?**`,
            'cashPayments'
        );

        // Visiting homepage
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamDepositsPage.clickDepositNowButton();
        cy.wait(['@executiveLedger', '@cashPayments']);
        cy.wait(1000);

        // Verify ledger table before depositing the amount
        KamDepositsPage.verifyLedgerTableData(
            0,
            receivedAmount,  // receive amount is the cash in hand amount
            0,  // Deposit amount will be 0 as we are validating the data before depositing the amount
            balanceAmountBeforeDeposit
        );

        // Cash in hand amount before depositing the amount
        KamDepositsPage.getTotalCashInHandAmount().should('eq', (balanceAmountBeforeDeposit).toFixed(2));

        // Deposit the amount, here we need not to upload image
        KamDepositsPage.completeDepositWithVirtualPayment(
            depositAmount,
            depositsData.remarks
        );

        // Verify ledger table after depositing the amount
        KamDepositsPage.verifyLedgerTableData(
            0,      // No new entry will be added
            receivedAmount,  // receive amount is the cash in hand amount
            0,  // Deposit amount will be 0 as we are validating the data before depositing the amount
            balanceAmountBeforeDeposit  // Before deposit amount and after deposit amount will be same
        );

        // Cash in hand amount after depositing the amount
        KamDepositsPage.getTotalCashInHandAmount().should('eq', (balanceAmountBeforeDeposit).toFixed(2));

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
        KamDepositsPage.verifyDepositsCardInPreviousDataForVirtualPayment(
            depositAmount,
            depositsData.verification_status.in_progress
        );
    });

    it('Verify user is able to complete the deposit by selecting the payment method as ATM', {tags: '@regression'}, () => {
        const paymentMethod = 'ATM';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_7, depositsData.users.kam.password);

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

        // Deposit the amount
        KamDepositsPage.completeDeposit(
            depositsData.deposit_amount.positive,
            depositsData.remarks,
            paymentMethod,
            ATTACHMENTS.IMAGE_PATH_1,
            MESSAGES.COLLECTION_SUCCESS_MESSAGE
        );
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
    });

    it('Verify user is able to complete the deposit by selecting the payment method as RTGS', {tags: '@regression'}, () => {
        const paymentMethod = 'RTGS';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_8, depositsData.users.kam.password);

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

        // Deposit the amount
        KamDepositsPage.completeDeposit(
            depositsData.deposit_amount.positive,
            depositsData.remarks,
            paymentMethod,
            ATTACHMENTS.IMAGE_PATH_1,
            MESSAGES.COLLECTION_SUCCESS_MESSAGE
        );
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
    });

    it('Verify user is able to complete the deposit by selecting the payment method as IMPS', {tags: '@regression'}, () => {
        const paymentMethod = 'IMPS';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_9, depositsData.users.kam.password);

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

        // Deposit the amount
        KamDepositsPage.completeDeposit(
            depositsData.deposit_amount.positive,
            depositsData.remarks,
            paymentMethod,
            ATTACHMENTS.IMAGE_PATH_1,
            MESSAGES.COLLECTION_SUCCESS_MESSAGE
        );
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
    });

    it('Verify user is able to complete the deposit by selecting the payment method as CHEQUE', {tags: '@regression'}, () => {
        const paymentMethod = 'CHEQUE';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_10, depositsData.users.kam.password);

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

        // Deposit the amount
        KamDepositsPage.completeDeposit(
            depositsData.deposit_amount.positive,
            depositsData.remarks,
            paymentMethod,
            ATTACHMENTS.IMAGE_PATH_1,
            MESSAGES.COLLECTION_SUCCESS_MESSAGE
        );
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
    });

    it('Verify user is able to complete the deposit by selecting the payment method as Bank Deposit', {tags: '@regression'}, () => {
        const paymentMethod = 'BANK DEPOSIT';
        const paymentMethodLabel = 'BANK_DEPOSIT';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_11, depositsData.users.kam.password);

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

        // Deposit the amount
        KamDepositsPage.completeDeposit(
            depositsData.deposit_amount.positive,
            depositsData.remarks,
            paymentMethod,
            ATTACHMENTS.IMAGE_PATH_1,
            MESSAGES.COLLECTION_SUCCESS_MESSAGE
        );
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
            paymentMethodLabel,
            depositsData.verification_status.pending
        );
    });

    it('Verify user is able to complete the deposit by selecting the payment method as UPI', {tags: '@regression'}, () => {
        const paymentMethod = 'UPI';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_12, depositsData.users.kam.password);

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

        // Deposit the amount
        KamDepositsPage.completeDeposit(
            depositsData.deposit_amount.positive,
            depositsData.remarks,
            paymentMethod,
            ATTACHMENTS.IMAGE_PATH_1,
            MESSAGES.COLLECTION_SUCCESS_MESSAGE
        );
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
    });

    it('Verify total cash in hand amount unchanged after verifying the deposit', {tags: '@regression'}, () => {
        const paymentMethod = 'NEFT';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_13, depositsData.users.kam.password);

        // Intercepting the executive ledger, executive outstanding APIs and executive deposit API to get payment id,
        // transaction time
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
        cy.customIntercept('POST', ENDPOINTS.EXECUTIVE_DEPOSIT, 'deposit');

        // Visiting homepage
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamDepositsPage.clickDepositNowButton();

        // Deposit the amount
        KamDepositsPage.completeDeposit(
            depositsData.deposit_amount.positive,
            depositsData.remarks,
            paymentMethod,
            ATTACHMENTS.IMAGE_PATH_1,
            MESSAGES.COLLECTION_SUCCESS_MESSAGE
        )

        // Waiting for the API response to get payment id and transaction time
        cy.wait('@deposit').then((depositResponse) => {
            expect(depositResponse.response.statusCode).to.eq(200);
            expect(depositResponse.response.body).to.not.be.empty;

            depositId = depositResponse.response.body.id;
            transactionTime = depositResponse.response.body.transaction_time;

            cy.wait('@executiveLedger');
            cy.wait(3000);

            // Verify total cash in hand amount deducted immediately after depositing the amount
            KamDepositsPage.getTotalCashInHandAmount().should('eq', (balanceAmountAfterDeposit).toFixed(2));

            // Verify the deposit from CRM dashboard using API
            const payload = {
                executive_deposit: {
                    ...depositVerificationPayload.executive_deposit, // Maintain structure
                    transaction_time: DateTimeUtils.convertUnixToISOWithOffset(transactionTime),
                    verification_time: DateTimeUtils.getIsoTimestamp()
                }
            };
            cy.sendRequest(
                'PUT',
                ENDPOINTS.DEPOSIT_VERIFICATION(depositId),
                {body: payload})
                .then(() => {
                    cy.reload();
                    cy.wait('@executiveOutstanding');
                    cy.wait(3000);

                    // Verify total cash in hand amount remains same after verifying the deposit
                    KamDepositsPage.getTotalCashInHandAmount()
                        .should('eq', (balanceAmountAfterDeposit).toFixed(2));

                    // Validating the data in the previous collection tab
                    KamDepositsPage.clickPreviousDataTab();
                    cy.wait('@executiveOutstanding');
                    cy.wait(3000);

                    // Verify after verification cash deposits amount will be changed to deposit amount
                    KamDepositsPage.verifyCashDepositsPanelCard(depositAmount);

                    // Navigate to deposit details page and verify the deposit card
                    KamDepositsPage.clickChevronAndMoreDetailsOnPanelCard('Cash Deposits');
                    HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

                    // Verify the elements in the amount card
                    KamDepositsPage.verifyDepositsCardInPreviousData(
                        ATTACHMENTS.IMAGE_PATH_1.split('/').pop(),
                        depositAmount,
                        paymentMethod,
                        depositsData.verification_status.verified
                    );
                })
        })
    });

    it('Verify total cash in hand amount increased immediately after rejecting the deposit', {tags: '@regression'}, () => {
        const paymentMethod = 'NEFT';
        const initialBalanceAmount = 0;
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;
        const depositAmount = depositsData.deposit_amount.positive;
        const balanceAmountBeforeDeposit = parseInt(initialBalanceAmount + receivedAmount);
        const balanceAmountAfterDeposit = balanceAmountBeforeDeposit - depositAmount;

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_14, depositsData.users.kam.password);

        // Intercepting the executive ledger, executive outstanding APIs and executive deposit API to get payment id,
        // transaction time
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
        cy.customIntercept('POST', ENDPOINTS.EXECUTIVE_DEPOSIT, 'deposit');

        // Visiting homepage
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamDepositsPage.clickDepositNowButton();

        // Deposit the amount
        KamDepositsPage.completeDeposit(
            depositsData.deposit_amount.positive,
            depositsData.remarks,
            paymentMethod,
            ATTACHMENTS.IMAGE_PATH_1,
            MESSAGES.COLLECTION_SUCCESS_MESSAGE
        )

        // Waiting for the API response to get payment id and transaction time
        cy.wait('@deposit').then((depositResponse) => {
            expect(depositResponse.response.statusCode).to.eq(200);
            expect(depositResponse.response.body).to.not.be.empty;

            depositId = depositResponse.response.body.id;
            transactionTime = depositResponse.response.body.transaction_time;

            cy.wait('@executiveLedger');
            cy.wait(3000);

            // Verify total cash in hand amount deducted immediately after depositing the amount
            KamDepositsPage.getTotalCashInHandAmount()
                .should('eq', (balanceAmountAfterDeposit).toFixed(2));

            // Rejecting the deposit from CRM dashboard using API
            const payload = {
                executive_deposit: {
                    ...depositRejectionPayload.executive_deposit, // Maintain structure
                    verification_date: DateTimeUtils.getCurrentEpochTimeInMilliseconds()
                }
            };
            cy.sendRequest(
                'PUT',
                ENDPOINTS.DEPOSIT_VERIFICATION(depositId),
                {body: payload})
                .then(() => {
                    cy.reload();
                    cy.wait('@executiveOutstanding');
                    cy.wait(3000);

                    // Verify total cash in hand amount added immediately after rejecting the amount
                    KamDepositsPage.getTotalCashInHandAmount()
                        .should('eq', (balanceAmountBeforeDeposit).toFixed(2));

                    // Validating the data in the previous collection tab
                    KamDepositsPage.clickPreviousDataTab();
                    cy.wait('@executiveOutstanding');
                    cy.wait(3000);

                    // Verify after rejection of the cash deposit the amount will be changed to 0
                    KamDepositsPage.verifyCashDepositsPanelCard();

                    // Navigate to deposit details page and verify the deposit card
                    KamDepositsPage.clickChevronAndMoreDetailsOnPanelCard('Cash Deposits');
                    HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

                    // Verify the elements in the amount card
                    KamDepositsPage.verifyDepositsCardInPreviousData(
                        ATTACHMENTS.IMAGE_PATH_1.split('/').pop(),
                        depositAmount,
                        paymentMethod,
                        depositsData.verification_status.rejected
                    );
                })
        })
    });

    it('Verify user can see all the collection by clicking View more peer transactions and after that user can navigate to Your ledger tab if he clicks on soft back button', {tags: '@regression'}, () => {
        const depositedAmount = 170;
        const collectedAmount = 200;
        const peerTransactionAmount = parseInt(depositedAmount + collectedAmount);

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_15, depositsData.users.kam.password);

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

        // Visiting home page
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);
        cy.wait('@executiveOutstanding');
        cy.wait(3000)

        // Verify the cash in hand amount in home page
        KamDepositsPage.getTotalCashInHandAmount().should('eq', (collectedAmount - depositedAmount).toFixed(2));

        // Clicking on deposits icon
        KamHomePage.clickDepositIcon();
        cy.wait(['@executiveLedger', '@executiveOutstanding', '@cashPayments']);
        cy.wait(3000);

        // Verify the ledger table for deposited amount
        KamDepositsPage.verifyLedgerTable()
            .verifyLedgerTableData(
                0,
                0, // Received amount is 0
                depositedAmount,
                collectedAmount - depositedAmount // Balance amount
            );

        // Verify the ledger table for collected amount
        KamDepositsPage.verifyLedgerTable()
            .verifyLedgerTableData(
                1,
                collectedAmount,
                0,  // Deposited amount is 0
                collectedAmount // Balance amount
            );

        // Validating the data in the previous collection tab
        KamDepositsPage.clickPreviousDataTab();

        // Verify peer transaction amount will be 200, created through seed data
        KamDepositsPage.verifyPeerTransactionsPanelCard(peerTransactionAmount);

        // Navigate to deposit details page and verify the deposit card
        KamDepositsPage.clickChevronAndMoreDetailsOnPanelCard('Peer Transactions');
        HeaderComponent.verifyHeaderTitle('Peer Transactions');

        // Verify the elements in the peer transaction card
        KamDepositsPage.verifyPeerTransactionCardInPreviousData(
            'User Deposits 14',
            'User Deposits 14',
            depositedAmount,
            collectedAmount
        );
        cy.reload();

        // clicking soft back button
        HeaderComponent.clickBackButton();

        // Verify the page title and preselected tab
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);
        KamDepositsPage.verifyYourLedgerTabIsSelected();
    });

    it('Verify user can see the Deposit icon if user has more than Rs.10 cash in hand and user does not have super_user, cash_collector and bypass_cash_collector roles', {tags: '@regression'}, () => {
        const cashInHand = 11;

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_17, depositsData.users.kam.password);

        // Visiting homepage
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);

        // Intercepting the executive ledger, peer transaction and cash payments APIs
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
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CASH_PAYMENTS}?**`,
            'cashPayments'
        );

        // Verify deposit now button in home page and Clicking on deposits icon
        KamHomePage.elements.depositNowButton().should('exist').and('be.visible')
        KamHomePage.verifyCashInHand(cashInHand)
            .clickDepositIcon();
        cy.wait(['@executiveLedger', '@executiveOutstanding', '@cashPayments']);
        cy.wait(3000);

        // Verify deposit page title
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

        // Verify total cash in hand amount
        KamDepositsPage.getTotalCashInHandAmount().should('eq', (cashInHand).toFixed(2));

    });

    it('Verify user can see the Deposit icon if user has has super_user role', {tags: '@regression'}, () => {

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_16, depositsData.users.kam.password);

        // Visiting homepage
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);

        // Verify deposit now button in home page and Clicking on deposits icon
        KamHomePage.clickDepositIcon();

        // Verify deposit page title
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);
    });

    it('Verify user can see the Deposit icon if user has has cash_collector role', {tags: '@regression'}, () => {

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_18, depositsData.users.kam.password);

        // Visiting homepage
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);

        // Verify deposit now button in home page and Clicking on deposits icon
        KamHomePage.clickDepositIcon();

        // Verify deposit page title
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);
    });

    it('Verify user can see the Deposit icon if user has bypass_cash_collector role', {tags: '@regression'}, () => {

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_19, depositsData.users.kam.password);

        // Visiting homepage
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);

        // Verify deposit now button in home page and Clicking on deposits icon
        KamHomePage.clickDepositIcon();

        // Verify deposit page title
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);
    });

    it('Verify user is not able to see the Deposit option and Deposit now button if he does not have the cash_collector, bypass_cash_collector, super_user roles', {tags: '@regression'}, () => {

        // Login to KAM app with a user who has Rs.9 cash in hand
        cy.sessionLogin(depositsData.users.kam.username_20, depositsData.users.kam.password);

        // Visiting homepage
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);

        // Verify deposit now button in home page and Clicking on deposits icon
        KamHomePage.elements.depositNowButton().should('not.exist');
        KamHomePage.elements.depositIcon().should('not.exist');
    });
})