class CompletedPage
{
    elements={
        view:()=>cy.get('span').contains(/^View/),
        // product1:()=>cy.get('p').contains('Pomegranate').parents('div').eq(2),
        product2:()=>cy.get('p').contains('Apple').parents('div').eq(3),
    }

    clickView()
    {
        this.elements.view().click()
        return this;
    }

    verifyproduct2()
    {
        this.elements.product2().within(() =>{
            cy.get('div +div p').eq(5).should('have.text','2')
            cy.get('div +div p').eq(7).should('have.text','0')
            cy.get('div +div p').eq(9).should('have.text','89')
            cy.get('div +div p').eq(11).should('have.text','-83')
    
        })
        return this;
    }




}

module.exports=new CompletedPage();