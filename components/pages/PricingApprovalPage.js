class PricingApprovalPage
{
    elements={
        more:()=>cy.get("[class='MuiButtonBase-root-iLYEZ chjaTh MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-colorPrimary MuiButton-root-jQXqOE dnCGrX MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-colorPrimary']").eq(0),
        soIdSearch:()=>cy.get("[placeholder='SO ID']"),
        tickIcon:()=>cy.get("[class='MuiButtonBase-root-iLYEZ chjaTh MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-colorPrimary MuiButton-root-jQXqOE dMPuNK MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-colorPrimary']"),
        viewButton:()=>cy.get("[class='MuiTypography-root-hjKMqV hGpTzu MuiTypography-root MuiTypography-body2']").eq(1),
        approve:()=>cy.get("[class='MuiButtonBase-root-iLYEZ chjaTh MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root-jQXqOE dyGSZd MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary margin-horizontal']"),
        ok:()=>cy.get("[data-cy='sc.confirmationDialog.okButton']"),
        approveSection:()=>cy.contains(/^Approved \(\d+\)$/),
        soIdCheck:(soId)=>cy.get("a").contains(`${soId}`)

    }
   
    clickMore()
    {
        this.elements.more().click()
        return this;
    }

    entersoId(soId)
    {
        this.elements.soIdSearch().type(soId)    
        return this;
    }

    clickTickIcon()
    {
        this.elements.tickIcon().click()
        return this;
    }

    clickViewButton()
    {
        this.elements.viewButton().click()
        return this;
    }

    clickApprove()
    {
        this.elements.approve().click()
        cy.on('window:confirm', (text) => {
            expect(text).to.contains('Are you sure, you want to approve this ?')
            return true; 
          });
          this.elements.ok().click()
          return this;
    }

    clickApproveSection()
    {
        this.elements.approveSection().click()
        return this;
    }

    validateSoId(soId)
    {
        this.elements.soIdCheck(soId).should('be.visible')
        return this;
    }

   


}
module.exports=new PricingApprovalPage()