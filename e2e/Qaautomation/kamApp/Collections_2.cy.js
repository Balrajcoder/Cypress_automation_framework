import {ENDPOINTS} from "../../../constants/endpoints";
import {KAM_URL} from "../../../constants/kamUrls";
import KamCollectionPage from "../../../components/pages/KamCollectionPage";
import {ATTACHMENTS} from "../../../constants/attachments";
import {MESSAGES} from "../../../constants/messages";
import HeaderComponent from "../../../components/common/header_component";
import DateTimeUtils from "../../../Utility/dateTimeUtils";
import KamHomePage from "../../../components/pages/KamHomePage";


describe("Collections-2", () => {
    const testDevice = "samsung-s10";
    let collectionData;
    let paymentVerificationPayload;
    let paymentRejectionPayload;
    let paymentDeletionPayload;
    let paymentId;
    let transactionTime;
    before(() => {
        cy.fixture("kam_collection_flow").then((userdata) => {
            collectionData = userdata;
            cy.loginAuth(
                collectionData.users.kam.username_1,
                collectionData.users.kam.password
            );
        });

        cy.fixture("kamPayload").then((payload) => {
            paymentVerificationPayload = payload.payment_verification;
            paymentRejectionPayload = payload.payment_rejection;
            paymentDeletionPayload = payload.payment_deletion;
        });
    });
    beforeEach(() => {
        // Login to KAM app
        cy.sessionLogin(
            collectionData.users.kam.username_1,
            collectionData.users.kam.password
        );
    });
    it(
        "Verify user is able to complete the collection by selecting the payment method as NEFT",
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

            // Verify user is able to collect money through NEFT
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

            // Clicking prev collection tab
            KamCollectionPage.selectPrevCollectionTab();

            // Search the customer and Verify the customer card in prev collection tab
            KamCollectionPage.verifyCustomerCardInPrevCollectionTab(
                collectionData.customers.customer_1,
                collectionData.phone_prefix,
                collectionData.contact_number.customer_1,
                collectionData.received_amounts.positive,
                paymentMethod,
                collectionData.verification_status.pending
            );
        }
    );

    it(
        "Verify user is able to complete the collection by selecting the payment method as RTGS",
        {tags: "@regression"},
        () => {
            const paymentMethod = "RTGS";

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

            // Verify user is able to collect money through RTGS
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

            // Clicking prev collection tab
            KamCollectionPage.selectPrevCollectionTab();

            // Search the customer and Verify the customer card in prev collection tab
            KamCollectionPage.verifyCustomerCardInPrevCollectionTab(
                collectionData.customers.customer_1,
                collectionData.phone_prefix,
                collectionData.contact_number.customer_1,
                collectionData.received_amounts.positive,
                paymentMethod,
                collectionData.verification_status.pending
            );
        }
    );

    it(
        "Verify user is able to complete the collection by selecting the payment method as IMPS",
        {tags: "@regression"},
        () => {
            const paymentMethod = "IMPS";

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

            // Verify user is able to collect money through RTGS
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

            // Clicking prev collection tab
            KamCollectionPage.selectPrevCollectionTab();

            // Search the customer and Verify the customer card in prev collection tab
            KamCollectionPage.verifyCustomerCardInPrevCollectionTab(
                collectionData.customers.customer_1,
                collectionData.phone_prefix,
                collectionData.contact_number.customer_1,
                collectionData.received_amounts.positive,
                paymentMethod,
                collectionData.verification_status.pending
            );
        }
    );

    it(
        "Verify user is able to complete the collection by selecting the payment method as CHEQUE",
        {tags: "@regression"},
        () => {
            const paymentMethod = "CHEQUE";

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

            // Verify user is able to collect money through Cheque
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

            // Clicking prev collection tab
            KamCollectionPage.selectPrevCollectionTab();

            // Search the customer and Verify the customer card in prev collection tab
            KamCollectionPage.verifyCustomerCardInPrevCollectionTab(
                collectionData.customers.customer_1,
                collectionData.phone_prefix,
                collectionData.contact_number.customer_1,
                collectionData.received_amounts.positive,
                paymentMethod,
                collectionData.verification_status.pending
            );
        }
    );

    it(
        "Verify user is able to complete the collection by selecting the payment method as BANK DEPOSIT",
        {tags: "@regression"},
        () => {
            const paymentMethod = "BANK DEPOSIT";
            const paymentMethodInPrevCollectionTab = "BANK_DEPOSIT";

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

            // Verify user is able to collect money through bank deposit
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

            // Clicking prev collection tab
            KamCollectionPage.selectPrevCollectionTab();

            // Search the customer and Verify the customer card in prev collection tab
            KamCollectionPage.verifyCustomerCardInPrevCollectionTab(
                collectionData.customers.customer_1,
                collectionData.phone_prefix,
                collectionData.contact_number.customer_1,
                collectionData.received_amounts.positive,
                paymentMethodInPrevCollectionTab,
                collectionData.verification_status.pending
            );
        }
    );

    it(
        "Verify user is able to complete the collection by selecting the payment method as UPI",
        {tags: "@regression"},
        () => {
            const paymentMethod = "UPI";

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

            // Verify user is able to collect money through UPI
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

            // Clicking prev collection tab
            KamCollectionPage.selectPrevCollectionTab();

            // Search the customer and Verify the customer card in prev collection tab
            KamCollectionPage.verifyCustomerCardInPrevCollectionTab(
                collectionData.customers.customer_1,
                collectionData.phone_prefix,
                collectionData.contact_number.customer_1,
                collectionData.received_amounts.positive,
                paymentMethod,
                collectionData.verification_status.pending
            );
        }
    );

    it(
        "Verify KAM can not see the Cash option in the dropdown if he does not have the Cash collector role",
        {tags: "@regression"},
        () => {
            const paymentMethod = "Cash";

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

            // Click collect now button
            KamCollectionPage.clickCollectNowButton();

            // Verify KAM can not see the Cash option in the dropdown
            KamCollectionPage.verifyAbsenceOfCashPaymentMethod(paymentMethod);
        }
    );

    it(
        "Verify all the details of the collection to be shown in prev collection tab",
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

            // Complete the collection
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Clicking prev collection tab
            KamCollectionPage.selectPrevCollectionTab();

            // Search the customer and Verify the customer card in prev collection tab
            KamCollectionPage.verifyCustomerCardInPrevCollectionTab(
                collectionData.customers.customer_1,
                collectionData.phone_prefix,
                collectionData.contact_number.customer_1,
                collectionData.received_amounts.positive,
                paymentMethod,
                collectionData.verification_status.pending
            );
        }
    );

    it(
        "Verify user can see the collected amount in 'prev collection' tab with verified status",
        {tags: "@regression"},
        () => {
            const paymentMethod = "NEFT";

            // Intercepting the outstanding & collection summary APIs and the payment API call to get payment id,
            // transaction time
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );
            cy.customIntercept("POST", ENDPOINTS.BANK_PAYMENT, "payment");

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Complete the collection
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Waiting for the API response to get payment id and transaction time
            cy.wait("@payment").then((interceptResponse) => {
                expect(interceptResponse.response.statusCode).to.eq(200);
                expect(interceptResponse.response.body).to.not.be.empty;

                paymentId = interceptResponse.response.body.id;
                transactionTime = interceptResponse.response.body.transaction_time;

                // Verify success message
                cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

                // Verifying the payment from CRM dashboard using API
                const payload = {
                    ...paymentVerificationPayload,
                    transaction_time:
                        DateTimeUtils.convertUnixToISOWithOffset(transactionTime),
                    verification_time: DateTimeUtils.getIsoTimestamp(),
                };
                cy.sendRequest("PUT", ENDPOINTS.PAYMENT_VERIFICATION(paymentId), {
                    body: payload,
                }).then(() => {
                    cy.reload();

                    // Clicking prev collection tab
                    KamCollectionPage.selectPrevCollectionTab();

                    // Search the customer and Verify the customer card in prev collection tab
                    KamCollectionPage.verifyCustomerCardInPrevCollectionTab(
                        collectionData.customers.customer_1,
                        collectionData.phone_prefix,
                        collectionData.contact_number.customer_1,
                        collectionData.received_amounts.positive,
                        paymentMethod,
                        collectionData.verification_status.verified
                    );
                });
            });
        }
    );

    it(
        "Verify user can see the collected amount in 'prev collection' tab with rejected status",
        {tags: "@regression"},
        () => {
            const paymentMethod = "NEFT";

            // Intercepting the outstanding & collection summary APIs and the payment API call to get payment id,
            // transaction time
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );
            cy.customIntercept("POST", ENDPOINTS.BANK_PAYMENT, "payment");

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Complete the collection
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Waiting for the API response to get payment id and transaction time
            cy.wait("@payment").then((interceptResponse) => {
                paymentId = interceptResponse.response.body.id;
                transactionTime = interceptResponse.response.body.transaction_time;

                // Verify success message
                cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

                // Rejecting the payment from CRM dashboard using API
                const payload = {
                    ...paymentRejectionPayload,
                    verification_time: DateTimeUtils.getCurrentEpochTimeInMilliseconds(),
                };
                cy.sendRequest("PUT", ENDPOINTS.PAYMENT_VERIFICATION(paymentId), {
                    body: payload,
                }).then(() => {
                    cy.reload();

                    // Clicking prev collection tab
                    KamCollectionPage.selectPrevCollectionTab();

                    // Search the customer and Verify the customer card in prev collection tab
                    KamCollectionPage.verifyCustomerCardInPrevCollectionTab(
                        collectionData.customers.customer_1,
                        collectionData.phone_prefix,
                        collectionData.contact_number.customer_1,
                        collectionData.received_amounts.positive,
                        paymentMethod,
                        collectionData.verification_status.rejected
                    );
                });
            });
        }
    );

    it(
        "Verify user can click the dial button from the customer card of 'prev Collection' tab",
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

            // Complete the collection
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Clicking prev collection tab
            KamCollectionPage.selectPrevCollectionTab();

            // Search the customer and verify the dial icon of the customer card is clickable
            KamCollectionPage.elements
                .searchTextField()
                .type(collectionData.customers.customer_1);
            cy.wait(3000);
            KamCollectionPage.elements
                .dialIconPrevCollectionTab()
                .eq(0)
                .should(
                    "have.attr",
                    "href",
                    `tel:+${collectionData.phone_prefix}${collectionData.contact_number.customer_1}`
                )
                .and("be.visible")
                .and("not.be.disabled");
        }
    );

    it(
        "Verify user can navigate to the home page from collection page by clicking soft back button",
        {tags: "@regression"},
        () => {
            // Visiting collection page
            cy.visit(KAM_URL.HOME_PAGE);
            cy.viewport(testDevice);

            // Visit collection page
            KamHomePage.clickViewLink();

            // Click on soft back button
            HeaderComponent.verifyHeaderTitle(
                collectionData.collection_title
            ).clickBackButton();

            //Verify Greetings in the home page
            KamHomePage.verifyGreeting();
        }
    );

    it(
        "Verify user can see the full address of the customer by clicking 'See More'",
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

            // Click on see more and verify the full address
            KamCollectionPage.clickSeeMoreSeeLessButton(
                collectionData.customer_full_location
            );

            // Click on see less and verify the partial address
            KamCollectionPage.clickSeeMoreSeeLessButton(
                collectionData.customer_partial_location
            );
        }
    );
})