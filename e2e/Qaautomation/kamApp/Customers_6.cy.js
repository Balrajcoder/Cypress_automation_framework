import {ENDPOINTS} from "../../../constants/endpoints";
import {KAM_URL} from "../../../constants/kamUrls";
import KamCustomerPage from "../../../components/pages/KamCustomerPage";
import {ATTACHMENTS} from "../../../constants/attachments";
import KamCheckinPage from "../../../components/pages/KamCheckinPage";
import CheckInTestData from "../../../Utility/createTestData/CheckInTestData";

describe("Customers-6", () => {
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
            case "Verify Activities checkin page after Checked in from Check-in modal from homepage":
            case "Expanded view of Basic data in Profile tab":
            case "Expanded view of Addresses data in Profile tab":
            case "Verify add more addresses in profile tab":
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_10,
                    customersData.users.kam.password
                )
                break;
            default:
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_8,
                    customersData.users.kam.password
                );
        }
    })

    it("Verify user can delete Bank details/Finanical docs/signed ledgers if it is in pending verification status", {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_18;
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
            customersData.new_poc_name.poc_18,
            customersData.new_customer_mobile_number.mobile_number_18,
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
            .assertFinancialDetailsUploadedByUser(itrUploader);

        // Delete the financial document
        KamCustomerPage.clickDeleteButton()
            .clickDeleteConfirmationButton();

        // Verify the uploaded financial document card
        KamCustomerPage.validateFinancialDocumentCard(0) // count will be 0 as we have deleted the financial document
    });

    it.skip("Verify Checkin for the customer from activities tab in customer page", {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_19;
        const purposeOfVisit = customersData.purpose_of_visit.delivery_of_fruit;

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
            customersData.new_poc_name.poc_19,
            customersData.new_customer_mobile_number.mobile_number_19,
            customersData.payment_mode.credit,
            customersData.ownership_type.individual,
            customersData.address.billing
        );

        // Search the created customer and click on view details
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to documentation section and then Activities page
        KamCustomerPage.clickDocumentationTab()
            .clickActivitiesCard()
            .clickNewCheckInButton()
            .assertCheckInCustomerNamePrefilled(customerName)
            .assertPurposeCheckboxNotSelected(purposeOfVisit)
            .selectPurposeOfVisit(purposeOfVisit)
            .assertPurposeCheckboxSelected(purposeOfVisit)
            .clickCheckInLocation()
            .clickRecordEntryButton()
            .assertLocationFetch()
            .clickRecordEntryButton() // Confirm button

        // Verify the success message
        cy.verifyToastMessage(customersData.successful_check_in_message);

        // Validate the checkin card
        KamCustomerPage.validateCheckInActivityCard(1) // count will be 1 as we have added one checkin activity
            .assertCheckInActivityCardCustomerName(customerName)
            .assertCheckInActivityCardDialIcon()
            .assertCheckInActivityPurpose(purposeOfVisit)
            .assertCheckInActivityDueDate()
            .assertCheckInActivityCompletedAt()

        // Validate checkin card in checkin page
        cy.visit(KAM_URL.CHECK_IN_PAGE);
        KamCheckinPage.clickCompleteTab()
            .verifyCheckInActivityCardCompletedTab(customerName, purposeOfVisit);
    })

    it.skip("Verify Activities checkin page after Checked in from Check-in modal from homepage", {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_7;

        // Visiting customer page
        cy.visit(KAM_URL.CHECK_IN_PAGE);
        cy.viewport(testDevice);

        // Complete checkin from checkin page
        CheckInTestData.CreateCheckInForNewLocation(customerName)
        CheckInTestData.CreateCheckInAfterEditingLocation(customerName)

        // Verify the success message
        cy.verifyToastMessage(customersData.successful_check_in_message_2);

        // Go to customer page and then activities page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName)
            .clickDocumentationTab()
            .clickActivitiesCard()
            .validateCheckInActivityCard(2) // count will be 2 as there was another checkin for
            // Automation Customer 19 before we have added one checkin activity
            .assertCheckInActivityCardCustomerName(customerName);
    })

    it("Expanded view of Basic data in Profile tab", {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_7;

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

        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to profile section and then profile page
        KamCustomerPage.clickProfileTab()
            .clickBasicDetailsCard();

        // Validate the basic details
        KamCustomerPage.assertBasicDetailsOfCustomer();
    })

    it("Expanded view of Addresses data in Profile tab", {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_7;

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

        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to profile section and then profile page
        KamCustomerPage.clickProfileTab()
            .clickAddressTitleCard()
            .clickSeeMoreSeeLessButton();

        // Validate the address details
        KamCustomerPage.assertAddressDetailsOfCustomer();
    })

    it("Verify add more addresses in profile tab", {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_8;

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

        KamCustomerPage.searchCustomer(customerName)
            .clickViewDetails(customerName);
        cy.wait(['@customerDetails', '@customerHealth']);
        cy.wait(3000);

        // Go to profile section and then profile page
        KamCustomerPage.clickProfileTab()
            .clickAddressTitleCard()
            .clickAddAddressButton();

        // Add new address
        KamCustomerPage.clickCustomerNewAddressTypeDropdown()
            .clickBillingAddressType()
            .clickNewAddressGpsIcon()
            .clickCoordinateExpandIcon()
            .validateNewAddressLatitudeAutofilled()
            .validateNewAddressLongitudeAutofilled()
            .enterCustomerNewAddressBuildingNumber()
            .enterCustomerNewAddressStreetName()
            .clickCustomerNewAddressCountryDropdown()
            .selectCountryIndia()
            .enterCustomerNewAddressCity()
            .clickCustomerNewAddressStateDropdown()
            .selectCustomerNewAddressStateTamilNadu()
            .clickCustomerNewAddressDistrictDropdown()
            .selectCustomerNewAddressDistrictChennai()
            .enterCustomerNewAddressPincode()
            .enterCustomerNewAddressCluster()
            .clickCustomerNewAddressSaveButton();

        // Verify the success message
        cy.verifyToastMessage(customersData.successful_customer_new_address_message);

        // Validate the address details
        KamCustomerPage.clickAddressTitleCard()
            .clickSeeMoreSeeLessButton()
            .assertNewAddressDetailsOfCustomer();
    })
})