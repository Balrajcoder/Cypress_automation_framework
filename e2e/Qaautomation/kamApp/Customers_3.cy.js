import {KAM_URL} from "../../../constants/kamUrls";
import {ENDPOINTS} from "../../../constants/endpoints";
import KamCustomerPage from "../../../components/pages/KamCustomerPage";
import {ATTACHMENTS} from "../../../constants/attachments";

describe("Customers-3", () => {
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

    it("Verify the Document number is masked if Doc is verified/Rejected status", {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_6;
        const documentMap = {};

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

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton();

        // Onboarding a customer
        KamCustomerPage.saveCustomerOnboardingDraftWithMultipleIndividualKyc(
            customerName,
            customersData.new_poc_name.poc_6,
            customersData.new_customer_mobile_number.mobile_number_6,
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

            // Verify unmasked Aadhaar number and PAN number before verification and Presence of View and Delete icon
            KamCustomerPage.verifyAadhaarBeforeVerification(customersData.individual_kyc_documents.aadhar_card_number)
                .verifyPanBeforeVerification(customersData.individual_kyc_documents.pan_card_number);

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

            // Verify masked Aadhaar number and PAN number before verification and Absence of View and Delete icon
            KamCustomerPage.verifyAadhaarAfterVerification(customersData.individual_kyc_documents.aadhar_card_number)
                .verifyPanAfterVerification(customersData.individual_kyc_documents.pan_card_number);
        })
    })

    it("Verify user can view and delete the KYC documents", {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_7;

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

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton();

        // Onboarding a customer
        KamCustomerPage.saveCustomerOnboardingDraft(
            customerName,
            customersData.new_poc_name.poc_7,
            customersData.new_customer_mobile_number.mobile_number_7,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );

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

        // Click on view button and validate the opened business PAN card
        KamCustomerPage.clickViewButton()
            .validateOpenedImage(ATTACHMENTS.BUSINESS_PAN_CARD);

        // Click on outside the image
        cy.get('body').click(10, 10);

        // Click on Delete icon
        KamCustomerPage.clickDeleteIcon()
            .clickDeleteConfirmationButton();

        // Verify that Business PAN card KYC document is successfully deleted
        KamCustomerPage.validateAbsenceOfBusinessPanCardTile();
    })

    it("Upload new Business document from KYC details page", {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_8;

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

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton();

        // Onboarding a customer
        KamCustomerPage.saveCustomerOnboardingDraft(
            customerName,
            customersData.new_poc_name.poc_8,
            customersData.new_customer_mobile_number.mobile_number_8,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );

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

        // Click upload document button and upload the business document
        KamCustomerPage.clickUploadDocumentButton()
            .clickBusinessRadioButton()
            .selectKycDocument(customersData.business_kyc_documents.fssai)
            .enterKycDocumentNumber(customersData.business_kyc_documents.fssai_number)
            .uploadNewKycDocument(ATTACHMENTS.FSSAI)
            .clickSaveButtonOfTheDrawer();

        // Verify KYC upload success message
        cy.verifyToastMessage(customersData.successful_kyc_upload_message);

        // Verify the FSSAI license card is visible
        KamCustomerPage.validatePresenceOfFssaiTile();
    })

    it("Verify physical verification history page", {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_9;

        /*
            - `physicalVerificationInitiator`: The logged-in user who uploads KYC documents.
        */
        const physicalVerificationInitiator = customersData.users.names.username_8;

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
            ENDPOINTS.CUSTOMER_PHYSICAL_VERIFICATION,
            'customerPhysicalVerification'
        );

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton();

        // Onboarding a customer
        KamCustomerPage.saveCustomerOnboardingDraft(
            customerName,
            customersData.new_poc_name.poc_9,
            customersData.new_customer_mobile_number.mobile_number_9,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );

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

        // Initiate physical verification request
        KamCustomerPage.clickPhysicalVerificationRequestButton()
            .selectLocation()
            .enterCustomerPhysicalVerificationRemarks(customersData.remarks)
            .clickSaveButtonOfTheDrawer(); // Request button
        cy.wait('@customerPhysicalVerification').then((customerPhysicalVerification) => {

            // Verify the success message
            cy.verifyToastMessage(customersData.successful_physical_verification_message);

            // Fetching customer verification request id
            const customerVerificationRequestId = customerPhysicalVerification.response.body.id;

            // Verify a new physical verification tile is added
            KamCustomerPage.verifyPresenceOfCustomerPhysicalVerificationTile(physicalVerificationInitiator);

            // Verify initial status of physical verification (should be 'Requested')
            KamCustomerPage.validateCustomerPhysicalVerificationStatus('Requested');

            // Function to send physical verification update request
            const updatePhysicalVerificationStatus = (payload, expectedStatus) => {
                cy.sendRequest('PUT', ENDPOINTS.UPDATE_PHYSICAL_VERIFICATION, {body: payload});
                cy.reload();
                KamCustomerPage.validateCustomerPhysicalVerificationStatus(expectedStatus);
            };

            // Default payload for initial verifications
            const defaultPayload = {
                id: customerVerificationRequestId,
                remark: customersData.remarks
            };

            // Perform Central Demand Approval and CPV Initiation (Status should remain 'Requested')
            updatePhysicalVerificationStatus(defaultPayload, 'Requested');

            // Perform CPV Initiation (Status should change to 'In-Progress')
            updatePhysicalVerificationStatus(defaultPayload, 'In-Progress');

            // Modified payload for CPV Completion
            const modifiedPayload = {
                ...defaultPayload,  // Reuse existing payload properties
                marked_as: "Positive"
            };

            // Perform CPV Completion (Status should change to 'Positive')
            updatePhysicalVerificationStatus(modifiedPayload, 'Positive');
        })
    });
})