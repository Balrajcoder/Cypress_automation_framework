import DateTimeUtils from "../../Utility/dateTimeUtils"

class KamNewOrderPage{
    constructor() {
        this.saleEnquiryID ;  
     
    }

    elements={
        customerName:()=>cy.xpath("//input[@data-cy='kam.SECustomerAndDeliveryForm.customer']"),
        deliveryMethod:()=>cy.xpath("//input[@data-cy='kam.SECustomerAndDeliveryForm.delivery_method']"),
        vegrowLogistic:()=>cy.xpath("//div[@data-option-index='0']"),
        customerLogistic:()=>cy.xpath("//div[@data-option-index='1']"),
        fixedSaleType:()=> cy.get('input[name="sale_type"][type="radio"][value="1"]'),
        proceedToCatalogue:()=>cy.xpath("//button[@data-cy='kam.SECustomerAndDeliveryForm.proceedButton']"),
        products: (productCategoryId) => cy.get(`[data-cy="kam.SECatalogue.selectProductCategory${productCategoryId}"]`),
        addButton:()=>cy.get("button").contains("Add"),
        proceed:()=>cy.xpath("//button[@data-cy='kam.SECatalogue.proceedButton']"),
        calenderIcon:()=>cy.xpath("//button[@aria-label='Choose date']"),
        time:()=>cy.xpath("//input[@data-cy='kam.SESummary.expectedDeliveryTimePicker']"),
        requesdtForApproval:()=>cy.xpath("//button[@data-cy='kam.SESummary.requestApprovalButton']"),
        selectCustomer: (customername) => cy.xpath(`//div[text()="${customername}"]`),
        calenderdate:()=>cy.get(`[aria-label*="Choose date, selected date is"]`),
        deliveryDate:(timestamp)=>cy.get(`[data-timestamp=${timestamp}]`),
        // time:()=>cy.xpath("//div[@class='MuiClock-squareMask-fEZPid fUysEa MuiClock-squareMask']")
        saleEnquiryId:()=>cy.xpath("//span[@data-cy='kam.SEPendingApprovalDialog.saleEnquiryId']"),
        outSideInventory:()=>cy.xpath("//button[text()='Request items out of inventory']"),
        outsideInventoryProductDD:()=>cy.xpath("//input[@placeholder='Select a Product']"),
        outsideInventoryProduct:(Product)=>cy.xpath(`//div[text()="${Product}"]`),
        outsideInventorySkuDD:()=>cy.xpath("//input[@placeholder='Select a SKU']"),
        oustideInventorySku:(sku)=>cy.xpath(`//div[text()="${sku}"]`),
        outsideInventoryPackagingDD:()=>cy.xpath("//div[@role='combobox']"),
        // outsideInventoryPackagingDD:()=>cy.xpath("//input[@data-cy='kam.SERequestItems.packagingSelect']"),
        outsideInventoryPackaging:(packaging)=>cy.xpath(`//p[text()="${packaging}"]`),
        outsideInventorySaleType:()=>cy.xpath("//input[@data-cy='kam.SERequestItems.saleUnitSelect']"),
        outsideInventoryUnitSaleType:(saletype)=>cy.xpath(`//div[text()="${saletype}"]`),
        outsideInventoryAvgWeight:()=>cy.xpath("//input[@placeholder='Enter avg weight']"),
        outsideInventoryDescription:()=>cy.xpath("//textarea[@data-cy='kam.SERequestItems.descriptionInput']"),
        outsideInventoryExpectedPrice:()=>cy.xpath("//input[@data-cy='kam.SERequestItems.priceInput']"),
        outsideInventoryRequest: () => cy.xpath("//button[@data-cy='kam.SERequestItems.requestButton']"),
        uploadBill1: () => cy.get('[data-cy="btr.shopSales.uploadBill"]'),
        soBillNumber: () => cy.get('[data-cy="kam.SESummary.billNumber"]'),
        uploadBill2: () => cy.get('[id="grn_bill"]'),
        billSubmmit: () => cy.get('[data-cy="kam.customDrawer.submitButton"]')


        




    }  

    enterCustomerName(customerName)
    {
        cy.customIntercept("GET", "/customers.json?**", "getCustomers") 
            this.elements.customerName().should('exist').type(customerName)
            cy.wait("@getCustomers");
            this.elements.selectCustomer(customerName).click()  
        
        return this
    }

    selectVegrowLogistic()
    {
        this.elements.deliveryMethod().should('exist').click()
        this.elements.vegrowLogistic().should('exist').click()
        return this
    }

    selectCustomerLogistic()
    {
        this.elements.deliveryMethod().should('exist').click()
        this.elements.customerLogistic().should('exist').click()
       return this
    }

    fixedSaleType()
    {
        this.elements.fixedSaleType().should('exist').click()
       return this
    }

    clickProceedCatalogue()
    {
        this.elements.proceedToCatalogue().click()
       return this
    }

    selectProduct(productCategoryId)
    {
        this.elements.products(productCategoryId).click()
       return this
    }

    addProductsfromCatalogue()
    {
        this.elements.addButton().click()
       return this
    }

    clickProceed()
    {
        this.elements.proceed().click()
       return this
    }

    selectDeliveryDate()
    {
        let timestamp=DateTimeUtils.getIsoTimestampInDays(1)
        this.elements.calenderdate().click()
        cy.log("timestamp="+timestamp)
        this.elements.deliveryDate(timestamp).click()

        return this

    }

    selectDeliveryTime()
    {
        cy.viewport(1280, 720)
        this.elements.time().type("11")
        this.elements.time().type("30")
        this.elements.time().type("PM")
       return this
    }

    clickRequesdtForApproval()
    {
        this.elements.requesdtForApproval().click()
       return this

    }

    copySaleEnquiryID() {
        return this.elements.saleEnquiryId().invoke('text').then((text) => {
        this.saleEnquiryID = text.trim(); 
    })
           
    }





    addOutsideInventory(Product,Sku,Packaging,UnitType,AvgWeight,Comments,ExpectedPrice)
    {
        this.elements.outSideInventory().click()
        this.elements.outsideInventoryProductDD().click()
        this.elements.outsideInventoryProduct(Product).click()
        this.elements.outsideInventorySkuDD().click()
        this.elements.oustideInventorySku(Sku).click()
        this.elements.outsideInventoryPackagingDD().click()
        this.elements.outsideInventoryPackaging(Packaging).click()
        this.elements.outsideInventorySaleType().click()
        this.elements.outsideInventoryUnitSaleType(UnitType).click()
        this.elements.outsideInventoryAvgWeight().type(AvgWeight)
        this.elements.outsideInventoryDescription().type(Comments)
        this.elements.outsideInventoryExpectedPrice().type(ExpectedPrice)
        this.elements.outsideInventoryRequest().click()





    }

    UploadBill() {
        this.elements.uploadBill1().click()
        this.elements.soBillNumber().type("33")
        // cy.customIntercept("POST","/rails/active_storage/direct_uploads","DirectUploads")
        this.elements.uploadBill2().invoke('show').selectFile('cypress/Utility/Upload files/meme4.png')
        this.elements.billSubmmit().click()
        return this
    }

   

   

   
    
}

module.exports=new KamNewOrderPage();