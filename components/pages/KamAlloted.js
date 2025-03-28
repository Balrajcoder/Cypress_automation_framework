class KamAlloted {
    elements = {
        orderTitle: () => cy.get('[data-cy="btr.app.title"]'),
        allotedIcon : () => cy.get('[data-cy="kam.OrderLandingPage.allotedTab"] img[alt="alloted"]'),
        orderId : (saleOrderId) => cy.get(`[data-cy="kam.orderListingPage.soSeId-${saleOrderId}"]`),
        notificationIcon : ()=> cy.get('[data-testid="NotificationsNoneIcon"]'),
        notificationLabel : ()=> cy.get('[data-cy="custom-modal-title"]'),
        searchInput : () => cy.get('[data-cy="btr.app.searchInput"] input'),
        customerNameLabel : (customerId) => cy.get(`[data-cy="kam.orderListingPage.customerName-${customerId}"]`),
        soStateLabel : (customerId) => cy.get(`[data-cy="kam.orderListingPage.soSeState-${customerId}"]`),
        ordersTab :(orderId) => cy.get(`[data-cy="kam.orderListingPage.ordersCard-${orderId}"]`),
        timelineTab :() => cy.get('[data-cy="component.tabs.tab-0"]'),
        itemTab:() => cy.get(`[data-cy="component.tabs.tab-1"]`),
        paymentsTab :() => cy.get(`[data-cy="component.tabs.tab-2"]`),
        itemsName :() => cy.get(`[data-cy="kam.orderDetailsItemTab.itemName-0"]`),
        netReceivableAmount :() => cy.get('[data-cy="kam.orderDetailsPaymentTab.netReceivablesValue"]'),
    }

    validateAllotedOrderPage()
    {
        this.elements.orderTitle()
            .should('be.visible')
            .should('exist') 
            .and('have.text', 'Orders'); 
        return this;
    }

    validateAllottedIcon()
    {
        this.elements.allotedIcon()
        .should('exist') 
        .should('be.visible')
        return this;
    }

    validateAllotedOrderID(saleOrderId)
    { 
      this.elements.orderId(saleOrderId)
        .should('be.visible')
        .and('contain.text', saleOrderId);
        return this;
    }

    validateNotificationIcon() {
        this.elements.notificationIcon()
          .should('exist') 
          .and('be.visible'); 
        return this;

    }

    clickNotificationIcon()
    {
        this.elements.notificationIcon()
        .click()
        return this;

    }

    validateNotificationPage()
    {
        this.elements.notificationLabel()
        .should('exist') 
        .and('be.visible') 
        .and('contain.text', 'Notifications');
    }

    enterCustomerSearch(name) {
        this.elements.searchInput()
            .should('exist')
            .clear()
            .type(name)
            .should('have.value', name);
        return this;
    }

    validateCustomerName(saleOrderId) {
        this.elements.customerNameLabel(saleOrderId)
            .should('be.visible')
            .and('contain.text', 'KAM Order Customer one');
        return this;
    }

    validateSoFullAllotmentState(saleOrderId) {
        this.elements.soStateLabel(saleOrderId)
            .should('be.visible')
            .and('contain.text', "Full Allot");
        return this;
    }

    clickOrdersCard(saleOrderId) {
        this.elements.ordersTab(saleOrderId).click();
        return this;
    }

    validateTimelineTab() {
        this.elements.timelineTab()
            .should('be.visible') 
            .and('contain.text', 'Timeline') 
            .and('have.attr', 'aria-selected', 'true');
        return this;
    }

    toggleToItemsTab() {
        this.elements.itemTab().click();
        return this;
    }

    validateItemsTab() {
        this.elements.itemTab()
            .should('be.visible') 
            .and('contain.text', 'Items') 
            .and('have.attr', 'aria-selected', 'true');
        return this;
    }

    toggleToPaymentTab() {
        this.elements.paymentsTab().click();
        return this;
    }

    validatePaymentsTab() {
        this.elements.paymentsTab()
            .should('be.visible') 
            .and('contain.text', 'Payment') 
            .and('have.attr', 'aria-selected', 'true');
        return this;
    }

    getItemName(FruitName) {
        this.elements.itemsName()
            .should('be.visible')
            .and('contain.text', FruitName);
        return this;
    }

    ValidateNetAmount(price) {
        this.elements.netReceivableAmount()
            .should('be.visible')
            .and('contain.text', price);
        return this;
    }
}
module.exports = new KamAlloted();
