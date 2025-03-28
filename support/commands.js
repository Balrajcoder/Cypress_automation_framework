import POPage from "../components/pages/POPage";
import HomePage from "../components/pages/HomePage";
import DCArrivalPage from "../components/pages/DCArrivalPage";
import BtrLoginPage from "../components/pages/BtrLoginPage";
import shared_component from "../components/common/shared_component";
import searchCustomerComponent from "../components/common/search_customer_component";
import btrIndentCreatePage from "../components/pages/btr_indent_create_page";
import BtrHomePage from "../components/pages/BtrHomePage";
import BtrCollectionPage from "../components/pages/BtrCollectionPage";
import BtrDepositsPage from "../components/pages/BtrDepositsPage";
import footer_component from "../components/common/footer_component";
import KamHomePage from "../components/pages/KamHomePage";

/**
 * Get today's date in the format 'DD Mon YYYY'.
 * @returns {string} Today's date
 */
Cypress.Commands.add('getTodaysDate', () => {
    const date = new Date();
    const currentDate = `0${date.getDate()} ${date.toLocaleString('default', {month: 'short'})} ${date.getFullYear()}`.slice(-11);
    cy.log(currentDate);
    return cy.wrap(currentDate);
});

/**
 * Selects an option from a dropdown.
 * @param {Object} locator - The locator of the dropdown element
 * @param {string} text - The text of the option to select
 */
Cypress.Commands.add('selectDropDown', (locator, text) => {
    locator.each(($ele) => {
        if ($ele.text() === text) {
            cy.log("Found Element");
            cy.wrap($ele).click();
        } else {
            cy.log("Element not found");
        }
    });
});

/**
 * Locates an element by attribute.
 * @param {string} attribute - The attribute to locate
 */
Cypress.Commands.add('locate', (attribute) => {
    cy.get(attribute);
});

/**
 * Logs into the Velynkenv environment.
 * @param {string} username - The username
 * @param {string} password - The password
 * @param {string} title - The expected title after login
 */
Cypress.Commands.add('LoginVelynk', (username, password, title) => {
    cy.viewport(1000, 660);
    cy.visit(`${Cypress.env('Velynkenv')}/login`);
    cy.log(`${Cypress.env('Velynkenv')}/login`);
    BtrLoginPage.enterUserName(username)
        .enterPassword(password)
        .clickLoginButton()
    // .verifyTitle(title);
});

/**
 * Creates a purchase order.
 */
Cypress.Commands.add('POCreation', () => {
    POPage.clickAddPO()
        .clickPOType()
        .selectPOType()
        .clickDC()
        .selectChennaiDC()
        .clickBuyers()
        .chooseBuyers()
        .enterSupplier()
        .clickSupplier()
        .selectDate()
        .clickFeildExecutive()
        .selectFE()
        .clickModel()
        .selectModel()
        .selectUnits()
        .clickName()
        .selectProduct()
        .clickSKU()
        .selectPOSKU()
        .enterAvgWt()
        .enterExpectedQty()
        .clickPackage()
        .selectPackaging()
        .clickAgreedValue()
        .clickAddMoreProduct()
        .clickProductName()
        .clickSelectPomo()
        .clickSkuPomo()
        .selectPomoSKU()
        .enterPomoAvgWt()
        .enterPomoExpectedQty()
        .clickPomoPackage()
        .selectPomoPackaging()
        .clickPomoAgreedValue()
        .clickSaveClose()
        .verifySuccessMsg();
    HomePage.clickHamburger()
        .clickDcArrival()
        .clickDC()
        .selectDC('Chennai');
    DCArrivalPage.clickNfiConsumptionBtn()
        .clickSaveBtn()
        .clickReceiveShipment()
        .clickCompleteDelivery()
        .clickOK()
        .verifySuccessMsg();
    HomePage.clickHamburger()
        .clickInventory();
});

