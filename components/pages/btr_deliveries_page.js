class btr_deliveries_page
{
    elements={
      
      customerCardSection: (customer)=> cy.get('div[class*="CustomerCardSection"]>div:nth-child(2)>div:nth-child(1) h6').contains(`${customer}`),
      toBeDeliveredTabCount: (count)=> cy.get('button').contains('To be delivered'+' '+`${count}`+''),
      deliveredCount:(count)=> cy.get('button').contains('Delivered'+' '+`${count}`+''),
      addressOfCustomer: ()=> cy.get('div h6+span'),
      itemsOfIndents: ()=> cy.get('div[class*="CustomerCardSection"] div div[class*="MuiGrid-container items-center"] div span~h6'),
      locationIconOfCustomer: ()=> cy.get('div[class*="CustomerCardSection"] a'),
      toBeDeliveredTab: ()=>  cy.get('button').contains('To be delivered'),
      deliveredTab: ()=>  cy.get('button').contains('Delivered',{matchCase: true}),
      voidSOTab: ()=>  cy.get('button').contains('Void SO'),
      moreOption: ()=> cy.get('div[class*="CustomerCardSection"] div:nth-child(2) > svg'),
      voidSO :()=> cy.get('div[role="tooltip"] ul li').contains('Void SO'),
      raiseDiscountFlag: ()=> cy.get('div[role="tooltip"] ul li').contains('Raise Discount Flag'),
      collections :()=> cy.get('div[role="tooltip"] ul li').contains('Collections'),
      voidReasonDrpDwn :()=> cy.get('#void_reason'),
      voidReason: ()=> cy.get('ul[id="void_reason-listbox"] div'),
      voidComments: ()=> cy.get('textarea[name="comment"]'),
      voidSuccessMsg: ()=> cy.get('b').contains('SO marked as void'),
      raiseDiscountFlagPopupTxt:()=> cy.get('div[class*="MuiDialogContent-root"]'),
      discoundRaisedTag:()=> cy.get('div[class*="CustomerCardSection"] div[class*="StatusButton"]'),
      voidTag:()=> cy.get('div[class*="CustomerCardSection"]>div:nth-child(2)>div:nth-child(1)>div:nth-child(2)')
   }

  verifyToBeDeliveredTabCount(count)
  {
    this.elements.toBeDeliveredTabCount(count);
    return this;
  }
  verifyDiscoundRaisedTag()
  {
    this.elements.discoundRaisedTag().eq(0).should('have.text','Discount Raised');
    return this;
  }
  verifyVoidTag()
  {
    this.elements.voidTag().eq(0).should('have.text','Void');
    return this;
  }
  verifyRaiseDiscountFlagPopupTxt(text)
  {
    this.elements.raiseDiscountFlagPopupTxt().should('have.text',text);
    return this;
  }
  verifyDeliveredTabCount(count)
  {
    this.elements.deliveredCount(count);
    return this;
  }
  verifyAddressOfCustomer(address)
  {
    this.elements.addressOfCustomer().eq(0).should('have.text', address)
    return this;
  }
  verifyItemsOfIndents()
  {
    this.elements.itemsOfIndents().each(($ele,index)=>{
        cy.wrap($ele).invoke('text')
        .then((text)=>
        {
            switch (index) {
                case 0:
                  cy.wrap(text.trim()).should('equal', 'Kinnow 10 Units');
                  break;
                case 1:
                    cy.wrap(text.trim()).should('equal', 'Apple 10 Units');
                  break;
                // Add more cases as needed for additional <h6> elements
                default:
                  // Handle unexpected index or add assertions for additional <h6> elements
                  break;
              }
        })
    })
    return this;
  }
  verifyLocationOfCustomer(location)
  {
    this.elements.locationIconOfCustomer().should('have.attr', 'href',location)
    return this;
  }
  clickCustomerCard(customer)
  {
    this.elements.customerCardSection(customer).click();
    return this;
  }
  clickMoreOption()
  {
    this.elements.moreOption().eq(0).click();
    return this;
  }

  clickVoidSO()
  {
    this.elements.voidSO().click();
    return this;
  }
  clickRaiseDiscountFlag()
  {
    this.elements.raiseDiscountFlag().click();
    return this;
  }
  verifyRaiseDiscountFlagPopup()
  {
    this.elements.raiseDiscountFlag().click();
    return this;
  }
  clickCollections()
  {
    this.elements.collections().click();
    return this;
  }
  clickToBeDeliveredTab()
  {
    this.elements.toBeDeliveredTab().click();
    return this;
  }
  clickVoidSOTab()
  {
    this.elements.voidSOTab().click();
    return this;
  }
  clickDeliveredTab()
  {
    this.elements.deliveredTab().click();
    return this;
  }
  clickSelectVoidReason()
  {
    this.elements.voidReasonDrpDwn().click();
    return this;
  }
  selectVoidReason()
  {
    this.elements.voidReason().eq(0).click();
    return this;
  }
  enterVoidComments(comments)
  {
    this.elements.voidComments().type(comments);
    return this;
  }
  verifyVoidSuccessMsg(msg)
  {
    this.elements.voidSuccessMsg().should('have.text',msg);
    return this;
  }
  
}

module.exports=new btr_deliveries_page();