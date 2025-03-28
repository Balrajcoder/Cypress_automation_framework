import {ENDPOINTS} from "../../../constants/endpoints";
import {KAM_URL} from "../../../constants/kamUrls";
import KamCollectionPage from "../../../components/pages/KamCollectionPage";
import {ATTACHMENTS} from "../../../constants/attachments";
import {MESSAGES} from "../../../constants/messages";
import HeaderComponent from "../../../components/common/header_component";
import DateTimeUtils from "../../../Utility/dateTimeUtils";
import KamDepositsPage from "../../../components/pages/KamDepositsPage";
import FooterComponent from "../../../components/common/footer_component";
import KamHomePage from "../../../components/pages/KamHomePage";

describe("Collections-4", () => {
    const testDevice = "samsung-s10";
    let collectionData;
    let paymentVerificationPayload;
    let paymentRejectionPayload;
    let paymentDeletionPayload;
    let totalOutstandingAmount;
    let customerOutstandingAmount;
    let totalOutstandingAmountAfterCollection;
    let customerOutstandingAmountAfterCollection;
    let totalOutstandingAmountAfterVerification;
    let customerOutstandingAmountAfterVerification;
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
        switch (Cypress.currentTest.title) {
            case "Verify the outstanding amount is getting deducted immediately in case the payment method is cash and the amount is less than 50000":
            case "Verify the outstanding amount is not getting deducted immediately in case the payment method is cash and the amount is more than 50000":
            case "Verify user is able to complete the collection by selecting the payment method as CASH":
            case "Verify user can complete collection without uploading an image if the payment method is cash":
            case "Verify cash payment modal closes after clicking on No, I will collect via UPI button":
            case "Verify user can not collect duplicate cash payments in 5 minutes":
                // Login to KAM app
                cy.sessionLogin(
                    collectionData.users.kam.username_2,
                    collectionData.users.kam.password
                );
                break;
            case "Verify user can edit the search customer field on Collection page":
            case "Verify the total outstanding amount or the collection due amount is the summation of outstanding amount of all customers attached to the KAM":
                // Login to KAM app
                cy.sessionLogin(
                    collectionData.users.kam.username_4,
                    collectionData.users.kam.password
                );
                break;
            case "Verify the outstanding amount is getting deducted immediately in case the payment method is cash and the amount is more than 50000 if the user is having bypass_cash_collector role":
                // Login to KAM app
                cy.sessionLogin(
                    collectionData.users.kam.username_3,
                    collectionData.users.kam.password
                );
                break;
            case "Verify cash collection cannot exceed  Rs 198000 for any customer per day":
                // Login to KAM app
                cy.sessionLogin(
                    collectionData.users.kam.username_5,
                    collectionData.users.kam.password
                );
                break;
            default:
                // Login to KAM app
                cy.sessionLogin(
                    collectionData.users.kam.username_1,
                    collectionData.users.kam.password
                );
                break;
        }
    });

    it.skip(
        "Verify user can see all the images uploaded during cash collection after clicking View all proofs in prev collection tab",
        {tags: "@regression", retries: {runMode: 2, openMode: 2}},
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

            // Verify user is able to collect money by uploading multiple images
            KamCollectionPage.clickCollectNowButton()
                .enterCustomerName(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1
                )
                .enterPaymentMethod(paymentMethod)
                .enterAmountToBeReceived(collectionData.received_amounts.positive)
                .enterRemarks(collectionData.remarks)
                .uploadAndVerifyMultipleImages(
                    ATTACHMENTS.IMAGE_PATH_1,
                    ATTACHMENTS.IMAGE_PATH_2,
                    ATTACHMENTS.IMAGE_PATH_3
                )
                .clickFinishButton();

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

            // Clicking prev collection tab
            KamCollectionPage.selectPrevCollectionTab().verifyViewAllProofInPrevCollectionTab(
                collectionData.customers.customer_1,
                ATTACHMENTS.IMAGE_PATH_1.split("/").pop(),
                ATTACHMENTS.IMAGE_PATH_2.split("/").pop(),
                ATTACHMENTS.IMAGE_PATH_3.split("/").pop()
            );
        }
    );

    it(
        "Verify Outstanding amount is getting deducted after the payment is verified",
        {tags: ["@smoke", "@regression"]},
        () => {
            const paymentMethod = "NEFT";
            let receivedAmount = collectionData.received_amounts.positive;

            // Intercepting the payment API call to get payment id, transaction time
            cy.customIntercept("POST", ENDPOINTS.BANK_PAYMENT, "payment");

            // Intercepting the outstanding API calls
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Fetch the total outstanding amount before collecting the money
            KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                totalOutstandingAmount = amount;

                // Fetch the customer outstanding amount before collecting the money
                KamCollectionPage.fetchCustomerOutstandingAmount(
                    collectionData.customers.customer_1
                ).then((amount) => {
                    customerOutstandingAmount = amount;

                    // Collect money
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
                        cy.wait("@customerOutstanding");

                        // Verify user is in the collection page after completing the collection
                        HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

                        // Fetch the total outstanding amount after collection
                        KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                            totalOutstandingAmountAfterCollection = amount;

                            // Fetch the customer outstanding amount after collection
                            KamCollectionPage.fetchCustomerOutstandingAmount(
                                collectionData.customers.customer_1
                            ).then((amount) => {
                                customerOutstandingAmountAfterCollection = amount;

                                // Verify that the total outstanding amount is not getting deducted
                                // immediately after collecting the money
                                expect(totalOutstandingAmount).to.equal(
                                    totalOutstandingAmountAfterCollection
                                );

                                // Verify that the customer outstanding amount is not getting deducted
                                // immediately after collecting the money
                                expect(customerOutstandingAmount).to.equal(
                                    customerOutstandingAmountAfterCollection
                                );

                                // Verifying the payment from CRM dashboard using API
                                const payload = {
                                    ...paymentVerificationPayload,
                                    transaction_time:
                                        DateTimeUtils.convertUnixToISOWithOffset(transactionTime),
                                    verification_time: DateTimeUtils.getIsoTimestamp(),
                                };
                                cy.sendRequest(
                                    "PUT",
                                    ENDPOINTS.PAYMENT_VERIFICATION(paymentId),
                                    {body: payload}
                                ).then(() => {
                                    cy.reload();
                                    cy.wait("@customerOutstanding");
                                    cy.wait(3000);

                                    // Fetching the total outstanding amount after payment verification
                                    KamCollectionPage.getTotalOutstandingAmount().then(
                                        (amount) => {
                                            totalOutstandingAmountAfterVerification = amount;

                                            // Verify that the total outstanding amount is getting deducted
                                            // immediately after verifying the payment
                                            expect(
                                                (totalOutstandingAmount - receivedAmount).toFixed(2)
                                            ).to.equal(totalOutstandingAmountAfterVerification);

                                            // Fetch the customer outstanding amount after verification
                                            KamCollectionPage.fetchCustomerOutstandingAmount(
                                                collectionData.customers.customer_1
                                            ).then((amount) => {
                                                customerOutstandingAmountAfterVerification = amount;

                                                // Verify that the customer outstanding amount is getting deducted
                                                // immediately after verifying the payment
                                                expect(
                                                    (customerOutstandingAmount - receivedAmount).toFixed(
                                                        2
                                                    )
                                                ).to.equal(customerOutstandingAmountAfterVerification);
                                            });
                                        }
                                    );
                                });
                            });
                        });
                    });
                });
            });
        }
    );

    it(
        "Verify Outstanding amount is not getting deducted after the payment is rejected",
        {tags: ["@smoke", "@regression"]},
        () => {
            const paymentMethod = "NEFT";
            let totalOutstandingAmountAfterRejection;
            let customerOutstandingAmountAfterRejection;
            let receivedAmount = collectionData.received_amounts.positive;

            // Intercepting the payment API call to get payment id, transaction id
            cy.customIntercept("POST", ENDPOINTS.BANK_PAYMENT, "payment");

            // Intercepting the outstanding API calls
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
                    collectionData.customers.customer_1
                ).then((amount) => {
                    customerOutstandingAmount = amount;

                    // Verify user is able to collect money by clicking 'Collect Now' button of customer card
                    KamCollectionPage.clickCollectNowButtonOfCustomerCard()
                        .enterPaymentMethod(paymentMethod)
                        .enterAmountToBeReceived(receivedAmount)
                        .enterRemarks(collectionData.remarks)
                        .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
                        .clickFinishButton();

                    // Waiting for the API response to get payment id and transaction time
                    cy.wait("@payment").then((interceptResponse) => {
                        paymentId = interceptResponse.response.body.id;
                        transactionTime = interceptResponse.response.body.transaction_time;

                        // Verify success message
                        cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
                        cy.wait("@customerOutstanding");
                        cy.wait(3000);

                        // Verify user is in the collection page after completing the collection
                        HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

                        // Fetch the total outstanding amount after collection
                        KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                            totalOutstandingAmountAfterCollection = amount;

                            // Fetch the customer outstanding amount after collection
                            KamCollectionPage.fetchCustomerOutstandingAmount(
                                collectionData.customers.customer_1
                            ).then((amount) => {
                                customerOutstandingAmountAfterCollection = amount;

                                // Verify that the total outstanding amount is not getting deducted
                                // immediately after collecting the money
                                expect(totalOutstandingAmount).to.equal(
                                    totalOutstandingAmountAfterCollection
                                );

                                // Verify that the customer outstanding amount is not getting deducted
                                // immediately after collecting the money
                                expect(customerOutstandingAmount).to.equal(
                                    customerOutstandingAmountAfterCollection
                                );

                                // Rejecting the payment from CRM dashboard using API
                                const payload = {
                                    ...paymentRejectionPayload,
                                    verification_time:
                                        DateTimeUtils.getCurrentEpochTimeInMilliseconds(),
                                };
                                cy.sendRequest(
                                    "PUT",
                                    ENDPOINTS.PAYMENT_VERIFICATION(paymentId),
                                    {body: payload}
                                ).then(() => {
                                    cy.reload();
                                    cy.wait("@customerOutstanding");
                                    cy.wait(3000);

                                    // Fetching the total outstanding amount after payment verification
                                    KamCollectionPage.getTotalOutstandingAmount().then(
                                        (amount) => {
                                            totalOutstandingAmountAfterRejection = amount;

                                            // Verify that the total outstanding amount is getting deducted
                                            // immediately after verifying the payment
                                            expect(totalOutstandingAmount).to.equal(
                                                totalOutstandingAmountAfterRejection
                                            );

                                            // Fetch the customer outstanding amount after verification
                                            KamCollectionPage.fetchCustomerOutstandingAmount(
                                                collectionData.customers.customer_1
                                            ).then((amount) => {
                                                customerOutstandingAmountAfterRejection = amount;

                                                // Verify that the customer outstanding amount is getting deducted
                                                // immediately after verifying the payment
                                                expect(customerOutstandingAmount).to.equal(
                                                    customerOutstandingAmountAfterRejection
                                                );
                                            });
                                        }
                                    );
                                });
                            });
                        });
                    });
                });
            });
        }
    );

    it(
        "Once you delete the payment then it will not be shown in collections and also Outstanding amount will be increased",
        {tags: ["@smoke", "@regression"]},
        () => {
            const paymentMethod = "NEFT";
            let totalOutstandingAmountAfterDeletion;
            let customerOutstandingAmountAfterDeletion;
            let receivedAmount = collectionData.received_amounts.positive;

            // Intercepting the payment API call to get payment id, transaction id
            cy.customIntercept("POST", ENDPOINTS.BANK_PAYMENT, "payment");

            // Intercepting the outstanding API calls
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
                    collectionData.customers.customer_1
                ).then((amount) => {
                    customerOutstandingAmount = amount;

                    // Verify user is able to collect money by clicking 'Collect Now' button of customer card
                    KamCollectionPage.clickCollectNowButtonOfCustomerCard()
                        .enterPaymentMethod(paymentMethod)
                        .enterAmountToBeReceived(receivedAmount)
                        .enterRemarks(collectionData.remarks)
                        .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
                        .clickFinishButton();

                    // Waiting for the API response to get payment id and transaction time
                    cy.wait("@payment").then((interceptResponse) => {
                        paymentId = interceptResponse.response.body.id;
                        transactionTime = interceptResponse.response.body.transaction_time;

                        // Verify success message
                        cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
                        cy.wait("@customerOutstanding");
                        cy.wait(3000);

                        // Verify user is in the collection page after completing the collection
                        HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

                        // Fetch the total outstanding amount after collection
                        KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                            totalOutstandingAmountAfterCollection = amount;

                            // Fetch the customer outstanding amount after collection
                            KamCollectionPage.fetchCustomerOutstandingAmount(
                                collectionData.customers.customer_1
                            ).then((amount) => {
                                customerOutstandingAmountAfterCollection = amount;

                                // Verify that the total outstanding amount is not getting deducted
                                // immediately after collecting the money
                                expect(totalOutstandingAmount).to.equal(
                                    totalOutstandingAmountAfterCollection
                                );

                                // Verify that the customer outstanding amount is not getting deducted
                                // immediately after collecting the money
                                expect(customerOutstandingAmount).to.equal(
                                    customerOutstandingAmountAfterCollection
                                );

                                // Verifying the payment from CRM dashboard using API
                                const payload = {
                                    ...paymentVerificationPayload,
                                    transaction_time:
                                        DateTimeUtils.convertUnixToISOWithOffset(transactionTime),
                                    verification_time: DateTimeUtils.getIsoTimestamp(),
                                };
                                cy.sendRequest(
                                    "PUT",
                                    ENDPOINTS.PAYMENT_VERIFICATION(paymentId),
                                    {body: payload}
                                ).then(() => {
                                    cy.reload();
                                    cy.wait("@customerOutstanding");
                                    cy.wait(3000);

                                    // Fetching the total outstanding amount after payment verification
                                    KamCollectionPage.getTotalOutstandingAmount().then(
                                        (amount) => {
                                            totalOutstandingAmountAfterVerification = amount;

                                            // Verify that the total outstanding amount is getting deducted
                                            // immediately after verifying the payment
                                            expect(
                                                (totalOutstandingAmount - receivedAmount).toFixed(2)
                                            ).to.equal(totalOutstandingAmountAfterVerification);

                                            // Fetch the customer outstanding amount after verification
                                            KamCollectionPage.fetchCustomerOutstandingAmount(
                                                collectionData.customers.customer_1
                                            ).then((amount) => {
                                                customerOutstandingAmountAfterVerification = amount;

                                                // Verify that the customer outstanding amount is getting deducted
                                                // immediately after verifying the payment
                                                expect(
                                                    (customerOutstandingAmount - receivedAmount).toFixed(
                                                        2
                                                    )
                                                ).to.equal(customerOutstandingAmountAfterVerification);

                                                //Deleting the payment from CRM dashboard using API
                                                cy.sendRequest(
                                                    "PUT",
                                                    ENDPOINTS.PAYMENT_DELETION(paymentId),
                                                    {body: paymentDeletionPayload}
                                                ).then(() => {
                                                    cy.reload();
                                                    cy.wait("@customerOutstanding");
                                                    cy.wait(3000);

                                                    // Fetching the total outstanding amount after payment
                                                    // deletion
                                                    KamCollectionPage.getTotalOutstandingAmount().then(
                                                        (amount) => {
                                                            totalOutstandingAmountAfterDeletion = amount;

                                                            // Verify that the total outstanding amount is
                                                            // getting added immediately after deleting
                                                            // the payment. The amount becomes equal to the
                                                            // amount before verifying the payment
                                                            expect(
                                                                (
                                                                    parseFloat(
                                                                        totalOutstandingAmountAfterVerification
                                                                    ) + parseFloat(receivedAmount)
                                                                ).toFixed(2)
                                                            )
                                                                .to.equal(totalOutstandingAmountAfterDeletion)
                                                                .to.equal(
                                                                totalOutstandingAmountAfterCollection
                                                            );

                                                            // Fetch the customer outstanding amount after
                                                            // deletion
                                                            KamCollectionPage.fetchCustomerOutstandingAmount(
                                                                collectionData.customers.customer_1
                                                            ).then((amount) => {
                                                                customerOutstandingAmountAfterDeletion = amount;

                                                                // Verify that the customer outstanding
                                                                // amount is getting added immediately
                                                                // after deleting the payment. The amount
                                                                // becomes equal to the amount before
                                                                // verifying the payment
                                                                expect(
                                                                    (
                                                                        parseFloat(
                                                                            customerOutstandingAmountAfterVerification
                                                                        ) + parseFloat(receivedAmount)
                                                                    ).toFixed(2)
                                                                )
                                                                    .to.equal(
                                                                    customerOutstandingAmountAfterDeletion
                                                                )
                                                                    .to.equal(
                                                                    customerOutstandingAmountAfterCollection
                                                                );
                                                            });
                                                        }
                                                    );
                                                });
                                            });
                                        }
                                    );
                                });
                            });
                        });
                    });
                });
            });
        }
    );

    it(
        "Verify the outstanding amount is getting deducted immediately in case the payment method is cash and the amount is less than 50000",
        {tags: ["@smoke", "@regression"]},
        () => {
            const paymentMethod = "Cash";
            let receivedAmount = 49999;

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
                    collectionData.customers.customer_3
                ).then((amount) => {
                    customerOutstandingAmount = amount;

                    // Collecting the money
                    KamCollectionPage.clickCollectNowButton()
                        .completeCollection(
                            collectionData.drawer_title,
                            collectionData.customers.customer_3,
                            paymentMethod,
                            receivedAmount,
                            collectionData.remarks,
                            ATTACHMENTS.IMAGE_PATH_1
                        );

                    // Click proceed button of cash drawer
                    KamCollectionPage.clickProceedButton();

                    // Verify success message
                    cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

                    // Verify user is in the collection page after completing the collection
                    HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
                    cy.reload();
                    cy.wait("@customerOutstanding");
                    cy.wait(3000);

                    // Fetch the total outstanding amount after collection
                    KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                        totalOutstandingAmountAfterCollection = amount;

                        // Fetch the customer outstanding amount after collection
                        KamCollectionPage.fetchCustomerOutstandingAmount(
                            collectionData.customers.customer_3
                        ).then((amount) => {
                            customerOutstandingAmountAfterCollection = amount;

                            // Verify that the total outstanding amount is getting deducted immediately
                            // after collecting the money
                            expect(
                                (totalOutstandingAmount - receivedAmount).toFixed(2)
                            ).to.equal(totalOutstandingAmountAfterCollection);

                            // Verify that the customer outstanding amount is getting deducted immediately
                            // after collecting the money
                            expect(
                                (customerOutstandingAmount - receivedAmount).toFixed(2)
                            ).to.equal(customerOutstandingAmountAfterCollection);

                            // The below part is the test case of deposit module
                            //Verify user can see cash collections which is having a status of 'Verified'

                            // Visiting deposit page
                            cy.visit(KAM_URL.DEPOSITS_PAGE);
                            cy.wait(3000);

                            // Validating the data in the previous collection tab
                            KamDepositsPage.clickPreviousDataTab();

                            // Verify cash collection amount will be same as receivedAmount
                            KamDepositsPage.verifyCashCollectionsPanelCard(receivedAmount);

                            // Navigate to deposit details page and verify the deposit card
                            KamDepositsPage.clickChevronAndMoreDetailsOnPanelCard('Cash Collections');
                            HeaderComponent.verifyHeaderTitle('Collections');

                            // Verify the elements in the amount card
                            KamDepositsPage.verifyCashCollectionsCardInPreviousData(
                                collectionData.customers.customer_3,
                                receivedAmount,
                                'Verified'
                            );

                            // Verify that the image will open in new tab after clicking on it
                            KamDepositsPage.verifyOpeningImageInNewTab();
                        });
                    });
                });
            });
        }
    );

    it(
        "Verify the outstanding amount is not getting deducted immediately in case the payment method is cash and the amount is more than 50000",
        {tags: "@regression"},
        () => {
            const paymentMethod = "Cash";
            let receivedAmount = 50001;

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
                    collectionData.customers.customer_3
                ).then((amount) => {
                    customerOutstandingAmount = amount;

                    // Collecting the money
                    KamCollectionPage.clickCollectNowButton()
                        .completeCollection(
                            collectionData.drawer_title,
                            collectionData.customers.customer_3,
                            paymentMethod,
                            receivedAmount,
                            collectionData.remarks,
                            ATTACHMENTS.IMAGE_PATH_1
                        );

                    // Click proceed button of cash drawer
                    KamCollectionPage.clickProceedButton();

                    // Verify success message
                    cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
                    cy.reload();
                    cy.wait("@customerOutstanding");
                    cy.wait(3000);

                    // Verify user is in the collection page after completing the collection
                    HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

                    // Fetch the total outstanding amount after collection
                    KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                        totalOutstandingAmountAfterCollection = amount;

                        // Fetch the customer outstanding amount after collection
                        KamCollectionPage.fetchCustomerOutstandingAmount(
                            collectionData.customers.customer_3
                        ).then((amount) => {
                            customerOutstandingAmountAfterCollection = amount;

                            // Verify that the total outstanding amount is not getting deducted immediately after collecting the money
                            expect(totalOutstandingAmount).to.equal(
                                totalOutstandingAmountAfterCollection
                            );

                            // Verify that the customer outstanding amount is not deducted immediately after collecting the money
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
        "Verify user is able to complete the collection by selecting the payment method as CASH",
        {tags: ["@smoke", "@regression"]},
        () => {
            const paymentMethod = "Cash";
            const paymentMethodInPrevCollectionTab = "CASH";

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

            // Verify user is able to collect money through Cash
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                ).clickProceedButton();

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
                collectionData.verification_status.verified
            );
        }
    );

    it(
        "Verify user can complete collection without uploading an image if the payment method is cash",
        {tags: "@regression"},
        () => {
            const paymentMethod = "Cash";
            const receivedAmount = 12;

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

            // Verify user is able to complete collection without uploading an image
            KamCollectionPage.clickCollectNowButton()
                .enterCustomerName(
                    collectionData.drawer_title,
                    collectionData.customers.customer_1
                )
                .enterPaymentMethod(paymentMethod)
                .enterAmountToBeReceived(receivedAmount)
                .enterRemarks(collectionData.remarks)
                .clickFinishButton()
                .clickProceedButton();

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
        }
    );

    it(
        "Verify cash payment modal closes after clicking on No, I will collect via UPI button",
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
            cy.wait(3000);

            // Fetch the total outstanding amount before collecting the money
            KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                totalOutstandingAmount = amount;

                // Fetch the customer outstanding amount before collecting the money
                KamCollectionPage.fetchCustomerOutstandingAmount(
                    collectionData.customers.customer_3
                ).then((amount) => {
                    customerOutstandingAmount = amount;

                    // Filling the details to get the cash drawer and click on declined button
                    KamCollectionPage.clickCollectNowButton()
                        .enterCustomerName(
                            collectionData.drawer_title,
                            collectionData.customers.customer_1
                        )
                        .enterPaymentMethod(paymentMethod)
                        .enterAmountToBeReceived(collectionData.received_amounts.positive)
                        .enterRemarks(collectionData.remarks)
                        .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
                        .clickFinishButton()
                        .clickCashDrawerDeclinedButton();

                    //Verify the cash drawer is removed
                    KamCollectionPage.verifyAbsenceOfCashDrawer();

                    //Click on cancel button of collection drawer
                    KamCollectionPage.clickCancelButton();

                    // Verify user is in the collection page after completing the collection
                    HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
                    cy.reload();
                    cy.wait("@customerOutstanding");
                    cy.wait(3000);

                    // Fetch the total outstanding amount after collection
                    KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                        totalOutstandingAmountAfterCollection = amount;

                        // Fetch the customer outstanding amount after collection
                        KamCollectionPage.fetchCustomerOutstandingAmount(
                            collectionData.customers.customer_3
                        ).then((amount) => {
                            customerOutstandingAmountAfterCollection = amount;

                            // Verify that the total outstanding amount is not getting deducted immediately after collecting the money
                            expect(totalOutstandingAmount).to.equal(
                                totalOutstandingAmountAfterCollection
                            );

                            // Verify that the customer outstanding amount is not deducted immediately after collecting the money
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
        "Verify user can not collect duplicate cash payments in 5 minutes",
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

            // complete the collection
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_3,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                ).clickProceedButton();

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Try to complete the collection with same amount again
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_3,
                    paymentMethod,
                    collectionData.received_amounts.positive,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                ).clickProceedButton();

            // Verify the error messages
            cy.get(".notistack-SnackbarContainer #notistack-snackbar")
                .eq(1)
                .should("have.text", MESSAGES.DUPLICATE_CASH_PAYMENT_MESSAGE);
            cy.get(".notistack-SnackbarContainer #notistack-snackbar")
                .eq(0)
                .should("have.text", MESSAGES.PAYMENT_FAILURE_MESSAGE);
        }
    );

    it(
        "Verify user can edit the search customer field on Collection page",
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
            cy.wait(3000);

            //Verify the number of customer cards before searching
            KamCollectionPage.elements.customerCard().its("length").should("eq", 2);
            KamCollectionPage.elements
                .customerName()
                .eq(0)
                .should("have.text", collectionData.customers.customer_6);
            KamCollectionPage.elements
                .customerName()
                .eq(1)
                .should("have.text", collectionData.customers.customer_5);

            // Verify user is able to search a customer which is attached to the KAM
            KamCollectionPage.enterCustomerNameInSearchField(
                collectionData.customers.customer_5
            );

            //Verify the number of customer cards after searching
            KamCollectionPage.elements.customerCard().its("length").should("eq", 1);
            KamCollectionPage.elements
                .customerName()
                .should("have.text", collectionData.customers.customer_5);

            // Clear the search field
            KamCollectionPage.clearCustomerNameInSearchField();

            //Verify the number of customer cards after clearing the search field
            KamCollectionPage.elements.customerCard().its("length").should("eq", 2);
            KamCollectionPage.elements
                .customerName()
                .eq(0)
                .should("have.text", collectionData.customers.customer_6);
            KamCollectionPage.elements
                .customerName()
                .eq(1)
                .should("have.text", collectionData.customers.customer_5);
        }
    );

    it(
        "Verify the total outstanding amount or the collection due amount is the summation of outstanding amount of all customers attached to the KAM",
        {tags: ["@smoke", "@regression"]},
        () => {
            let customerOutstandingAmount1;
            let customerOutstandingAmount2;

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

            // Fetching outstanding amount of each customer
            KamCollectionPage.fetchCustomerOutstandingAmount(
                collectionData.customers.customer_5
            ).then((amount) => {
                customerOutstandingAmount1 = amount;
                KamCollectionPage.fetchCustomerOutstandingAmount(
                    collectionData.customers.customer_6
                ).then((amount) => {
                    customerOutstandingAmount2 = amount;

                    // Fetch total outstanding amount
                    KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                        totalOutstandingAmount = amount;

                        // Verify the total outstanding amount is the summation of outstanding amount
                        // of all customers attached to the KAM
                        expect(totalOutstandingAmount).to.equal(
                            (
                                parseFloat(customerOutstandingAmount1) +
                                parseFloat(customerOutstandingAmount2)
                            ).toFixed(2)
                        );

                        // Navigate back to home page
                        FooterComponent.clickHomeButton();

                        // Verify the outstanding amount of collection card
                        const dueAmount = (totalOutstandingAmount / 1000).toFixed(1);
                        const formattedDueAmount = "₹" + dueAmount + "K" + " Due";
                        KamHomePage.verifyDueAmount(formattedDueAmount);
                    });
                });
            });
        }
    );

    it(
        "Verify the outstanding amount is getting deducted immediately in case the payment method is cash and the amount is more than 50000 if the user is having bypass_cash_collector role",
        {tags: "@regression"},
        () => {
            const paymentMethod = "Cash";
            let receivedAmount = 50001;

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
                    collectionData.customers.customer_4
                ).then((amount) => {
                    customerOutstandingAmount = amount;

                    // Collecting money
                    KamCollectionPage.clickCollectNowButton()
                        .completeCollection(
                            collectionData.drawer_title,
                            collectionData.customers.customer_4,
                            paymentMethod,
                            receivedAmount,
                            collectionData.remarks,
                            ATTACHMENTS.IMAGE_PATH_1
                        );

                    //Click proceed button of cash drawer
                    KamCollectionPage.clickProceedButton();

                    // Verify success message
                    cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

                    // Verify user is in the collection page after completing the collection
                    HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
                    cy.reload();
                    cy.wait("@customerOutstanding");
                    cy.wait(3000);

                    // Fetch the total outstanding amount after collection
                    KamCollectionPage.getTotalOutstandingAmount().then((amount) => {
                        totalOutstandingAmountAfterCollection = amount;

                        // Fetch the customer outstanding amount after collection
                        KamCollectionPage.fetchCustomerOutstandingAmount(
                            collectionData.customers.customer_4
                        ).then((amount) => {
                            customerOutstandingAmountAfterCollection = amount;

                            // Verify that the total outstanding amount is deducted immediately after collecting the money
                            expect(
                                (totalOutstandingAmount - receivedAmount).toFixed(2)
                            ).to.equal(totalOutstandingAmountAfterCollection);

                            // Verify that the customer outstanding amount is deducted immediately
                            // after collecting the money
                            expect(
                                (customerOutstandingAmount - receivedAmount).toFixed(2)
                            ).to.equal(customerOutstandingAmountAfterCollection);
                        });
                    });
                });
            });
        }
    );

    it(
        "Verify cash collection cannot exceed  Rs 198000 for any customer per day",
        {tags: ["@smoke", "@regression"]},
        () => {
            const paymentMethod = "Cash";
            let receivedAmount = 198001;

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

            // Collecting the money
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_7,
                    paymentMethod,
                    receivedAmount,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Click proceed button of cash drawer
            KamCollectionPage.clickProceedButton();

            // Verify error messages
            cy.get(".notistack-SnackbarContainer #notistack-snackbar")
                .eq(0)
                .should("have.text", MESSAGES.PAYMENT_FAILURE_MESSAGE);
            cy.get(".notistack-SnackbarContainer #notistack-snackbar")
                .eq(1)
                .should("have.text", MESSAGES.EXCEED_PAYMENT_LIMIT);
        }
    );
});