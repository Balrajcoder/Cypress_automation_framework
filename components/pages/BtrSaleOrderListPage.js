class BtrSaleOrderListPage
{
    elements={
        moreOption: ()=> cy.get('div[class*="CustomerCardSection"] div:nth-child(2) > svg'),
        voidSO :()=> cy.get('div[role="tooltip"] ul li').contains('Void SO'),
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
  

}

module.exports=new BtrSaleOrderListPage();