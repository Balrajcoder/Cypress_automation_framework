import KamHomePage from "../../../components/pages/KamHomePage";
import KamCollectionPage from "../../../components/pages/KamCollectionPage";
import HeaderComponent from "../../../components/common/header_component";
import FooterComponent from "../../../components/common/footer_component";
import {MESSAGES} from "../../../constants/messages";
import {ATTACHMENTS} from "../../../constants/attachments";
import {ENDPOINTS} from "../../../constants/endpoints";
import {KAM_URL} from "../../../constants/kamUrls";

describe("Collections-1", () => {
    const testDevice = "samsung-s10";
    let collectionData;
    let totalOutstandingAmount;
    let customerOutstandingAmount;
    let totalOutstandingAmountAfterCollection;
    let customerOutstandingAmountAfterCollection;
    before(() => {
        cy.fixture("kam_collection_flow").then((userdata) => {
            collectionData = userdata;
            cy.loginAuth(
                collectionData.users.kam.username_6,
                collectionData.users.kam.password
            );
        });
    });
    beforeEach(() => {
        // Login to KAM app
        cy.sessionLogin(
            collectionData.users.kam.username_6,
            collectionData.users.kam.password
        );
    });
    it(
        "Verify the total due amount and number of customer in the collections card on the home page",
        {tags: ["@smoke", "@regression"]},
        () => {
            // Visiting homepage
            cy.visit(KAM_URL.HOME_PAGE);
            cy.viewport(testDevice);

            // Verify the total due amount and number of customer in the collections card on the home page
            KamHomePage.verifyCollectionCard()
                .verifyCardTitle(collectionData.collection_title)
                .verifyDueAmount(collectionData.due_amount_collection_card)
                .verifyNumberOfCustomers(collectionData.number_of_customers)
                .verifyUserProfileIcon()
                .verifyUserFirstName(collectionData.user_first_name)
                .verifyGreeting();
        });

    it(
        "Verify user can navigate to Collection page by clicking to 'View Details' link and by clicking anywhere in the collection card",
        {tags: "@regression"},
        () => {
            // Visiting landing page
            cy.visit(KAM_URL.HOME_PAGE);
            cy.viewport(testDevice);

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );
            cy.customIntercept(
                "GET",
                ENDPOINTS.COLLECTION_SUMMARY,
                "collectionSummary"
            );

            // Verify user can navigate to Collection page by clicking to 'View Details' link
            KamHomePage.clickViewLink();
            cy.wait("@customerOutstanding");
            cy.wait(3000);

            // Verify the collection due tab is selected
            KamCollectionPage.verifyCollectionDueTabIsSelected();

            // Verify the elements in collection page
            KamCollectionPage.verifyCollectionPageElements(
                collectionData.total_outstanding_amount,
                collectionData.customers.customer_8,
                collectionData.customer_partial_location,
                collectionData.total_outstanding_amount,
                collectionData.credit_past_days
            );
            HeaderComponent.verifyHeaderTitle(
                collectionData.collection_title
            ).clickBackButton();
            cy.wait("@collectionSummary");
            cy.wait(3000);

            // Verify user can navigate to Collection page by clicking anywhere in the collection card
            KamHomePage.clickCollectionCard();

            // Verify the collection due tab is selected
            KamCollectionPage.verifyCollectionDueTabIsSelected();

            // Verify user is on the collection page
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

            // Verify the elements in collection page
            KamCollectionPage.verifyCollectionPageElements(
                collectionData.total_outstanding_amount,
                collectionData.customers.customer_8,
                collectionData.customer_partial_location,
                collectionData.total_outstanding_amount,
                collectionData.credit_past_days
            );
        }
    );

    it(
        "Verify user can navigate to Collection page by clicking Collection icon in footer",
        {tags: "@regression"},
        () => {
            // Visiting homepage
            cy.visit(KAM_URL.HOME_PAGE);
            cy.viewport(testDevice);

            // click on collection footer
            FooterComponent.clickCollectionFooter();

            // Verify the elements in collection page
            KamCollectionPage.verifyCollectionPageElements(
                collectionData.total_outstanding_amount,
                collectionData.customers.customer_8,
                collectionData.customer_partial_location,
                collectionData.total_outstanding_amount,
                collectionData.credit_past_days
            );
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
        }
    );

    it(
        "Verify Collection due tab is selected by default when user lands on the collection page",
        {tags: "@regression"},
        () => {

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify the collection due tab is selected
            KamCollectionPage.verifyCollectionDueTabIsSelected();

            // Verify the elements in collection page
            KamCollectionPage.verifyCollectionPageElements(
                collectionData.total_outstanding_amount,
                collectionData.customers.customer_8,
                collectionData.customer_partial_location,
                collectionData.total_outstanding_amount,
                collectionData.credit_past_days
            );
        }
    );

    it(
        "Verify user is able to search a customer which is attached to the KAM",
        {tags: ["@smoke", "@regression"]},
        () => {
            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify the collection due tab is selected
            KamCollectionPage.verifyCollectionDueTabIsSelected();

            // Verify user is able to search a customer which is attached to the KAM
            KamCollectionPage.enterCustomerNameInSearchField(
                collectionData.customers.customer_8
            );

            // Verify the elements in collection page
            KamCollectionPage.verifyCollectionPageElements(
                collectionData.total_outstanding_amount,
                collectionData.customers.customer_8,
                collectionData.customer_partial_location,
                collectionData.total_outstanding_amount,
                collectionData.credit_past_days
            );
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
        }
    );

    it(
        "Verify user can click the dial button from the customer card",
        {tags: "@regression"},
        () => {

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify user is able to click the dial button from the customer card
            KamCollectionPage.verifyDialIconIsClickable(
                collectionData.phone_prefix,
                collectionData.contact_number.customer_8
            );
        }
    );

    it(
        "Verify user is able to collect money by clicking 'Collect Now' button of total amount card",
        {tags: ["@smoke", "@regression"]},
        () => {
            const paymentMethod = "NEFT";

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify user is able to collect money by clicking 'Collect Now' button of total amount card
            KamCollectionPage.clickCollectNowButton()
                .enterCustomerName(
                    collectionData.drawer_title,
                    collectionData.customers.customer_8
                )
                .verifyCustomerCardInPaymentDrawer(
                    collectionData.drawer_title,
                    collectionData.customers.customer_8,
                    collectionData.contact_number.customer_8,
                    collectionData.phone_prefix,
                    collectionData.total_outstanding_amount
                )
                .enterPaymentMethod(paymentMethod)
                .enterAmountToBeReceived(collectionData.received_amounts.positive)
                .enterRemarks(collectionData.remarks)
                .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
                .clickFinishButton();

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            KamCollectionPage.verifyCollectionPageElements(
                collectionData.total_outstanding_amount,
                collectionData.customers.customer_8,
                collectionData.customer_partial_location,
                collectionData.total_outstanding_amount,
                collectionData.credit_past_days
            );
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
        }
    );

    it(
        "Verify user can collect money by clicking 'Collect Now' button of customer card",
        {tags: "@regression"},
        () => {
            const paymentMethod = "NEFT";

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify user is able to collect money by clicking 'Collect Now' button of customer card
            KamCollectionPage.clickCollectNowButtonOfCustomerCard()
                .enterPaymentMethod(paymentMethod)
                .enterAmountToBeReceived(collectionData.received_amounts.positive)
                .enterRemarks(collectionData.remarks)
                .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
                .clickFinishButton();

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
        }
    );

    it(
        "Verify user can collect money from a customer who is not attached to a KAM",
        {tags: "@regression"},
        () => {
            const paymentMethod = "NEFT";

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify user is able to collecting money from a customer who is not attached to the KAM
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                collectionData.drawer_title,
                collectionData.customers.customer_2,
                paymentMethod,
                collectionData.received_amounts.positive,
                collectionData.remarks,
                ATTACHMENTS.IMAGE_PATH_1
            );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
        }
    );

    it(
        "Verify user is able to collect amount multiple times from a same customer",
        {tags: "@regression"},
        () => {
            const paymentMethod = "NEFT";

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify user is able to collect money
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                collectionData.drawer_title,
                collectionData.customers.customer_8,
                paymentMethod,
                collectionData.received_amounts.positive,
                collectionData.remarks,
                ATTACHMENTS.IMAGE_PATH_1
            );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is able to collect money for second time
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                collectionData.drawer_title,
                collectionData.customers.customer_8,
                paymentMethod,
                collectionData.received_amounts.positive,
                collectionData.remarks,
                ATTACHMENTS.IMAGE_PATH_1
            );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is able to collect money for the third time
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                collectionData.drawer_title,
                collectionData.customers.customer_8,
                paymentMethod,
                collectionData.received_amounts.positive,
                collectionData.remarks,
                ATTACHMENTS.IMAGE_PATH_1
            );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
        }
    );

    it(
        "Verify user is able to able to collect amount multiple times from different customers in a same day",
        {tags: "@regression"},
        () => {
            const paymentMethod = "NEFT";

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify user is able to collect money
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                collectionData.drawer_title,
                collectionData.customers.customer_8,
                paymentMethod,
                collectionData.received_amounts.positive,
                collectionData.remarks,
                ATTACHMENTS.IMAGE_PATH_1
            );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is able to collect money from a different customer
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                collectionData.drawer_title,
                collectionData.customers.customer_2,
                paymentMethod,
                collectionData.received_amounts.positive,
                collectionData.remarks,
                ATTACHMENTS.IMAGE_PATH_1
            );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
        }
    );

    it(
        "Verify Outstanding amount is not getting deducted immediately after collecting the money",
        {tags: "@regression"},
        () => {
            const paymentMethod = "NEFT";

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);
            cy.wait(3000);

            // Fetch the total outstanding amount before collecting the money
            KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                totalOutstandingAmount = amount;

                // Fetch the customer outstanding amount before collecting the money
                KamCollectionPage.fetchCustomerOutstandingAmount(
                    collectionData.customers.customer_8
                ).then((amount) => {
                    customerOutstandingAmount = amount;

                    // Verify user is able to collect money
                    KamCollectionPage.clickCollectNowButton()
                        .completeCollection(
                        collectionData.drawer_title,
                        collectionData.customers.customer_8,
                        paymentMethod,
                        collectionData.received_amounts.positive,
                        collectionData.remarks,
                        ATTACHMENTS.IMAGE_PATH_1
                    );

                    // Verify success message
                    cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

                    // Verify user is in the collection page after completing the collection
                    HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

                    // Fetch the total outstanding amount after collection
                    KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                        totalOutstandingAmountAfterCollection = amount;

                        // Fetch the customer outstanding amount after collection
                        KamCollectionPage.fetchCustomerOutstandingAmount(
                            collectionData.customers.customer_8
                        ).then((amount) => {
                            customerOutstandingAmountAfterCollection = amount;

                            // Verify that the total outstanding amount is not getting deducted immediately after collecting the money
                            expect(totalOutstandingAmount).to.equal(
                                totalOutstandingAmountAfterCollection
                            );

                            // Verify that the customer outstanding amount is not getting deducted immediately after collecting the money
                            expect(customerOutstandingAmount).to.equal(
                                customerOutstandingAmountAfterCollection
                            );
                        });
                    });
                });
            });
        }
    );

    it(
        "Verify user is not able to complete collection after providing all the information but payment method",
        {tags: "@regression"},
        () => {
            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify user is not able to collect money
            KamCollectionPage.clickCollectNowButtonOfCustomerCard()
                .enterAmountToBeReceived(collectionData.received_amounts.positive)
                .enterRemarks(collectionData.remarks)
                .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
                .clickFinishButton();

            // Verify error message below payment method field
            KamCollectionPage.verifyPaymentMethodErrorMessage(
                MESSAGES.REQUIRED_ERROR_MESSAGE
            );

            // Verify user is not navigating to the collection page after clicking on Finish button
            KamCollectionPage.elements
                .paymentDrawerTitle()
                .should(
                    "have.text",
                    `${collectionData.drawer_title}from ${collectionData.customers.customer_8}`
                );
        }
    );

    it(
        "Verify user is not able to complete collection after providing all the information but customer name",
        {tags: "@regression"},
        () => {
            const paymentMethod = "NEFT";

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify user is not able to collect money
            KamCollectionPage.clickCollectNowButton()
                .enterPaymentMethod(paymentMethod)
                .enterAmountToBeReceived(collectionData.received_amounts.positive)
                .enterRemarks(collectionData.remarks)
                .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
                .clickFinishButton();

            // Verify error message below customer name field
            KamCollectionPage.verifyCustomerNameErrorMessage(
                MESSAGES.REQUIRED_ERROR_MESSAGE
            );

            // Verify user is not navigating to the collection page after clicking on Finish button
            KamCollectionPage.elements
                .paymentDrawerTitle()
                .should("have.text", `${collectionData.drawer_title}`);
        }
    );

    it(
        "Verify user is not able to complete collection after providing all the information but amount to be received",
        {tags: "@regression"},
        () => {
            const paymentMethod = "NEFT";

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify user is not able to collect money
            KamCollectionPage.clickCollectNowButtonOfCustomerCard()
                .enterPaymentMethod(paymentMethod)
                .enterRemarks(collectionData.remarks)
                .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
                .clickFinishButton();

            // Verify error message below amount received field
            KamCollectionPage.verifyReceivedAmountErrorMessage(
                MESSAGES.REQUIRED_ERROR_MESSAGE
            );

            // Verify user is not navigating to the collection page after clicking on Finish button
            KamCollectionPage.elements
                .paymentDrawerTitle()
                .should(
                    "have.text",
                    `${collectionData.drawer_title}from ${collectionData.customers.customer_8}`
                );
        }
    );
});