/**
 * Logs into the B2R environment.
 * @param {string} username - The username
 * @param {string} password - The password
 * @param {string} title - The expected title after login
 */
Cypress.Commands.add('LoginBtr', (username, password, title) => {
    cy.viewport('samsung-s10');
    cy.visit(`${Cypress.env('B2Renv')}/login`);
    cy.customIntercept('POST', '/login', 'loginRequest')
    cy.log(`${Cypress.env('B2Renv')}/login`);
    BtrLoginPage.enterUserName(username)
        .enterPassword(password)
        .clickLoginButton()
      cy.wait('@loginRequest');
      BtrLoginPage.verifyTitle(title)
    cy.reload();
});

/**
 * Intercepts a request.
 * @param {string} method - The HTTP method
 * @param {string} path - The URL path to intercept
 * @param {string} alias - The alias to assign to the intercepted request
 * @param {Function} callback - Optional callback function
 */
Cypress.Commands.add("interceptRequest", (method, path, alias, callback) => {
    cy.intercept(method, path, callback).as(alias);
});

/**
 * Customized request interception.
 * @param {string} method - The HTTP method
 * @param {string} path - The URL path to intercept
 * @param {string} alias - The alias to assign to the intercepted request
 */
Cypress.Commands.add("customIntercept", (method, path, alias) => {
    cy.intercept(method, path).as(alias);
});

/**
 * Verifies the redirected URL.
 * @param {string} url - The expected URL
 */
Cypress.Commands.add('verifyRedirectedUrl', (url) => {
    cy.url().should('include', url);
});

/**
 * Creates an indent.
 * @param {string} customer - The customer name
 */
Cypress.Commands.add('IndentCreation', (customer) => {
    searchCustomerComponent.searchCust(customer)
        .selectCust(customer);
    btrIndentCreatePage.clickCreateIndent()
        .clickSelectProductDropdown(0)
        .selectProductFromDropdown("Kinnow")
        .enterOrderQty(10, 0)
        .addMoreProductBtn()
        .clickSelectProductDropdown(1)
        .selectProductFromDropdown("Apple/KUL-EL-UROYAL/")
        .enterOrderQty(10, 1)
    shared_component.clickNext()
    btrIndentCreatePage.enterIndentComments("Comments for create indent")
        .clickConfirmIndent()
        .verifyIndentCreateSuccessMsg()
    shared_component.clickVesellOkBtn();
    cy.verifyRedirectedUrl(`${Cypress.env('B2Renv')}/app/indent`);
});

/**
 * Creates an indent twice for the same customer.
 * @param {string} customer - The customer name
 */
Cypress.Commands.add('IndentCreationTwiceForSameCustomer', (customer) => {
    cy.IndentCreation(customer);
    BtrHomePage.clickIndents();
    searchCustomerComponent.searchCust(customer)
        .selectCust(customer);
    btrIndentCreatePage.clickCreateIndent()
        .clickSelectProductDropdown(0)
        .selectProductFromDropdown("Kinnow")
        .enterOrderQty(10, 0)
        .addMoreProductBtn()
        .clickSelectProductDropdown(1)
        .selectProductFromDropdown("Apple/KUL-EL-UROYAL/")
        .enterOrderQty(10, 1)
    shared_component.clickNext()
    btrIndentCreatePage.enterIndentComments("Comments for create indent")
        .clickConfirmIndent()
    shared_component.verifyToastErrorMsg('Cannot create multiple indents for the same customer and on the same day. Please edit existing indent.');
});

/**
 * Opens a customer profile.
 * @param {string} customer - The customer name
 */
Cypress.Commands.add('openCustomerProfile', (customer) => {
    cy.wait(1000);
    BtrHomePage.clickCollection();
    searchCustomerComponent.searchCust(customer)
        .selectCust(customer);
    BtrCollectionPage.clickProfile();
    BtrCollectionPage.verifyCustomer(customer);
});

