import search_customer_component from "../common/search_customer_component";

class BtrCreateSOPage
{
    elements=
    {
        searchTab:()=>cy.get('input[placeholder="Search Customers"]'),
        custName:(customer)=>cy.get('div[class*="CustomerCardSection"] b').contains(`${customer}`),
        previousDayTab: ()=> cy.get('button').contains('Previous days'),
        gmvValue:()=> cy.get(' b span span'),
        nofOfSaleOrders :()=> cy.get('div:nth-child(1) > p > b'),
        saleOrderInfo:()=> cy.get('div[class*="LandingCard"]:nth-child(4) div[class="info"]'),
        createOrder:()=>cy.contains("Create Order"),
        productDD:()=>cy.get('input[placeholder="Select Product + SKU + Packaging"]'),
        selectProduct:(productName)=>cy.get('div[id*="sale_order_items"] div').contains(productName),
        orderQty:()=>cy.get('input[placeholder="Enter Order Qty"]'),
        orderKgs: () => cy.get('input[placeholder="Fruit Qty In"]'),   
        next:()=>cy.contains("Next"),
        soComments: ()=> cy.get('textarea[placeholder="Add Comments here"]'),
        clickSelectPaymentMethod: ()=> cy.get("div[aria-labelledby='transfer_method transfer_method']"),
        selectTransferMethod: ()=> cy.get("ul[aria-labelledby='transfer_method'] li p"),
        uploadPaymentSS:()=>cy.contains("Upload Payment Screenshots"),
        file:()=>cy.get('input[type=file]'),
        sendOTP:()=>cy.get('span').contains("Send OTP"),
        OTP:()=>cy.get('input[name="OTPInput.0"]'),
        VerifyAndCreateSO:()=>cy.contains("Verify and create SO"),
        successMsg:()=>cy.get("h5 b",{ timeout: 30000 }),
        toastMsg:()=>cy.get('span[id="client-snackbar"]'),
        skip:()=>cy.contains("Skip"),
        OrderQtyError:()=> cy.get('input[name="sale_order_items.0.units"]').parent('div').siblings('p'),
        addMoreProductBtn: ()=> cy.get('span').contains('Add more products'),
        outstandingAmt: ()=> cy.get('div[class*="CustomerCardSection"] ~div:nth-child(3) p:nth-child(1) span'),
        pendingSaleOrder: ()=> cy.get('div[class*="CustomerCardSection"] ~div:nth-child(3) p:nth-child(2) span'),
        creditLimit: ()=> cy.get('div[class*="CustomerCardSection"] ~div:nth-child(3) p:nth-child(3) span'),
        overdueDays: ()=> cy.get('div[class*="CustomerCardSection"] ~div:nth-child(3) p:nth-child(4) b'),
        paymentTerms: ()=> cy.get('div[class*="CustomerCardSection"] ~div:nth-child(3) p:nth-child(5) b'),
        customerStatus: ()=> cy.get('div[class*="CustomerCardSection"] ~div:nth-child(3) p:nth-child(6) span'),
        noDataDisplayMsg: ()=> cy.get('h5 b'),
        collectCash: ()=> cy.get('span').contains('Collect Cash'),
        collectCrates: ()=> cy.get('span').contains('Collect Crates')

    }

    searchCust(customer)
    {

        
        this.elements.searchTab().type(customer);
        cy.interceptRequest("GET", "/cds/customers/assigned_to_executive/**", "searchCust",(req) => {
            req.query['location_proximity_sorting']= 'false';
          });
          cy.wait('@searchCust');
        return this;
    }
    
    selectCust(customer)
    {
        this.elements.custName(customer).click();
        return this;

    }
    clickCreateOrder()
    {
        this.elements.createOrder().click();
        return this;

    }
    verifyCreateOrderBtnDisabled()
    {
        this.elements.createOrder().should('have.attr', 'disabled');
        return this;
    }
    clickProductDropDwn(rowNum)
    {
        this.elements.productDD().eq(rowNum).click();
        return this; 
    }

