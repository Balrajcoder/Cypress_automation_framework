import KamHomePage from "../../../components/pages/KamHomePage";
import HeaderComponent from "../../../components/common/header_component";
import FooterComponent from "../../../components/common/footer_component";
import {MESSAGES} from "../../../constants/messages";
import {ATTACHMENTS} from "../../../constants/attachments";
import {ENDPOINTS} from "../../../constants/endpoints";
import {KAM_URL} from "../../../constants/kamUrls";
import KamDepositsPage from "../../../components/pages/KamDepositsPage";

describe('Deposits-1', function () {
    const testDevice = "samsung-s10";
    let depositsData;
    before(() => {
        cy.fixture('kam_deposits_flow').then((userdata) => {
            depositsData = userdata;
            cy.loginAuth(depositsData.users.kam.username_1, depositsData.users.kam.password);
        });
    })

    beforeEach(() => {
                // Login to KAM app
                cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);
    })

    it('Verify user navigates to Deposits page after clicking Deposits icon and after clicking Deposit now button in the home page', {tags: ['@smoke', '@regression']}, () => {

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

        // Clicking on deposits icon
        KamHomePage.clickDepositIcon();
        cy.wait(['@executiveLedger', '@executiveOutstanding', '@cashPayments']);
        cy.wait(3000);

        // Verify deposit page title
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

        // Verify 'Your ledger' tab is preselected
        KamDepositsPage.verifyYourLedgerTabIsSelected();

        // Verify the elements in the amount card
        KamDepositsPage.verifyElementsInAmountCard();

        // Verify the total amount in the 'Your ledger' tab is correct
        KamDepositsPage.getTotalCashInHandAmount().then((amount) => {
            expect(amount).to.equal((depositsData.cash_in_hand_amount.username_1).toFixed(2));

            // Verify the ledger table and the data in it
            KamDepositsPage.verifyLedgerTable()
                .verifyLedgerTableData(
                    0,
                    depositsData.cash_in_hand_amount.username_1,
                    0,
                    depositsData.cash_in_hand_amount.username_1
                );

            // Navigate to home page
            FooterComponent.clickHomeButton();

            // Clicking on deposits now button
            KamHomePage.clickDepositNowButton();
            cy.wait(['@executiveLedger', '@executiveOutstanding', '@cashPayments']);
            cy.wait(3000);

            // Verify deposit page title
            HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

            // Verify 'Your ledger' tab is preselected
            KamDepositsPage.verifyYourLedgerTabIsSelected();

            // Verify the elements in the amount card
            KamDepositsPage.verifyElementsInAmountCard();

            // Verify the total amount in the 'Your ledger' tab is correct
            KamDepositsPage.getTotalCashInHandAmount().then((amount) => {
                expect(amount).to.equal((depositsData.cash_in_hand_amount.username_1).toFixed(2));

                // Verify the ledger table and the data in it
                KamDepositsPage.verifyLedgerTable()
                    .verifyLedgerTableData(
                        0,
                        depositsData.cash_in_hand_amount.username_1,
                        0,
                        depositsData.cash_in_hand_amount.username_1
                    );

                // Verify that the deposit drawer is opened when clicks on deposit now button of home page
                KamDepositsPage.verifyDepositDrawer();
            })
        })
    });

    it('Verify user can navigate to Previous Data tab', {tags: ['@smoke', '@regression']}, () => {
        const receivedAmount = depositsData.cash_in_hand_amount.username_1;

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);

        // Intercepting the executive ledger, peer transaction and cash payments APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_EXECUTIVE_OUTSTANDING}/**`,
            'executiveOutstanding'
        );

        // Visiting deposit page
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Verify deposit page title
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

        // Click on previous data tab and verify the tab is selected
        KamDepositsPage.clickPreviousDataTab()
            .verifyPreviousDataTabIsSelected();
        cy.wait('@executiveOutstanding');
        cy.wait(3000);

        // Verify the cards in previous collection tab
        KamDepositsPage.verifyNumberOfPanelCards()
            .verifyCashDepositsPanelCard()
            .verifyCashCollectionsPanelCard(receivedAmount)
            .verifyPeerTransactionsPanelCard();
    });

    it('Verify user is able to delete uploaded image', {tags: ['@smoke', '@regression']}, () => {

        // Visiting homepage
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamHomePage.clickDepositNowButton();

        // uploading the image
        KamDepositsPage.uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1);

        // Delete the uploaded image
        KamDepositsPage.deleteAndVerifyZeroImages();
    });

    it('Verify user is not able to complete deposit after providing all the information but amount', {tags: '@regression'}, () => {
        const paymentMethod = 'NEFT';

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);

        // Visiting deposit page
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamDepositsPage.clickDepositNowButton();

        // Verify user is not able to deposit the amount
        KamDepositsPage.enterRemarks(depositsData.remarks)
            .selectPaymentMethod(paymentMethod)
            .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinishButton();

        // Verify error message and the existence of deposit drawer even after clicking on finish button
        KamDepositsPage.verifyAmountTextFieldErrorMessage(MESSAGES.REQUIRED_ERROR_MESSAGE)
            .verifyDepositDrawerTitle();
    });

    it('Verify user is not able to complete deposit after providing all the information but payment method', {tags: '@regression'}, () => {

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
            .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinishButton();

        // Verify error message and the existence of deposit drawer even after clicking on finish button
        KamDepositsPage.verifyPaymentMethodErrorMessage(MESSAGES.REQUIRED_ERROR_MESSAGE)
            .verifyDepositDrawerTitle();
    });

    it('Verify user is not able to complete deposit after providing all the information but uploading image', {tags: '@regression'}, () => {
        const paymentMethod = 'NEFT';

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
            .selectPaymentMethod(paymentMethod)
            .clickFinishButton();

        // Verify error message and the existence of deposit drawer even after clicking on finish button
        KamDepositsPage.verifyImageUploadErrorMessage(MESSAGES.REQUIRED_ERROR_MESSAGE)
            .verifyDepositDrawerTitle();
    });

    it('Verify user is able to complete deposit after providing the amount as 0', {tags: '@regression'}, () => {
        const paymentMethod = 'NEFT';

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);

        // Visiting homepage
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Clicking on deposits now button
        KamDepositsPage.clickDepositNowButton();

        // Deposit the amount with 0 amount
        KamDepositsPage.enterAmount(depositsData.deposit_amount.zero)
            .enterRemarks(depositsData.remarks)
            .selectPaymentMethod(paymentMethod)
            .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinishButton();

        // Verify success message
        cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
    });

    it('Verify user can see all the collection by clicking View more collections and after that user can navigate to Your ledger tab if he clicks on soft back button', {tags: '@regression'}, () => {
        const customerName = 'customerDeposits1';
        const collectedAmount = depositsData.cash_in_hand_amount.username_1;

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);

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

        // Visiting deposit page
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Validating the data in the previous collection tab
        KamDepositsPage.clickPreviousDataTab();
        cy.wait('@executiveOutstanding');
        cy.wait(3000);

        // Verify cash collection amount will be same as cash received amount i.e 1000, created through seed data
        KamDepositsPage.verifyCashCollectionsPanelCard(collectedAmount);

        // Navigate to deposit details page and verify the deposit card
        KamDepositsPage.clickChevronAndMoreDetailsOnPanelCard('Cash Collections');
        HeaderComponent.verifyHeaderTitle('Collections');

        // Verify the elements in the amount card
        KamDepositsPage.verifyCashCollectionsCardInPreviousData(
            customerName,
            collectedAmount,
            depositsData.verification_status.pending
        );
        cy.reload();

        // clicking soft back button
        HeaderComponent.clickBackButton();

        // Verify the page title and preselected tab
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);
        KamDepositsPage.verifyYourLedgerTabIsSelected();
    });

    it('Verify user can expand the Cash Deposits card by clicking anywhere in that card', {tags: '@regression'}, () => {

        // Login to KAM app
        cy.sessionLogin(depositsData.users.kam.username_1, depositsData.users.kam.password);

        // Intercepting the executive ledger, peer transaction and cash payments APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_EXECUTIVE_OUTSTANDING}/**`,
            'executiveOutstanding'
        );

        // Visiting deposit page
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        cy.viewport(testDevice);

        // Verify deposit page title
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

        // Click on previous data tab and verify the tab is selected
        KamDepositsPage.clickPreviousDataTab()
            .verifyPreviousDataTabIsSelected();
        cy.wait('@executiveOutstanding');
        cy.wait(3000);

        // Verify clicking anywhere on the Cash Deposits card other than the chevron icon
        KamDepositsPage.clickRandomPlacesOnPanelCard('Cash Deposits');
        HeaderComponent.verifyHeaderTitle(depositsData.deposit_page_title);

        // Go to previous collection tab
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        KamDepositsPage.clickPreviousDataTab();

        // Verify clicking anywhere on the Cash collection card other than the chevron icon
        KamDepositsPage.clickRandomPlacesOnPanelCard('Cash Collections');
        HeaderComponent.verifyHeaderTitle('Collections');

        // Go to previous collection tab
        cy.visit(KAM_URL.DEPOSITS_PAGE);
        KamDepositsPage.clickPreviousDataTab();

        // Verify clicking anywhere on the Cash collection card other than the chevron icon
        KamDepositsPage.clickRandomPlacesOnPanelCard('Peer Transactions');
        HeaderComponent.verifyHeaderTitle('Peer Transactions');
    });
})