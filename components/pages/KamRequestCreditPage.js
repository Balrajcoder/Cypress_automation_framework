import KamHomePage from "../pages/KamHomePage";
import KamCustomerListPage from "../pages/KamCustomerListPage";
import KamCustomerCreditDetailsPage from "../pages/KamCustomerCreditDetailsPage";
import KamCustomerDetailsPage from "../pages/KamCustomerDetailsPage";
import constants from "../../constants/constants";

class KamRequestCreditPage {
  elements = {
    dclTypeDD: () => cy.get('div[id="dcl_type"]'),//selector need to be updated 
    dclTypesList: () => cy.get('ul[aria-labelledby="dcl_type"] li'),//selector need to be updated 
    dclValidityDD: () => cy.get('div[id="requested_till"]'),//selector need to be updated 
    dclValidityList: () => cy.get("ul[aria-labelledby='requested_till'] li"),//selector need to be updated 
    noneInDD: () => cy.get('[data-cy="kam.customer.credit-application.dcl-type.dropdown-text-none"]'),
    extendDCLButton: () => cy.get('[data-cy="kam.customers.credit-request-type-extend-dcl-radio-input"]'),
    verifyExtendDCLTypeLabel: () => cy.get('[data-cy="kam.customer.credit-application.dcl-type-label"]'),
    verifyDCLTypeCleared: () => cy.get('[data-cy="kam.customer.credit-application.dcl-type-input"]'),
    dclTypeSelected: (index) => cy.get(`[data-cy="kam.customer.credit-application.dcl-type.dropdown-text-${index}"]`),
    extralimitField: () => cy.get('[data-cy="kam.customer.credit-application.extra-limit-label"]'),
    submitButtonClick: () => cy.get('[data-cy="kam.customer.credit-application.submitBtn"]'),
    requiredErrorMsgDCLType: () => cy.get('p.MuiFormHelperText-root-ilyJmf').eq(0),//selector need to be updated 
    requiredErrorMsgDCLValidity: () => cy.get('p.MuiFormHelperText-root-ilyJmf').eq(1),//selector need to be updated 
    requiredErrorMsgDCLRemark: () => cy.get('p.MuiFormHelperText-root-ilyJmf').eq(2),//selector need to be updated 
    requiredErrorMsgExtraLimit: () => cy.get('p.MuiFormHelperText-root-ilyJmf').eq(0),//selector need to be updated 
    clickCancelButton: () => cy.get('[data-cy="kam.customer.credit-application.cancelBtn"]'),
    verifycustomerpageLabel: () => cy.get('[data-cy="btr.app.title"]'),
    dclValidityOption: (index) => cy.get(`[data-cy="kam.customer.credit-application.dcl-validity.dropdown-text-${index}"]`),
    remarksInput: () => cy.get('[data-cy="kam.customer.credit-application.requester-remarks-input"]'),
    successMessage: () => cy.get('h5.MuiTypography-root').contains('Temp. Limit Booster request sent for Manager approval'),//selector need to be updated 
    okayButton: () => cy.get('[data-cy="kam.landing.depositNow"]', { timeout: 30000 }),
    verifyMyrequestTab: () => cy.get('[data-cy="btr.app.title"]'),
    verifyApprovedDCLCount: () => cy.get('[data-cy="kam.customers.customer-health-dcl-count"]'),
    enterExtralimit: () => cy.get('[data-cy="kam.customer.credit-application.extra-limit-input"]'),
    verifyRevisedCreditValue: () => cy.get('[data-cy="kam.customer.credit-details-summary-available-credit-limit-value"]'),
    verifyDCLvalidtydate: () => cy.get('[data-cy="kam.customer.credit-details-summary-dcl-valid-till-value"]'),
  };

  clickDCLTypeDD() {
    this.elements.dclTypeDD().click({ force: true });
    return this;
  }

  verifyListOfDCLTypes(expectedDCLTypes) {
    this.elements.dclTypesList().each(($ele, index) => {
      const actualMethod = $ele.text().trim();
      expect(actualMethod).to.equal(expectedDCLTypes[index]);
    });
    return this;
  }

  clickDCLValidityDD() {
    this.elements.dclValidityDD().click({ force: true });
    return this;
  }

  verifyListOfDCLValidity(expectedDCLValidity) {
    this.elements.dclValidityList().each(($ele, index) => {
      const actualelements = $ele.text().trim();
      expect(actualelements).to.equal(expectedDCLValidity[index]);
    });
    return this;
  }

  clickNone() {
    this.elements.noneInDD().click();
    return this;
  }

  clickExtendDCLButton() {
    this.elements.extendDCLButton().click();
    return this;
  }

  verifyExtendDCLTypeLabel(labelName) {
    this.elements.verifyExtendDCLTypeLabel().should('have.text', labelName);
    return this;
  }

