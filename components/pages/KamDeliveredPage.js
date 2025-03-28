import PricingApprovalPage from "../../components/pages/PricingApprovalPage"
import HomePage from "../../components/pages/HomePage"

class KamDelievredPage
{
    elements={
        orderTitle: () => cy.get('[data-cy="btr.app.title"]'),
        orderId : (saleOrderId) => cy.get(`[data-cy="kam.orderListingPage.soSeId-${saleOrderId}"]`),
        notificationIcon : ()=> cy.get('[data-testid="NotificationsNoneIcon"]'),
        notificationLabel : ()=> cy.get('[data-cy="custom-modal-title"]'),
        searchInput : () => cy.get('[data-cy="btr.app.searchInput"] input'),
        customerNameLabel : (customerId) => cy.get(`[data-cy="kam.orderListingPage.customerName-${customerId}"]`),
        soStateLabel : (customerId) => cy.get(`[data-cy="kam.orderListingPage.soSeState-${customerId}"]`),
        ordersTab :(orderId) => cy.get(`[data-cy="kam.orderListingPage.ordersCard-${orderId}"]`),
        initiateGrnCta:()=>cy.get('[data-cy="kam.ctaButtons.initiateGRNButton"]'),
        upload:()=>cy.get('[data-cy="kam.deposit.drawer.uploadImageButton"]'),
        expandIconInInitiateGrn:(row)=>cy.get('[class="MuiAccordionSummary-content-jhMwLx efTElT MuiAccordionSummary-content MuiAccordionSummary-contentGutters"]'),
        expandSOI:(SOI,row)=>cy.get(`[data-cy="kam.soGRN.accordion-summary-${SOI}-${row}"]`),
        expandProductArrow:(row)=>cy.get('[class="MuiButtonBase-root-iLYEZ chjaTh MuiButtonBase-root MuiAccordionSummary-root-gaHjSu hbTtui MuiAccordionSummary-root MuiAccordionSummary-gutters bg-white flex items-center justify-between"]'),
        returnQuantity:(row)=>cy.get(`[name="sale_order_items.${row}.grn_lots.${row}.return_quantity"]`),
        grnQuantity:(row)=>cy.get(`[name="sale_order_items.${row}.grn_lots.${row}.grn_quantity"]`),
        // soCustomerGapInKgs:()=>cy.get('[]')
        TotalSales:()=>cy.get("p").contains(" ₹ 100"),
        saveAndNext:()=>cy.get("button").contains("Save and next"),
        acknowledgeGrnCta:()=>cy.get('[data-cy="kam.ctaButtons.acknowledgeGRNButton"]'),
        performaInvoiceCta:()=>cy.get('[data-cy="kam.ctaButtons.proformaInvoiceButton"]'),
        editGrnCta:()=>cy.get('[data-cy="kam.ctaButtons.editGRNButton"]'),
        raisePddCta:()=>cy.get('[data-cy="kam.ctaButtons.raisePDDButton"]'),
        totalPriceSection:()=>cy.get('p').contains("Total Price").eq(0),
        totalDiscount:()=>cy.get('p').contains("Total Discount"),
        totalPrice:()=>cy.get('p').contains("Total Price:"),
        sendNotificationtoCustomerOption:()=>cy.get('[data-cy="sc.soDetails.sendRequestRadioButton"]'),
        sendOtpToCustomerOption:()=>cy.get('[data-cy="sc.soDetails.sendOtpRadioButton"]'),
        uploadSignedBillOption:()=>cy.get('[data-cy="sc.soDetails.uploadSignedBillRadioButton"]'),
        enterBillNumber:()=>cy.get('[data-cy="kam.soDetails.billNumberInputField"]'),
        uploadButton:()=>cy.get('[id="grn_bill"]'),
        saveDetailsButton:()=>cy.get("button").contains("Save details"),
        requestForApproval:()=>cy.get("button").contains("Request for Approval"),
        expandProductInPdd:(row)=>cy.get("[class='MuiButtonBase-root-iLYEZ chjaTh MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root-jQXqOE iZOWES MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary min-w-6 border-0 p-0 bg-transparent']").eq(`${row}`),
        expandSoiInPdd:(number)=>cy.get(`[data-cy="kam.soGRN.accordion-summary-undefined-${number}"]`),
        requestingAmount:(number)=>cy.get(`[data-cy="sale_order_items.${number}.grn_lots.${number}.price"]`),
        pddComponent:(number)=>cy.get(`[class="MuiInputBase-root-hxnqRp MuiOutlinedInput-root-hwKvEs htHiAE eyhebs MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-sizeSmall MuiInputBase-adornedStart MuiInputBase-adornedEnd rounded-lg"]`).eq(`${number}`),
        pddSave:(number)=>cy.get(`[data-cy='kam.soGRN.save-undefined-${number}']`),
        pddDiscountDropDown:()=>cy.get("[id='sale_order_items.0.discount_type']"),
        pddDiscountOptions:()=>cy.get("[id='sale_order_items.0.discount_type-option-0']"),
        pddDiscountSubReason:(row) =>cy.get(`[data-cy='kam.requestDiscountPDDDrawer.discountSubreason-${row}']`).eq(0),
        pddDiscountSubReasonOptions:(lot,row)=>cy.get(`[id='sale_order_items.${lot}.discount_subreason-option-${row}']`),
        pddRemarks:(number)=>cy.get(`[name='sale_order_items.${number}.discount_reason']`),
        enterTicketNumber:()=>cy.get("[data-cy='kam.requestPDD.ticketNumber']"),
        state:()=>cy.get("[data-cy='kam.orderDetails.soSeState']").eq(1),
        backButton:()=>cy.get("[class='MuiButtonBase-root-iLYEZ chjaTh MuiButtonBase-root MuiIconButton-root-bFkPbr dLtgi MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-edgeStart MuiIconButton-sizeMedium']")

        

    }


