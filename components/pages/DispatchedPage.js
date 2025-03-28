class DispatchedPage{
    elements={
        dispatched:()=>cy.get('button').contains(/^Dispatched/),
        editTruckDetails:()=>cy.get('button').contains('Edit truck details'),                           
        updateMsg:()=>cy.get('div[id="notistack-snackbar"]')
}

clickDispatched()
{
    cy.wait(2000);
    this.elements.dispatched().click();
    return this;
}

clickeditTruckDetails(index11)
{
    this.elements.editTruckDetails().eq(index11).click();
    cy.wait(2000);
    return this;
}

verifyUpdateMsg()
{
    this.elements.updateMsg.should('have.text','Truck details updated successfully.');
    return this;
}
}
module.exports=new DispatchedPage();