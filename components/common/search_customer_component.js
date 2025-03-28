class search_customer_component
{
    elements =
    {
        searchTab:()=>cy.get("input[placeholder='Search Customers']"),
        custName:(customer)=>cy.get('div[class*="CustomerCardSection"] b').contains(`${customer}`),
    }


    searchCust(customer)
    {
        this.elements.searchTab().type(customer);
        cy.interceptRequest("GET", "/cds/customers/assigned_to_executive/**", "searchCust",(req) => 
        {
            req.query['location_proximity_sorting']= 'false';
        });
        cy.wait('@searchCust');
        return this;
    }
    
    selectCust(customer)
    {
        cy.wait(2000);
        this.elements.custName(customer).click();
        return this;

    }
}

module.exports=new search_customer_component();