    validateDeliveredOrderPage()
    {
        this.elements.orderTitle()
            .should('be.visible')
            .should('exist') 
            .and('have.text', 'Orders'); 
        return this;
    }

    validateDeliveredOrderId(saleOrderId)
    {
        this.elements.orderId(saleOrderId)
        .should('exist')
        .should('be.visible')
        .and('contain.text', saleOrderId);
        return this;
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

    validateSoDeliveredState(saleOrderId) {
        this.elements.soStateLabel(saleOrderId)
            .should('be.visible')
            .and('contain.text', "Delivered");
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
        return this;
        

    }

    clickOrdersCard(saleOrderId) {
        this.elements.ordersTab(saleOrderId).click();
        cy.wait(5000)
        return this;
    }
     
    validateInitiateGrnCta()
    {
        this.elements.initiateGrnCta().scrollIntoView().should('exist') 
            .should('be.visible') 
            .and('have.text', 'Initiate GRN'); 
        return this;
    }

    validateInitiateGrnCtaLanding()
    {
        this.elements.initiateGrnCta().scrollIntoView().should('exist') 
        .scrollIntoView()
            .should('be.visible').click()
        this.elements.upload().should('be.visible') 
        return this;
    }

    validateInitiateGrnAction(row)
    {
     this.elements.expandIconInInitiateGrn(row).click()
     cy.wait(5000)
     this.elements.expandSOI(0,row).click()
     this.elements.expandSOI(0,row).click()
    //  this.elements.expandProductArrow(row).click()
    this.elements.grnQuantity(row).type(1)
    this.elements.returnQuantity(row).should('be.disabled')
    cy.customIntercept("PUT","sale_order_items/*****/update_many.json","saveAndNext")
    // this.elements.TotalSales().should('have.text',' ₹ 100')
    this.elements.saveAndNext().click()
    cy.wait("@saveAndNext")
    this.elements.acknowledgeGrnCta().scrollIntoView().should('be.visible')
   return this;

    }

     CheckCtaInDeliveredState()
    {
        this.elements.acknowledgeGrnCta().scrollIntoView().should('be.visible')
        this.elements.performaInvoiceCta().scrollIntoView().should('be.visible')
        this.elements.editGrnCta().scrollIntoView().should('be.visible')
        this.elements.raisePddCta().scrollIntoView().should('be.visible')
        return this;
    }

    validateAcknowlegeGrn()
    {
        this.elements.acknowledgeGrnCta().scrollIntoView().should('be.visible').click()
        this.elements.totalPriceSection().should('be.visible')
        this.elements.totalDiscount().should('be.visible')
        this.elements.totalPrice().should('be.visible')
        // this.elements.sendNotificationtoCustomerOption().should('be.visible')
        // this.elements.sendOtpToCustomerOption().should('be.visible')
        this.elements.uploadSignedBillOption().click()
        this.elements.enterBillNumber().type("202")
        // this.elements.uploadButton().should('be.visisble')
        cy.customIntercept("POST","/rails/active_storage/direct_uploads","DirectUploads")
        cy.customIntercept("PUT","ale_orders/***/mark_as_grn_complete","SaveDetails")
        this.elements.uploadButton().invoke('show').
        selectFile('cypress/Utility/Upload files/meme4.png')
        this.elements.saveDetailsButton().should('be.visible').click()
        cy.wait("@DirectUploads")
        // cy.wait("@SaveDetails")
        cy.wait(9000)
        this.elements.performaInvoiceCta().scrollIntoView().should('be.visible')
        
        return this;



    }

    validateEditGrn(row)
    {
    this.elements.editGrnCta().click()
    this.elements.saveAndNext().should('be.visible')
    this.elements.expandIconInInitiateGrn(row).click()
    cy.wait(5000)
     this.elements.expandSOI(0,row).click()
     this.elements.expandSOI(0,row).click()
    //  this.elements.expandProductArrow(row).click()
    this.elements.grnQuantity(row).clear().type(1)
    this.elements.returnQuantity(row).should('be.disabled')
    cy.customIntercept("PUT","sale_order_items/*****/update_many.json","saveAndNext")
    // this.elements.TotalSales().should('have.text',' ₹ 100')
    this.elements.saveAndNext().click()
    cy.wait("@saveAndNext")
    this.elements.editGrnCta().scrollIntoView().should('be.visible')
   return this;

    }

 performAndValidatePdd(row,pdd,lot)
 {
   this.elements.raisePddCta().click()
   this.elements.requestForApproval().should('be.visible') 
   cy.wait(2000)
   this.elements.expandProductInPdd(row).click()
   cy.wait(2000)
   this.elements.expandSoiInPdd(row).click()
   this.elements.expandSoiInPdd(row).click()
   cy.wait(2000)
//this.elements.requestingAmount(row).should('have.value',"100")
   this.elements.pddComponent(row).clear().type(pdd)
   this.elements.pddSave(row).click()
   this.elements.pddDiscountDropDown().click()
   this.elements.pddDiscountOptions().click()
//    this.elements.pddDiscountSubReason(row).click()
//    this.elements.pddDiscountSubReasonOptions(lot,row).click()
   this.elements.pddRemarks(row).type("Testautomation")
   this.elements.enterTicketNumber().type("200")
   this.elements.requestForApproval().click()
   cy.wait(3000)
   this.elements.raisePddCta().should('be.disabled')
   return this;
} 

 performPddAproval(soId)
 {
    
    HomePage.clickHamburger()
    .clickPricingApproval()
    PricingApprovalPage.clickMore()
    .entersoId(soId)
    .clickTickIcon()
    .clickViewButton()
    .clickApprove()
    cy.wait(2000)
    PricingApprovalPage.clickMore()
    .entersoId(soId)
    .clickTickIcon()
    .clickApproveSection()
    .validateSoId(soId)
    return this;
}

validatePddCtaAfterApproval()
{
    this.elements.raisePddCta().should('be.enabled') 
    return this;
}

checkGrnCompleteState()
    {
        this.elements.state().should('have.text',"Complete GRN") 
        return this;
    }

clickBackButton()
{
    this.elements.backButton().click()
    return this;
}    




}
module.exports=new KamDelievredPage()