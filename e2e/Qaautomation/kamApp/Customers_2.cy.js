import {ENDPOINTS} from "../../../constants/endpoints";
import {KAM_URL} from "../../../constants/kamUrls";
import KamCustomerPage from "../../../components/pages/KamCustomerPage";
import HeaderComponent from "../../../components/common/header_component";
import {ATTACHMENTS} from "../../../constants/attachments";

describe("Customers-2", () => {
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
            case "Verify one KAM cannot edit other KAM's customer":
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_9,
                    customersData.users.kam.password
                );
                break;
            case "Verify Edit/Upload options are only available for my customers":
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_4,
                    customersData.users.kam.password
                );
                break;
            default:
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_8,
                    customersData.users.kam.password
                );
                break;
        }
    });

    it("Verify the Customer Onboard card after save as draft", {tags: ['@smoke', '@regression']}, () => {
        const customerName = customersData.new_customer_name.customer_2;

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

        // Verify elements in customers page
        KamCustomerPage.verifyElementsInCustomerPage(customersData.tab_names);

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton();

        // Onboarding a customer
        KamCustomerPage.saveCustomerOnboardingDraft(
            customerName,
            customersData.new_poc_name.poc_2,
            customersData.new_customer_mobile_number.mobile_number_2,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );

        // Verify the created customer is present in the prospect list
        KamCustomerPage.clickProspectTab();
        cy.wait('@customerDetails');
        cy.wait(3000);
        KamCustomerPage.verifyCustomerNameOnCard(customerName);

        // Search the created customer and click on view details
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Verify the onboarded status
        KamCustomerPage.verifyCustomerOnboardingStatus(customersData.onboarding_status.not_onboarded)
            .verifyInitiateOnboardingButton();
    });

    it("Save as draft basic details form without Minimal details", {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_4;

        // Intercepting some APIs
        cy.customIntercept(
            'POST',
            `${ENDPOINTS.CREATE_KAM_CUSTOMER}?**`,
            'createKamCustomer'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_DETAIL}?**`,
            'customerDetails'
        );

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Click on new customer button
        KamCustomerPage.clickNewCustomerButton();

        // Click save as draft button without filling anything
        KamCustomerPage.clickSaveAsDraftButton();

        // Click on save button and verify the error message
        KamCustomerPage.clickSaveButton();
        cy.verifyToastMessage(customersData.customer_name_error_message);

        // Fill only customer name and click save as draft button and verify the error message
        KamCustomerPage.enterCustomerName(customerName)
            .clickSaveAsDraftButton()
            .clickSaveButton();
        cy.verifyToastMessage(customersData.poc_name_error_message);

        // Enter POC name and click save as draft button and verify the error message
        KamCustomerPage.enterPocName(customersData.new_poc_name.poc_4)
            .clickSaveAsDraftButton()
            .clickSaveButton();
        cy.verifyToastMessage(customersData.phone_number_error_message);
    });

    it("Verify one KAM cannot edit other KAM's customer", {tags: '@regression'}, () => {
        /*
       Logged in as a KAM user, "userCustomers9" who is not having any customer and tagged with a KAM "userCustomers1".
       here, I will try to edit "customerCustomers6" who belongs to "userCustomers1"
       */
        const customerName = customersData.customers.customer_6;

        // Intercepting some APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_HEALTH}?**`,
            'customerHealth'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_DETAIL}?**`,
            'customerDetails'
        );

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Select all customer from the filter
        KamCustomerPage.clickCustomerFilter()
            .clickAllCustomersRadioButton()
            .clickCustomerFilterSaveButton();

        // Find a different customer
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Verify that the initiate onboarding button is not present
        KamCustomerPage.verifyAbsenceOfCustomerOnboardingStatusAndInitiateOnboardingButton();

        // Go to profile section
        KamCustomerPage.clickProfileTab();

        // Verify the edit icons and 'add address' button are not present
        KamCustomerPage.VerifyAbsenceOfEditIconsInProfileTab();

        // Verify the presence of address edit icon
        KamCustomerPage.verifyVisibilityOfAddressEditIcon();
    });

    it("Verify Edit/Upload options are only available for my customers", {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_4;

        // Intercepting some APIs
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_HEALTH}?**`,
            'customerHealth'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_DETAIL}?**`,
            'customerDetails'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_KYC_DOCUMENTS}?**`,
            'kycDocuments'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_BANK_DETAILS}?**`,
            'bankDetails'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_DOCUMENTS}?**`,
            'customerDocuments'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_SIGNED_LEDGERS}?**`,
            'customerSignedLedgers'
        );

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);


        // Find a different customer
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to profile section
        KamCustomerPage.clickProfileTab();

        // Verify the edit icons and 'add address' button are not present
        KamCustomerPage.VerifyPresenceOfEditIconsInProfileTab();

        // Go to documentation section and verify KYC card
        KamCustomerPage.clickDocumentationTab()
            .clickKycDetailsCard();
        cy.wait('@kycDocuments');
        cy.wait(3000);

        // Verify the KYC details upload buttons
        KamCustomerPage.verifyPresenceOfButtons();

        // Click on back button
        HeaderComponent.clickBackButton();

        // Go to documentation section and verify bank details card
        KamCustomerPage.clickDocumentationTab()
            .clickBankDetailsCard();
        cy.wait('@bankDetails');
        cy.wait(3000);
        KamCustomerPage.verifyBankDetailsPage();

        // Click on back button
        HeaderComponent.clickBackButton();

        // Go to documentation section and verify financial card
        KamCustomerPage.clickDocumentationTab()
            .clickFinancialDocumentsCard();
        cy.wait('@customerDocuments');
        cy.wait(3000);
        KamCustomerPage.verifyFinancialDocumentsPage();

        // Click on back button
        HeaderComponent.clickBackButton();

        // Go to documentation section and verify bank details card
        KamCustomerPage.clickDocumentationTab()
            .clickSignedLedgerCard();
        cy.wait('@customerSignedLedgers');
        cy.wait(3000);
        KamCustomerPage.verifySignedLedgersPage();
    });

    it("Verify Show more documents page in KYC details page", {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_5;
        const documentMap = {};
        /*
            - `kycDocumentUploader`: The logged-in user who uploads KYC documents.
            - `kycDocumentVerifier`: A user with the `central_demand` role, responsible for verifying/rejecting KYC documents via API.
            - The verifier must match the user in the `before` block to use the correct auth token.
        */
        const kycDocumentUploader = customersData.users.names.username_8;
        const kycDocumentVerifier = customersData.users.names.username_1;

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
            `${ENDPOINTS.GET_KYC_DOCUMENTS}?**`,
            'kycDocuments'
        );
        cy.customIntercept(
            'POST',
            ENDPOINTS.UPDATE_KYC_DOCUMENTS,
            'updateKycDocuments'
        )

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Verify elements in customers page
        KamCustomerPage.verifyElementsInCustomerPage(customersData.tab_names);

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton();

        // Onboarding a customer
        KamCustomerPage.saveCustomerOnboardingDraftWithMultipleIndividualKyc(
            customerName,
            customersData.new_poc_name.poc_5,
            customersData.new_customer_mobile_number.mobile_number_5,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );
        cy.wait('@updateKycDocuments').then((updateKycDocuments) => {

            // Fetching the document types and ids and storing in a map
            const documents = updateKycDocuments.response.body.items;
            for (const doc of documents) {
                documentMap[doc.document_name] = doc.id.toString();
            }

            // Verifying the Aadhar card
            const kycVerificationPayload = {
                "remarks": customersData.remarks,
                "status": "Verified"
            }
            cy.sendRequest(
                'PUT',
                ENDPOINTS.VERIFY_CUSTOMER_KYC(documentMap.Aadhaar),
                {body: kycVerificationPayload}
            );

            // Rejecting the PAN card
            const kycRejectionPayload = {
                "remarks": customersData.remarks,
                "status": "Rejected"
            }
            cy.sendRequest(
                'PUT',
                ENDPOINTS.VERIFY_CUSTOMER_KYC(documentMap.PAN),
                {body: kycRejectionPayload}
            );
            cy.reload();

            // Search the created customer and click on view details
            KamCustomerPage.searchCustomer(customerName)
                .clickViewDetails(customerName);
            cy.wait(['@customerDetails', '@customerHealth']);
            cy.wait(3000);

            // Go to documentation section and verify KYC card
            KamCustomerPage.clickDocumentationTab()
                .clickKycDetailsCard();
            cy.wait('@kycDocuments');
            cy.wait(3000);

            // Verify the voter card details
            KamCustomerPage.verifyVoterIdKycDetails(kycDocumentUploader);

            // Verify the aadhar card details
            KamCustomerPage.verifyAadhaarKycDetails(kycDocumentUploader, kycDocumentVerifier);

            // Verify the pan card details
            KamCustomerPage.verifyPanKycDetails(kycDocumentUploader, kycDocumentVerifier);

            // Click upload document button and upload the document
            KamCustomerPage.clickUploadDocumentButton()
                .clickIndividualRadioButton()
                .selectKycDocument(customersData.individual_kyc_documents.driving_license)
                .enterKycDocumentNumber(customersData.individual_kyc_documents.driving_license_number)
                .uploadNewKycDocument(ATTACHMENTS.DRIVING_LICENSE)
                .clickSaveButtonOfTheDrawer();

            // Verify KYC upload success message
            cy.verifyToastMessage(customersData.successful_kyc_upload_message);

            // Click upload document button and upload another document
            KamCustomerPage.clickUploadDocumentButton()
                .clickIndividualRadioButton()
                .selectKycDocument(customersData.individual_kyc_documents.passport)
                .enterKycDocumentNumber(customersData.individual_kyc_documents.passport_number)
                .uploadNewKycDocument(ATTACHMENTS.PASSPORT)
                .clickSaveButtonOfTheDrawer();

            // Verify KYC upload success message
            cy.verifyToastMessage(customersData.successful_kyc_upload_message);

            // Verify the show more documents number Click show more documents link
            /*
                A total of 5 documents are uploaded.
                - By default, 4 documents are visible.
                - The "Show More" button displays the remaining 1 document, so the count will be 1.
            */
            KamCustomerPage.verifyShowMoreDocumentsCount(1)
                .clickShowMoreDocuments();

            // Verify that view document modal appears after clicking on show more documents
            KamCustomerPage.validateViewDocumentModal();

            // Verify the PAN KYC submission details in view documents modal
            KamCustomerPage.verifyPanKycDetails(kycDocumentUploader, kycDocumentVerifier);
        })
    });
})