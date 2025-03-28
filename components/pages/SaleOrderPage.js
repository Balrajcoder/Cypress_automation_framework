class SaleOrderPage
{
    elements=
     {
        soIdFilter:()=>cy.xpath("//input[@data-cy='sc.soFilter.soId']"),
        filterTick:()=>cy.xpath("//button[@data-cy='sc.soFilter.tickButton']"),
        truckActions:()=>cy.xpath("//button[@id='fade-button']"),
        addtrucktime:()=>cy.xpath("//li[text()='Add Truck Reporting Time']"),
        truckArrival:()=>cy.xpath("//li[text()='Truck Arrival']"),
        initiateLoading:()=>cy.xpath("//li[text()='Initiate Loading']"),
        completeLoading:()=>cy.xpath("//li[text()='Complete Loading']"),
        generateSTN:()=>cy.xpath("//li[text()='Generate STN']"),
       truckDispatch:()=>cy.xpath("//li[text()='Truck Dispatch']"),
       allot:()=>cy.xpath("//button[@data-cy='sc.soDetails.allotLink']").eq(0),
       allotmentQty:()=>cy.xpath("//input[@data-cy='sc.soDetails.allotmentQty']"),
       save:()=>cy.xpath("//button[text()='Save']"),
       addTrip:()=>cy.xpath("//li[text()='Add Trip']")
     }

     enterSOID(SOID)
     {
      this.elements.soIdFilter().type(SOID)
      this.elements.filterTick().click()

      return this;
     }

     clicktruckAction()
     {
      this.elements.truckActions().click({force:true})
      return this;
     }

     EnterReportingTime()
     {
      this.elements.addtrucktime().click()
      this.elements.save().click()
      return this;
     }

     clicktruckArrival()
     {
      this.elements.truckArrival().should('be.visible')
      this.elements.truckArrival().click()
      this.elements.save().click()
      return this;
     }

     performInitiateLoading()
     {
      this.elements.initiateLoading().should('be.visible').click()
      this.elements.save().click()
      return this;
     }

     clickCompleteLoading()
     {
      cy.wait(5000)
      this.elements.completeLoading().should('be.visible').click({force:true})
      this.elements.save().click()
      return this;
     }

     clickAllot()
     {
      this.elements.allot().click({ multiple: true })
      return this;
     }

     clickTruckDispatch()
     {
      this.elements.truckDispatch().should('be.visible').click()
      this.elements.save().click()
      return this;
     }

     enterAllotQty(qty)
     {
      this.elements.allotmentQty().type(qty)
      this.elements.save().click()
      cy.wait(2000)
      return this;

     }

     clickAddTrip()
     {
      this.elements.addTrip().click()
      return this;

     }



}
module.exports=new SaleOrderPage();