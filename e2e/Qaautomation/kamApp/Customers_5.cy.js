import {ENDPOINTS} from "../../../constants/endpoints";
import {KAM_URL} from "../../../constants/kamUrls";
import KamCustomerPage from "../../../components/pages/KamCustomerPage";
import {ATTACHMENTS} from "../../../constants/attachments";

describe("Customers-5", () => {
    const testDevice = "samsung-s10";
    let customersData;

    before(() => {
        cy.fixture("kam_customers_flow").then((userdata) => {
            customersData = userdata;
            cy.loginAuth(
                customersData.users.kam.username_1,
                customersData.users.kam.password
            );
        });
    });

    beforeEach(() => {
        // Login to KAM app
        cy.sessionLogin(
            customersData.users.kam.username_8,
            customersData.users.kam.password
        );
    })

    it('Verify user adding Cheque as financial doc and its status after rejection', {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_14;
        const financialDocumentType = customersData.financial_documents.cheque;
        const chequeAmount = 1000;

        /*
            - `chequeUploader`: The logged-in user who uploads bank details.
            - `chequeVerifier`: A user with the `credit_head` role, responsible for verifying/rejecting bank details via API.
            - The verifier must match the user in the `before` block to use the correct auth token.
        */
        const chequeUploader = customersData.users.names.username_8;
        const chequeVerifier = customersData.users.names.username_1;

        // Intercepting some APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_DETAIL}?**`,
            'customerDetails'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_HEALTH}?**`,
            'customerHealth'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_DOCUMENTS_DETAILS}?**`,
            'customerDocuments'
        );

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton();

        // Onboarding a customer
        KamCustomerPage.saveCustomerOnboardingDraftWithMultipleIndividualKyc(
            customerName,
            customersData.new_poc_name.poc_14,
            customersData.new_customer_mobile_number.mobile_number_14,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );

        // Search the created customer and click on view details
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to documentation section and then financial documents page
        KamCustomerPage.clickDocumentationTab()
            .clickFinancialDocumentsCard()
            .clickAddFinancialDocumentsButton()
            .selectFinancialDocument(financialDocumentType)
            .selectChequeType(customersData.cheque_type.blank)
            .enterChequeNumber()
            .enterChequeAmount(chequeAmount)
            .uploadNewKycDocument(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinancialDocumentSaveButton()

        cy.wait('@customerDocuments').then(() => {
            cy.wait('@customerDocuments').then((customerDocuments) => {

                // Fetching documents id
                const financialDocumentId = customerDocuments.response.body.items[0].id;

                // Verify the success message
                cy.verifyToastMessage(customersData.successful_cheque_upload_message);

                // Verify the uploaded financial document card
                KamCustomerPage.validateFinancialDocumentCard(1) // count will be 1 as we have added one financial document
                    .validateChequeFinancialDocument()
                    .validateFinancialDocumentViewButton()
                    .ValidateBankDetailsStatus(customersData.bank_status.pending)
                    .validateFinancialDocumentDeleteButton()
                    .assertFinancialDetailsUploadedByUser(chequeUploader);

                // Rejecting the financial document from CRM dashboard through API
                const verificationPayload = {
                    "verified_remarks": customersData.remarks,
                    "status": "Rejected"
                }
                cy.sendRequest(
                    'PUT',
                    ENDPOINTS.VERIFY_FINANCIAL_DOCUMENT(financialDocumentId),
                    {body: verificationPayload}
                );
                cy.reload();

                // Verify after verifying the bank details
                KamCustomerPage.validateFinancialDocumentCard(1) // count will be 1 as we have verified financial document
                    .validateChequeFinancialDocument()
                    .ValidateBankDetailsStatus(customersData.bank_status.rejected)
                    .verifyBankDetailsDeleteButtonNotPresent()
                    .assertFinancialDetailsUploadedByUser(chequeUploader)
                    .assertFinancialDetailsRejectedByUser(chequeVerifier);
            })
        })
    })

    it('Verify adding Financial doc without any of the mandatory fields for all three types', {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_15;

        // Intercepting some APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_DETAIL}?**`,
            'customerDetails'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_HEALTH}?**`,
            'customerHealth'
        );

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton();

        // Onboarding a customer
        KamCustomerPage.saveCustomerOnboardingDraftWithMultipleIndividualKyc(
            customerName,
            customersData.new_poc_name.poc_15,
            customersData.new_customer_mobile_number.mobile_number_15,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );

        // Search the created customer and click on view details
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to documentation section and then financial documents page then select ITR
        KamCustomerPage.clickDocumentationTab()
            .clickFinancialDocumentsCard()
            .clickAddFinancialDocumentsButton()
            .selectFinancialDocument(customersData.financial_documents.itr)
            .clickFinancialDocumentSaveButton();

        // Verify the error messages
        KamCustomerPage.verifyItrFieldsErrorMessage(customersData.mandatory_field_error_message);

        // Select bank statement
        KamCustomerPage.selectFinancialDocument(customersData.financial_documents.bank_statement)
            .clickFinancialDocumentSaveButton();

        // Verify the error messages
        KamCustomerPage.verifyBankStatementFieldsErrorMessage(customersData.mandatory_field_error_message);

        // Select Cheque
        KamCustomerPage.selectFinancialDocument(customersData.financial_documents.cheque)
            .clickFinancialDocumentSaveButton();

        // Verify the error messages
        KamCustomerPage.verifyChequeFieldsErrorMessage(customersData.mandatory_field_error_message);

        // Select Bank guarantee
        KamCustomerPage.selectFinancialDocument(customersData.financial_documents.bank_guarantee)
            .clickFinancialDocumentSaveButton();

        // Verify the error messages
        KamCustomerPage.verifyBankGuaranteeFieldsErrorMessage(customersData.mandatory_field_error_message);
    })

    it('Verify adding signed ledger for the customer and its statuses based on verification', {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_16;
        const ledgerOutstandingAmount = 1000.5;
        const signedLedgerRemarks = customersData.remarks;

        /*
           - `ledgerUploader`: The logged-in user who uploads bank details.
           - `ledgerVerifier`: A user with the `credit_head` role, responsible for verifying/rejecting ledger via API.
           - The verifier must match the user in the `before` block to use the correct auth token.
       */
        const ledgerUploader = customersData.users.names.username_8;
        const ledgerVerifier = customersData.users.names.username_1;

        // Intercepting some APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_DETAIL}?**`,
            'customerDetails'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_HEALTH}?**`,
            'customerHealth'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_SIGNED_LEDGERS_DETAILS}?**`,
            'signedLedgers'
        );

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton();

        // Onboarding a customer
        KamCustomerPage.saveCustomerOnboardingDraftWithMultipleIndividualKyc(
            customerName,
            customersData.new_poc_name.poc_16,
            customersData.new_customer_mobile_number.mobile_number_16,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );

        // Search the created customer and click on view details
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to documentation section and then financial documents page
        KamCustomerPage.clickDocumentationTab()
            .clickSignedLedgersCard()
            .clickAddLedgerButton()
            .selectStartDate()
            .selectEndDate()
            .enterLedgerOutstanding(ledgerOutstandingAmount)
            .enterSignedLedgerRemarks(signedLedgerRemarks)
            .uploadNewKycDocument(ATTACHMENTS.IMAGE_PATH_1)
            .clickSignedLedgerSaveButton()

        cy.wait('@signedLedgers').then(() => {
            cy.wait('@signedLedgers').then((signedLedgers) => {

                // Fetching documents id
                const signedLedgerId = signedLedgers.response.body.items[0].id;

                // Verify the success message
                cy.verifyToastMessage(customersData.successful_signed_ledger);

                // Verify the uploaded financial document card
                KamCustomerPage.validateSignedLedgerCard(1) // count will be 1 as we have added one ledger
                    .validateSignedLedgerPeriod()
                    .validateSignedLedgerViewButton()
                    .ValidateBankDetailsStatus(customersData.bank_status.pending)
                    .validateSignedLedgerDeleteButton()
                    .validateSignedLedgerOutstanding(ledgerOutstandingAmount)
                    .assertSignedLedgerUploadedByUser(ledgerUploader);

                // Verify the financial document from CRM dashboard through API
                const verificationPayload = {
                    "verified_remarks": customersData.remarks,
                    "status": "Verified"
                }
                cy.sendRequest(
                    'PUT',
                    ENDPOINTS.VERIFY_FINANCIAL_DOCUMENT(signedLedgerId),
                    {body: verificationPayload}
                );
                cy.reload();

                // Verify after verifying the bank details
                KamCustomerPage.validateSignedLedgerCard(1) // count will be 1 as we have verified financial document
                    .validateSignedLedgerPeriod()
                    .validateSignedLedgerViewButtonNotPresent()
                    .ValidateBankDetailsStatus(customersData.bank_status.verified)
                    .validateSignedLedgerDeleteButtonNotPresent()
                    .validateSignedLedgerOutstanding(ledgerOutstandingAmount)
                    .assertSignedLedgerUploadedByUser(ledgerUploader)
                    .assertSignedLedgerVerifiedByUser(ledgerVerifier)
                    .assertVerificationRemarks(signedLedgerRemarks)
            })
        })
    })

    it('Verify adding signed ledger without mandatory fields', {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_17;

        // Intercepting some APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_DETAIL}?**`,
            'customerDetails'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_HEALTH}?**`,
            'customerHealth'
        );

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton();

        // Onboarding a customer
        KamCustomerPage.saveCustomerOnboardingDraftWithMultipleIndividualKyc(
            customerName,
            customersData.new_poc_name.poc_17,
            customersData.new_customer_mobile_number.mobile_number_17,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );

        // Search the created customer and click on view details
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to documentation section and then financial documents page then select ITR
        KamCustomerPage.clickDocumentationTab()
            .clickSignedLedgersCard()
            .clickAddLedgerButton()
            .clickSignedLedgerSaveButton()

        // Verify the error messages
        KamCustomerPage.verifySignedLedgerFieldsErrorMessage(customersData.mandatory_field_error_message);
    })
})