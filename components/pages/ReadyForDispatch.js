class ReadyForDispatch
{
    elements={
        readyForDispatch:()=>cy.get('button').contains(/^Ready for dispatch/),
        fseName:()=>cy.get('#executive'),
        editIcon:()=>cy.get('div:nth-child(1) > span > button'),
        fseList:()=>cy.get('#executive-popup li div div').contains('EditLMD'),
        saveClose:()=>cy.get('span').contains('Save and close'),
        updateMsg:()=>cy.get('div[id="notistack-snackbar"]'),
        viewLMD:()=>cy.get('div:nth-child(4) > span > button'),
        product:()=>cy.get('p').contains('Apple'),
        close:()=> cy.get('span').contains('Close'),
        deleteLMD:()=>cy.get('div[class*="MuiPaper-root MuiPaper-outlined"] div:nth-child(2) > span > button'),
        
        markDispatch:()=>cy.get('div:nth-child(3) > span > button'),
        deliveryExec:()=>cy.get('div:nth-child(2) > p').eq(1)
       
    }

    clickReadyForDispatch()
        {
        //  cy.wait(2000);   
         this.elements.readyForDispatch().click();
         return this;
        }
    
    verifyFSEName()
    {
        this.elements.deliveryExec().should('have.text','EditLmd');
        return this;
    }

    clickEditIcon(Index4)
    {
    //  cy.wait(2000); 
     this.elements.editIcon().eq(Index4).click();
     return this;
    }

    clearFSE()
    {
        // cy.wait(2000);
        this.elements.fseName().clear();
        return this;
        
    }

    enterFSE()
    {
        this.elements.fseName().type("EditLmd");
        return this;
    }

    selectFSEList()
    {
        this.elements.fseList().click();
        return this;
    }

    clickSaveClose()
    {
        cy.wait(1000);
        this.elements.saveClose().click();
        return this;
    }

    verifyUpdateMsg()
    {
        this.elements.updateMsg().should('have.text','Last mile delivery updated successfully.');
        return this;
    }

    clickViewLMD()
    {
        this.elements.viewLMD().eq(0).click();
        return this;
    }

    verifyProduct()
    {
        this.elements.product().should('have.text','Apple');
        return this;
    }
    
    clickClose()
    {
        this.elements.close().click();
        return this;
    }

    clickDelete(rowNum)
    {
        this.elements.deleteLMD().eq(rowNum).click();
        return this;
    }

    verifyReadyForDispatch()
    {
        this.elements.readyForDispatch().should('have.text','Ready for dispatch (0)');
        return this;
    }
    clickMarkDispatch(rowNum)
    {
        this.elements.markDispatch().eq(rowNum).click();
        return this;
    }

}
module.exports=new ReadyForDispatch();