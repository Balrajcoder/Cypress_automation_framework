class ReceivePage
{
    elements={
        deliveryExecutive:()=> cy.get('p').contains('Purushotam Challa'),
        driverNameNum:()=>cy.get('p').contains('Btr Driver (9256234234)'),
        returnComment:()=>cy.get('p').contains('test comments for returns'),
        vehicleNumber:()=>cy.get('p').contains('KA23EN4567'),
        tagNum:()=>cy.get('p').contains('SEAL555'),
        oneReceiveUnits:()=>cy.get('input[name="truck_inventories.0.return.received_quantity"]'),
        oneReceivedKgs:()=>cy.get('input[name="truck_inventories.0.return.received_quantity_in_kgs"]'),
        twoReceiveUnits:()=>cy.get('input[name="truck_inventories.1.return.received_quantity"]'),
        twoReceivedKgs:()=>cy.get('input[name="truck_inventories.1.return.received_quantity_in_kgs"]'),
        reason:()=>cy.get('input[placeholder="Select reason"]'),
        reasonOne:()=>cy.get('ul[id="truck_inventories.0.return.reason-listbox"] div'),
        finish:()=>cy.get('span').contains('Finish'),
        requiredWarning:()=>cy.get('p[id="truck_inventories.1.return.reason-helper-text"]'),

        reasonTwo:()=>cy.get('ul[id="truck_inventories.1.return.reason-listbox"] div'),
        SuccessMsg:()=>cy.get('div[id="notistack-snackbar"]'),
        view:()=>cy.get('button').contains(/^View/),
        oneReceivedCrates:()=> cy.get('input[name="crate_returns.0.received_crates"]'),
        crateReasonOne: ()=> cy.get('ul[id="crate_returns.0.reason-listbox"] div')



}

verifyDeliveryExecutive()
{
    this.elements.deliveryExecutive().should('have.text','initiateReturns')
    return this;
}

verifyDriverNameNum()
{
    this.elements.driverNameNum().should('have.text','Btr Driver (9256234234)')
    return this;
}

verifyreturnComment()
{
    this.elements.returnComment().should('have.text','test comments for returns')
    return this;
}

verifyVehicleNumber()
{
    this.elements.vehicleNumber().should('have.text','KA23EN4567')
    return this;
}

verifytagNum()
{
    this.elements.tagNum().should('have.text','SEAL555')
    return this;
}

enterOneReceiveUnits()
{
    this.elements.oneReceiveUnits().type(2)
    return this;
}

enterOneReceivedKgs()
{
    this.elements.oneReceivedKgs().should('be.enabled').type(89)
    return this; 
}

enterTwoReceiveUnits()
{
    this.elements.twoReceiveUnits().type(5)
    return this;
}

enterTwoReceivedKgs()
{
    this.elements.twoReceivedKgs().should('be.enabled').should('be.enabled').type(51)
    return this; 
}

clickReason()
{
    this.elements.reason().eq(0).click()
    return this; 
}

clickReasonTwo()
{
    this.elements.reason().eq(1).click();
    return this;
}

selectReasonOne()
{
    this.elements.reasonOne().eq(0).click()
    return this; 
}

clickFinish()
{
    this.elements.finish().click()
    return this; 

}

verifyRequiredWarning()
{
    cy.wait(2000)
    this.elements.requiredWarning().click()
    return this;
}

selectReasonTwo()
{
    this.elements.reasonTwo().eq(0).click()
    return this; 
}

verifySuccessMsg()
{
    this.elements.SuccessMsg().should('have.text','Return received successfully.')
    return this; 
}

clickView()
{
    this.elements.view().click();
    return this;
}

enterOneReceivedCrates()
{
    this.elements.oneReceivedCrates().type('4');
    return this;
}

clickCrateReason()
{
    this.elements.reason().eq(2).click();
    return this;
}

selectCrateReasonOne()
{
    this.elements.crateReasonOne().eq(0).click();
    return this;
}

}
module.exports=new ReceivePage();









