class ReturnedPage
{
    elements={
        
        returnQty:()=>cy.contains("10 Units"),
        receive:()=>cy.get('span').contains(/^Receive/).eq(0).click(),
        dcdReturnQty: ()=> cy.get('div > div:nth-child(6) > div:nth-child(2)')
    }

   

    verifyReturnedQty()
    {
        this.elements.returnQty().should('have.text','10 Units');
        return this;
    }

    clickReceive()
    {
        this.elements.receive().click();
        return this;
    }
    verifyDcdReturnQty()
    {
        this.elements.dcdReturnQty().should('have.text','200 Kgs20 Units');                                                        
        return this;
    }

}
module.exports=new ReturnedPage();