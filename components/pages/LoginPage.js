
class LoginPage

{
  elements={
      userName:() => cy.get("input[data-cy='sc.login.username']"),
      password:() => cy.get("input[data-cy='sc.login.password']"),  
      loginBtn:() => cy.get("button[data-cy='sc.login.submit']"),
      errorBox:()=>cy.get('div[id="notistack-snackbar"]'),
      title:() => cy.get('div[data-testid="app"] h1')
     }
    

    enterUserName(userName) 
    {
        this.elements.userName().clear().type(userName);
        return this;
      }
    
      enterPassword(password) {
        this.elements.password().clear().type(password, { log: false });
        return this; 
      }
    
      clickLoginButton() {
        this.elements.loginBtn().click();
        return this;
      }

      verifyErrorMessage(msg)
      {
        this.elements.errorBox().should("have.text", msg);
        return this;
      }

      verifyTitle(title)
      {
        this.elements.title().should("have.text",title);
        return this;
      }

      
}
module.exports=new LoginPage();