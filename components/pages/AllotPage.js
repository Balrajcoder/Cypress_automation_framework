class AllotPage
{
    elements={
        allotQty:()=>cy.get('input[name="lots.0.quantity"]'),
        averageWt:()=>cy.get('input[name="average_weight"]'),
        save:()=>cy.get('span').contains(/Save$/),
        allotSuccessMsg:()=>cy.get('div[id="notistack-snackbar"]')

    }

    enterAllotedQty(quantity)
    {
        // this.elements.allotQty().type("2");
        this.elements.allotQty().type(quantity);
        return this;
    }

    enterAverageWt(avgWeight)
    {
        
        this.elements.averageWt().clear().type(avgWeight);
        return this;
    }

    clickSave()
    {
        this.elements.save().click();
        return this;
    }

    verifyAllotMsg()
    {
        this.elements.allotSuccessMsg().should('have.text','Lots allotment successfully.');
        return this;
    }

}
module.exports=new AllotPage();