class BtrDepositesPage
{
    elements={
        addNewCashDeposit:()=>cy.contains("Add New Cash Deposit"),
       Amount:()=>cy.get("input[placeholder='Enter amount']"),
       addRemark:()=>cy.get("input[placeholder='Add a remark']"),
        depositProoflist:()=>cy.get("div[aria-haspopup='listbox']"),
        aTM:()=> cy.get("li[data-value='ATM']"),
        neft:()=> cy.get("li[data-value='NEFT']"),
        rtgs:()=> cy.get("li[data-value='RTGS']"),
        imps:()=> cy.get("li[data-value='IMPS']"),
        cheque:()=> cy.get("li[data-value='CHEQUE']"),
        bankDeposit:()=>cy.get("li[data-value='BANK_DEPOSIT']"),
        upi:()=> cy.get("li[data-value='UPI']"),
        virtualPayment:()=> cy.get("li[data-value='VIRTUAL_PAYMENT']"),
        uploadPayment:()=>cy.contains("Upload Payment Screenshots"),
        finish:()=>cy.contains("Finish"),
        payNow:() =>cy.contains("Pay now"),
        successMsg:()=>cy.get('div[id="notistack-snackbar"]'),
        totalCashInHand:()=>cy.get(" h6 > b").eq(0),
        cashValue:()=> cy.get("h6[data-cy='btr.deposit.totalCashText']"),
        valueTable:()=>cy.get("div[data-field='deposited_amount'] div span"),
        valueText:()=>cy.get("h6[data-cy='btr.deposit.totalCashText'] b b"),
        pendingVerification:()=>cy.contains("Pending Verification").first(),
        delete:()=>cy.contains("Pending Verification").first().parent("div").find("svg"),
        yes:()=>cy.contains("Yes"),
        deleteMsg:()=>cy.get('div[id="notistack-snackbar"]'),
        cashCollection:()=>cy.get('button').contains("Collections"),
        previousCollection:()=>cy.get(".p-4 h6:nth-child(2)"),
        previousCollectionValue:()=>cy.get(".p-4 h6:nth-child(1)"),
        previousCollectionText:()=>cy.get("span[class^='text-[#CC1111]']"),
        depositData:()=>cy.get("h6[data-cy='btr.deposit.totalCashText'] b b"),
        paginationNext:()=>cy.get(".MuiDataGrid-footerContainer button:nth-child(2)"),
        receivedValue:()=>cy.get("div[data-field='collected_amount'] div span"),
        depositDataValue:()=>cy.get("div.MuiDataGrid-window div:nth-child(5) b"),
        file:()=>cy.get('input[type=file]'),
        amountInVirtualPaymentScreen:()=> cy.get("div[class*='styled__GreyBox'] div"),
        gpay:()=> cy.get("img[alt='G-pay']"),
        phonepe:()=> cy.get("img[alt='Phone-pay']"),
        paytm:()=> cy.get("img[alt='Paytm-logo']"),
        otherupiapps:()=> cy.get('span').contains('Other UPI App'),
        paymentInprogressMsg:()=> cy.get('b').contains("Payment is in progress!"),

 }

    clickAddNewCashDeposit()
    {
       this.elements.addNewCashDeposit().click();
       return this;
    }

    enterAmount()
    {
        this.elements.Amount().type("500");
        return this;
    }

    enterRemarks()
    {
    this.elements.addRemark().type("Remarks added");
    return this;
    }

    selectDepositProof()
    {
        this.elements.depositProoflist().click();
        return this;
    }

    selectATM()
    {
        this.elements.aTM().click();
        return this;
    }
    
    selectNEFT()
    {
        this.elements.neft().click();
        return this;
    }

    selectRTGS()
    {
        this.elements.rtgs().click();
        return this;
    }

    selectIMPS()
    {
        this.elements.imps().click();
        return this;
    }

    selectCheque()
    {
        this.elements.cheque().click();
        return this;
    }

    selectBankDeposit()
    {
        this.elements.bankDeposit().click();
        return this;
    }

    selectUPI()
    {
        this.elements.upi().click();
        return this;
    }
   
    selectVirtualPayment()
    {
        this.elements.virtualPayment().click();
        return this;
    }

    clickUploadPayment()
    {
        this.elements.uploadPayment().click();
        return this;
    }

    clickFinish()
    {
        this.elements.finish().click();
        return this;
    }

    verifyMsg()
    {
        this.elements.successMsg().should('have.text','Payment Recorded Successfully!');
        return this;
    }

    verifyInTable()
    {
        this.elements.successMsg().should('not.exist');
        return this;
    }

    checkCashInHand()
    {
        this.elements.totalCashInHand().contains("Total Cash In Hand");
        return this;
    }

    verifyCash()
    {
     this.elements.cashValue().contains('(-) ₹500');
     return this;
    }

    verifyCashInHandAfterCollection(amount)
    {
        this.elements.cashValue().contains('₹'+''+amount);
        return this;
    }

    verifyValueTable()
    {
        this.elements.valueTable().should("have.text", "₹500");
        return this;
    }

    verifyValueText()
    {
        this.elements.valueText().should("have.text", "(-) ₹500");
        return this;
    }

    clickPendingVerification()
    {
        this.elements.pendingVerification().click({force: true});
        return this;
    }

    clickDelete()
    {
        this.elements.delete().click();
        return this;
    }

    clickYes()
    {
        this.elements.yes().click();
        return this;
    }

    verifyDeleteMsg()
    {
        this.elements.deleteMsg().should('have.text','Entry Deleted Successfully');
        return this;
    }

    clickHomePage()
    {
        this.elements.deleteMsg().click();
        return this;
    }

    clickCashCollection()
    {
        this.elements.cashCollection().click();
        return this;
    }

    checkPreviousCollection()
    {
        this.elements.previousCollection().contains('B_Automation Credit Customer');
        return this;
    }

    verifyPreviousCollectionValue()
    {
        this.elements.previousCollectionValue().last().contains('Cash Amount - ₹500');
        return this;
    }

    verifyPreviousCollectionText()
    {
        this.elements.previousCollectionText().should("have.text", "₹500");
        return this;
    }

    verifyDepositData()
    {
        this.elements.depositData().should("have.text", "(-) ₹2,500");
        return this;
    }

    clickPagination()
    {
        this.elements.paginationNext().click();
        return this;
    }

    verifyReceivedValue()
    {
        this.elements.receivedValue().should("have.text", "₹500");
        return this;
    }
    
    verifyDepositDataValue()
    {
        this.elements.depositDataValue().should("have.text", "₹500");
        return this;
    }

    selectFile()
    {
        this.elements.file().invoke('show').selectFile('cypress/Utility/Upload files/payment.png');
    }

    verifyAmountInVirutalPaymentScreen(amount)
    {
        this.elements.amountInVirtualPaymentScreen().should('have.text', '₹ '+amount);
        return this;
    }

    clickPayNow()
    {
        this.elements.payNow().click();
        return this;
    }

    clickGpay()
    {
        this.elements.gpay().click();
        return this;
    }

    verifyVirtualPaymentInprogress()
    {
        this.elements.paymentInprogressMsg().should('have.text', 'Payment is in progress!');
        return this;
    }

    verifyPhonepe()
    {
        this.elements.phonepe().should('be.visible');
        return this;
    }

    verifyPaytm()
    {
        this.elements.paytm().scrollIntoView().should('be.visible');
        return this;
    }

    verifyOtherUpiAps()
    {
        this.elements.otherupiapps().scrollIntoView().should('be.visible');
        return this;
    }
   
}

module.exports=new BtrDepositesPage();