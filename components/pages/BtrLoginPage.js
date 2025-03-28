class BtrLoginPage
{
    elements={
        btrUserName: () => cy.get("input[name='username']"),
        btrPassword: () => cy.get('input[name="password"]'),
        btrSubmit: () => cy.get('button[type=submit]'),
        btrTitle: () => cy.get('div[data-testid="app"] h1')
   }

   enterUserName(userName) {
    this.elements.btrUserName().should('be.visible').clear().type(userName);
    return this;
  }

  enterPassword(password) {
    this.elements.btrPassword().clear().type(password, { log: false });
    return this;
  }

  clickLoginButton() 
  {
    this.elements.btrSubmit().click();
    return this;
  }

  verifyErrorMessage(msg)
  {
    this.elements.errorBox().should("exist").and("have.text", msg);
    return this;
  }

  verifyTitle(title)
  {
    cy.customIntercept("GET","/users/current_user_profile","userprofile");
    // cy.wait("@userprofile");
      // this.elements.btrTitle().should("have.text",title);
    return this;
  }

  
}
module.exports=new BtrLoginPage();