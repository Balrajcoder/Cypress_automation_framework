class KAM_OrderPage {
    elements = {
        newOrder: () => cy.xpath("//button[normalize-space()='New Order']"),
        orderTitle: () => cy.get('[data-cy="btr.app.title"]'),
        saleOrderConfirmed: () => cy.xpath("//p[text()='Confirmed SO']"),
        allotted: () => cy.xpath("//div[@data-cy='kam.OrderLandingPage.allotedTab']"),
        allottedLabel: () => cy.get('[data-cy="kam.OrderLandingPage.allotedlabel"]'),
        inTransit: () => cy.xpath("//div[@data-cy='kam.OrderLandingPage.inTransitTab']"),
        homeIcon: () => cy.xpath("//div[@data-cy='btr.landing.Home']"),
        enquiryTab: () => cy.get('[data-cy="kam.OrderLandingPage.enquiriesTab"]'),
        enquiryLabel: () => cy.get('[data-cy="kam.OrderLandingPage.enquirieslabel"]'),
        enquiryIcon: () => cy.get('img[alt="enquiries"]'),
        voided:()=>cy.get('[data-cy="kam.OrderLandingPage.voidedTab"]'),
        inTransitTab: () => cy.get('[data-cy="kam.OrderLandingPage.inTransitTab"]'),
        inTransitLabel: () => cy.get('[data-cy="kam.OrderLandingPage.inTransitlabel"]'),
        inTransitIcon: () => cy.get('[data-cy="kam.OrderLandingPage.inTransitTab"] img[alt="in_transit"]'),
        deliveredTab:()=>cy.get('[data-cy="kam.OrderLandingPage.deliveredTab"]'),
        deliveredLabel:()=>cy.get('[data-cy="kam.OrderLandingPage.deliveredlabel"]'),
        deliveredIcon:()=>cy.get('[data-cy="kam.OrderLandingPage.deliveredTab"]').find('img[alt="delivered"]'),
        grnCompleteTab:()=>cy.get('[data-cy="kam.OrderLandingPage.grnCompleteTab"]'),
        grnCompleteLabel:()=>cy.get('[data-cy="kam.OrderLandingPage.grnCompletelabel"]'),
        GrnCompleteIcon:()=>cy.get('[data-cy="kam.OrderLandingPage.grnCompleteTab"]').find('img[alt="grn_complete"]')
    }

    clickNewOrderIcon() {
        this.elements.newOrder().click();
        return this;
    }

    validateInTransitTab() {
        this.elements.inTransitTab()
            .should('exist')
            .should('be.visible');
        return this;
    }
    
    validateInTransitLabel() {
        this.elements.inTransitLabel()
            .should('exist')
            .should('be.visible')
            .and('have.text', 'In Transit');
        return this;
    }

    validateInTransitIcon() {
        this.elements.inTransitIcon()
            .should('exist') 
            .should('be.visible');
        return this;
    } 

    validateAllottedTab(){
        this.elements.allotted()
        .should('exist')
        .should('be.visible');
        return this;
    }

    validateAllotedLabel()
    {
        this.elements.allottedLabel()
        .should('exist')
        .should('be.visible')
        .and('have.text', 'Alloted');
        return this;
    }

    validateOrderTitle() {
        this.elements.orderTitle()
            .should('exist')
            .should('contain.text', 'Orders')
            .should('be.visible');
        return this;
    }

    clickSaleOrderConfirmed() {
        this.elements.saleOrderConfirmed().click();
        return this;
    }

    clickAlotted() {
        cy.customIntercept("GET","/sale_orders.json?**","SaleOrder")
        this.elements.allotted().click();
        // cy.wait('@SaleOrder')
        cy.wait(30000)
        return this;
    }

    clickIntransit() {
        this.elements.inTransitTab().click();
        cy.wait(70000)
        return this;
    }

    validateEnquiryTab() {
        this.elements.enquiryTab()
            .should('exist')
            .should('contain.text', 'Enquiries')
            .should('be.visible');
        return this;
    }

    validateEnquiryLabel() {
        this.elements.enquiryLabel()
            .should('exist')
            .should('have.text', 'Enquiries')
            .should('be.visible');
        return this;
    }

    validateEnquiryIcon() {
        this.elements.enquiryIcon()
            .should('exist') 
            .should('be.visible'); 
        return this;
    }
    
    

    clickEnquiryTab() {
        this.elements.enquiryTab().click();
        return this;
    }

    validateVoidedTab()
    {
        this.elements.voided()
        .should('exist')
        // .should('have.attr', 'src','https://qa-assets.vegrow.in/vesell/icons/KamIcons/next.svg')
        // .should('be.visible');
        return this

    }

    clickVoidedTab()
    {
        this.elements.voided().click()
        return this
    }

    validateDeliveredTab() {
        this.elements.deliveredTab()
            .should('exist')
            .should('be.visible');
        return this;
    }

    validateDeliveredLabel() {
        this.elements.deliveredLabel()
            .should('exist')
            .should('be.visible')
            .and('have.text', 'Delivered');
        return this;
    }

    validateDeliveredIcon() {
        this.elements.deliveredIcon()
            .should('exist') 
            .should('be.visible');
        return this;
    } 

    clickDeliveredTab()
    {
        this.elements.deliveredTab().click()
        cy.wait(100000)
        return this
    }

    validateGrnCompleteTab() {
        this.elements.grnCompleteTab()
            .should('exist')
            .should('be.visible');
        return this;
    }

    validateGrnCompleteLabel() {
        this.elements.grnCompleteLabel()
            .should('exist')
            .should('be.visible')
            .and('have.text', 'GRN Complete');
        return this;
    }

    validateGrnCompleteIcon() {
        this.elements.GrnCompleteIcon()
            .should('exist') 
            .should('be.visible');
        return this;
    } 

    clickGrnCompleteTab()
    {
        this.elements.grnCompleteTab().click()
        return this  
    }




}

module.exports = new KAM_OrderPage();

