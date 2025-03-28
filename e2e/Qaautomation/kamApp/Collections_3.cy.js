import {ENDPOINTS} from "../../../constants/endpoints";
import {KAM_URL} from "../../../constants/kamUrls";
import KamCollectionPage from "../../../components/pages/KamCollectionPage";
import {MESSAGES} from "../../../constants/messages";
import {ATTACHMENTS} from "../../../constants/attachments";
import HeaderComponent from "../../../components/common/header_component";

describe("Collections-3", () => {
    const testDevice = "samsung-s10";
    let collectionData;
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
        "Verify user is not able to complete collection after providing all the information but uploading image",
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
                .clickFinishButton();

            // Verify error message below upload image button
            KamCollectionPage.verifyImageUploadErrorMessage(
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
        "Verify user is able to complete collection without providing Remarks",
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

            // Verify user is able to collect money without providing remarks
            KamCollectionPage.clickCollectNowButtonOfCustomerCard()
                .enterPaymentMethod(paymentMethod)
                .enterAmountToBeReceived(collectionData.received_amounts.positive)
                .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
                .clickFinishButton();

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
        }
    );

    it(
        "Verify user is able to upload multiple images to complete collection",
        {tags: "@regression"},
        () => {
            const paymentMethod = "NEFT";

            // Intercepting the outstanding & collection summary APIs
            cy.customIntercept(
                "GET",
                `${ENDPOINTS.CUSTOMERS_AMOUNT_TO_BE_COLLECTED}/**`,
                "customerOutstanding"
            );
            cy.customIntercept(
                "POST",
                ENDPOINTS.CUSTOMER_BANK_PAYMENT,
                'customerBankPayment'
            );

            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.wait("@customerOutstanding");
            cy.viewport(testDevice);

            // Verify user is able to collect money by uploading multiple images
            KamCollectionPage.clickCollectNowButtonOfCustomerCard()
                .enterPaymentMethod(paymentMethod)
                .enterAmountToBeReceived(collectionData.received_amounts.positive)
                .enterRemarks(collectionData.remarks)
                .uploadAndVerifyMultipleImages(
                    ATTACHMENTS.IMAGE_PATH_1,
                    ATTACHMENTS.IMAGE_PATH_2,
                    ATTACHMENTS.IMAGE_PATH_3
                )
                .clickFinishButton();
            cy.wait(`@customerBankPayment`);

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
        }
    );

    it(
        "Verify user is not able to complete collection after providing the amount as 0",
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

            // Verify user is not able to collect money by providing 0 as amount
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_8,
                    paymentMethod,
                    collectionData.received_amounts.zero,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Verify error message below amount received field
            KamCollectionPage.verifyReceivedAmountErrorMessage(
                MESSAGES.AMOUNT_ERROR_MESSAGE
            );

            // Verify user is not navigating to the next page
            KamCollectionPage.elements
                .paymentDrawerTitle()
                .should(
                    "have.text",
                    `${collectionData.drawer_title}from ${collectionData.customers.customer_8}`
                );
        }
    );

    it(
        "Verify user is not able to complete collection after providing the amount as a negative value",
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

            // Verify user is not able to collect money by providing negative amount
            KamCollectionPage.clickCollectNowButton()
                .completeCollection(
                    collectionData.drawer_title,
                    collectionData.customers.customer_8,
                    paymentMethod,
                    collectionData.received_amounts.negative,
                    collectionData.remarks,
                    ATTACHMENTS.IMAGE_PATH_1
                );

            // Verify error message below amount received field
            KamCollectionPage.verifyReceivedAmountErrorMessage(
                MESSAGES.AMOUNT_ERROR_MESSAGE
            );

            // Verify user is not navigating to the next page
            KamCollectionPage.elements
                .paymentDrawerTitle()
                .should(
                    "have.text",
                    `${collectionData.drawer_title}from ${collectionData.customers.customer_8}`
                );
        }
    );

    it(
        "Verify the payment pop-up gets closed after clicking on cancel button",
        {tags: "@regression"},
        () => {
            // Visiting collection page
            cy.visit(KAM_URL.COLLECTIONS_PAGE);
            cy.viewport(testDevice);

            // Verify user is able to see the collect money drawer after clicking collect now drawer
            KamCollectionPage.clickCollectNowButtonOfCustomerCard()
                .elements.paymentDrawerTitle()
                .should(
                    "have.text",
                    `${collectionData.drawer_title}from ${collectionData.customers.customer_8}`
                );

            // Verify user is not able to see the collection money drawer after clicking cancel button and
            // navigating back to collection page
            KamCollectionPage.clickCancelButton()
                .elements.paymentDrawerTitle()
                .should("not.exist");
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
        }
    );

    it(
        "Verify the provided values are not getting cached after clicking on cancel button",
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

            // Verify user is able to click cancel button after filling all the details
            KamCollectionPage.clickCollectNowButton()
                .enterCustomerName(
                    collectionData.drawer_title,
                    collectionData.customers.customer_8
                )
                .enterPaymentMethod(paymentMethod)
                .enterAmountToBeReceived(collectionData.received_amounts.positive)
                .enterRemarks(collectionData.remarks)
                .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1)
                .clickCancelButton();

            // Verify user is in the collection page
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

            // Verify user will see all the fields as empty after opening the collection drawer again
            KamCollectionPage.clickCollectNowButton().verifyEmptiedFieldInCollectionDrawer();
        }
    );

    it(
        "Verify user can edit the customer by removing the customer name before clicking the 'Finish' button",
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

            // Verify user is able to fill all the details
            KamCollectionPage.clickCollectNowButton()
                .enterCustomerName(
                    collectionData.drawer_title,
                    collectionData.customers.customer_8
                )
                .enterPaymentMethod(paymentMethod)
                .enterAmountToBeReceived(collectionData.received_amounts.positive)
                .enterRemarks(collectionData.remarks)
                .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1);

            // Verify removing the customer name by clicking on the cross icon and then provide the customer name again
            KamCollectionPage.clearCustomerName()
                .enterCustomerName(
                    collectionData.drawer_title,
                    collectionData.customers.customer_2
                )
                .elements.customerTextField()
                .should("have.value", collectionData.customers.customer_2);

            // Click on finish button
            KamCollectionPage.clickFinishButton();

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
        }
    );

    it(
        "Verify user can edit the customer by removing the customer card before clicking the 'Finish' button",
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

            // Verify user is able to fill all the details
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
                .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1);

            // Verify removing the customer card by clicking on the cross icon and then provide the customer name again
            KamCollectionPage.removeCustomerCard();

            // Click on finish button
            KamCollectionPage.clickFinishButton();

            // Verify error message below customer name field
            KamCollectionPage.verifyCustomerNameErrorMessage(
                MESSAGES.REQUIRED_ERROR_MESSAGE
            );

            // Entering customer name again
            KamCollectionPage.enterCustomerName(
                collectionData.drawer_title,
                collectionData.customers.customer_2
            ).verifyCustomerCardInPaymentDrawer(
                collectionData.drawer_title,
                collectionData.customers.customer_2,
                collectionData.contact_number.customer_2,
                collectionData.phone_prefix,
                collectionData.total_outstanding_amount_for_customer_2
            );

            // Click on finish button
            KamCollectionPage.clickFinishButton();

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);
        }
    );

    it(
        "Verify user can edit the payment method before clicking the 'Finish' button",
        {tags: "@regression"},
        () => {
            const paymentMethod = "NEFT";
            const newPaymentMethod = "UPI";

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

            // Verify user is able to fill all the details
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
                .uploadAndVerifyNumberOfSingleImage(ATTACHMENTS.IMAGE_PATH_1);

            // Verify removing the payment method by selecting the none option and then provide another payment method
            KamCollectionPage.clearPaymentMethod()
                .enterPaymentMethod(newPaymentMethod)
                .elements.paymentMethodField()
                .should("have.value", newPaymentMethod);

            // Click on finish button
            KamCollectionPage.clickFinishButton();

            // Verify success message
            cy.verifyToastMessage(MESSAGES.COLLECTION_SUCCESS_MESSAGE);

            // Verify user is in the collection page
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);
        }
    );

    it(
        "Verify the customer name gets included in the pop-up title after selecting the customer name",
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

            // Verify collection drawer title after providing customer name
            KamCollectionPage.clickCollectNowButton().enterCustomerName(
                collectionData.drawer_title,
                collectionData.customers.customer_8
            );
        }
    );

    it(
        "Verify user is able to click the dial button on the customer name card",
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

            // Verify user is able to fill all the details
            KamCollectionPage.clickCollectNowButton().enterCustomerName(
                collectionData.drawer_title,
                collectionData.customers.customer_8
            );

            // Verify user is able to click the dial button from the customer card
            KamCollectionPage.verifyCustomerCardDialIconIsClickable(
                collectionData.phone_prefix,
                collectionData.contact_number.customer_8
            );
        }
    );

    it(
        "Verify the customer name is pre-selected if the user clicks on 'collect now' button from the customer card",
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

            // Clicking collect now button and verifying the preselected customer name
            KamCollectionPage.clickCollectNowButtonOfCustomerCard().verifyPreselectedCustomerNameAndCustomerCard(
                collectionData.customers.customer_8
            );
        }
    );

    it(
        "Verify the payment method field gets cleared after selecting the None option",
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

            // Verify user is able to select payment method
            KamCollectionPage.clickCollectNowButton().enterPaymentMethod(
                paymentMethod
            );

            // Verify user can clear the payment method by selecting none option
            KamCollectionPage.clearPaymentMethod();
        }
    );

    it(
        "Verify user is able to complete the collection by selecting the payment method as Virtual Payment",
        {tags: ["@smoke", "@regression"]},
        () => {
            const paymentMethod = "Virtual Payment";
            const paymentMethodLabel = "Virtual A/C";

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

            // Entering customer name and payment method
            KamCollectionPage.clickCollectNowButton()
                .enterCustomerName(
                    collectionData.drawer_title,
                    collectionData.customers.customer_8
                )
                .enterPaymentMethod(paymentMethod);

            // Verify the collection drawer for virtual payment
            KamCollectionPage.verifyCollectionDrawerForVirtualPayment(
                collectionData.drawer_title,
                collectionData.customers.customer_8
            );

            // Entering amount and remarks
            KamCollectionPage.enterAmountToBeReceived(
                collectionData.received_amounts.positive
            )
                .enterRemarks(collectionData.remarks)
                .clickFinishButton();

            // Verify the virtual payment drawer
            KamCollectionPage.verifyVirtualPaymentDrawer(
                collectionData.drawer_title,
                collectionData.customers.customer_8,
                collectionData.vpa_platform,
                collectionData.vpa_timer_content,
                collectionData.drawer_content.vpa
            );

            // Close the virtual payment drawer
            KamCollectionPage.clickCloseIconOfVirtualPaymentDrawer();

            // Verify user is in the collection page after completing the collection
            HeaderComponent.verifyHeaderTitle(collectionData.collection_title);

            // Clicking prev collection tab
            KamCollectionPage.selectPrevCollectionTab();

            // Search the customer and Verify the customer card in prev collection tab
            KamCollectionPage.verifyCustomerCardInPrevCollectionTab(
                collectionData.customers.customer_8,
                collectionData.phone_prefix,
                collectionData.contact_number.customer_8,
                collectionData.received_amounts.positive,
                paymentMethodLabel,
                collectionData.verification_status.in_progress
            );
        }
    );
})