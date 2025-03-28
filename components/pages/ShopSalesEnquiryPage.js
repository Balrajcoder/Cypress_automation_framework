
class ShopSalesEnquiryPage
{
    elements=
    {
        shopSaleEnquirylistings:(shopSaleEnquiryId)=>cy.get(`[data-cy='kam.orderListingPage.soSeId-Draft-${shopSaleEnquiryId}']`)


    }


    checkForShopSaleEnquiryId(shopSalesEnquiryId)
    {
      return this.elements.shopSaleEnquirylistings(shopSalesEnquiryId).should('be.visible')
        
    }
    
}
module.exports=new ShopSalesEnquiryPage();