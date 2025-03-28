class BtrTruckInventory
{
    elements={
        sendReturn: () => cy.contains("Send Returns"),
        createSO:()=>cy.contains("Create Sale Orders"),
        products:()=>cy.contains("Apple"),
        expandProducts:()=>cy.get("td[style='display: flex; align-items: center;']"),
        package:()=>cy.contains("Crate"),
        raiseBtn: () => cy.contains("Raise"),
        flagComment: () => cy.get("textarea[name='raised_comment']"),
        uploadPhotos:()=>cy.get("input[data-cy='btr.flag.uploadPhotos']"),
        selectFile:()=>cy.contains("Upload Payment Screenshots"),
        raiseFlagBtn: ()=> cy.get('span').contains("Raise Flag"),
        flagRaisedSuccessMsg:()=>cy.get('div[id="notistack-snackbar"]'),
        avlUnits:()=>cy.get("td[subheader='Avl Units/Total Units']"),
        avgWeight:()=>cy.get("table[aria-label='purchases'] td"),
        fseComments:()=>cy.get("i[data-cy='btr.flags.raisedFlagComment']"),
        dcPersonComments:()=> cy.get("p>i"),
        flagHistoryIcon:()=>cy.get("svg[data-testid='FlagIcon']"),
        expandProducts:()=>cy.get("tbody tr")
    }

    clickSendReturn()
    {
        this.elements.sendReturn().click();
        return this;
    }

    clickCreateSO()
    {
        this.elements.createSO().click();
        return this;
    }

    clickCreateOrder()
    {
        this.elements.createOrder().click();
        return this;
    }

    
    verifyProducts()
    {
        this.elements.products().should('have.text','Apple')
        return this;
    }

    clickExpandProducts()
    {
        this.elements.expandProducts().click()
        return this;
    }

    verifyPackage()
    {
        this.elements.package().should('have.text','Crate');
        return this;
    }

    clickBtnRaise()
    {
           this.elements.raiseBtn().click();
           return this;
    }
    clickRaiseFlagBtn()
    {
        this.elements.raiseFlagBtn().click();
        return this
    }
    enterComments(comment)
    {
    this.elements.flagComment().type(comment);
    return this
    }
    uploadPhotos()
    {
    this.elements.uploadPhotos().invoke('show').selectFile('cypress/Utility/Upload files/meme4.png');
    return this;
    }
    verifyFlagRaisedSuccessMsg()
    {
        this.elements.flagRaisedSuccessMsg().should('have.text','Flag raised successfully');
        return this;
    }
    raiseFlagFor(comment)
    {
        cy.wait(1000);
        this.clickBtnRaise()
       .enterComments(comment)
       .uploadPhotos()
       .clickRaiseFlagBtn()
       .verifyFlagRaisedSuccessMsg();
    }
    verifyAvlUnits(index,avl,total)
    {
        this.elements.avlUnits().eq(index).should("have.text",avl+"/"+total)
        return this;
    }
    verifyAvgWeight(quantity)
    {
        this.elements.avgWeight().eq(3).should("have.text",quantity);
        return this;
    }
    clickExpandProducts()
    {
        this.elements.expandProducts().eq(0).click();
        return this;
    }
   verifyFlagHistory()
   {
    this.elements.flagHistoryIcon().eq(0).click();
    this.elements.fseComments().should("have.text","Change apple Product avg weight to 3");
    this.elements.dcPersonComments().eq(1).should("have.text","Flag is resolved from DC side");
   }

    }

module.exports=new BtrTruckInventory();

