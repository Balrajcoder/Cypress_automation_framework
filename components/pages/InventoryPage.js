class InventoryPage{
    elements={
        lot:()=>cy.get('td[header="Products"]').eq(0).contains('APPL/KUL-EL-UROYAL/V-AP-Uddesh/CRAT/'),
        receivedLot1:()=>cy.get('td').contains('APPL/KUL-EL-UROYAL/REG').parents('tr'),
        
        

    }

    verifyReceiveLot1()
    {
        this.elements.receivedLot1().within(() =>{
            cy.get('td').eq(1).should('have.text','2 BOX44.5 Kgs')
            cy.get('td').eq(3).should('have.text','89') 
        })
    }



    
}
module.exports=new InventoryPage();