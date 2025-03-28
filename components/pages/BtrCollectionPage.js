class BtrCollectionPage
{ 
    elements=
    {
    searchTab: () =>cy.get("input[placeholder='Search Customers']"),
    customerName: () =>cy.get("h6 b").contains("B_Automation Credit Customer"),
    customerProfile :() => cy.get("div").contains("Outstanding"),
    CashCustName:()=> cy.get("h6[class='MuiTypography-root-hjKMqV giereC MuiTypography-root MuiTypography-subtitle2'] b"),
    initiateCollection :()=>cy.contains("Initiate Collection"),
    paymentMethod:()=>cy.get("div[aria-haspopup='listbox']"),
    cashOption:()=>cy.get("li[data-value='cash']"),
    next:()=>cy.contains('Next'),
    ok:()=>cy.contains('Ok'),
    confirmationOnPayment:()=>cy.contains('Okay, Proceed'),
    cashCollectSuccessMsg: ()=> cy.contains('Successfully Cash Collected!'),
    warningMsg: ()=> cy.get('div[aria-labelledby="confirmation-dialog-title"] p'),
    depositedAmount:()=>cy.get("input[placeholder='Enter amount']"),
    remark:()=>cy.get("input[placeholder='Add a remark']"),
    uploadPaymentSS:()=>cy.contains("Upload Payment Screenshots"),
    selectFile:()=>cy.contains("Upload Payment Screenshots"),
    submit:()=>cy.get("button[type='submit']"),
    paymentSuccessMsg:()=>cy.get('span[id="client-snackbar"]'),
    optionUPI:()=> cy.get("li[data-value='UPI']"),
    optionNeft:()=>cy.get("li[data-value='NEFT']"),
    optionRtgs:()=>cy.get("li[data-value='RTGS']"),
    optionImps:()=>cy.get("li[data-value='IMPS']"),
    optionCheque:()=>cy.get("li[data-value='CHEQUE']"),
    optionBankDeposit:()=>cy.get("li[data-value='BANK_DEPOSIT']"),
    optionVirtualPayment:()=>cy.get("li[data-value='VIRTUAL_PAYMENT']"),
    file:()=>cy.get('input[type=file]'),
    previousCollectionBtn: ()=> cy.get('button').contains('View Previous Collections'),
    pendingStatus: (paymentType)=> cy.get('div[class*="CustomerCardSection"] div:nth-child(2)>div>h6:nth-child(2)')
                                   .filter(':contains('+paymentType+')'),
    virtualScreenCustomerName:(customername)=> cy.get('b').contains(customername),
    paymentInprogressMsg:()=> cy.get('b').contains("Payment is in progress!"),
    payemntFailedMsg:()=> cy.contains("Payment Failed!"),
    duplicateCashErrorMsg:()=> cy.contains("Cannot create duplicate cash payment for same customer and amount"),
    attachmentRequiredMsg:()=> cy.get('p').contains('Required'),
    negativeCashErrorMsg:()=> cy.contains('Validation failed: Amount must be greater than or equal to 0'),
    negativeVAPaymentErrorMsg:()=> cy.get('p').contains('Value should be greate than 0'),
    paymentMethodsList:()=> cy.get("ul li[role='option']"),
    closeIcon:()=> cy.get('div[class*=AlignCloseIcon]'),
    amountInPreviousCollectionListing: (paymentType, amount, customerName)=> cy.contains('Amount Collected - ₹'+`${amount}`+''+`${paymentType}`),
    customerNameInListing: ()=> cy.get('div h6 b'),
    totalAmountToBeCollected: ()=> cy.contains('Total Amount to be Collected').parent('div'),
    totalCratesToBeCollected: ()=> cy.contains('Total Crates to be Collected').parent('div'),
    ErrorMsgForNegativeCash: ()=> cy.get('p').contains('Value should be greater than 0'),
    cratesTab: ()=> cy.get('button').contains('Crates'),
    cratesErrorMsg: ()=> cy.get('span').contains('Crates cannot be collected when the truck is returned'),
    totalOutstandingCrates: ()=> cy.get("h6[class='MuiTypography-root-hjKMqV hfGCIg MuiTypography-root MuiTypography-h6'] b"),
    cratesSummary: ()=> cy.get("div[class='flex justify-between items-center mx-4 my-2']").eq(1),
    crateCollectionInputField: ()=> cy.get('input'),
    saveButton: ()=> cy.get('button').contains('Save'),
    crateCollectionSuccessMsg: ()=> cy.contains('Successfully Crates Collected!')

}

searchCust()  
{
    
    cy.interceptRequest("GET", "/cds/customers/assigned_to_executive/**", "searchCust",(req) => {
        req.query['location_proximity_sorting']= 'false';
      });
    cy.wait('@searchCust');
    this.elements.searchTab().type("B_Automation Credit Customer");
    return this;
}



selectCust()
{
    this.elements.customerName().click();
    return this;
}



clickProfile()
{
    cy.wait(2000)
    this.elements.customerProfile().click();
    return this;
}

verifyCustomer(customer)
{
    this.elements.CashCustName().invoke('text').then((text1) =>
    {
        expect(text1).to.eq(customer);
    
})
return this;
}


clickPreviousCollectionBtn()
{
    this.elements.previousCollectionBtn().click();
    return this;
    
}
verifyPendingStatus(paymentType,status) {
    // if (paymentType === 'CASH') {
        // this.elements.pendingStatus(paymentType).each(($ele, index) => {
        //     cy.wrap($ele).within(($ele) => {
        //         cy.wrap($ele).parent('div').next('div').should('have.text', 'Verified');
        //     });
        // });
    //     return this;
    // } else {
    //     this.elements.pendingStatus(paymentType).each(($ele, index) => {
    //         cy.wrap($ele).within(($ele) => {
    //             cy.wrap($ele).parent('div').next('div').should('have.text', 'Pending Verification');
    //         });
    //     });
    //     return this;
    // }
    this.elements.pendingStatus(paymentType).each(($ele, index) => {
        cy.wrap($ele).within(($ele) => {
            cy.wrap($ele).parent('div').next('div').should('have.text', status);
        });
    });
    return this;
}

verifyAmountInPreviousCollection(paymentType, amount, customerName)
{
    this.elements.amountInPreviousCollectionListing(paymentType, amount, customerName).should('have.text', 'Amount Collected - ₹'+amount+''+paymentType)
    return this;
}

verifyListOfPaymentMethods(expectedPaymentMethods = ['None', 'Virtual Payment', 'Cash', 'NEFT', 'RTGS', 'IMPS', 'CHEQUE', 'BANK DEPOSIT', 'UPI'])
{
    //Here the 'None' is not an actual payment method, Added here for the purpose of assertion
    this.elements.paymentMethodsList().each(($ele, index, $list) => {
      // Get the text of the current element
      const actualMethod = $ele.text().trim();

      expect(actualMethod).to.equal(expectedPaymentMethods[index]);
    });
    return this;
}

verifyCustomerNamesInCollectionListing(customerNames)
{
    this.elements.customerNameInListing().each(($ele, index) => {
        const actualName = $ele.text().trim();

        expect(actualName).to.equal(customerNames[index]);
    });
    return this;
}

clickOnNone()
{
    this.elements.paymentMethodsList().each(($ele, index) => {
        if ($ele.text() === "None"){
            cy.wrap($ele).click();
        }
    });
    return this;
}

clickCloseIcon()
{
    this.elements.closeIcon().click();
    return this;
}

clickInitiateCollection()
{
    this.elements.initiateCollection().click();
    return this;
}

clickPaymentOption()
{
    this.elements.paymentMethod().click();
    return this;
}

selectCashOption()
{
    this.elements.cashOption().click();
    return this;
}

clickNext()
{
    this.elements.next().click();
    return this;
}
clickOK()
{
    this.elements.ok().click();
    return this;
}

confirmPayment()
{
    this.elements.confirmationOnPayment().click();
    return this;
}

enterAmount(amount="500")
{
    this.elements.depositedAmount().type(amount);
    return this;
}

enterRemarks()
{
    this.elements.remark().type("test comments for collections");
    return this;
}

clickUploadAttachment()
{
    this.elements.uploadPaymentSS().click();
    return this;
}

clickSubmit()
{
    this.elements.submit().click();
    return this;
}

verifySuccessMsg()
{
    this.elements.paymentSuccessMsg().should('have.text','Payment Recorded Successfully!');
    return this;
}
verifyCashCollectSuccessMsg()
{
 this.elements.cashCollectSuccessMsg().should('have.text','Successfully Cash Collected!');
 return this;
}
verifyWarningMsg(msg)
{
 this.elements.warningMsg().should('have.text', msg);
 return this;
}

selectUPIOption()
{
    this.elements.optionUPI().click();
    return this;
}

selectNeftOption()
{
    this.elements.optionNeft().click();
    return this;
}

selectRtgsOption()
{
    this.elements.optionRtgs().click();
    return this;
}

selectImpsOption()
{
    this.elements.optionImps().click();
    return this;
}

selectChequeOption()
{
    this.elements.optionCheque().click();
    return this;
}

selectBankDepositOption()
{
    this.elements.optionBankDeposit().click();
    return this;
}

selectVirtualPaymentOption()
{
    this.elements.optionVirtualPayment().click();
    return this;
}

selectFile()
{
    this.elements.file().invoke('show').selectFile('cypress/Utility/Upload files/payment.png');
    return this;
}

verifyCustomerNameInVirtualScreen(customername)
{
    this.elements.virtualScreenCustomerName(customername).invoke('text').then((text1) =>
    {
        expect(text1).to.eq(customername);
    
})
return this;
}

verifyVirtualPaymentInprogress()
{
    this.elements.paymentInprogressMsg().should('have.text', 'Payment is in progress!');
    return this;
}

verifyFinishButtonDisabled()
{
    this.elements.submit().should('be.disabled');
    return this;
}

verifyDuplicatePaymentFailedMsg()
{
    this.elements.payemntFailedMsg().should('have.text', 'Payment Failed!');
    this.elements.duplicateCashErrorMsg().should('have.text', 'Cannot create duplicate cash payment for same customer and amount');
    return this;
}

verifyPaymentFailedMsg()
{
    this.elements.payemntFailedMsg().should('have.text', 'Payment Failed!');
    return this;
}

verifyRequiredMsgVisible()
{
    this.elements.attachmentRequiredMsg().should('be.visible');
    return this;
}

verifyNegativeCashErrorMsg()
{
    this.elements.negativeCashErrorMsg().should('have.text', 'Validation failed: Amount must be greater than or equal to 0');
    return this;
}

verifyNegativeVAPaymentErrorMsg()
{
    this.elements.negativeVAPaymentErrorMsg().should('have.text', 'Value should be greater than 0');
    return this;
}

verifyTotalAmountToBeCollected(amount)
{
    this.elements.totalAmountToBeCollected().should('have.text', 'Total Amount to be Collected₹'+''+amount);
    return this;
}

verifyTotalCratesToBeCollected(crates)
{
    this.elements.totalCratesToBeCollected().should('have.text', 'Total Crates to be Collected'+''+crates);
    return this;
}

verifyErrorMsgForNegativeCash()
{
    this.elements.ErrorMsgForNegativeCash().should('be.visible');
    return this;
}

clickCratesTab()
{
    this.elements.cratesTab().click();
    return this;
}

verifyInitiateCollectionIsDisabled()
{
    this.elements.initiateCollection().should('be.disabled');
    return this;
}

verifyCratesErrorMsg()
{
    this.elements.cratesErrorMsg().should('have.text', 'Crates cannot be collected when the truck is returned');
    return this;
}

verifyTotalOutstandingCrates(crates)
{
    this.elements.totalOutstandingCrates().should('have.text', crates);
    return this;
}

verifyCratesSummary(crates)
{
    this.elements.cratesSummary().should('have.text', 'Crate'+''+crates);
    return this;
}

enterNumberOfCrates(crates)
{
    this.elements.crateCollectionInputField().type(crates);
    return this;
}

clickSaveButton()
{
    this.elements.saveButton().click();
    return this;
}

verifyCrateCollectionSuccessMsg()
{
    this.elements.crateCollectionSuccessMsg().should('have.text', 'Successfully Crates Collected!');
    return this;
}

}
module.exports=new BtrCollectionPage();