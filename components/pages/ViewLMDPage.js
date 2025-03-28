class ViewLMDPage{

elements={
    closeView:()=>cy.get('span').contains('Close'),
    product:()=>cy.get('p').contains('Apple'),

}

clickCloseView()
{
    this.elements.closeView().click();
    return this;
}
 
verifyProductName()
{
    this.elements.product().should('have.text','Apple');
    return this;
}

}
module.exports=new ViewLMDPage();