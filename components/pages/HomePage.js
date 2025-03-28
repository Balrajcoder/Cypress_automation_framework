class HomePage
{
    elements={
        hamburger:()=> cy.get('button[aria-label="open drawer"]'),
        lmd:()=> cy.get('span').contains('Last Mile Delivery'),
        DC:()=>cy.get('[aria-label="Select DC"]'),
        selectDC:(DC)=>cy.get('#select-dc ul').eq(1).within(()=>{
            cy.get('li').contains(DC).click();
        }), 
        DC:()=>cy.xpath("//button[@data-cy='sc.pageLayout.selectDC']"), 
        DCName:(DC)=>cy.xpath(`//li[text()="${DC}"]`),  
        dcArrival:()=>cy.get('span').contains('DC Arrivals'),
        arrivals: () => cy.get('span').contains('Arrivals'),
        inventory:()=>cy.get('span').contains('Inventory'),
        inventoryAdjustment:()=>cy.get('span').contains('Inventory Adjustment'),
        home:()=> cy.get('span').contains("Home"),
        saleEnquiry:()=>cy.xpath("//div[@data-cy='sc.homePageSidebar.salesEnquiry']"),
        saleOrder:()=>cy.xpath("//div[@data-cy='sc.homePageSidebar.salesOrder']"),
        vehicleRequest:()=>cy.xpath("//div[@data-cy='sc.homePageSidebar.vehicleRequest']"),
        pricingApproval:()=>cy.get("[data-cy='sc.homePageSidebar.pricingApprovals']")
        
        
     }

    clickHamburger()
    {
        this.elements.hamburger().click();
        return this;
    }

    clickLMD()
    {
        this.elements.lmd().click();
        return this;
    }

    clickDC()
    {
        this.elements.DC().click();
        return this;
    }

    selectDC(DC)
    {
        
        this.elements.selectDC(DC);
        return this;
    }

    clickDcArrival()
    {
        
        this.elements.arrivals().as('arrival');
        cy.get('@arrival').click();
        this.elements.dcArrival().click();
        return this;
    }

    clickInventory()
    {
        this.elements.inventory().click();
        return this;
    }

    clickInventoryAdjustment()
    {
        this.elements.inventoryAdjustment().click();
        return this;
    }
    clickHome()
    {
        this.elements.home().click();
        return this;
    }

    clickSaleEnquiry()
    {
        this.elements.saleEnquiry().click();
        return this;
    }



    clickSaleOrder()
    {
        this.elements.saleOrder().click();
        cy.wait(2000)
       
        return this;
    }

    clickVehicleRequest()
    {
        this.elements.vehicleRequest().click()
        return this;
    }

    clickPricingApproval()
    {
        this.elements.pricingApproval().click()
        return this; 
    }

    
    




}
module.exports=new HomePage();