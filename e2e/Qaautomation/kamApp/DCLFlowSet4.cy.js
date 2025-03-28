import KamRequestCreditPage from "../../../components/pages/KamRequestCreditPage";
import KamHomePage from "../../../components/pages/KamHomePage";
import KamDCLApproval from "../../../components/pages/KamDCLApproval";
import KamMyRequestPage from "../../../components/pages/KamMyRequestPage";




describe('DCL Flows set 4', function () {
    let data;

    before(function () {
        // Load user data from the fixture
        cy.fixture("kamLoginPage").then(function (userdata) {
            data = userdata;
        });
    });
    beforeEach(() => {
        switch (Cypress.currentTest.title) {
            case 'Verify DCL request is moved to Approved/ Rejected tab in KAM app post credit head rejection':
                cy.LoginKAM(data.userDCL03, data.password);
                break
            case 'Verify DCL given count should be increased post success DCL approval by credit head':
                cy.LoginKAM(data.userDCL03, data.password);
                break
            case 'Verify Available credit limit is increased as per the requsted DCL post successfull approval':
                cy.LoginKAM(data.userDCL03, data.password);
                break
            case 'Verify DCL valid till is updated as per the requested DCL post succesfull approval':
                cy.LoginKAM(data.userDCL03, data.password);
                break
            case 'Verify KAM raises DCL request for customer with already a DCL live, then the live DCL will get expired':
                cy.LoginKAM(data.userDCL03, data.password);
                break
            default:
                // Login as userDCL01 before each test
                cy.LoginKAM(data.userDCL01, data.password);
                break;
        }
    });
    it('Verify DCL request is moved to Approved/ Rejected tab in KAM app post credit head rejection', () => {
        const customerName = 'Customer DCL 04';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL04, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab();
        KamDCLApproval.clickRejectButton()
            .clickReasonDropdown(0)
            .selectReason()
            .enterRemarks('Rejected by Manager')
            .clickConfirmRejectButton()
            .clickOkay()
            .clickApproveOrRejectTab()
            .verifyRejectedCustomername(customerName)
            .verifyRejectedsLabel()
    });

    it('Verify DCL given count should be increased post success DCL approval by credit head', () => {
        const customerName = 'Customer DCL 13';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL04, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab()
        KamDCLApproval.clickApproveButton()
            .clickReasonDropdown(2)
            .selectReason()
            .enterRemarks('Approved by Credit Head')
            .clickConfirmApproveButton()
            .clickOkay()
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL03, data.password);
        KamRequestCreditPage.navigateToCustomer(customerName)
        KamRequestCreditPage.verifyApprovedDCLCount('#1')

    });

    it('Verify Available credit limit is increased as per the requsted DCL post successfull approval', () => {
        const customerName = 'Customer DCL 04';
        const DCLType = "Credit limit and payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL04, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab()
        KamDCLApproval.clickApproveButton()
            .clickReasonDropdown(2)
            .selectReason()
            .enterRemarks('Approved by Credit Head')
            .clickConfirmApproveButton()
            .clickOkay()
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL03, data.password);
        KamRequestCreditPage.navigateToCustomerDetails(customerName)
        KamRequestCreditPage.verifyRevisedCreditValue('₹5,01,000.00')

    });
    it('Verify DCL valid till is updated as per the requested DCL post succesfull approval', () => {
        const customerName = 'Customer DCL 04';
        const DCLType = "Credit limit and payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL04, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab()
        KamDCLApproval.clickApproveButton()
            .clickReasonDropdown(2)
            .selectReason()
            .enterRemarks('Approved by Credit Head')
            .clickConfirmApproveButton()
            .clickOkay()
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL03, data.password);
        KamRequestCreditPage.navigateToCustomerDetails(customerName)
        KamRequestCreditPage.verifyDCLvalidtydate();
    });
    it('Verify KAM raises DCL request for customer with already a DCL live, then the live DCL will get expired', () => {
        const customerName = 'Customer DCL 04';
        const DCLType = ['Credit limit and payment terms breach', 'Payment terms breach'];
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType[0]);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL04, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab()
        KamDCLApproval.clickApproveButton()
            .clickReasonDropdown(2)
            .selectReason()
            .enterRemarks('Approved by Credit Head')
            .clickConfirmApproveButton()
            .clickOkay()
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL03, data.password);
        KamRequestCreditPage.navigateToCustomerDetails(customerName)
        KamRequestCreditPage.verifyRevisedCreditValue('₹5,01,000.00')
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL03, data.password);
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType[1]);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL04, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab()
        KamDCLApproval.clickApproveButton()
            .verifyApprovalExpiryMessage()
            .clickReasonDropdown(2)
            .selectReason()
            .enterRemarks('Approved by Credit Head')
            .clickConfirmApproveButton()
            .clickOkay()
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL03, data.password);
        KamRequestCreditPage.navigateToCustomerDetails(customerName)
        KamRequestCreditPage.verifyRevisedCreditValue('₹5,00,000.00')

    });
})


