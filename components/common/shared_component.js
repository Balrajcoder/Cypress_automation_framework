class shared_component
{
    elements =
    {
        okBtn: ()=> cy.get('button span').contains('Ok',{ matchCase: false }),
        backBtn: ()=> cy.get('span').contains('Back'),
        finishBtn:()=>cy.get('span').contains('Finish'),
        toastMsg:()=>cy.get('div[id="notistack-snackbar"]'),
        next:()=>cy.contains("Next"),
        loader: ()=> cy.get('div[role="progressbar"]'),
        cancelBtn: ()=> cy.get('span').contains('Cancel'),
        vesellokBtn: ()=> cy.get('button').contains('Ok',{ matchCase: false }),
        vesellCancelBtn: ()=> cy.get('button').contains('Cancel',{ matchCase: false}),
        noDataText:() => cy.get("[data-cy='component.nodata.text']"),
    }


    clickOkBtn()
    {
        this.elements.okBtn().click();
        return this; 
    }
    clickBackBtn()
    {
        this.elements.backBtn().click();
        return this; 
    }
    clickFinishBtn()
    {
        this.elements.finishBtn().click();
        return this; 
    }
    clickNext()
    {
        this.elements.next().click();
        return this;
    }
    clickCancelBtn()
    {
        this.elements.cancelBtn().click();
        return this;
    }
    waitForToastMsgToDisappear()
    {
        this.elements.toastMsg().should('not.exist')
        return this;
    }
    waitForLoaderToDisappear()
    {
        this.elements.loader().should('not.exist')
        return this;
    }

    verifyToastSuccessMsg(msg)
    {
        this.elements.toastMsg().should('have.text',msg);
        return this;
    }
    verifyToastErrorMsg(msg)
    {
        this.elements.toastMsg().should('have.text',msg);
        return this; 
    }

    clickVesellOkBtn()
    {
        this.elements.vesellokBtn().click();
        return this;
    }

    clickVesellCancelBtn()
    {
        this.elements.vesellCancelBtn().click();
        return this;
    }

    verifyNoDataText(text)
    {
        this.elements.noDataText().should('have.text', text);
        return this;
    }

}

module.exports=new shared_component();