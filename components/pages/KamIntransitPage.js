class KamIntransitPage
{
    elements={
        initiateGrn:()=>cy.xpath("//button[@data-cy='kam.ctaButtons.initiateGRNButton']"),
        productExpand:()=>cy.xpath("//div[@class='MuiPaper-root-cMyhzA iTopiA MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAccordion-root-klShqi fUCDny MuiAccordion-root MuiAccordion-rounded MuiAccordion-gutters bg-neutral2-500 rounded-md']").eq(0),
        lotExpand:()=>cy.xpath("//div[@class='MuiButtonBase-root-iLYEZ chjaTh MuiButtonBase-root MuiAccordionSummary-root-gaHjSu hbTtui MuiAccordionSummary-root MuiAccordionSummary-gutters bg-white flex items-center justify-between']"),
        grnQuantity:(qty)=>cy.xpath(`//input[@name='sale_order_items.${qty}.grn_lots.${qty}.grn_quantity']`),
        SaveNext:()=>cy.xpath("//button[text()='Save and next']"),
        ackGrn:()=>cy.xpath("//button[text()='Acknowledge GRN']"),
        signedBill:()=>cy.xpath("//input[@data-cy='sc.soDetails.uploadSignedBillRadioButton']"),
        billNumber:()=>cy.xpath("//input[@data-cy='kam.soDetails.billNumberInputField']"),
        upload:()=>cy.xpath("//input[@id='grn_bill']"),
        saveDetails:()=>cy.xpath("//button[text()='Save details']"),
        grnComplete:()=>cy.xpath("//p[text()='GRN Completed']"),
        sendOtp:()=>cy.xpath("//input[@data-cy='sc.soDetails.sendOtpRadioButton']")
      

    }

    clickinitiateGrn()
    {
        this.elements.initiateGrn().click()
        return this;
    }

    clickproductExpand()
    {
        this.elements.productExpand().click()
        this.elements.lotExpand().click()
        return this;
    }

   

    enterGrnQty(qty)
    {
        this.elements.grnQuantity(qty).type("1")
        return this;
    }

    clickSaveAndNext()
    {
        this.elements.SaveNext().click()
        return this;
    }

    clickAckGrn()
    {
        this.elements.ackGrn().click()
        
        return this;
    }

    selectSignedBill()
    {
        this.elements.signedBill().click()
        cy.wait(2000)
        this.elements.sendOtp().click()
        cy.wait(2000)
        this.elements.signedBill().click()
        cy.wait(2000)
        return this;
    }

    enterBillNumber()
    {
        this.elements.billNumber().type("1")
        return this;
    }

    Uploadbill()
    {
        this.elements.upload().click({ force: true })
        this.elements.upload().invoke('show').
        selectFile('cypress/Utility/Upload files/meme4.png')
        cy.wait(2000)
        return this;
    }

    clicksaveDetails()
    {
        this.elements.saveDetails().click()
        cy.wait(10000)
        this.elements.grnComplete().should('have.text',"GRN Completed")
        return this;
    }





}
module.exports=new KamIntransitPage()