Cypress.Commands.add('deposit', (paymentMethod) => {
    BtrHomePage.clickDeposits()
    BtrDepositsPage.clickAddNewCashDeposit()
        .enterAmount()
        .enterRemarks()
        .selectDepositProof();
    switch (paymentMethod) {
        case 'ATM':
            BtrDepositsPage.selectATM();
            break;
        case 'NEFT':
            BtrDepositsPage.selectNEFT();
            break;
        case 'RTGS':
            BtrDepositsPage.selectRTGS();
            break;
        case 'IMPS':
            BtrDepositsPage.selectIMPS();
            break;
        case 'CHEQUE':
            BtrDepositsPage.selectCheque();
            break;
        case 'Bank Deposit':
            BtrDepositsPage.selectBankDeposit();
            break;
        case 'UPI':
            BtrDepositsPage.selectUPI();
            break;
    }
    BtrDepositsPage.clickUploadPayment()
        .selectFile()
    BtrDepositsPage.clickFinish()
        .verifyMsg()
        .verifyInTable()
        .checkCashInHand()
        .clickPendingVerification();
    BtrHomePage.clickHome();
});

Cypress.Commands.add('sessionLogin', (username, password) => {
    cy.session([username], () => {
        cy.visit('/login');
        cy.customIntercept('POST', '/login', 'loginRequest');
        BtrLoginPage.enterUserName(username)
            .enterPassword(password)
            .clickLoginButton()
        cy.wait('@loginRequest');
        cy.url().should('contain', '/landing')
        cy.viewport('samsung-s10')
    });
});

Cypress.Commands.add('LoginKAM', (username, password) => {
    cy.viewport('samsung-s10');
    cy.visit(`${Cypress.env('B2Renv')}/login`);
    cy.log(`${Cypress.env('B2Renv')}/login`);
    cy.customIntercept('POST', '/login', 'loginRequest');
    BtrLoginPage.enterUserName(username)
        .enterPassword(password)
        .clickLoginButton()
    cy.wait('@loginRequest');
    cy.on("uncaught:exception", (e, runnable) => {
        console.log("error", e);
        console.log("runnable", runnable);
        return false;
    });
});

Cypress.Commands.add('LogoutKAM', () => {
    footer_component.clickHomeButton();
    KamHomePage.clickProfileIcon()
        .clickLogout();
});

Cypress.Commands.add('loginAuth', (username, password) =>
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/login',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            user: {
                username,
                password
            }
        }
    }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.not.be.empty;
        const authToken = response.headers.authorization;
        Cypress.env('authToken', authToken);
        cy.log(Cypress.env('authToken'));
    })
);

Cypress.Commands.add('verifyToastMessage', (message) => {
    cy.get('#notistack-snackbar').should('have.text', message)
})

Cypress.SelectorPlayground.defaults({
    selectorPriority: ['data-cy', 'id', 'class', 'tag', 'attributes'],
    onElement: ($el) => {

        // Highest priority: data-cy attribute
        if ($el.attr('data-cy')) {
            return `[data-cy="${$el.attr('data-cy')}"]`;
        }

        // Traverse up to closest parent with data-cy
        const parentWithDataCy = $el.closest('[data-cy]');
        if (parentWithDataCy.length) {
            const parentSelector = `[data-cy="${parentWithDataCy.attr('data-cy')}"]`;
            const tagName = $el.prop('tagName').toLowerCase();
            return `${parentSelector} ${tagName}`;
        }

        // Next priority: stable id attribute (avoid dynamic ids)
        const id = $el.attr('id');
        if (id && !id.startsWith(':')) {
            return `#${id}`;
        }

        // Next priority: class attribute
        const elClass = $el.attr('class');
        if (elClass) {
            const firstClass = elClass.split(' ')[0];
            return `.${firstClass}`;
        }

        // Fallback to default Cypress selector
        return undefined;
    }
});






