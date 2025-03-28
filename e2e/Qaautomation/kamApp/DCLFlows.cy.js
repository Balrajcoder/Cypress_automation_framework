import KamRequestCreditPage from "../../../components/pages/KamRequestCreditPage";
import KamHomePage from "../../../components/pages/KamHomePage";
import KamCustomerCreditDetailsPage from "../../../components/pages/KamCustomerCreditDetailsPage";
import KamCustomerDetailsPage from "../../../components/pages/KamCustomerDetailsPage";
import {MESSAGES} from "../../../constants/messages";
import KamDCLApproval from "../../../components/pages/KamDCLApproval";
import constants from "../../../constants/constants";

describe('DCL Flows', function () {
  let data;

  before(function () {
    // Load user data from the fixture
    cy.fixture("kamLoginPage").then(function (userdata) {
      data = userdata;
    });
  });

  beforeEach(() => {
    switch (Cypress.currentTest.title) {
      case 'Verify Request Credit button is visible for all customers with desired roles':
          break;
        case 'Verify for Prospect , Dormant and Deactivated customer , DCL cannot be raised':
        break;
      case 'Verify Pending DCL count in my request page':
        cy.LoginKAM(data.userDCL03, data.password);
        break;
      default:
        // Login as userDCL01 before each test
        cy.LoginKAM(data.userDCL01, data.password);
        break;
    }
  });

  it('Verify DCL given count for new customer', () => {
    const customerName = "Customer DCL 01";
      KamRequestCreditPage.navigateToCustomer(customerName);
    KamCustomerDetailsPage.verifyDCLGivenCount('0')
      .verifyDCLGivenAmount('0');
  });

  it('Validate the DCL drawer opens correctly and displays required fields', () => {
    const customerName = "Customer DCL 01";
      KamRequestCreditPage.openDCLDrawer(customerName);
    KamRequestCreditPage.verifyExtendDCLTypeLabel("Temp. Limit Booster Type*");
  });

  it('Verify Request Credit button is visible for all customers with desired roles', () => {
    const KAMNames = [data.userDCL01, data.userDCL03, data.userDCL04, data.userDCL05, data.userDCL06];
    const customerNames = ['Customer DCL 01', 'Customer DCL 04', 'Customer DCL 05', 'Customer DCL 06', 'Customer DCL 07'];

    KAMNames.forEach((user, index) => {
      const customerName = customerNames[index];
      cy.LoginKAM(user, data.password);
        KamRequestCreditPage.navigateToCustomerDetails(customerName);
      KamCustomerCreditDetailsPage.clickRequestCredit();
      KamRequestCreditPage.clickCancelButton();
      cy.LogoutKAM();
    });
  });

  it('Verify DCL type dropdown options', () => {
    const customerName = "Customer DCL 01";
    const expectedDCLTypes = ['None', 'Payment terms breach', 'Credit limit and payment terms breach'];
      KamRequestCreditPage.openDCLDrawer(customerName)
    KamRequestCreditPage.clickDCLTypeDD()
      .verifyListOfDCLTypes(expectedDCLTypes)
      .clickNone();
  });

  it('Verify Selecting "None" in the DCL type dropdown resets the selection', () => {
    const customerName = "Customer DCL 01";
    const DCLTypes = ['Payment terms breach', 'Credit limit and payment terms breach', 'None'];

      KamRequestCreditPage.openDCLDrawer(customerName);

    DCLTypes.forEach((type, index) => {
      KamRequestCreditPage.clickDCLTypeDD()
        .selectDCLType(type);

      if (type === 'None') {
        KamRequestCreditPage.verifyDCLTypeCleared();
      } else {
        const validIndex = index + 1;
        KamRequestCreditPage.verifyDCLTypeSelected(type, validIndex);
      }
    });
  });

  it('Verify on selecting Credit limit and Payment terms breach, extra limit field will be visible', () => {
    const customerName = "Customer DCL 01";
    const DCLType = "Credit limit and payment terms breach";

      KamRequestCreditPage.openDCLDrawer(customerName)
    KamRequestCreditPage.clickDCLTypeDD()
      .selectDCLType(DCLType)
      .verifyExtraLimitField();
  });

  it('Verify DCL type is a mandatory field', () => {
    const customerName = "Customer DCL 01";
      KamRequestCreditPage.openDCLDrawer(customerName)
    KamRequestCreditPage.clickSubmitButton()
      .verifyRequiredErrorMsgDCLType();
  });

  it('Verify DCL validity is a mandatory field', () => {
    const customerName = "Customer DCL 01";
      KamRequestCreditPage.openDCLDrawer(customerName)
    KamRequestCreditPage.clickSubmitButton()
      .verifyRequiredErrorMsgDCLValidity();
  });

  it('Verify Remarks field is a mandatory field', () => {
    const customerName = "Customer DCL 01";
      KamRequestCreditPage.openDCLDrawer(customerName)
    KamRequestCreditPage.clickSubmitButton()
      .verifyRequiredErrorMsgDCLRemark();
  });

  it('Verify Extra limit field is a mandatory field', () => {
    const customerName = "Customer DCL 01";
    const DCLType = "Credit limit and payment terms breach";

      KamRequestCreditPage.openDCLDrawer(customerName)
    KamRequestCreditPage.clickDCLTypeDD()
      .selectDCLType(DCLType)
      .clickSubmitButton()
      .verifyRequiredErrorMsgExtraLimit();
  });

  it('Verify Clicking on cancel button in the drawer closes the drawer', () => {
    const customerName = "Customer DCL 01";
    const DCLType = "Credit limit and payment terms breach";

      KamRequestCreditPage.openDCLDrawer(customerName)
    KamRequestCreditPage.clickDCLTypeDD()
      .selectDCLType(DCLType)
      .clickCancelButton()
      .verifycustomerpageLabel("Customers");
  });

    it.skip('Verify for Prospect , Dormant and Deactivated customer , DCL cannot be raised', () => {
        const customerNames = ['Customer DCL 08', 'Customer DCL 09', 'Customer DCL 10', 'Customer DCL 11'];
        const customerTypes = [constants.CUSTOMERTYPE.PROSPECT, constants.CUSTOMERTYPE.SUSPENDED, constants.CUSTOMERTYPE.DORMANT, constants.CUSTOMERTYPE.DEACTIVATED];
        const DCLType = "Payment terms breach";

        customerNames.forEach((customerName, index) => {
            const customerType = customerTypes[index];
            cy.LoginKAM(data.userDCL01, data.password);
            KamRequestCreditPage.openDCLDrawer(customerName, customerType)
            KamRequestCreditPage.createDCLRequest(DCLType);
            cy.verifyToastMessage(MESSAGES.USER_INACTIVE_MESSAGE);
            KamRequestCreditPage.clickCancelButton();
            cy.LogoutKAM();
        });
    });

    it('Verify DCL request sent for Manager approval screen', () => {
        const customerName = 'Customer DCL 01';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName)// Opens up the DCL form
        KamRequestCreditPage.createDCLRequest(DCLType);// Create the DCL
        KamRequestCreditPage.verifySuccessMessage()// verify the success message
        cy.LogoutKAM();
    });
    it('Verify on clicking on Okay button in DCL request sent screen redirects to My requests page', () => {
        const customerName = 'Customer DCL 01';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName)// Opens up the DCL form
        KamRequestCreditPage.createDCLRequest(DCLType);// Create the DCL
        KamRequestCreditPage.verifySuccessMessage()// verify the success message
            .clickOkay()
            .verifyMyrequestTab()//verify myrequest tab open after creation of DCL
        cy.LogoutKAM();
    });
    it.skip('Verify under my approval page of Manager login', () => {
        const customerName = 'Customer DCL 01';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName)
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.verifySuccessMessage()
            .clickOkay()
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL02, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab()
        KamDCLApproval.getTempLimitBoostersCount().then((DCLRequestCount) => {
            KamDCLApproval.verifyApprovalRecordExist(customerName, DCLRequestCount);// verfity DCL request available for manager
        });

  });
  it.skip('Verify click on more details in my requests page', () => {
    const customerName = 'Customer DCL 01';
    const DCLType = "Payment terms breach";
    const KAMName = 'User DCL 01'
    const remarks = 'test'
    KamRequestCreditPage.openDCLDrawer(customerName)
    KamRequestCreditPage.createDCLRequest(DCLType)
    KamRequestCreditPage.verifySuccessMessage()
      .clickOkay()
    cy.LogoutKAM();
    cy.LoginKAM(data.userDCL02, data.password);
    KamHomePage.clickUserProfileIcon()
      .clickMyApprovalTab()
    KamDCLApproval.getTempLimitBoostersCount().then((DCLRequestCount) => {
      KamDCLApproval.clickMoreDetails(DCLRequestCount)
        .verifyRequestedByuserName(DCLRequestCount, KAMName)// verfiy DCL requester name
        .verifyRequesterRemarks(DCLRequestCount, remarks)//verify the Remark 
        .verifyTempLimitboosterType(DCLRequestCount)//verify DCL type 
    });
  });
  it.skip('Verify Click on less details in my requests page', () => {
    const customerName = 'Customer DCL 01';
    const DCLType = "Payment terms breach";
    const KAMName = 'User DCL 01'
    const remarks = 'test'
    KamRequestCreditPage.openDCLDrawer(customerName)
    KamRequestCreditPage.createDCLRequest(DCLType)
    KamRequestCreditPage.verifySuccessMessage()
      .clickOkay()
    cy.LogoutKAM();
    cy.LoginKAM(data.userDCL02, data.password);
    KamHomePage.clickUserProfileIcon()
      .clickMyApprovalTab()
    KamDCLApproval.getTempLimitBoostersCount().then((DCLRequestCount) => {
      KamDCLApproval.clickMoreDetails(DCLRequestCount)
        .verifyRequestedByuserName(DCLRequestCount, KAMName)
        .verifyRequesterRemarks(DCLRequestCount, remarks)
        .verifyTempLimitboosterType(DCLRequestCount)
        .clickLessDetails(DCLRequestCount)//verify DCl info section got collased upon clicking it 
        .verifyRequestedByuserNameNotExist(DCLRequestCount)

    });
  });
});
