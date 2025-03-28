const dateTimeUtils = require("../../Utility/dateTimeUtils");

class KamHomePage {
    elements = {
        checkin: () => cy.get('[data-cy="kam.landing.CHECK_IN.card-title"]'),
        customers: () => cy.get('[data-cy="kam.landing.CUSTOMERS.card-link"]'),
        activities: () => cy.get('[data-cy="kam.landing.TASK_AND_ACTIVITIES.card-icon-container"]'),
        peerTransactions: () => cy.get('[data-cy="kam.landing.PEER_TRANSACTIONS.card-icon-container"]'),
        cashInHand: () => cy.get('[data-cy="collection.landing.total-amount"]'),
        profileIcon: () => cy.get('div[aria-label="User Circle"]'),
        logout: () => cy.get('[data-cy="kam.landing.logout.button"]'),
        collectionCard: () => cy.get("div[data-cy='kam.landing.COLLECTIONS_PAGE.parentgrid']"),
        dueAmount: () => cy.get("span[data-cy='kam.landing.COLLECTIONS.dueAmount']"),
        numberOfCustomers: () => cy.get("p[data-cy='kam.landing.COLLECTIONS.card-details-data']"),
        userProfileIcon: () => cy.get("div[data-cy='kam.landing.profileIcon']"),
        userFirstName: () => cy.get("div[data-cy='kam.landing.userName']"),
        greeting: () => cy.get("div[data-cy='kam.landing.greeting']"),
        viewLink: () => cy.get("p[data-cy='kam.landing.COLLECTIONS_PAGE.card-link']"),
        cardTitle: () => cy.get(`p[data-cy='kam.landing.COLLECTIONS_PAGE.card-title']`),
        depositIcon: () => cy.get("div[data-cy='kam.landing.DEPOSITS.card-icon-container']"),
        depositNowButton: () => cy.get("button[data-cy='kam.landing.depositNow']"),
        customerCard: () => cy.get("div[data-cy='kam.landing.CUSTOMERS.card']"),
        customerCardDetailsCount: () => cy.get("p[data-cy='kam.landing.CUSTOMERS.card-details-data']"),
        customerCardTitle: () => cy.get("p[data-cy='kam.landing.CUSTOMERS.card-title']"),
        customerTypeTab: (type) => cy.get(`[data-cy="kam.customers.${type}_customers-tab"]`),
        clickMyApprovalTab: () => cy.get(`[data-cy="kam.landing.my_approvals.button"]`),
        scrollCustomerTypeTab: () => cy.get(`[data-cy="kam.customers.tab-container--Regular"]`),

    }

    clickLogout() {
        this.elements.logout().click();
        return this;
    }

    clickProfileIcon() {
        this.elements.profileIcon().click();
        return this;
    }

    verifyVisiblityOfCheckin() {
        this.elements.checkin().should('be.visible');
        return this;
    }

    clickCheckin() {
        this.elements.checkin().click();
        return this;
    }

    clickCustomers() {
        this.elements.customers().click();
        return this;
    }

    clickCustomerCard() {
        this.elements.customerCard().click(30, 30);
        return this;
    }

    clickActivities() {
        this.elements.activities().click();
        return this;
    }

    verifyVisibilityOfActivities() {
        this.elements.activities().should('be.visible');
        return this;
    }

    verifyVisibilityOfPeerTransactions() {
        this.elements.peerTransactions().should('be.visible');
        return this;
    }

    clickPeerTransactions() {
        this.elements.peerTransactions().click();
        return this;
    }

    verifyCashInHand(cash) {
        this.elements.cashInHand().should('have.text', '₹' + cash);
        return this;
    }


    verifyCollectionCard() {
        this.elements.collectionCard().should('be.visible');
        return this;
    }

    verifyDueAmount(dueAmount) {
        this.elements.dueAmount().should('have.text', dueAmount);
        return this;
    }

    verifyNumberOfCustomers(numberOfCustomer) {
        this.elements.numberOfCustomers().should('contain', numberOfCustomer);
        return this;
    }

    verifyUserProfileIcon() {
        this.elements.userProfileIcon()
            .should('be.visible')
            .and('not.be.disabled');
        return this;
    }

    verifyUserFirstName(userFirstName) {
        this.elements.userFirstName().should('have.text', userFirstName);
        return this;
    }

    verifyGreeting() {
        if (dateTimeUtils.getCurrentHours() < 12) {
            this.elements.greeting().should('have.text', "Good Morning!");
            return this;
        } else if (dateTimeUtils.getCurrentHours() < 18) {
            this.elements.greeting().should('have.text', "Good Afternoon!");
        } else {
            this.elements.greeting().should('have.text', "Good Evening!");
        }
        return this;
    }

    clickViewLink() {
        this.elements.viewLink().click();
        return this;
    }

    clickCollectionCard() {
        this.elements.collectionCard().click(30, 30);
        return this;
    }

    verifyCardTitle(cardTitle) {
        this.elements.cardTitle().should('have.text', cardTitle);
        return this;
    }

    clickDepositIcon() {
        this.elements.depositIcon().click();
        return this;
    }

    clickDepositNowButton() {
        this.elements.depositNowButton().click();
        return this;
    }

    verifyCustomerCard() {
        this.elements.customerCardTitle().should('have.text', 'Customers');
        this.elements.customerCardDetailsCount().find('span').eq(0)
            .should('have.text', 'Dormant - ');
        this.elements.customerCardDetailsCount().find('span').eq(1).should('exist');
        this.elements.customers().should('be.visible');
        return this;
    }

    verifyDormantCount(count) {
        this.elements.customerCardDetailsCount().find('span').eq(1).should('have.text', count);
        return this;
    }

    scrollCustomerTypeTab(customerType) {
        this.elements.scrollCustomerTypeTab().then($container => {
            if (['dormant', 'deactivated'].includes(customerType)) {
                // Scroll to rightmost for dormant and deactivated
                const maxScroll = $container[0].scrollWidth - $container[0].clientWidth;
                $container[0].scrollLeft = maxScroll;
            } else if (customerType === 'Suspended') {
                // Scroll to middle for suspended
                const maxScroll = $container[0].scrollWidth - $container[0].clientWidth;
                $container[0].scrollLeft = maxScroll / 2;
            }
            // For other types, no scroll needed (stays at left)
        }).wait(1000);
    }

    clickCutomerTypeTab(customerType) {
        this.elements.customerTypeTab(customerType.toLowerCase())
            .should('be.visible')
            .click();
        return this;
    }

    clickUserProfileIcon() {
        this.elements.userProfileIcon().click()
        return this;
    }

    clickMyApprovalTab() {
        this.elements.clickMyApprovalTab()
            .should('be.visible')
            .click();
        return this;
    }
    
}

module.exports = new KamHomePage()
