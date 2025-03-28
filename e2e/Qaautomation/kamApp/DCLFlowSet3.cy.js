import KamRequestCreditPage from "../../../components/pages/KamRequestCreditPage";
import KamHomePage from "../../../components/pages/KamHomePage";
import KamDCLApproval from "../../../components/pages/KamDCLApproval";
import KamMyRequestPage from "../../../components/pages/KamMyRequestPage";




describe('DCL Flows set 3', function () {
    let data;

    before(function () {
        // Load user data from the fixture
        cy.fixture("kamLoginPage").then(function (userdata) {
            data = userdata;
        });
    });
    beforeEach(() => {
        switch (Cypress.currentTest.title) {
            case 'Verify DCL request should be listed with pending credit head approval tag in my requests page':
                cy.LoginKAM(data.userDCL03, data.password);
                break;

            case 'Verify DCL validity in approve DCL popup is a mandatory field':
                cy.LoginKAM(data.userDCL03, data.password);
                break;
            case 'Verify Reason in approve DCL popup is a mandatory field':
                cy.LoginKAM(data.userDCL03, data.password);
                break
            case 'Verify Remarks in approve DCL popup is a mandatory field':
                cy.LoginKAM(data.userDCL03, data.password);
                break
            case 'Verify Approving the request as credit head in KAM app':
                cy.LoginKAM(data.userDCL03, data.password);
                break
            default:
                // Login as userDCL01 before each test
                cy.LoginKAM(data.userDCL01, data.password);
                break;
        }
    });
    it('Verify Approving DCL request as Manager in KAM app', () => {
        const customerName = 'Customer DCL 01';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay()
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL02, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab()
        KamDCLApproval.clickApproveButton()
            .enterRemarks('Approved by Manager')
            .clickConfirmApproveButton()
            .verifySuccessMessageOnMyApprovalPage()

    });
    it('Verify Rejecting DCL request as Manager in KAM app', () => {
        const customerName = 'Customer DCL 01';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL02, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab();
        KamDCLApproval.clickRejectButton()
            .clickReasonDropdown(0)
            .selectReason()
            .enterRemarks('Rejected by Manager')
            .clickConfirmRejectButton()
            .verifyRejectionMessage()

    });

    it('Verify Rejected request is moved to Approved/ Rejected tab in KAM app', () => {
        const customerName = 'Customer DCL 12';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL02, data.password);
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
    it('Verify clicking on okay button in DCL request sent screen should redirect to my requests screen', () => {
        const customerName = 'Customer DCL 01';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay()
            .verifyMyrequestTab();
    });
    it('Verify DCL request should be listed with pending credit head approval tag in my requests page', () => {
        const customerName = 'Customer DCL 04';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay();
        KamMyRequestPage.expandTempLimitSection()
            .verifyCreditHeadlabel();
    });
    it('Verify DCL validity in approve DCL popup is a mandatory field', () => {
        const customerName = 'Customer DCL 04';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL04, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab();
        KamDCLApproval.clickApproveButton()
            .clickvalidtyField()
            .clearValidatyField()
            .clickConfirmApproveButton()
            .verifyValidityMandatoryFieldError();
    });
    it('Verify Reason in approve DCL popup is a mandatory field', () => {
        const customerName = 'Customer DCL 04';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL04, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab();
        KamDCLApproval.clickApproveButton()
            .clickConfirmApproveButton()
            .verifyReasonMandatoryFieldError()
    });
    it('Verify Remarks in approve DCL popup is a mandatory field', () => {
        const customerName = 'Customer DCL 04';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL04, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab();
        KamDCLApproval.clickApproveButton()
            .clickConfirmApproveButton()
            .verifyRemarkMandatoryFieldError()
    });
    it('Verify Approving the request as credit head in KAM app', () => {
        const customerName = 'Customer DCL 04';
        const DCLType = "Payment terms breach";
        KamRequestCreditPage.openDCLDrawer(customerName);
        KamRequestCreditPage.createDCLRequest(DCLType);
        KamRequestCreditPage.clickOkay();
        cy.LogoutKAM();
        cy.LoginKAM(data.userDCL04, data.password);
        KamHomePage.clickUserProfileIcon()
            .clickMyApprovalTab();
        KamDCLApproval.clickApproveButton()
            .clickReasonDropdown(2)
            .selectReason()
            .enterRemarks('Approved by Credit Head')
            .clickConfirmApproveButton()
            .verifySuccessMessageCreditHeadApproval()
            .clickOkay()
            .clickApproveOrRejectTab()
            .verifyRejectedCustomername(customerName)
            .verifyApprovedLabel()
    });


})