    selectProduct(productName)
    {
        this.elements.selectProduct(productName).click();
        return this;

    }

    enterOrderQty(rowNum,OrderQuantity)
    {
        this.elements.orderQty().eq(rowNum).should('be.visible').and('not.be.disabled').type(OrderQuantity);
        return this;
    }

    enterOrderKgs(OrderKgs) {
       
            this.elements.orderKgs().should("have.length.gte", 0).then($orderKgsElement => {
                if ($orderKgsElement.length > 0){
                    cy.wrap($orderKgsElement).type(OrderKgs);
                }
                
            });

    }
    
    
     clickUploadAttachment()
    {
    this.elements.uploadPaymentSS().click();
    return this;
    }

    clickNext()
    {
        this.elements.next().click();
        return this;
    }
    enterSoComments(comments)
    {
        this.elements.soComments().type(comments)
        return this
    }
    clickSelectPaymentMethod()
    {
        this.elements.clickSelectPaymentMethod().click();
        return this
    }
    selectTransferMethod(paymentmethod)
    {
        this.elements.selectTransferMethod().contains(paymentmethod).click();
        return this;
    }

    clickSendOTP()
    {
        this.elements.sendOTP().click();
        return this;   
    }

    enterOTP()
    {
        this.elements.OTP().type("1234")
        return this;   
    }

    clickVerifyAndCreateSO()
    {
        this.elements.VerifyAndCreateSO().click();
        return this;   

    }

    verifySuccessMsg(msg)
    {
        this.elements.successMsg().should('have.text',msg);
        return this;   
    }
    verifyErrorMsg(msg)
    {
        this.elements.toastMsg().should('have.text', msg);
        return this;
    }
    verifyOrderQtyFieldErrorMSg(msg)
    {
        this.elements.OrderQtyError().should('include.text',msg)
    }

    clickSkip()
    {
        this.elements.skip().click();
        return this;   
 
    }
    addMoreProductBtn()
    {
        this.elements.addMoreProductBtn().click();
        return this; 
    }
    verifyOutstandingAmt(amt)
    {
        this.elements.outstandingAmt().should('have.text',amt);
        return this;
    }
    verifyPendingSaleOrder(amt)
    {
        this.elements.pendingSaleOrder().should('have.text',amt);
        return this;
    }
    verifyCreditLimit(amt)
    {
        this.elements.creditLimit().should('have.text',amt);
        return this;
    }
    verifyOverdueDays(days)
    {
        this.elements.overdueDays().should('have.text',days);
        return this;
    }
    verifyPaymentTerms(days)
    {
        this.elements.paymentTerms().should('have.text',days);
        return this;
    }
    verifyCustomerStatus(status)
    {
        this.elements.customerStatus().should('have.text',status);
        return this;
    }
    verifyNoDataDisplayMsg(msg)
    {
       this.elements.noDataDisplayMsg().should('have.text',msg)
    }
    clickPreviousDayTab()
    {
        this.elements.previousDayTab().should('be.visible').click();
        return this;
    }
    verifyGmvValue(amt)
    {
        this.elements.gmvValue().should('have.text',amt)
        return this;
    }
    verifyNoOfSaleOrdersInListingPage(text)
    {
        this.elements.nofOfSaleOrders().should('have.text',text)
        return this;
    }
    verifySaleOrderInfoHomePge(text)
    {
        this.elements.saleOrderInfo().should('have.text',text)
        return this;
    }

    verifyToastErrorMsg(msg)
    {
        this.elements.toastMsg().should('have.text',msg);
        return this; 
    }

    waitForToastMsgToDisappear()
    {
        this.elements.toastMsg().should('not.exist')
        return this;
    }

    verifyToastSuccessMsg(msg)
    {
        this.elements.toastMsg().should('have.text',msg);
        return this; 
    }

    clickCollectCash()
    {
        this.elements.collectCash().click();
        return this;
    }

    clickCollectCrates()
    {
        this.elements.collectCrates().click();
        return this;
    }


