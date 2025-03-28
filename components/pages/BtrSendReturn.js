class BtrSendReturn
{
    elements={
        
    confirmReturn:() =>cy.contains("Yes, I Am Sure"),
    sealNumber:() =>cy.get("input[placeholder='Seal number']"),
    returnComments:() =>cy.get("textarea[placeholder='Add Comments here']"),
    uploadReturnPhotos:() =>cy.contains("Upload Photos"),
    sendReturn:() => cy.get('span').contains('Send Returns'),
    ok:()=>cy.contains("Ok"),
    file:()=>cy.get('input[type=file]')
}

    clickconfirmReturn()
    {
        this.elements.confirmReturn().click();
        return this;
    }

    enterSealNumber()
    {
        this.elements.sealNumber().type("SEAL555");
        return this;
    }

    enterReturnComments()
    {
        this.elements.returnComments().type("test comments for returns");
        return this;
    }

    clickUploadReturnPhotos()
    {
        this.elements.uploadReturnPhotos().click();
        return this;
    }

    clickSendReturn()
    {
        this.elements.sendReturn().click();
        return this;

    }

    clickOK()
    {
        this.elements.ok().click();
        return this;
    }

    selectFile()
    {
        this.elements.file().invoke('show').selectFile('cypress/Utility/Upload files/payment.png');
        return this;
    }





}
module.exports=new BtrSendReturn();