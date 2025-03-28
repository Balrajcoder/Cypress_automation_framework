import {ENDPOINTS} from "../../../constants/endpoints";
import {KAM_URL} from "../../../constants/kamUrls";
import KamCustomerPage from "../../../components/pages/KamCustomerPage";
import {ATTACHMENTS} from "../../../constants/attachments";

describe("Customers-4", () => {
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

    it('Verify Add bank in bank details page and its various statuses', {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_10;
        const bankName = customersData.bank_name;
        const bankAccountNumber = customersData.bank_account_number;

        /*
            - `bankDetailsUploader`: The logged-in user who uploads bank details.
            - `bankDetailsVerifier`: A user with the `credit_head` role, responsible for verifying/rejecting bank details via API.
            - The verifier must match the user in the `before` block to use the correct auth token.
        */
        const bankDetailsUploader = customersData.users.names.username_8;
        const bankDetailsVerifier = customersData.users.names.username_1;

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
            `${ENDPOINTS.GET_BANK_DETAILS}?**`,
            'bankDetails'
        );

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton();

        // Onboarding a customer
        KamCustomerPage.saveCustomerOnboardingDraftWithMultipleIndividualKyc(
            customerName,
            customersData.new_poc_name.poc_10,
            customersData.new_customer_mobile_number.mobile_number_10,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );

        // Search the created customer and click on view details
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to documentation section and then bank details page
        KamCustomerPage.clickDocumentationTab()
            .clickBankDetailsCard()
            .clickAddNewBankButton()
            .enterBankAccountNumber(bankAccountNumber)
            .enterConfirmBankAccountNumber(bankAccountNumber)
            .enterIfscCode(customersData.ifsc_code)
            .validateAutoFilledBankName(bankName)
            .validateAutoFilledBranchName(customersData.branch_name)
            .uploadNewKycDocument(ATTACHMENTS.IMAGE_PATH_1)
            .clickSaveBankDetails();
        cy.wait('@bankDetails').then(() => {
            cy.wait('@bankDetails').then((bankDetails) => {

                // Fetching bank details id
                const customerBankDetailsId = bankDetails.response.body.items[0].id;

                // Verify the bank details card is visible after saving the bank details
                KamCustomerPage.validateBankDetailCard(1) // count will be 1 as we have added one bank details
                    .verifyBankNameAndAccountNumber(bankName, bankAccountNumber)
                    .clickBankDetailsCardViewButton()
                    .clickOutside()
                    .ValidateBankDetailsStatus(customersData.bank_status.pending)
                    .assertBankDetailsDeleteButtonExists()
                    .assertBankDetailsUploadedByUser(bankDetailsUploader);

                // Verify the bank details from CRM dashboard through API
                const verificationPayload = {
                    "verified_remarks": customersData.remarks,
                    "status": "Verified"
                }
                cy.sendRequest(
                    'PUT',
                    ENDPOINTS.VERIFY_FINANCIAL_DOCUMENT(customerBankDetailsId),
                    {body: verificationPayload}
                );
                cy.reload();

                // Verify after verifying the bank details
                KamCustomerPage.validateBankDetailCard(1) // count will be 1 as we have verified one bank details
                    .verifyBankNameAndMaskedAccountNumber(bankName, bankAccountNumber)  // View button is absent
                    .ValidateBankDetailsStatus(customersData.bank_status.verified)
                    .verifyBankDetailsDeleteButtonNotPresent()
                    .assertBankDetailsUploadedByUser(bankDetailsUploader)
                    .assertBankDetailsVerifiedByUser(bankDetailsVerifier);

                // Adding another bank details
                KamCustomerPage.clickAddNewBankButton()
                    .enterBankAccountNumber(bankAccountNumber)
                    .enterConfirmBankAccountNumber(bankAccountNumber)
                    .enterIfscCode(customersData.ifsc_code)
                    .validateAutoFilledBankName(bankName)
                    .validateAutoFilledBranchName(customersData.branch_name)
                    .uploadNewKycDocument(ATTACHMENTS.IMAGE_PATH_1)
                    .clickSaveBankDetails();
                cy.wait('@bankDetails').then(() => {
                    cy.wait('@bankDetails').then((bankDetails) => {
                        // Fetching bank details id
                        const customerBankDetailsId = bankDetails.response.body.items[1].id;

                        // Verify the bank details card is visible after saving the bank details
                        // index will always be 1 which is being passed as an argument as we have added another bank
                        // details
                        KamCustomerPage.validateBankDetailCard(2) // count will be 2 as we have added another
                            // bank details
                            .verifyBankNameAndAccountNumber(bankName, bankAccountNumber, 1)
                            .clickBankDetailsCardViewButton()
                            .clickOutside()
                            .ValidateBankDetailsStatus(customersData.bank_status.pending, 1)
                            .assertBankDetailsDeleteButtonExists(0) // Delete button will be present for the
                            // second bank details as the first one is
                            // already verified
                            .assertBankDetailsUploadedByUser(bankDetailsUploader);

                        // Reject the bank details from CRM dashboard through API
                        const verificationPayload = {
                            "verified_remarks": customersData.remarks,
                            "status": "Rejected"
                        }
                        cy.sendRequest(
                            'PUT',
                            ENDPOINTS.VERIFY_FINANCIAL_DOCUMENT(customerBankDetailsId),
                            {body: verificationPayload}
                        );
                        cy.reload();

                        // Verify the tile goes missing after rejecting the bank details
                        KamCustomerPage.validateBankDetailCard(1) // count will be 1 as we have rejected
                        // one bank details
                    })
                })
            })
        })
    })

    it('Verify Add bank in bank details page without mandatory fields', {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_11;

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
            customersData.new_poc_name.poc_11,
            customersData.new_customer_mobile_number.mobile_number_11,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );

        // Search the created customer and click on view details
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to documentation section and then bank details page
        KamCustomerPage.clickDocumentationTab()
            .clickBankDetailsCard();

        // Click on add new bank button
        KamCustomerPage.clickAddNewBankButton();

        //Click on save button without entering anything
        KamCustomerPage.clickSaveBankDetails();

        // Verify the error messages
        KamCustomerPage.verifyAllBankFieldsErrorMessage(customersData.mandatory_field_error_message);
    })

    it('Verify user adding ITR as financial doc', {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_12;
        const financialDocumentType = customersData.financial_documents.itr;
        const financialYear = "2024-25";

        /*
            - `itrUploader`: The logged-in user who uploads bank details.
        */
        const itrUploader = customersData.users.names.username_8;

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
            customersData.new_poc_name.poc_12,
            customersData.new_customer_mobile_number.mobile_number_12,
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
            .selectFinancialYear(financialYear)
            .uploadNewKycDocument(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinancialDocumentSaveButton();

        // Verify the success message
        cy.verifyToastMessage(customersData.successful_itr_upload_message);

        // Verify the uploaded financial document card
        KamCustomerPage.validateFinancialDocumentCard(1) // count will be 1 as we have added one financial document
            .validateFinancialDocumentType(financialDocumentType)
            .validateFinancialYear(financialYear)
            .validateFinancialDocumentViewButton()
            .ValidateBankDetailsStatus(customersData.bank_status.pending)
            .validateFinancialDocumentDeleteButton()
            .assertFinancialDetailsUploadedByUser(itrUploader)
    })

    it('Verify user adding Bank statement as financial doc and its status after verification', {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_13;
        const financialDocumentType = customersData.financial_documents.bank_statement;
        const bankName = customersData.customer_bank_name.automation_bank;

        /*
            - `bankStatementUploader`: The logged-in user who uploads bank details.
            - `bankStatementVerifier`: A user with the `credit_head` role, responsible for verifying/rejecting bank details via API.
            - The verifier must match the user in the `before` block to use the correct auth token.
        */
        const bankStatementUploader = customersData.users.names.username_8;
        const bankStatementVerifier = customersData.users.names.username_1;

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
            customersData.new_poc_name.poc_13,
            customersData.new_customer_mobile_number.mobile_number_13,
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
            .selectStartDate()
            .selectEndDate()
            .selectCustomerBank()
            .enterFinancialDocumentRemarks()
            .uploadNewKycDocument(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinancialDocumentSaveButton()

        cy.wait('@customerDocuments').then(() => {
            cy.wait('@customerDocuments').then((customerDocuments) => {

                // Fetching bank statement id
                const financialDocumentId = customerDocuments.response.body.items[0].id;

                // Verify the success message
                cy.verifyToastMessage(customersData.successful_bank_statement_upload_message);

                // Verify the uploaded financial document card
                KamCustomerPage.validateFinancialDocumentCard(1) // count will be 1 as we have added one financial document
                    .validateBankStatementFinancialDocument(bankName)
                    .validateBankStatementPeriod()
                    .validateFinancialDocumentViewButton()
                    .ValidateBankDetailsStatus(customersData.bank_status.pending)
                    .validateFinancialDocumentDeleteButton()
                    .assertFinancialDetailsUploadedByUser(bankStatementUploader);

                // Verify the financial document from CRM dashboard through API
                const verificationPayload = {
                    "verified_remarks": customersData.remarks,
                    "status": "Verified"
                }
                cy.sendRequest(
                    'PUT',
                    ENDPOINTS.VERIFY_FINANCIAL_DOCUMENT(financialDocumentId),
                    {body: verificationPayload}
                );
                cy.reload();

                // Verify after verifying the bank details
                KamCustomerPage.validateFinancialDocumentCard(1) // count will be 1 as we have verified financial document
                    .validateBankStatementFinancialDocument(bankName)
                    .validateBankStatementPeriod()
                    .ValidateBankDetailsStatus(customersData.bank_status.verified)
                    .verifyBankDetailsDeleteButtonNotPresent()
                    .assertFinancialDetailsUploadedByUser(bankStatementUploader)
                    .assertFinancialDetailsVerifiedByUser(bankStatementVerifier);
            })
        })
    })
})