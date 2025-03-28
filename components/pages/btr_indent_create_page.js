class btr_indent_create_page
{
    elements =
    {
        
        createIndentBtn:()=>cy.get('button').contains("Create Indent"),
        toastMsg:()=>cy.get('span[id="client-snackbar"]'),
        selectProductDD:()=>cy.get('input[placeholder="Select Product + SKU + Packaging"]'),
        selectProduct:(product)=>cy.get("div[id^='indent_order_items'] div").contains(`${product}`),
        orderQty:()=>cy.get('input[placeholder="Enter Order Qty"]'),
        addMoreProductBtn: ()=> cy.get('button').contains('Add more products'),
        indentComments: ()=> cy.get('textarea[placeholder="Add Comments here"]'),
        confirmIndentBtn:()=>cy.get('button').contains("Confirm indent"),
        IndentCreateSuccessMsg: ()=> cy.get('b').contains("Indent Created Successfully"),
        OkBtn: ()=> cy.get('buton').contains('Ok'),
        summaryViewBtn: ()=> cy.get('button').contains("Summary view"),
        backBtn: ()=> cy.get('button').contains('Back'),
        totalOrderQty: ()=> cy.get("tfoot tr td[header='Order Qty']"),
        confirmDialogPopup:()=>cy.get("div[aria-labelledby='confirmation-dialog-title'] p"),
        editBtn: ()=> cy.get('button').contains('Edit'),
        indentCard:(customer)=> cy.get('b').contains(`${customer}`),
        editPageSummaryTitle: ()=> cy.get('h6').contains('Update Indents Order'),
        updateBtn: ()=> cy.get('button').contains('Update'),
        deleteBtn: ()=> cy.get('button').contains('Delete'),
        viewIndentComment: ()=> cy.get('p').eq(1),
        indentList:()=> cy.get('h6 b'),
        deliveredIndentsTab:()=> cy.get('button').contains('Delivered Indents'),
        noDeliveries:()=> cy.get('h5 b'),

    }

    clickCreateIndent()
    {
        this.elements.createIndentBtn().click();
        return this; 
    }
    clickConfirmIndent()
    {
        this.elements.confirmIndentBtn().click();
        return this; 
    }
    clickSelectProductDropdown(index)
    {
        this.elements.selectProductDD().eq(index).click();
        return this; 
    }
    selectProductFromDropdown(product)
    {
        this.elements.selectProduct(product).click();
        return this; 
    }
    enterOrderQty(quantity,index)
    {
        this.elements.orderQty().eq(index).type(quantity);
        return this; 
    }
    clearOrderQty(index)
    {
        this.elements.orderQty().eq(index).click();
        this.elements.orderQty().eq(index).clear();
        return this;
    }
    addMoreProductBtn()
    {
        this.elements.addMoreProductBtn().click();
        return this; 
    }
    enterIndentComments(comments)
    {
        this.elements.indentComments().type(comments);
        return this; 
    }
    verifyIndentCreateSuccessMsg()
    {
        this.elements.IndentCreateSuccessMsg().should('have.text','Indent Created Successfully')
    }
    VerifyConfirmDialogPopupTxt()
    {
        this.elements.confirmDialogPopup().should('have.text',"Indent for this customer has been already created for today. Are you sure, you want to create another indent?");
        return this; 
    }
    clickSummaryViewBtn(comments)
    {
        this.elements.summaryViewBtn().click();
        return this; 
    }
    verifyTotalOrderQty(Qty)
    {
        this.elements.totalOrderQty().should('have.text',`${Qty}`+ " units")
        
    }
    clickEditBtn()
    {
        this.elements.editBtn().click();
        return this;
    }
    clickIndent(customer)
    {
        this.elements.indentCard(customer).click();
        return this;
    }
    verifyEditPageSummaryTitle(title)
    {
        this.elements.editPageSummaryTitle().should('have.text', title);
        return this;
    }
    clickUpdateBtn()
    {
        this.elements.updateBtn().click();
        return this;
    }
    clickDeleteBtn()
    {
        this.elements.deleteBtn().click();
        return this;
    }
    verifyIndentComment(comment)
    {
        this.elements.viewIndentComment().should('have.text', comment);
        return this;
    }
    verifyDeletedIndent(indent)
    {
        this.elements.indentList().each(($el)=>{
            cy.wrap($el).should('not.have.text', indent);
        });
    }
    clickDeliveredIndentsTab()
    {
        this.elements.deliveredIndentsTab().click();
        return this;
    }
    verifyNoDeliveries()
    {
        this.elements.noDeliveries().should('have.text', 'No Deliveries Available');
        return this;
    }
   
    verifyToastErrorMsg(msg)
    {
        this.elements.toastMsg().should('have.text',msg);
        return this; 
    }

    verifyToastSuccessMsg(msg)
    {
        this.elements.toastMsg().should('have.text',msg);
        return this; 
    }
}

module.exports=new btr_indent_create_page();