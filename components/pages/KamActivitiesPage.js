class KamActivitiesPage
{
    elements={
        date:() => cy.get("input[placeholder='Select Date']"),
        customerNameInListing:() => cy.get("span[data-cy='kam.activities.listing.activity-card-0-header-customer-name']"),
        purposeInListing:() => cy.get("span[data-cy='kam.activities.listing.activity-card-0-details-visit-purpose-value']"),
        activityInListing:() => cy.get("span[data-cy='kam.activities.listing.activity-card-0-details-activity-value']")


    }


    verifyDate()
    {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0'); // Adds leading zero if needed
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
        const year = today.getFullYear();
        this.elements.date().should('have.value', `${day}/${month}/${year}`);
        return this;
    }

    verifyCustomerNameInListing(text)
    {
        this.elements.customerNameInListing().should('have.text', text);
        return this;
    }

    verifyPurposeInListing(text)
    {
        this.elements.purposeInListing().should('have.text', text);
        return this;
    }

    verifyActivityInListing(text)
    {
        this.elements.activityInListing().should('have.text', text);
        return this;
    }

}

module.exports=new KamActivitiesPage()
