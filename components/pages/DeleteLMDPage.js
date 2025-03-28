class DeleteLMDPage
{
    elements={
       deleteOk:()=>cy.get('span').contains('ok')
    }

    deleteConfirmation()
    {
        cy.on('window:confirm',(textmess)=>
        {
          expect(textmess).to.contains('Are you sure, you want to delete ?');
    
        })
        return this;
    }
 
    clickOK()
    {
        this.elements.deleteOk().click();
        return this;
    }


}
module.exports=new DeleteLMDPage();