  verifyDCLTypeSelected(expectedType, index) {
    this.elements.dclTypeSelected(index).should('have.text', expectedType.trim());
    return this;
  }

  verifyDCLTypeCleared() {
    this.elements.verifyDCLTypeCleared().should('not.match', /[\u200B]/)  // Check if there are invisible characters (e.g., zero-width spaces)
  }

  selectDCLType(type) {
    this.elements.dclTypesList().contains(type).click();
    return this;
  }
  verifyExtraLimitField() {
    this.elements.extralimitField().should('be.visible');
    return this;
  }
  clickSubmitButton() {
    this.elements.submitButtonClick().click();
    return this;
  }
  verifyRequiredErrorMsgDCLType() {
    this.elements.requiredErrorMsgDCLType().should('be.visible').and('have.text', 'Required');
    return this;
  }
  verifyRequiredErrorMsgDCLValidity() {
    this.elements.requiredErrorMsgDCLValidity().should('be.visible').and('have.text', 'Required');
    return this;
  }
  verifyRequiredErrorMsgDCLRemark() {
    this.elements.requiredErrorMsgDCLRemark()
        .scrollIntoView({behavior: 'smooth'})
        .wait(500)  // Wait for scroll to complete
        .should('be.visible')
        .and('have.text', 'Required');
    return this;
  }
  verifyRequiredErrorMsgExtraLimit() {
    this.elements.requiredErrorMsgExtraLimit().should('be.visible').and('have.text', 'Required');
    return this;
  }
  clickCancelButton() {
    this.elements.clickCancelButton().click();
    return this;
  }
  verifycustomerpageLabel(expectedTittle) {
    this.elements.verifycustomerpageLabel().should('have.text', expectedTittle);
    return this;
  }

    selectDCLValidity(index = 1) {
        this.elements.dclValidityOption(index)
            .should('be.visible')
            .click();
        return this;
    }

    enterRemarks(remarks = 'test') {
        this.elements.remarksInput()
            .should('be.visible')
            .clear()
            .type(remarks);
        return this;
    }

    verifySuccessMessage() {
        this.elements.successMessage()
            .should('be.visible')
            .and('have.text', 'Temp. Limit Booster request sent for Manager approval');
        return this;
    }

    clickOkay()  {
        this.elements.okayButton().click()
        return this;
    }

    verifyMyrequestTab()  {
        this.elements.verifyMyrequestTab().should('have.text', 'My Requests');
        return this;
  }
  enterExtralimit(extralimit) {
    this.elements.enterExtralimit().type(extralimit);
    return this;
    }

   navigateToCustomer = (customerName, customerType = constants.CUSTOMERTYPE.REGULAR) => {

        KamHomePage.clickCustomers();
        if (['dormant', 'deactivated', 'Suspended'].includes(customerType)) {
            KamHomePage.scrollCustomerTypeTab(customerType)
        }
        if (customerType !== 'regular') {
            KamHomePage.clickCutomerTypeTab(customerType);
        }
        KamCustomerListPage.clickCustomerCard(customerName);
    };

    navigateToCustomerDetails = (customerName, customerType = constants.CUSTOMERTYPE.REGULAR) => {
        this.navigateToCustomer(customerName, customerType);
        KamCustomerDetailsPage.clickCreditDetails();
    };

   openDCLDrawer = (customerName, customerType = constants.CUSTOMERTYPE.REGULAR) => {
        this.navigateToCustomerDetails(customerName, customerType);
        KamCustomerCreditDetailsPage.clickRequestCredit();
        this.clickExtendDCLButton();
    };
   createDCLRequest = (DCLType) => {
        this.clickDCLTypeDD()
            .selectDCLType(DCLType)
          if (DCLType === 'Credit limit and payment terms breach') {
      this.enterExtralimit(1000)
    }
    this.clickDCLValidityDD()
            .selectDCLValidity()
            .enterRemarks()
            .clickSubmitButton();
    }
  verifyApprovedDCLCount(expectedCount) {
    this.elements.verifyApprovedDCLCount()
      .should('have.text', expectedCount);
    return this;
  }
  verifyRevisedCreditValue(revisedCreditValue) {
    this.elements.verifyRevisedCreditValue()
      .should('have.text', revisedCreditValue);
    return this;
  }
  verifyDCLvalidtydate() {
    const tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    const formattedDate = tomorrow.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      timeZone: 'UTC'
    }).replace(/\//g, ' ');
    this.elements.verifyDCLvalidtydate()
    .should(($el) => {
      const actualText = $el.text()
      expect(actualText).to.include(formattedDate);
    });
    return this;
  }
  
}

module.exports = new KamRequestCreditPage();