     /**
      * This method creates Sale order for Cash customer 
     * @param {string} customer Saleorder will be created against this `customer`
     * @param {number} OrderQuantity Sale order will be placed with this Orderquanity
     * @param {string} TransferMethod Customer pay money through this payment method
     */
    createSOForCashCust(customer,OrderQuantity,TransferMethod)
    {
        search_customer_component.searchCust(customer)
        .selectCust(customer)
        this.clickCreateOrder()
        .clickProductDropDwn(0)
        cy.customIntercept("GET","/btr/pricing/get_price.json?**","pricing");
        this.selectProduct('Apple');    
        cy.wait("@pricing");
        cy.wait(500);
        this.enterOrderQty(0,OrderQuantity)
        this.clickNext()
        .enterSoComments("test comments for cash customer")
        .clickSelectPaymentMethod()
        if(TransferMethod=="Cash")
        {
            this.selectTransferMethod(TransferMethod)
        }
        else
        {
            this.selectTransferMethod(TransferMethod)
            this.elements.file().invoke('show').selectFile('cypress/Utility/Upload files/payment.png'); 
        }
        
        this.clickSendOTP()
        .enterOTP()
        .clickVerifyAndCreateSO()
        .verifySuccessMsg('Sale Created Successfully')
        .clickSkip()
    }
    /**
     * This method creates sale order for Credit customers
     * 
     * @param {string} customer - The name of the customer.
     * @param {number} OrderQuantity - The quantity of the order.
     */
    createSO(customer,OrderQuantity)
    {
        search_customer_component.searchCust(customer)
        .selectCust(customer)
        this.clickCreateOrder()
        .clickProductDropDwn(0)
        cy.customIntercept("GET","/btr/pricing/get_price.json?**","pricing");
        this.selectProduct('Apple');    
        cy.wait("@pricing");
        this.enterOrderQty(0,OrderQuantity)
        .clickNext()
        .enterSoComments("test comments for credit customer")
        .clickSendOTP()
        .enterOTP()
        .clickVerifyAndCreateSO()
    }
    createSoForMultipleProducts(customer,OrderQuantity,noOfProducts)
    {
        search_customer_component.searchCust(customer)
        .selectCust(customer)
        this.clickCreateOrder()
        this.addMoreProductsInSaleOrder(noOfProducts,OrderQuantity)
        this.clickNext()
        .enterSoComments("test comments for credit customer")
        .clickSendOTP()
        .enterOTP()
        .clickVerifyAndCreateSO()
    }
    /**
    * Adds multiple products to a sale order.
    * 
    * @param {number} noOfProducts - The number of products to add.
    * @param {number} OrderQuantity - The quantity of each product.
    */
    addMoreProductsInSaleOrder(noOfProducts, OrderQuantity) {
        
        cy.fixture("po_items").then((po)=>
      {
        for (let productIndex = 0; productIndex < noOfProducts; productIndex++) {
          
            this.clickProductDropDwn(productIndex)
            cy.customIntercept("GET", "/btr/pricing/get_price.json?**", "pricing")
            this.selectProduct(po.items[productIndex].product)
            cy.wait("@pricing")
            this.enterOrderQty(productIndex,OrderQuantity)
            .enterOrderKgs(OrderQuantity * 10) // OrderQuantity represents units
            if (productIndex < noOfProducts - 1) {
                // If not the last product, add more product
                this.addMoreProductBtn()
            }
        }
      })
      }
    /**
    * Creates a sale order while delivering indents.
    */ 
    createSOWhileDeliverIndents()
    {
        this.enterSoComments("test comments to deliver Indents")
        .clickSendOTP()
        .enterOTP()
        .clickVerifyAndCreateSO()
        .verifySuccessMsg('Sale Created Successfully')
        .clickSkip();
    }

    createSOWhileDeliverIndentsforCollection()
    {
        this.enterSoComments("test comments to deliver Indents")
        .clickSendOTP()
        .enterOTP()
        .clickVerifyAndCreateSO()
        .verifySuccessMsg('Sale Created Successfully')
        .clickCollectCash();
    }

}
module.exports=new BtrCreateSOPage();