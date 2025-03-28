import KamHomePage from "../../../components/pages/KamHomePage";
import KamCustomerPage from "../../../components/pages/KamCustomerPage";
import KamCollectionPage from "../../../components/pages/KamCollectionPage";
import {KAM_URL} from "../../../constants/kamUrls";
import {ATTACHMENTS} from "../../../constants/attachments";
import {MESSAGES} from "../../../constants/messages";
import {ENDPOINTS} from "../../../constants/endpoints";
import HeaderComponent from "../../../components/common/header_component";
import FooterComponent from "../../../components/common/footer_component";

describe("Customers-1", () => {
    const testDevice = "samsung-s10";
    let customersData;
    let collectionData;

    before(() => {
        cy.fixture("kam_customers_flow").then((userdata) => {
            customersData = userdata;
            cy.loginAuth(
                customersData.users.kam.username_1,
                customersData.users.kam.password
            );
        });
        cy.fixture("kam_collection_flow").then((userdata) => {
            collectionData = userdata;
        });
    });

    beforeEach(() => {
        switch (Cypress.currentTest.title) {
            case "Verify the Dormant customer count when user and customer are having different subsidiary type":
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_2,
                    customersData.users.kam.password
                );
                break;
            case "My customers filter for FSE user":
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_3,
                    customersData.users.kam.password
                );
                break;
            case "My customers filter for Demand head role":
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_4,
                    customersData.users.kam.password
                );
                break;
            case "Default filter for super role user":
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_6,
                    customersData.users.kam.password
                );
                break;
            case "Verify basic details form fields":
            case "Save as draft basic details form with Minimal details":
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_8,
                    customersData.users.kam.password
                );
                break;
            default:
                // Login to KAM app
                cy.sessionLogin(
                    customersData.users.kam.username_1,
                    customersData.users.kam.password
                );
                break;
        }
    });

    it("Verify initiate collection flow from Customer details page", {tags: ['@smoke', '@regression']}, () => {
        const customerName = customersData.customers.customer_1;
        const paymentMethod = "NEFT";
        let totalOutstandingAmountBeforeCollection;
        let totalOutstandingAmountAfterCollection;

        // Intercepting the customer details API
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_DETAIL}?**`,
            'customerDetails'
        );

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Search for a customer and click on it
        KamCustomerPage.searchCustomer(customerName);
        cy.wait("@customerDetails");
        cy.wait(3000);
        KamCustomerPage.clickCustomerCard(customerName);
        cy.wait("@customerDetails");
        cy.wait(3000);

        // Fetch the total outstanding amount before collecting the money
        KamCustomerPage.fetchOutstandingAmount().then((amount) => {
            totalOutstandingAmountBeforeCollection = amount;

            // Click on initiate collection button
            KamCustomerPage.clickInitiateCollectionButton();

            // Completing the collection
            KamCollectionPage.elements.closeButtonInDrawer().click();
            KamCollectionPage.completeCollection(
                collectionData.drawer_title,
                customerName,
                paymentMethod,
                collectionData.received_amounts.positive,
                collectionData.remarks,
                ATTACHMENTS.IMAGE_PATH_1
            );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
            cy.wait("@customerDetails");
            cy.wait(3000);

            // Fetch the total outstanding amount after collecting the money
            KamCustomerPage.fetchOutstandingAmount().then((amount) => {
                totalOutstandingAmountAfterCollection = amount;

                // Verify that the total outstanding amount remains same even after collecting the money
                cy.wrap(totalOutstandingAmountBeforeCollection)
                    .should("be.equal", totalOutstandingAmountAfterCollection);
            })
        })
    });

    it("Verify the Dormant customer count when user and customer are having same subsidiary type", {tags: ['@smoke', '@regression']}, () => {
        const numberOfDormantCustomers = 1;

        // Visiting homepage
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);

        // Verify the elements in the customer card and dormant count
        KamHomePage.verifyCustomerCard()
            .verifyDormantCount(numberOfDormantCustomers);
    });

    it("Verify Customer card redirection page", {tags: '@regression'}, () => {

        // Visiting homepage
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);

        // Clicking on view details link on customer card
        KamHomePage.clickCustomers();

        // Verify that user navigates to customers page
        HeaderComponent.verifyHeaderTitle(customersData.customer_page_title);

        // Going back to home page
        FooterComponent.clickHomeButton();

        // Clicking a place other than the view click on customer card
        KamHomePage.clickCustomerCard();

        // Verify that user navigates to customers page
        HeaderComponent.verifyHeaderTitle(customersData.customer_page_title);
    });

    it("Verify the Dormant customer count when user and customer are having different subsidiary type", {tags: '@regression'}, () => {
        /*
        The user (User Customers 2) has a dormant customer but the user and the customer (customerCustomers2)
        are not having same subsidiary type
        */
        const numberOfDormantCustomers = 0;

        // Visiting homepage
        cy.visit(KAM_URL.HOME_PAGE);
        cy.viewport(testDevice);

        // Verify the elements in the customer card and dormant count
        KamHomePage.verifyCustomerCard()
            .verifyDormantCount(numberOfDormantCustomers);
    });

    it("All customers with same subsidiary as logged user should be shown if All customers filter applied", {tags: '@regression'}, () => {
        let customerCountBeforeApplyingFilter;
        let customerCountAfterApplyingFilter;

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Verify that user is on customers page
        HeaderComponent.verifyHeaderTitle(customersData.customer_page_title);

        // click on regular tab
        KamCustomerPage.clickRegularTab();

        // get the customer count before applying filter
        KamCustomerPage.getCustomerCardCount().then((count) => {
            customerCountBeforeApplyingFilter = count;

            // click on the filter and radio button
            KamCustomerPage.clickCustomerFilter()
                .clickAllCustomersRadioButton()
                .clickCustomerFilterSaveButton();

            // get the customer count before applying filter
            KamCustomerPage.getCustomerCardCount().then((count) => {
                customerCountAfterApplyingFilter = count;

                // Verify that user will see more customer after applying filter
                cy.wrap(customerCountAfterApplyingFilter).should('be.greaterThan', customerCountBeforeApplyingFilter);
            })
        })
    });

    it("Verify details to be shown in Customer card in customer listing page", {tags: '@regression'}, () => {
        const customerName = customersData.customers.customer_1;

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Verify that user is on customers page
        HeaderComponent.verifyHeaderTitle(customersData.customer_page_title);

        // Verify regular tab is pre selected
        KamCustomerPage.verifyRegularTabIsSelected();

        // Verify all the elements in customer card
        KamCustomerPage.verifyElementsInCustomerCard(customerName);
    });

    it("My customers filter for FSE user", {tags: '@regression'}, () => {
        /*
        Logged in as a user, "userCustomers3" who is not having any customer and tagged with a KAM "userCustomers1".
        By default, "userCustomers3" will see all the customers who are attached to "userCustomers1"
        */
        let customerCount;
        const customerName = customersData.customers.customer_1;
        const prospectCustomerName = customersData.customers.customer_6;

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

        // Verify that user is on customers page
        HeaderComponent.verifyHeaderTitle(customersData.customer_page_title);

        // Verify that New customer button is not present
        KamCustomerPage.verifyAbsenceOfNewCustomerButton();

        // Verify regular tab is pre selected
        KamCustomerPage.verifyRegularTabIsSelected();

        // get the customer count before applying filter
        KamCustomerPage.getCustomerCardCount().then((count) => {
            customerCount = count;
            expect(customerCount).to.be.greaterThan(0);

            // Verify all the elements in customer card
            KamCustomerPage.verifyElementsInCustomerCard(customerName);

            // click on the filter and verify my customer radio button is selected
            KamCustomerPage.clickCustomerFilter();

            // Verify that my customer radio button is selected
            KamCustomerPage.verifyMyCustomerRadioButtonIsSelected();

            // Click on cancel button of the filter drawer
            KamCustomerPage.clickCustomerFilterCancelButton();

            // Verify the prospect list
            KamCustomerPage.clickProspectTab();
            cy.wait('@customerDetails');
            cy.wait(3000);
            KamCustomerPage.verifyCustomerNameOnCard(prospectCustomerName)
                .searchCustomer(prospectCustomerName)
                .clickViewDetails(prospectCustomerName);
            cy.wait(['@customerDetails', '@customerHealth']);
            cy.wait(3000);

            // Verify that the initiate onboarding button is not present
            KamCustomerPage.verifyAbsenceOfCustomerOnboardingStatusAndInitiateOnboardingButton();
        });
    });

    it("My customers filter for Demand head role", {tags: '@regression'}, () => {
        /*
        Logged in as a Demand_head user, "userCustomers4" who is not having any customer and is a manager
        of a KAM "userCustomers5". By default, "userCustomers4" will see all the customers who are attached
        to "userCustomers5"
        */
        let customerCount;
        const customerName = customersData.customers.customer_4;

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Verify that user is on customers page
        HeaderComponent.verifyHeaderTitle(customersData.customer_page_title);

        // Verify regular tab is pre selected
        KamCustomerPage.verifyRegularTabIsSelected();

        // get the customer count before applying filter
        KamCustomerPage.getCustomerCardCount().then((count) => {
            customerCount = count;
            expect(customerCount).to.be.greaterThan(0);

            // Verify all the elements in customer card
            KamCustomerPage.verifyElementsInCustomerCard(customerName);

            // click on the filter and verify my customer radio button is selected
            KamCustomerPage.clickCustomerFilter();

            // Verify that my customer radio button is selected
            KamCustomerPage.verifyMyCustomerRadioButtonIsSelected();
        });
    });

    it("Default filter for super role user", {tags: '@regression'}, () => {
        /*
        Logged in as a user, "userCustomers6" who is a super_user not having any customer.
        By default, "userCustomers6" will see all the customers included in the system.
        */
        let customerCount;

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Verify that user is on customers page
        HeaderComponent.verifyHeaderTitle(customersData.customer_page_title);

        // Verify regular tab is pre selected
        KamCustomerPage.verifyRegularTabIsSelected();

        // get the customer count before applying filter
        KamCustomerPage.getCustomerCardCount().then((count) => {
            customerCount = count;
            expect(customerCount).to.be.greaterThan(0);

            // click on the filter and verify my customer radio button is selected
            KamCustomerPage.clickCustomerFilter();

            // Verify that all customer radio button is selected
            KamCustomerPage.verifyAllCustomersRadioButtonIsSelected();
        });
    });

    it("Verify basic details form fields", {tags: ['@smoke', '@regression']}, () => {
        const customerName = customersData.new_customer_name.customer_1;

        // Intercepting some APIs
        cy.customIntercept(
            'GET',
            ENDPOINTS.GET_PRODUCT_CATEGORIES,
            'productCategories'
        );
        cy.customIntercept(
            'POST',
            `${ENDPOINTS.CREATE_KAM_CUSTOMER}?**`,
            'createKamCustomer'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_PROFILING}/**`,
            'customerProfiling'
        );
        cy.customIntercept(
            'PUT',
            `${ENDPOINTS.UPDATE_KAM_CUSTOMER}?**`,
            'updateKamCustomer'
        );
        cy.customIntercept(
            'GET',
            ENDPOINTS.GET_COUNTRIES,
            'countries'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_LOCATIONS}?**`,
            'locations'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_STATES}?**`,
            'states'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_KYC_DOCUMENTS}?**`,
            'kycDocuments'
        );
        cy.customIntercept(
            'PUT',
            `${ENDPOINTS.UPDATE_LOCATION}?**`,
            'updateLocation'
        );
        cy.customIntercept(
            'GET',
            `${ENDPOINTS.GET_CUSTOMER_DETAIL}?**`,
            'customerDetails'
        );

        // Visiting customer page
        cy.visit(KAM_URL.CUSTOMERS_PAGE);
        cy.viewport(testDevice);

        // Verify elements in customers page
        KamCustomerPage.verifyElementsInCustomerPage(customersData.tab_names);

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton()
            .enterCustomerName(customerName)
            .enterPocName(customersData.new_poc_name.poc_1)
            .enterMobileNumber(customersData.new_customer_mobile_number.mobile_number_1)
            .enterAdditionalMobileNumber(customersData.additional_phone_number);

        // Validate business type field is disabled and prefilled with subsidiary type
        KamCustomerPage.validateBusinessTypeField();

        // Enter further details
        KamCustomerPage.selectPaymentMode(customersData.payment_mode.credit)
            .selectCustomerType(customersData.customer_type)
            .selectLanguage(customersData.english_language)
            .selectOwnershipType(customersData.ownership_type.individual)
            .uploadShopImageAndVisitingCard(ATTACHMENTS.IMAGE_PATH_1)
            .selectMarket(customersData.test_market)
            .enterPreferredTime(customersData.preferred_time)
            .clickProceedButton();
        cy.wait(['@productCategories', '@createKamCustomer', '@customerProfiling']);
        cy.wait(2000);

        // Select product in profiling page
        KamCustomerPage.selectProduct(customersData.product.apple)
            .enterPeakNumberTrucks(customersData.number_of_trucks)
            .enterAverageVolume(customersData.average_volume)
            .enterExpectedPackaging(customersData.expected_packaging)
            .enterExpectedGradeMix(customersData.expected_grade_mix)
            .enterRemarks(customersData.remarks)
            .clickProceedButton();
        cy.wait(['@updateKamCustomer', '@countries', '@locations', '@states']);
        cy.wait(2000);

        // Provide address details
        KamCustomerPage.enterAddress(customersData.address.billing)
            .clickProceedButton();
        cy.wait(['@updateLocation', '@kycDocuments']);
        cy.wait(2000);

        // Add KYC details
        KamCustomerPage.addKycDocuments(
            customersData.individual_kyc_documents.pan_card,
            customersData.individual_kyc_documents.pan_card_number,
            ATTACHMENTS.INDIVIDUAL_PAN_CARD,
            customersData.business_kyc_documents.business_pan_card,
            customersData.business_kyc_documents.pan_card_number,
            ATTACHMENTS.BUSINESS_PAN_CARD
        )
            .clickSaveAsDraftButton()
            .clickSaveButton();
        cy.wait('@customerDetails');
        cy.wait(3000);

        // Verify the created customer is present in the prospect list and the onboarding status
        KamCustomerPage.clickProspectTab();
        cy.wait('@customerDetails');
        cy.wait(3000);
        KamCustomerPage.verifyCustomerNameOnCard(customerName);
    });

    it("Save as draft basic details form with Minimal details", {tags: '@regression'}, () => {
        const customerName = customersData.new_customer_name.customer_3;

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

        // Click on new customer button and enter details
        KamCustomerPage.clickNewCustomerButton()
            .enterCustomerName(customerName)
            .enterPocName(customersData.new_poc_name.poc_3)
            .enterMobileNumber(customersData.new_customer_mobile_number.mobile_number_3);

        // Validate business type field is disabled and prefilled with subsidiary type
        KamCustomerPage.validateBusinessTypeField();

        // Click save as draft button
        KamCustomerPage.clickSaveAsDraftButton();

        // Verify the save as draft pop up
        KamCustomerPage.verifySaveAsDraftPopupWithCustomerName(customerName);

        // Click on save button and verify the success message
        KamCustomerPage.clickSaveButton();
        cy.wait('@createKamCustomer');
        cy.wait(1000);
        cy.verifyToastMessage(customersData.save_as_draft_success_message);
        cy.wait(3000);

        // Verify the created customer is present in the prospect list and the onboarding status
        KamCustomerPage.clickProspectTab();
        cy.wait('@customerDetails');
        cy.wait(3000);
        KamCustomerPage.verifyCustomerNameOnCard(customerName);
    });
})