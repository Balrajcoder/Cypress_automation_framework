import KamCustomerPage from "../../../components/pages/KamCustomerPage";
import {ATTACHMENTS} from "../../../constants/attachments";
import {ENDPOINTS} from "../../../constants/endpoints";
import {KAM_URL} from "../../../constants/kamUrls";

describe("Customers-7", () => {
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
        switch (Cypress.currentTest.title) {
            case 'No edit button in profile tab for customers other than his/her':
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_9,
                    customersData.users.kam.password
                );
                break;
            default:
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_10,
                    customersData.users.kam.password
                );
        }
    })

    it("Edit basic Data details from profile tab", {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_9;
        const languageBeforeEdit = 'English';
        const languageAfterEdit = 'Tamil';
        const visitingCardPhotosPath = ATTACHMENTS.IMAGE_PATH_1

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

        // Navigate to customer details page
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to profile section and then profile page
        KamCustomerPage.clickProfileTab()
            .clickBasicDetailsCard()

        // Verify the language and visiting card photo before editing
        KamCustomerPage.validateCustomerBasicDetailsLanguage(languageBeforeEdit)
            .validateCustomerBasicDetailsVisitingCardPhotosBeforeEdit()

        // Edit the language and visiting card photo
        KamCustomerPage.clickBasicDetailsEditIcon()
            .clickCustomerBasicDetailsLanguageDropdown()
            .selectTamilLanguage()
            .uploadNewKycDocument(visitingCardPhotosPath)
            .clickCustomerBasicDetailsSaveButton();

        // Verify toast message
        cy.verifyToastMessage(customersData.successful_customer_basic_details_update_message);

        // Verify the language and visiting card photo after editing
        KamCustomerPage.clickBasicDetailsCard()
            .validateCustomerBasicDetailsLanguage(languageAfterEdit)
            .validateCustomerBasicDetailsVisitingCardPhotoValue(visitingCardPhotosPath);
    })

    it("Verify expanded view of Products", {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_7;
        const productCategory = 'Grapes';

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

        // Navigate to customer details page
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to profile section and then profile page
        KamCustomerPage.clickProfileTab()
            .expandProductTitle();

        // Validate the product values
        KamCustomerPage.validateProductCategory(productCategory)
            .validateProductDetails(
                customersData.number_of_trucks,
                customersData.average_volume,
                customersData.expected_grade_mix,
                customersData.expected_packaging
            );
    })

    it.skip("Verify edit of Products in profile tab", {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_10;
        const productCategory = 'Grapes';
        const updatedProductCategory = 'Kinnow'
        const updatedNumberOfTrucks = 6;
        const updatedVolume = 1001;
        const updatedPackaging = 41;
        const updatedGradeMix = 4;

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

        // Navigate to customer details page
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to profile section and then profile page
        KamCustomerPage.clickProfileTab()
            .expandProductTitle();

        // Validate the product values before editing
        KamCustomerPage.validateProductCategory(productCategory)
            .validateProductDetails(
                customersData.number_of_trucks,
                customersData.average_volume,
                customersData.expected_grade_mix,
                customersData.expected_packaging
            );

        // Editing the product
        KamCustomerPage.clickProductEditIcon()
            .clickProductInputCloseIcon()
            .clickProductDropdown()
            .selectProductKinnow()
            .enterProductDetails(updatedNumberOfTrucks, updatedVolume, updatedPackaging, updatedGradeMix)
            .clickProductDetailsSaveButton();

        // Verify success message
        cy.verifyToastMessage(customersData.successful_product_update_message);

        // Verify the updated product details
        KamCustomerPage.expandProductTitle()
            .validateProductCategory(updatedProductCategory)
            .validateProductDetails(
                updatedNumberOfTrucks,
                updatedVolume,
                updatedGradeMix,
                updatedPackaging
            );
    })

    it("No edit button in profile tab for customers other than his/her", {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_10;

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

        // Navigate to customer details page
        KamCustomerPage.clickCustomerFilter()
            .clickAllCustomersRadioButton()
            .clickCustomerFilterSaveButton()
            .searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to profile tab and validate the absence of edit icon
        KamCustomerPage.clickProfileTab()
            .validateAbsenceOfProductCardEditIcon();
    })

    it('Verify the "Add Bank Guarantee" functionality', {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_11;
        const financialDocumentType = customersData.financial_documents.bank_guarantee;
        const bankGuranteeAmount = 1000;

        /*
            - `bankGuaranteeUploader`: The logged-in user who uploads bank details.
            - `bankGuaranteeVerifier`: A user with the `credit_head` role, responsible for verifying/rejecting bank details via API.
            - The verifier must match the user in the `before` block to use the correct auth token.
        */
        const bankGuaranteeUploader = customersData.users.names.username_10;
        const bankGuaranteeVerifier = customersData.users.names.username_1;

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
            .selectValidFromDate()
            .selectValidTillDate()
            .enterChequeAmount(bankGuranteeAmount)
            .enterBankGuaranteeDocumentNumber()
            .enterFinancialDocumentRemarks()
            .uploadNewKycDocument(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinancialDocumentSaveButton()

        cy.wait('@customerDocuments').then(() => {
            cy.wait('@customerDocuments').then((customerDocuments) => {

                // Fetching bank statement id
                const financialDocumentId = customerDocuments.response.body.items[0].id;

                // Verify the success message
                cy.verifyToastMessage(customersData.successful_bank_guarantee_message);

                // Verify the uploaded financial document card
                KamCustomerPage.validateFinancialDocumentCard(1) // count will be 1 as we have added one financial document
                    .validateBankGuaranteeFinancialDocument()
                    .validateBankStatementPeriod()
                    .validateFinancialDocumentViewButton()
                    .ValidateBankDetailsStatus(customersData.bank_status.pending)
                    .validateFinancialDocumentDeleteButton()
                    .assertFinancialDetailsUploadedByUser(bankGuaranteeUploader);

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
                    .validateBankGuaranteeFinancialDocument()
                    .validateBankStatementPeriod()
                    .ValidateBankDetailsStatus(customersData.bank_status.verified)
                    .verifyBankDetailsDeleteButtonNotPresent()
                    .assertFinancialDetailsUploadedByUser(bankGuaranteeUploader)
                    .assertFinancialDetailsVerifiedByUser(bankGuaranteeVerifier);
            })
        })
    })

    it('Verify remarks are optional', {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_11;
        const financialDocumentType = customersData.financial_documents.bank_guarantee;
        const bankGuranteeAmount = 1000;

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

        // Search the created customer and click on view details
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Completing adding financial document without providing remarks
        KamCustomerPage.clickDocumentationTab()
            .clickFinancialDocumentsCard()
            .clickAddFinancialDocumentFloatingButton()
            .selectFinancialDocument(financialDocumentType)
            .selectValidFromDate()
            .selectValidTillDate()
            .enterChequeAmount(bankGuranteeAmount)
            .enterBankGuaranteeDocumentNumber()
            .uploadNewKycDocument(ATTACHMENTS.IMAGE_PATH_1)
            .clickFinancialDocumentSaveButton();

        // Verify the success message
        cy.verifyToastMessage(customersData.successful_bank_guarantee_message);
    })
})