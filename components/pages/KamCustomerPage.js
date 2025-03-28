import UsefulFunctionsUtils from "../../Utility/usefulFunctionsUtils";
import {ATTACHMENTS} from "../../constants/attachments";
import DateTimeUtils from "../../Utility/dateTimeUtils";

class KamCustomerPage {
    elements = {
        customer: (customerName) => cy.get(`[data-cy^="kam.customer.${customerName}-name-text"]`),
        dclGivenCount: () => cy.get('[data-cy="kam.customers.customer-health-dcl-count"]'),
        dclGivenAmount: () => cy.get('[data-cy="kam.customers.customer-health-dcl-amount"]'),
        creditDetails: () => cy.get('[data-cy="kam.customers.quick-action-CREDIT_DETAILS"]'),
        requestCredit: () => cy.get('[data-cy="kam.customer.credit-details-summary-request-credit-button"]'),
        extendDCLDrawer: () => cy.get('[data-cy="drawer-title"]'),
        dclTypeDD: () => cy.get('div[id="dcl_type"]'),
        dclTypesList: () => cy.get("ul[aria-labelledby='dcl_type'] li"),
        dclValidityDD: () => cy.get('div[id="requested_till"]'),
        dclValidityList: () => cy.get("ul[aria-labelledby='requested_till'] li"),
        noneInDD: () => cy.get("ul li").contains('None'),
        searchField: () => cy.get("div[data-cy='btr.app.searchInput']"),
        initiateCollectionButton: () => cy.get("button[data-cy='kam.customers.initiate-collection-button']"),
        outstandingAmount: () => cy.get("p[data-cy='kam.customers.customer-outstanding-amount-value']"),
        customerCardContent: () => cy.get("div[data-cy='kam.customer.customer-card-content']"),
        regularTab: () => cy.get("div[data-cy='kam.customers.regular_customers-tab']"),
        prospectTab: () => cy.get("div[data-cy='kam.customers.prospect_customers-tab']"),
        customerFilter: () => cy.get("div[data-cy='kam.customer.customer-filter']"),
        customerGroupRadioButtons: () => cy.get("div[data-cy='kam.customer.customer-group-radio-buttons']"),
        customerFilterSaveButton: () => cy.get("button[data-cy='kam.customer.customer-filter-save-button']"),
        horizontalTabs: () => cy.get("div[data-cy='kam.customer.horizontal-tabs-container']"),
        customerNameOnCustomerCard: (customerName) => cy.get(`p[data-cy='kam.customer.${customerName}-name-text']`),
        lastOrderDateText: (customerName) => cy.get(`p[data-cy='kam.customer.${customerName}-last-order-date-text']`),
        lastOrderDateValue: (customerName) => cy.get(`p[data-cy='kam.customer.${customerName}-last-order-date-value']`),
        overdueText: (customerName) => cy.get(`p[data-cy='kam.customer.${customerName}-overdue-text']`),
        overdueValue: (customerName) => cy.get(`p[data-cy='kam.customer.${customerName}-overdue-value']`),
        viewDetailsLink: (customerName) => cy.get(`a[data-cy='kam.customer.${customerName}-view-details-link']`),
        profileIconCustomerCard: (customerName) => cy.get(`img[data-cy='kam.customer.${customerName}-icon']`),
        horizontalTabsContainer: () => cy.get("div[data-cy*='kam.customers.tab-container--']"),
        newCustomerButton: () => cy.get("button[data-cy='kam.customer.new-customer-btn']"),
        customerShopNameTextField: () => cy.get("div[data-cy='kam.customer.basic-details.customer-name-input']"),
        pocNameTextField: () => cy.get("div[data-cy='kam.customer.basic-details.poc-name-input']"),
        businessTypeField: () => cy.get("div[data-cy='kam.customer.basic-details-form.subsidiaryTypeSelect']"),
        mobileNumberField: () => cy.get("div[data-cy='kam.customer.basic-details.mobile-number-input']"),
        additionalPhoneNumber: () => cy.get("div[data-cy='kam.customer.basic-details-form.additional-phone-input']"),
        paymentModeDropDown: () => cy.get("div[data-cy='kam.customer.basic-details-form.paymentModeSelect']"),
        listBox: () => cy.get("ul[role='listbox']"),
        customerTypeDropDown: () => cy.get("div[data-cy='kam.customer.basic-details-form.customerTypeSelect']"),
        customerTypeListBox: () => cy.get("#customer_type-listbox"),
        languageDropDown: () => cy.get("div[data-cy='kam.customer.basic-details-form.languageSelect']"),
        languageListBox: () => cy.get("#language-listbox"),
        ownershipTypeDropDown: () => cy.get("div[data-cy='kam.customer.basic-details-form.ownershipTypeSelect']"),
        imageUploadButton: () => cy.get("span[data-cy='kam.deposit.drawer.uploadImageButton']"),
        marketDropDown: () => cy.get("div[data-cy='kam.customer.basic-details-form.marketSelect']"),
        preferredTimeField: () => cy.get("div[data-cy='kam.customer.basic-details-form.tvr-preferred-time-input']"),
        proceedButton: () => cy.get("button[data-cy='kam.customer.new-customer-modal.proceed-btn']"),
        productDealtField: () => cy.get("div[data-cy='kam.customer.profiling.products-input']"),
        peakNumberTrucks: () => cy.get("[data-cy^='kam.customer.products.'][data-cy$='.number-of-trucks-input']"),
        averageVolume: () => cy.get("[data-cy^='kam.customer.products.'][data-cy$='.avg_volume_input']"),
        expectedPackaging: () => cy.get("[data-cy^='kam.customer.products.'][data-cy$='.exp_pack_input']"),
        expectedGradeMix: () => cy.get("[data-cy^='kam.customer.products.'][data-cy$='.exp_grade_input']"),
        remarksField: () => cy.get("[data-cy^='kam.customer.products.'][data-cy$='.remark-input']"),
        addressTypeDropDown: () => cy.get("[data-cy^='kam.customer.address-form.'][data-cy$='.address-type-input']"),
        coordinateIcon: () => cy.get("[data-testid='MyLocationIcon']"),
        houseNumber: () => cy.get("div[data-cy^='kam.customer.address-form.'][data-cy$='.house_no-input']"),
        streetAddress: () => cy.get("div[data-cy^='kam.customer.address-form.'][data-cy$='.street-input']"),
        country: () => cy.get("div[data-cy^='kam.customer.address-form.'][data-cy$='.country']"),
        city: () => cy.get("div[data-cy^='kam.customer.address_form.'][data-cy$='.city-input']"),
        state: () => cy.get("div[data-cy^='kam.customer.address-form.'][data-cy$='.state-input']"),
        district: () => cy.get("div[data-cy^='kam.customer.address_form.'][data-cy$='.district_input']"),
        pincode: () => cy.get("div[data-cy^='kam.customer.address_form.'][data-cy$='.pincode_input']"),
        cluster: () => cy.get("div[data-cy^='kam.customer.address-form.'][data-cy$='.cluster-input']"),
        addMoreButton: () => cy.get("button[data-cy='kam.customer.address-form.add-more']"),
        individualKycDropDown: () => cy.get("div[data-cy='kam.customers.kyc-details.individual_documents-card-add-document-select']"),
        businessKycDropdown: () => cy.get("div[data-cy='kam.customers.kyc-details.business_documents-card-add-document-select']"),
        addButton: () => cy.get("button[data-cy='kam.customers.kyc-details.card-title-add-button']"),
        individualDocumentCardAddButton: () => cy.get("button[data-cy='kam.customers.kyc-details.individual_documents-card-add-button']"),
        documentNumberField: () => cy.get("div[data-cy^='kam.customers.kyc-details.individual_documents-card-'][data-cy$='-document-number']"),
        businessDocumentNumberField: () => cy.get("div[data-cy^='kam.customers.kyc-details.business_documents-card-'][data-cy$='-document-number']"),
        saveAsDraftButton: () => cy.get("button[data-cy='kam.customer.new-customer-modal.save-draft-btn']"),
        saveButton: () => cy.get("button[data-cy='kam.customer.new-customer-modal.save-draft-drawer-save-btn']"),
        customerNameOnCard: () => cy.get("p[data-cy^='kam.customer.'][data-cy$='-name-text']"),
        customerOnboardingStatus: () => cy.get("p[data-cy='kam.customer.onboarding-status-card-title']"),
        initiateOnboardingButton: () => cy.get("button[data-cy='kam.customer.onboarding-status-card-initiate-button']"),
        saveAsDraftPopup: () => cy.get("div[data-cy='kam.customer.new-customer-modal.save-draft-drawer-content']"),
        saveAsDraftDrawerTitle: () => cy.get("p[data-cy='kam.customer.new-customer-modal.save-draft-drawer-title']"),
        saveAsDraftDrawerSubTitle: () => cy.get("p[data-cy='kam.customer.new-customer-modal.save-draft-drawer-subtitle']"),
        saveAsDraftDrawerCancelButton: () => cy.get("button[data-cy='kam.customer.new-customer-modal.save-draft-drawer-cancel-btn']"),
        customerFilterCancelButton: () => cy.get("button[data-cy='kam.customer.customer-filter-cancel-button']"),
        customerDetailPageTabs: () => cy.get("button[data-cy^='component.tabs.tab']"),
        addressTitleCard: () => cy.get("div[data-cy='kam.customer.more-data.accordion-addresses_data.summary']"),
        basicDetailsEditIcon: () => cy.get("img[data-cy='kam.customer.more-data.accordion-basic_data.edit-icon']"),
        productsEditIcon: () => cy.get("img[data-cy='kam.customer.more-data.accordion-products_data.edit-icon']"),
        billingAddressEditIcon: () => cy.get("img[data-cy^='kam.customer.profile.address-card-'][data-cy$='.edit-icon']"),
        addAddressButton: () => cy.get("button[data-cy='kam.customer.profile.addresses.add-more-btn']"),
        kycDetailsCard: () => cy.get("img[data-cy='kam.customers.quick-action-KYC_DETAILS-next']"),
        kycHeaderButtons: () => cy.get("button[data-cy='kam.customer.kyc.header.action']"),
        drawerTitle: () => cy.get("p[data-cy='drawer-title']"),
        drawerSaveButton: () => cy.get("button[data-cy='kam.customer.kyc.addNewDoc.finishButton']"),
        drawerCancelButton: () => cy.get("button[data-cy='kam.customer.kyc.addNewDoc.cancelButton']"),
        bankDetailsCard: () => cy.get("img[data-cy='kam.customers.quick-action-BANK_DETAILS-next']"),
        addNewBankButton: () => cy.get("button[data-cy='kam.customers.bank-details.add-new-bank-button']"),
        emptyData: () => cy.get("h5[data-cy='component.nodata.text']"),
        financialDocumentsCard: () => cy.get("img[data-cy='kam.customers.quick-action-FINANCIAL_DOCUMENTS-next']"),
        addFinancialDocumentsButton: () => cy.get("button[data-cy='kam.landing.depositNow']"),
        signedLedgerCard: () => cy.get("img[data-cy='kam.customers.quick-action-SIGNED_LEDGERS-next']"),
        addLedgerButton: () => cy.get("button[data-cy='kam.customer.kyc.signedLedger.action']"),
        kycVoterIdCardTile: () => cy.get("div[data-cy='kam.customer.kyc.kycDoc.card-Voter ID']"),
        kycAadhaarCardTile: () => cy.get("div[data-cy='kam.customer.kyc.kycDoc.card-Aadhaar']"),
        kycPanCardTile: () => cy.get("div[data-cy='kam.customer.kyc.kycDoc.card-PAN']"),
        kycFssaiLicenseTile: () => cy.get("div[data-cy='kam.customer.kyc.kycDoc.card-FSSAI License']"),
        kycDocumentTypeRadioButtons: () => cy.get("div[data-cy='kam.customer.kyc.addNewDoc.documentType']"),
        kycDocumentNameDropdown: () => cy.get("div[data-cy='kam.customer.kyc.addNewDoc.documentName']"),
        kycDocumentNumberInput: () => cy.get("div[data-cy='kam.customer.kyc.addNewDoc.documentNumber']"),
        showMoreDocuments: () => cy.get("button[data-cy='kam.customer.kyc.showMoreData']"),
        viewDocumentModal: () => cy.get("div[data-cy='custom-modal-paper']"),
        viewDocumentModalTitle: () => cy.get("h2[data-cy='custom-modal-title']"),
        closeIconInViewDocumentModal: () => cy.get("[data-cy='custom-modal-close-icon']"),
        kycViewButton: () => cy.get("button[data-cy='kam.customer.kyc.kycDoc.card.view']"),
        openedImage: () => cy.get("img[data-cy='kam.imageViewer.image']"),
        kycBusinessPanCardTile: () => cy.get("div[data-cy='kam.customer.kyc.kycDoc.card-Business PAN']"),
        kycDeleteIcon: () => cy.get("img[data-cy='kam.customer.kyc.kycDoc.deleteIcon']"),
        deleteConfirmationButton: () => cy.get("button[data-cy='kam.customer.kyc.kycDoc.deleteDrawer.deleteButton']"),
        physicalVerificationTile: () => cy.get("div[data-cy='kam.customer.kyc.physicalVerification.card']"),
        seeMoreSeeLessButton: () => cy.get("span[data-cy='expandable-text-toggle']"),
        bankAccountNumberInputField: () => cy.get("div[data-cy='kam.customers.bank-details.account-number-input']"),
        confirmBankAccountNumberInputField: () => cy.get("div[data-cy='kam.customers.bank-details.confirm-account-number-input']"),
        ifscCodeInputField: () => cy.get("div[data-cy='kam.customers.bank-details.ifsc-code-input']"),
        bankNameInputFilled: () => cy.get("div[data-cy='kam.customers.bank-details.bank-name-input']"),
        branchNameInputFilled: () => cy.get("div[data-cy='kam.customers.bank-details.branch-name-input']"),
        bankDetailsTileHeader: () => cy.get("div[data-cy^='kam.customers.bank-details.bank-detail-card-'][data-cy$='-header']"),
        bankNameAndAccountNumber: () => cy.get("p[data-cy^='kam.customers.bank-details.bank-detail-card-'][data-cy$='-header-title']"),
        bankDetailsViewButton: () => cy.get("span[data-cy^='kam.customers.bank-details.bank-detail-card-'][data-cy$='-header-view']"),
        bankAccountStatus: () => cy.get("div[data-cy='kam.customer.document.status']"),
        bankDetailsDeleteIcon: () => cy.get("img[data-cy^='kam.customers.bank-details.bank-detail-card-'][data-cy$='header-delete-icon']"),
        financialDocumentTypeDropdown: () => cy.get("div[data-cy='kam.customer.kyc.addNewFinancialDoc.documentType']"),
        financialYearDropdown: () => cy.get("div[data-cy='kam.customer.kyc.addNewFinancialDoc.financialYear']"),
        saveButtonFinancialDocument: () => cy.get("button[data-cy='kam.customer.kyc.addNewFinancialDoc.finishButton']"),
        financialDocumentTile: () => cy.get("div[data-cy='kam.customer.kyc.documentCard']"),
        financialDocumentType: () => cy.get("span[data-cy='kam.customer.kyc.documentCard.documentType']"),
        financialYear: () => cy.get("span[data-cy='kam.customer.kyc.documentCard.period']"),
        financialDocumentCardViewButton: () => cy.get("span[data-cy='kam.customer.kyc.documentCard.view-btn']"),
        financialDocumentDeleteIcon: () => cy.get("img[data-cy='kam.customer.kyc.documentCard.delete-icon']"),
        customerBank: () => cy.get("div[data-cy='kam.customer.kyc.addNewFinancialDoc.bank']"),
        financialDocRemarks: () => cy.get("div[data-cy='kam.customer.kyc.addNewFinancialDoc.remarks']"),
        bankStatementPeriod: () => cy.get("span[data-cy='kam.customer.kyc.documentCard.period']"),
        chequeType: () => cy.get("div[data-cy='kam.customer.kyc.addNewFinancialDoc.chequeType']"),
        chequeNumberField: () => cy.get("div[data-cy='kam.customer.kyc.addNewFinancialDoc.chequeNumber']"),
        chequeAmount: () => cy.get("div[data-cy='kam.customer.kyc.addNewFinancialDoc.amount']"),
        signedLedgersCard: () => cy.get("img[data-cy='kam.customers.quick-action-SIGNED_LEDGERS-next']"),
        ledgerOutstanding: () => cy.get("div[data-cy='kam.customer.kyc.addNewSignedLedger.outstanding']"),
        signedLedgerRemarks: () => cy.get("div[data-cy='kam.customer.kyc.addNewSignedLedger.remarks']"),
        signedLedgerSaveButton: () => cy.get("button[data-cy='kam.customer.kyc.addNewSignedLedger.finishButton']"),
        signedLedgerTile: () => cy.get("div[data-cy='kam.customer.kyc.signedLedger.card']"),
        activitiesCard: () => cy.get("img[data-cy='kam.customers.quick-action-ACTIVITIES-next']"),
        checkInCustomerNameInput: () => cy.get("div[data-cy='kam.customers.check-in.drawer.form.customer-input']"),
        purposeOfVisit: () => cy.get("div[data-cy='kam.customers.check-in.drawer.form.purpose-checkbox-input']"),
        checkInLocation: () => cy.get("[data-cy='kam.customers.check-in.drawer.form.location-accordion-summary']"),
        recordEntryButton: () => cy.get("button[data-cy='kam.customers.check-in.finishBtn']"),
        locationFetch: () => cy.get("h6[data-cy='kam.customers.check-in.drawer.preview-header-title-text']"),
        checkInActivityTile: () => cy.get("div[data-cy^='kam.customers.activity.activity-card-'][data-cy$='-header']"),
        checkInActivityCardCustomerName: () => cy.get("span[data-cy^='kam.customers.activity.activity-card-'][data-cy$='-header-customer-name']"),
        checkInActivityCardDialIcon: () => cy.get("a[data-cy^='kam.customers.activity.activity-card-'][data-cy$='-header-customer-phone']"),
        checkInActivityCardPurpose: () => cy.get("p[data-cy^='kam.customers.activity.activity-card-'][data-cy$='-content-purpose-value']"),
        checkInActivityCardDueDate: () => cy.get("span[data-cy^='kam.customers.activity.activity-card-'][data-cy$='-content-due-date-value']"),
        checkInActivityCompletedAt: () => cy.get("span[data-cy^='kam.customers.activity.activity-card-'][data-cy$='-content-completed-at-value']"),
        basicDetailsTile: () => cy.get("div[data-cy='kam.customer.more-data.accordion-basic_data.summary']"),
        customerBusinessType: () => cy.get("p[data-cy='kam.customer.profile.business-type-value']"),
        customerPaymentMode: () => cy.get("p[data-cy='kam.customer.profile.payment-mode-value']"),
        customerLanguage: () => cy.get("p[data-cy='kam.customer.profile.language-value']"),
        customerOwnershipType: () => cy.get("p[data-cy='kam.customer.profile.ownership-type-value']"),
        customerCompanyType: () => cy.get("p[data-cy='kam.customer.profile.company-type-value']"),
        customerBillingAddress: () => cy.get("span[data-cy^='kam.customer.profile.address-card-'][data-cy$='.full-address']"),
        customerNewAddressDropdown: () => cy.get("div[data-cy='kam.customer.profile.address-form.address-type']"),
        billingAddressType: () => cy.get("li[data-cy='-dropdown-text-Billing/Shipping']"),
        newAddressGpsIcon: () => cy.get("[data-cy='kam.customer.address-form.gps-icon']"),
        customerNewAddressCoordinatesExpandIcon: () => cy.get("[data-cy='kam.customer.profile.address-form.coordinates-expand-icon']"),
        customerNewAddressLatitude: () => cy.get("div[data-cy='kam.customer.address-form.latitude-input']"),
        customerNewAddressLongitude: () => cy.get("[data-cy='kam.customer.address-form.longitude-input']"),
        customerNewAddressBuildingNumber: () => cy.get("div[data-cy='kam.customer.profile.address-form.building-no-input']"),
        customerNewAddressStreet: () => cy.get("div[data-cy='kam.customer.profile.address-form.street-input']"),
        customerNewAddressCountryDropdown: () => cy.get("div[data-cy='kam.customer.profile.address-form.country-input']"),
        customerNewAddressCountryIndia: () => cy.get("div[data-cy='option-India']"),
        customerNewAddressCity: () => cy.get("div[data-cy='kam.customer.profile.address-form.city-input']"),
        customerNewAddressStateDropdown: () => cy.get("div[data-cy='kam.customer.profile.address-form.state-input']"),
        customerNewAddressStateTamilNadu: () => cy.get("li[data-cy='-dropdown-text-Tamil Nadu']"),
        customerNewAddressDistrictDropdown: () => cy.get("div[data-cy='kam.customer.profile.address-form.district-input']"),
        customerNewAddressDistrictChennai: () => cy.get("li[data-cy='-dropdown-text-Chennai']"),
        customerNewAddressPincode: () => cy.get("div[data-cy='kam.customer.profile.address-form.zipcode-input']"),
        customerNewAddressCluster: () => cy.get("div[data-cy='kam.customer.profile.address-form.cluster-input']"),
        customerNewAddressSaveButton: () => cy.get("button[data-cy='kam.customer.profile.address-form-footer-save-btn']"),
        customerBasicDetailsLanguageValue: () => cy.get("[data-cy='kam.customer.profile.language-value']"),
        customerBasicDetailsVisitingCardPhotos: () => cy.get("[data-cy='kam.customer.profile.visiting-card-photos']"),
        customerBasicDetailsLanguageDropdown: () => cy.get("[data-cy='kam.customer.profile.basic-form.language-input']"),
        customerBasicDetailsTamilLanguage: () => cy.get("[data-cy='-dropdown-text-ta']"),
        customerBasicDetailsSaveButton: () => cy.get("[data-cy='kam.customer.profile.basic-form.footer-save-btn']"),
        customerBasicDetailsVisitingPhotoValue: () => cy.get("[data-cy='kam.customer.profile.visiting-card-photos-imgthumb']"),
        productTitleCard: () => cy.get('[data-cy="kam.customer.more-data.accordion-products_data.summary"]'),
        avgTruckValue: () => cy.get('[data-cy$=".avg-truck-value"]'),
        avgVolumeValue: () => cy.get('[data-cy$=".avg-volume-value"]'),
        expGradeValue: () => cy.get('[data-cy$=".exp-grade-value"]'),
        expPackagingValue: () => cy.get('[data-cy$=".exp-packaging-value"]'),
        customerProductCategory: () => cy.get("[data-cy^='kam.customer.profile.product-card-'][data-cy$='.productName']"),
        productInputCloseIcon: () => cy.get("[data-cy='kam.customer.profile.products-form.selectedProducts-input']"),
        productKinnow: () => cy.get("div[data-cy='option-Kinnow']"),
        numberOfTrucksInput: () => cy.get('[data-cy="kam.customer.profile.products-form.0.number-of-trucks-input"] input'),
        avgVolumeInput: () => cy.get('[data-cy="kam.customer.profile.products-form.0.avg-volume-input"] input'),
        expectedPackagingInput: () => cy.get('[data-cy="kam.customer.profile.products-form.0.expected-packaging-input"] input'),
        expGradeInput: () => cy.get('[data-cy="kam.customer.profile.products-form.0.exp-grade-input"] input'),
        remarkTextarea: () => cy.get('[data-cy="kam.customer.profile.products-form.0.remark-wrapper-input"] textarea'),
        productSaveButton: () => cy.get('[data-cy="kam.customer.profile.products-form.footer-save-btn"]'),
        bankGuaranteeDocumentNumber: () => cy.get("div[data-cy='kam.customer.kyc.addNewFinancialDoc.docNumber']"),
        addFinancialDocumentFloatingButton: () => cy.get("button[data-cy='kam.customer.kyc.financialDocs.list.addFinancialDocs']")
    }

    clickCustomerCard(customerName) {
        this.elements.customer(customerName).click();
        return this;
    }

    searchCustomer(customerName) {
        this.elements.searchField().find('input').clear().type(customerName);
        cy.wait(5000);
        return this;
    }

    clickInitiateCollectionButton() {
        this.elements.initiateCollectionButton().click();
        return this;
    }

    fetchOutstandingAmount() {
        return this.elements.outstandingAmount().invoke('text').then((amount) => {
            return UsefulFunctionsUtils.cleanFormattedAmount(amount);
        });
    }

    verifyDCLGivenCount(count) {
        this.elements.dclGivenCount().should('have.text', '#' + count);
        return this;
    }

    verifyDCLGivenAmount(amount) {
        this.elements.dclGivenAmount().should('have.text', '₹' + amount);
        return this;
    }

    clickCreditDetails() {
        this.elements.creditDetails().click();
        return this;
    }

    clickRequestCredit() {
        this.elements.requestCredit().click();
        return this;
    }

    verifyExtendDCLDrawerTitle(title) {
        this.elements.extendDCLDrawer().should('have.text', title);
        return this;
    }

    clickDCLTypeDD() {
        this.elements.dclTypeDD().click({force: true});
        return this;
    }

    verifyListOfDCLTypes(expectedDCLTypes) {
        //Here the 'None' is not an actual DCL type, Added here for the purpose of assertion
        this.elements.dclTypesList().each(($ele, index, $list) => {
            // Get the text of the current element
            const actualMethod = $ele.text().trim();

            expect(actualMethod).to.equal(expectedDCLTypes[index]);
        });
        return this;
    }

    clickDCLValidityDD() {
        this.elements.dclValidityDD().click({force: true});
        return this;
    }

    verifyListofDCLValidity(expectedDCLValidity) {
        //Here the 'None' is not an actual DCL validity, Added here for the purpose of assertion
        this.elements.dclValidityList().each(($ele, index, $list) => {
            // Get the text of the current element
            const actualelements = $ele.text().trim();

            expect(actualelements).to.equal(expectedDCLValidity[index]);
        });
        return this;
    }

    clickNone() {
        this.elements.noneInDD().click();
        return this;
    }

    getCustomerCardCount() {
        return this.elements.customerCardContent().then((cards) => cards.length);
    }

    clickRegularTab() {
        this.elements.regularTab().click();
        return this;
    }

    clickCustomerFilter() {
        this.elements.customerFilter().click();
        return this;
    }

    clickAllCustomersRadioButton() {
        this.elements.customerGroupRadioButtons().find('label:contains("All Customers")')
            .find('input[type="radio"]').click();
        return this;
    }

    clickCustomerFilterSaveButton() {
        this.elements.customerFilterSaveButton().click();
        return this;
    }

    verifyRegularTabIsSelected() {
        this.elements.horizontalTabs().children()
            .should('have.attr', 'data-cy', 'kam.customers.tab-container--Regular');
        return this;
    }

    verifyElementsInCustomerCard(customerName) {
        this.elements.customerCardContent().eq(0).should('exist').and('be.visible');
        this.elements.customerNameOnCustomerCard(customerName).eq(0).should('exist').and('be.visible');
        this.elements.customerNameOnCustomerCard(customerName).eq(0).should('have.text', customerName);
        this.elements.lastOrderDateText(customerName).eq(0).should('have.text', 'Last Order Date:');
        this.elements.lastOrderDateValue(customerName).eq(0).should('exist').and('be.visible');
        this.elements.overdueText(customerName).eq(0).should('have.text', 'Overdue:');
        this.elements.overdueValue(customerName).eq(0).should('exist').and('be.visible');
        this.elements.viewDetailsLink(customerName).eq(0).should('have.text', 'View Details');
        this.elements.viewDetailsLink(customerName).eq(0)
            .should('have.attr', 'href').and('include', '/app/customers')
        this.elements.profileIconCustomerCard(customerName).eq(0)
            .should('exist').and('be.visible');
    }

    verifyMyCustomerRadioButtonIsSelected() {
        this.elements.customerGroupRadioButtons().find('label:contains("My Customers")')
            .find('input[type="radio"]').should('be.checked');
        return this;
    }

    verifyAllCustomersRadioButtonIsSelected() {
        this.elements.customerGroupRadioButtons().find('label:contains("All Customers")')
            .find('input[type="radio"]').should('be.checked');
        return this;
    }

    verifyElementsInCustomerPage(tabNames) {
        this.elements.searchField().find('input')
            .should('have.attr', 'placeholder', 'Search for Customers');
        this.elements.customerFilter().should('exist');
        this.elements.horizontalTabsContainer().children('div')
            .should('have.length', tabNames.length)
            .each((tab, index) => {
                cy.wrap(tab).find("p[data-cy$='label']").should('have.text', tabNames[index]);
            });
        this.elements.newCustomerButton().should('have.text', 'New Customer');
    }

    clickNewCustomerButton() {
        this.elements.newCustomerButton().click();
        return this;
    }

    enterCustomerName(customerName) {
        this.elements.customerShopNameTextField().find('input').clear().type(customerName);
        return this;
    }

    enterPocName(pocName) {
        this.elements.pocNameTextField().find('input').clear().type(pocName);
        return this;
    }

    validateBusinessTypeField() {
        this.elements.businessTypeField().find('input').should('be.disabled');
        this.elements.businessTypeField().find('p').should('have.text', 'Full-Stack');
        return this;
    }

    enterMobileNumber(mobileNumber) {
        this.elements.mobileNumberField().find('input').clear().type(mobileNumber);
        return this;
    }

    enterAdditionalMobileNumber(additionalPhoneNumber) {
        this.elements.additionalPhoneNumber().find('input').clear().type(additionalPhoneNumber);
        return this;
    }

    selectPaymentMode(paymentMode) {
        this.elements.paymentModeDropDown().click();
        this.elements.listBox().find('li').contains(paymentMode).click();
        return this;
    }

    selectCustomerType(customerType) {
        this.elements.customerTypeDropDown().eq(1).click();
        this.elements.customerTypeListBox().find('div').contains(customerType).click();
        return this;
    }

    selectLanguage(language) {
        this.elements.languageDropDown().eq(1).click();
        this.elements.languageListBox().find('div').contains(language).click();
        return this;
    }

    selectOwnershipType(ownershipType) {
        this.elements.ownershipTypeDropDown().click();
        this.elements.listBox().find('li').contains(ownershipType).click();
        return this;
    }

    uploadShopImageAndVisitingCard(imagePath) {
        this.elements.imageUploadButton().eq(0).next('input').selectFile(imagePath, {force: true});
        this.elements.imageUploadButton().eq(1).next('input').selectFile(imagePath, {force: true});
        return this;
    }

    selectMarket(market) {
        this.elements.marketDropDown().eq(1).click();
        this.elements.listBox().find('div').contains(market).click();
        return this;
    }

    enterPreferredTime(time) {
        this.elements.preferredTimeField().find('input').clear().type(time);
        return this;
    }

    clickProceedButton() {
        this.elements.proceedButton().click();
        return this;
    }

    selectProduct(productName) {
        this.elements.productDealtField().find('svg').click();
        this.elements.listBox().find('div').contains(productName).parent().find('input').click();
        return this;
    }

    enterPeakNumberTrucks(numberOfTrucks) {
        this.elements.peakNumberTrucks().find('input').clear().type(numberOfTrucks);
        return this;
    }

    enterAverageVolume(averageVolume) {
        this.elements.averageVolume().find('input').clear().type(averageVolume);
        return this;
    }

    enterExpectedPackaging(numberOfPackaging) {
        this.elements.expectedPackaging().find('input').clear().type(numberOfPackaging);
        return this;
    }

    enterExpectedGradeMix(expectedGradeMix) {
        this.elements.expectedGradeMix().find('input').clear().type(expectedGradeMix);
        return this;
    }

    enterRemarks(remarks) {
        this.elements.remarksField().find('textarea').eq(0).clear().type(remarks);
        return this;
    }

    enterAddress(address) {
        this.elements.addressTypeDropDown().click();
        this.elements.listBox().find('li').contains(address).click();
        this.elements.coordinateIcon().click();
        this.elements.houseNumber().find('input').clear().type('221B');
        this.elements.streetAddress().find('input').clear().type('MG Road');
        this.elements.country().find('input')
            .should('have.value', 'India').and('be.disabled');
        this.elements.city().find('input').clear().type('Chennai');
        this.elements.state().click();
        this.elements.listBox().find('li').contains('Tamil Nadu').click();
        this.elements.district().click();
        this.elements.listBox().find('li').contains('Chennai').click();
        this.elements.pincode().find('input').clear().type('600001');
        this.elements.cluster().find('input').clear().type('Cluster 1');
        this.elements.addMoreButton().should('exist').and('be.visible');
        return this;
    }

    clickAddButton(index = 0) {
        this.elements.addButton().eq(index).click();
        return this;
    }

    clickIndividualKycAddButton() {
        this.elements.individualDocumentCardAddButton().click();
        return this;
    }

    addKycDocuments(
        individualKyc,
        individualKycDocumentNumber,
        individualKycDocumentImage,
        businessKyc,
        businessKycDocumentNumber,
        businessKycDocumentImage
    ) {
        this.clickAddButton();
        this.elements.individualKycDropDown().find('svg').click();
        this.elements.listBox().find('div').contains(individualKyc).click();
        this.elements.documentNumberField().find('input').clear().type(individualKycDocumentNumber);
        this.elements.imageUploadButton().eq(0).next('input').selectFile(individualKycDocumentImage, {force: true});
        this.clickAddButton();
        this.elements.businessKycDropdown().find('svg').click();
        this.elements.listBox().find('div').contains(businessKyc).click();
        this.elements.businessDocumentNumberField().find('input').clear().type(businessKycDocumentNumber);
        this.elements.imageUploadButton().eq(1).next('input').selectFile(businessKycDocumentImage, {force: true});
        return this;
    }

    addMultipleIndividualKycDocuments() {
        this.clickAddButton();
        this.elements.individualKycDropDown().find('svg').click();
        this.elements.listBox().find('div').contains('PAN').click();
        this.elements.documentNumberField().find('input').clear().type('EJAPS0276M');
        this.elements.imageUploadButton().eq(0).next('input').selectFile(ATTACHMENTS.INDIVIDUAL_PAN_CARD, {force: true});
        this.clickIndividualKycAddButton();
        this.elements.individualKycDropDown().eq(1).find('svg').click();
        this.elements.listBox().find('div').contains('Aadhaar').click();
        this.elements.documentNumberField().eq(1).find('input').clear().type('336643742123');
        this.elements.imageUploadButton().eq(1).next('input').selectFile(ATTACHMENTS.AADHAR_CARD, {force: true});
        this.clickIndividualKycAddButton();
        this.elements.individualKycDropDown().eq(1).find('svg').click();
        this.elements.listBox().find('div').contains('Voter ID').click();
        this.elements.documentNumberField().eq(2).find('input').clear().type('GDN0225185');
        this.elements.imageUploadButton().eq(2).next('input').selectFile(ATTACHMENTS.VOTER_CARD, {force: true});
        return this;
    }

    clickSaveAsDraftButton() {
        this.elements.saveAsDraftButton().click();
        return this;
    }

    clickSaveButton() {
        this.elements.saveButton().click();
        return this;
    }

    clickProspectTab() {
        this.elements.prospectTab().click();
        return this;
    }

    verifyCustomerNameOnCard(customerName) {
        this.elements.customerNameOnCard().eq(0).should('include.text', customerName);
        return this;
    }

    verifyCustomerOnboardingStatus(status) {
        this.elements.customerOnboardingStatus().should('have.text', status);
        return this;
    }

    verifyInitiateOnboardingButton() {
        this.elements.initiateOnboardingButton().should('exist')
            .and('have.text', 'Initiate Onboarding');
        return this;
    }

    saveCustomerOnboardingDraft(
        customerName,
        PocName,
        CustomerNumber,
        paymentMode,
        ownershipType,
        addressType
    ) {
        this.enterCustomerName(customerName)
            .enterPocName(PocName)
            .enterMobileNumber(CustomerNumber)
            .enterAdditionalMobileNumber('4000000001')
            .selectPaymentMode(paymentMode)
            .selectCustomerType('Test Customer Type')
            .selectLanguage('English')
            .selectOwnershipType(ownershipType)
            .uploadShopImageAndVisitingCard(ATTACHMENTS.IMAGE_PATH_1)
            .selectMarket('Test Market')
            .enterPreferredTime('3 PM')
            .clickProceedButton();
        cy.wait(5000);
        this.selectProduct('Apple')
            .enterPeakNumberTrucks(5)
            .enterAverageVolume(1000)
            .enterExpectedPackaging(40)
            .enterExpectedGradeMix(3)
            .enterRemarks('Test Remarks')
            .clickProceedButton();
        cy.wait(5000);
        this.enterAddress(addressType)
            .clickProceedButton();
        cy.wait(5000);
        this.addKycDocuments(
            'PAN',
            'EJAPS0276M',
            ATTACHMENTS.INDIVIDUAL_PAN_CARD,
            'Business PAN',
            'AAACF6600Q',
            ATTACHMENTS.BUSINESS_PAN_CARD
        )
            .clickSaveAsDraftButton()
            .clickSaveButton();
        cy.wait(5000);
    }

    saveCustomerOnboardingDraftWithMultipleIndividualKyc(
        customerName,
        PocName,
        CustomerNumber,
        paymentMode,
        ownershipType,
        addressType
    ) {
        this.enterCustomerName(customerName)
            .enterPocName(PocName)
            .enterMobileNumber(CustomerNumber)
            .enterAdditionalMobileNumber('4000000001')
            .selectPaymentMode(paymentMode)
            .selectCustomerType('Test Customer Type')
            .selectLanguage('English')
            .selectOwnershipType(ownershipType)
            .uploadShopImageAndVisitingCard(ATTACHMENTS.IMAGE_PATH_1)
            .selectMarket('Test Market')
            .enterPreferredTime('3 PM')
            .clickProceedButton();
        cy.wait(5000);
        this.selectProduct('Apple')
            .enterPeakNumberTrucks(5)
            .enterAverageVolume(1000)
            .enterExpectedPackaging(40)
            .enterExpectedGradeMix(3)
            .enterRemarks('Test Remarks')
            .clickProceedButton();
        cy.wait(5000);
        this.enterAddress(addressType)
            .clickProceedButton();
        cy.wait(5000);
        this.addMultipleIndividualKycDocuments()
            .clickSaveAsDraftButton()
            .clickSaveButton();
        cy.wait(5000);
    }

    clickViewDetails(customerName) {
        this.elements.viewDetailsLink(customerName).eq(0).click();
        return this;
    }

    verifySaveAsDraftPopupWithCustomerName(customerName) {
        this.elements.saveAsDraftPopup().should('exist').and('be.visible');
        this.elements.saveAsDraftDrawerTitle().should('have.text', `Save ${customerName} Onboarding details as draft?`);
        this.elements.saveAsDraftDrawerSubTitle().should('have.text', 'You can always complete the activation process later.');
        this.elements.saveAsDraftDrawerCancelButton().should('exist').and('be.visible');
        this.elements.saveButton().should('exist').and('be.visible');
        return this;
    }

    clickCustomerFilterCancelButton() {
        this.elements.customerFilterCancelButton().click();
        return this;
    }

    verifyAbsenceOfNewCustomerButton() {
        this.elements.newCustomerButton().should('not.exist');
        return this;
    }

    verifyAbsenceOfCustomerOnboardingStatusAndInitiateOnboardingButton() {
        this.elements.customerOnboardingStatus().should('not.exist');
        this.elements.initiateOnboardingButton().should('not.exist');
    }

    clickProfileTab() {
        this.elements.customerDetailPageTabs().contains('Profile').click();
        return this;
    }

    clickDocumentationTab() {
        this.elements.customerDetailPageTabs().contains('Documentation').click();
        return this;
    }

    clickAddressTitleCard() {
        this.elements.addressTitleCard().click();
        return this;
    }

    VerifyAbsenceOfEditIconsInProfileTab() {
        this.elements.basicDetailsEditIcon().should('not.exist');
        this.elements.productsEditIcon().should('not.exist');
        this.clickAddressTitleCard();
        this.elements.addAddressButton().should('not.exist');
    }

    VerifyPresenceOfEditIconsInProfileTab() {
        this.elements.basicDetailsEditIcon().should('exist').and('be.visible');
        this.elements.productsEditIcon().should('exist').and('be.visible');
        this.clickAddressTitleCard()
            .verifyVisibilityOfAddressEditIcon();
        this.elements.addAddressButton().should('exist');
    }

    verifyVisibilityOfAddressEditIcon() {
        this.elements.billingAddressEditIcon().should('exist').and('be.visible');
        return this;
    }

    clickKycDetailsCard() {
        this.elements.kycDetailsCard().click();
        return this;
    }

    verifyPresenceOfButtons() {
        this.elements.kycHeaderButtons().contains('Upload document')
            .should('exist').and('be.visible');
        this.clickUploadDocumentButton();
        this.elements.drawerTitle().contains('Upload new document').parent()
            .should('exist').and('be.visible');
        this.elements.drawerCancelButton().click();
        this.elements.kycHeaderButtons().contains('Request now')
            .should('exist').and('be.visible');
        this.clickPhysicalVerificationRequestButton();
        this.elements.drawerTitle().contains('Request for Physical Verification').parent()
            .should('exist').and('be.visible');
        this.elements.drawerCancelButton().click();
    }

    clickUploadDocumentButton() {
        this.elements.kycHeaderButtons().contains('Upload document').click();
        return this;
    }

    clickPhysicalVerificationRequestButton() {
        this.elements.kycHeaderButtons().contains('Request now').click();
        return this;
    }

    clickBankDetailsCard() {
        this.elements.bankDetailsCard().click()
        return this;
    }

    verifyBankDetailsPage() {
        this.elements.addNewBankButton().should('exist')
            .and('be.visible').and('have.text', 'Add New Bank');
        this.elements.emptyData().should('have.text', 'No Bank Data Available')
    }

    clickFinancialDocumentsCard() {
        this.elements.financialDocumentsCard().click();
        return this;
    }

    verifyFinancialDocumentsPage() {
        this.elements.addFinancialDocumentsButton().should('exist')
            .and('be.visible').and('have.text', '+ Add Financial Docs');
        this.elements.emptyData().should('have.text', 'No data available');
    }

    clickSignedLedgerCard() {
        this.elements.signedLedgerCard().click();
        return this;
    }

    verifySignedLedgersPage() {
        this.elements.addLedgerButton().should('exist')
            .and('be.visible').and('have.text', '+ Add ledger');
        this.elements.emptyData().should('have.text', 'No data available');
    }

    verifyVoterIdKycDetails(userName) {
        this.elements.kycVoterIdCardTile().should('exist').and('be.visible');
        this.elements.kycVoterIdCardTile()
            .find("[data-cy='kam.customer.document.status']").should('have.text', 'Pending');
        this.elements.kycVoterIdCardTile()
            .find("[data-cy='kam.customer.document.status']").next('img')
            .should('have.attr', 'alt', 'delete');
        this.elements.kycVoterIdCardTile()
            .find('button')
            .should('have.attr', 'data-cy', 'kam.customer.kyc.kycDoc.card.view')
            .and('have.text', 'View');
        this.elements.kycVoterIdCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']")
            .find('span').should('contain.text', 'Uploaded by');
        this.elements.kycVoterIdCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']")
            .find('p').should('contain.text', userName);
        this.elements.kycVoterIdCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']").find('p')
            .invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        });
    }

    verifyAadhaarKycDetails(userName, verifiedBy) {
        this.elements.kycAadhaarCardTile().should('exist').and('be.visible');
        this.elements.kycAadhaarCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.logo']").next('img')
            .should('have.attr', 'src',
                'https://qa-assets.vegrow.in/vesell/icons/KamIcons/verified_stamp.svg');
        this.elements.kycAadhaarCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.logo']").next('img')
            .should('have.attr', 'alt', 'verified_stamp');
        this.elements.kycAadhaarCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']")
            .find('span').eq(0).should('contain.text', 'Uploaded by');
        this.elements.kycAadhaarCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']")
            .find('p').eq(0).should('contain.text', userName);
        this.elements.kycAadhaarCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']").find('p').eq(0)
            .invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        });
        this.elements.kycAadhaarCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']")
            .find('span').eq(1).should('contain.text', 'Verified by');
        this.elements.kycAadhaarCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']")
            .find('p').eq(1).should('contain.text', verifiedBy);
        this.elements.kycAadhaarCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']").find('p').eq(1)
            .invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        });
    }

    verifyPanKycDetails(userName, verifiedBy) {
        this.elements.kycPanCardTile().should('exist').and('be.visible');
        this.elements.kycPanCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.logo']").next('img')
            .should('have.attr', 'src',
                'https://qa-assets.vegrow.in/vesell/icons/KamIcons/rejected_stamp.svg');
        this.elements.kycPanCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.logo']").next('img')
            .should('have.attr', 'alt', 'rejected_stamp');
        this.elements.kycPanCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']")
            .find('span').eq(0).should('contain.text', 'Uploaded by');
        this.elements.kycPanCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']")
            .find('p').eq(0).should('contain.text', userName);
        this.elements.kycPanCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']").find('p').eq(0)
            .invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        });
        this.elements.kycPanCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']")
            .find('span').eq(1).should('contain.text', 'Rejected by');
        this.elements.kycPanCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']")
            .find('p').eq(1).should('contain.text', verifiedBy);
        this.elements.kycPanCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.card.userDetails']").find('p').eq(1)
            .invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        });
    }

    clickIndividualRadioButton() {
        this.elements.kycDocumentTypeRadioButtons().find('label:contains("Individual")')
            .find('input[type="radio"]').click();
        return this;
    }

    clickBusinessRadioButton() {
        this.elements.kycDocumentTypeRadioButtons().find('label:contains("Business")')
            .find('input[type="radio"]').click();
        return this;
    }

    selectKycDocument(documentType) {
        this.elements.kycDocumentNameDropdown().click();
        this.elements.listBox().find('li').contains(documentType).click();
        return this;
    }

    enterKycDocumentNumber(documentNumber) {
        this.elements.kycDocumentNumberInput().find('input').clear().type(documentNumber);
        return this;
    }

    uploadNewKycDocument(kycImage) {
        this.elements.imageUploadButton().next('input').selectFile(kycImage, {force: true});
        return this;
    }

    verifyShowMoreDocumentsCount(documentsCount) {
        this.elements.showMoreDocuments().find('span').eq(1).should('contain.text', documentsCount);
        return this;
    }

    clickShowMoreDocuments() {
        this.elements.showMoreDocuments().click();
        return this;
    }

    validateViewDocumentModal() {
        this.elements.viewDocumentModal().should('exist').and('be.visible');
        this.elements.viewDocumentModalTitle().should('have.text', 'View documents');
        this.elements.closeIconInViewDocumentModal().should('exist').and('be.visible')
    }

    clickSaveButtonOfTheDrawer() {
        this.elements.drawerSaveButton().click();
        return this;
    }

    verifyAadhaarBeforeVerification(unmaskedAadhaarNumber) {
        this.elements.kycAadhaarCardTile().find("[data-cy='kam.customer.kyc.kycDoc.card.logo']")
            .find('img').should('have.attr', 'src',
            'https://qa-assets.vegrow.in/vesell/icons/KamIcons/aadhar_logo.svg');
        this.elements.kycAadhaarCardTile().find("[data-cy='kam.customer.document.status']")
            .should('have.text', 'Pending');
        this.elements.kycAadhaarCardTile().find("[data-cy='kam.customer.kyc.kycDoc.card.logo']")
            .find('p').should('contain.text', `Aadhaar ${unmaskedAadhaarNumber}`);
        this.elements.kycAadhaarCardTile()
            .find('button')
            .should('have.attr', 'data-cy', 'kam.customer.kyc.kycDoc.card.view')
            .and('have.text', 'View');
        this.elements.kycAadhaarCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.deleteIcon']")
            .should('have.attr', 'alt', 'delete');
        return this;
    }

    verifyAadhaarAfterVerification(unmaskedAadhaarNumber) {
        this.elements.kycAadhaarCardTile().find("[data-cy='kam.customer.kyc.kycDoc.card.logo']")
            .find('img').should('have.attr', 'src',
            'https://qa-assets.vegrow.in/vesell/icons/KamIcons/aadhar_logo.svg');
        this.elements.kycAadhaarCardTile().find("[data-cy='kam.customer.document.status']")
            .should('not.exist');
        this.elements.kycAadhaarCardTile().find("[data-cy='kam.customer.kyc.kycDoc.card.logo']")
            .find('p').should('contain.text', `Aadhaar xx${unmaskedAadhaarNumber.slice(-4)}`);

        // Verify that the view button and delete icon are not there after verification
        this.elements.kycAadhaarCardTile().find('button').should('not.exist');
        this.elements.kycAadhaarCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.deleteIcon']").should('not.exist');
        return this;
    }

    verifyPanBeforeVerification(unmaskedPanNumber) {
        this.elements.kycPanCardTile().find("[data-cy='kam.customer.kyc.kycDoc.card.logo']")
            .find('img').should('have.attr', 'src',
            'https://qa-assets.vegrow.in/vesell/icons/KamIcons/pan_logo.svg');
        this.elements.kycPanCardTile().find("[data-cy='kam.customer.document.status']")
            .should('have.text', 'Pending');
        this.elements.kycPanCardTile().find("[data-cy='kam.customer.kyc.kycDoc.card.logo']")
            .find('p').should('have.text', `PAN ${unmaskedPanNumber}`);
        this.elements.kycPanCardTile()
            .find('button')
            .should('have.attr', 'data-cy', 'kam.customer.kyc.kycDoc.card.view')
            .and('have.text', 'View');
        this.elements.kycPanCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.deleteIcon']")
            .should('exist').and('be.visible');
        return this;
    }

    verifyPanAfterVerification(unmaskedPanNumber) {
        this.elements.kycPanCardTile().find("[data-cy='kam.customer.kyc.kycDoc.card.logo']")
            .find('img').should('have.attr', 'src',
            'https://qa-assets.vegrow.in/vesell/icons/KamIcons/pan_logo.svg');
        this.elements.kycPanCardTile().find("[data-cy='kam.customer.document.status']")
            .should('not.exist');
        this.elements.kycPanCardTile().find("[data-cy='kam.customer.kyc.kycDoc.card.logo']")
            .find('p').should('have.text', `PAN xx${unmaskedPanNumber.slice(-4)}`);

        // Verify that the view button and delete icon are not there after verification
        this.elements.kycPanCardTile().find('button').should('not.exist');
        this.elements.kycPanCardTile()
            .find("[data-cy='kam.customer.kyc.kycDoc.deleteIcon']").should('not.exist');
        return this;
    }

    clickViewButton(index = 0) {
        this.elements.kycViewButton().eq(index).click();
        return this;
    }

    validateOpenedImage(kycImagePath) {
        this.elements.openedImage().should('exist').and('be.visible');
        this.elements.openedImage().invoke('attr', 'src').should((imageUrl) => {
            const actualFileName = imageUrl.split('/').pop();
            const expectedFileName = kycImagePath.split('/').pop();
            expect(actualFileName).to.be.equal(expectedFileName);
        })
        return this;
    }

    clickDeleteIcon(index = 0) {
        this.elements.kycDeleteIcon().eq(index).click();
        return this;
    }

    clickDeleteConfirmationButton() {
        this.elements.deleteConfirmationButton().click();
        return this;
    }

    validateAbsenceOfBusinessPanCardTile() {
        this.elements.kycBusinessPanCardTile().should('not.exist');
        return this;
    }

    validatePresenceOfFssaiTile() {
        this.elements.kycFssaiLicenseTile().should('exist').and('be.visible');
        return this;
    }

    selectLocation() {
        this.elements.kycDocumentNameDropdown().click();
        this.elements.listBox().find('li').eq(1).click();
        return this;
    }

    enterCustomerPhysicalVerificationRemarks(remarks) {
        this.elements.kycDocumentNumberInput().find('textarea').eq(0).clear().type(remarks);
        return this;
    }

    verifyPresenceOfCustomerPhysicalVerificationTile(userName) {
        this.elements.physicalVerificationTile().should('exist').and('be.visible');
        this.elements.physicalVerificationTile().children('div').eq(0).find('span').eq(0)
            .invoke('text').should('not.be.empty');
        this.elements.seeMoreSeeLessButton().should('have.text', '...see more');
        this.elements.seeMoreSeeLessButton().click();
        this.elements.seeMoreSeeLessButton().should('have.text', ' see less');
        this.elements.seeMoreSeeLessButton().click();
        this.elements.seeMoreSeeLessButton().should('have.text', '...see more');
        this.elements.physicalVerificationTile().children('div').eq(1).find('span')
            .should('contain.text', 'Initiated by');
        this.elements.physicalVerificationTile().find('div').find('p')
            .should('contain.text', userName);
        this.elements.physicalVerificationTile().find('div').find('p')
            .invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
            return this;
        })
    }

    validateCustomerPhysicalVerificationStatus(status) {
        this.elements.physicalVerificationTile().find("[data-cy='kam.customer.document.status']")
            .should('have.text', status);
        return this;
    }

    clickAddNewBankButton() {
        this.elements.addNewBankButton().click();
        return this;
    }

    enterBankAccountNumber(accountNumber) {
        this.elements.bankAccountNumberInputField().find('input').clear().type(accountNumber);
        return this;
    }

    enterConfirmBankAccountNumber(accountNumber) {
        this.elements.confirmBankAccountNumberInputField().find('input').clear().type(accountNumber);
        return this;
    }

    enterIfscCode(ifscCode) {
        this.elements.ifscCodeInputField().find('input').clear().type(ifscCode);
        return this;
    }

    validateAutoFilledBankName(bankName) {
        this.elements.bankNameInputFilled().find('input').should('have.value', bankName);
        return this;
    }

    validateAutoFilledBranchName(branchName) {
        this.elements.branchNameInputFilled().find('input').should('have.value', branchName);
        return this;
    }

    clickSaveBankDetails() {
        this.elements.addFinancialDocumentsButton().contains('Save').click();
        return this;
    }

    verifyBankNameAndAccountNumber(bankName, accountNumber, index = 0) {
        this.elements.bankNameAndAccountNumber().eq(index)
            .should('have.text', `${bankName} ${accountNumber}View`);
        return this;
    }

    clickBankDetailsCardViewButton(index = 0) {
        this.elements.bankDetailsViewButton().eq(index).click();
        this.elements.openedImage().should('exist').and('be.visible');
        return this;
    }

    ValidateBankDetailsStatus(verificationStatus, index = 0) {
        this.elements.bankAccountStatus().eq(index).should('have.text', verificationStatus);
        return this;
    }

    assertBankDetailsUploadedByUser(userName, index = 0) {
        this.elements.bankDetailsTileHeader().eq(0).next('div').children('div').eq(index)
            .find('p').find('span').should('contain.text', 'Uploaded by');
        this.elements.bankDetailsTileHeader().eq(0).next('div').children('div').eq(index)
            .find('p').should('contain.text', userName);
        this.elements.bankDetailsTileHeader().eq(0).next('div').children('div').eq(index)
            .find('p').invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        })
        return this;
    }

    assertBankDetailsVerifiedByUser(userName, index = 1) {
        this.elements.bankDetailsTileHeader().eq(0).next('div').children('div').eq(index)
            .find('p').find('span').should('contain.text', 'Verified by');
        this.elements.bankDetailsTileHeader().eq(0).next('div').children('div')
            .eq(index).find('p').should('contain.text', userName);
        this.elements.bankDetailsTileHeader().eq(0).next('div').children('div').eq(index)
            .find('p').invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        })
        return this;
    }

    validateBankDetailCard(count) {
        this.elements.bankDetailsTileHeader().should('have.length', count);
        return this;
    }

    assertBankDetailsDeleteButtonExists(index = 0) {
        this.elements.bankDetailsDeleteIcon().eq(index).should('exist').and('be.visible');
        return this;
    }

    verifyBankDetailsDeleteButtonNotPresent() {
        this.elements.bankDetailsDeleteIcon().should('not.exist');
        return this;
    }

    clickOutside() {
        cy.get('body').click(10, 10);
        return this;
    }

    verifyBankNameAndMaskedAccountNumber(bankName, accountNumber, index = 0) {
        this.elements.bankNameAndAccountNumber().eq(index)
            .should('have.text', `${bankName} xxxx${accountNumber.slice(-4)}`);
        return this;
    }

    verifyAllBankFieldsErrorMessage(errorMessage) {
        this.elements.bankAccountNumberInputField().find('p').should('have.text', errorMessage);
        this.elements.confirmBankAccountNumberInputField().find('p').should('have.text', errorMessage);
        this.elements.ifscCodeInputField().find('p').should('have.text', errorMessage);
        this.elements.bankNameInputFilled().find('p').should('have.text', errorMessage);
        this.elements.branchNameInputFilled().find('p').should('have.text', errorMessage);
        this.elements.imageUploadButton().next('p').should('have.text', errorMessage);
        return this;
    }

    clickAddFinancialDocumentsButton() {
        this.elements.addFinancialDocumentsButton().contains('+ Add Financial Docs').click();
        return this;
    }

    selectFinancialDocument(documentType) {
        this.elements.financialDocumentTypeDropdown().click();
        this.elements.listBox().find('li').contains(documentType).click();
        return this;
    }

    selectFinancialYear(financialYear) {
        this.elements.financialYearDropdown().click();
        this.elements.listBox().find('li').contains(`FY ${financialYear}`).click();
        return this;
    }

    clickFinancialDocumentSaveButton() {
        this.elements.saveButtonFinancialDocument().click();
        return this;
    }

    validateFinancialDocumentCard(count) {
        this.elements.financialDocumentTile().should('have.length', count);
        return this;
    }

    validateFinancialDocumentType(documentType) {
        this.elements.financialDocumentType().should('have.text', documentType);
        return this;
    }

    validateFinancialYear(financialYear) {
        this.elements.financialYear().should('have.text', `FY ${financialYear}`)
        return this;
    }

    validateFinancialDocumentViewButton() {
        this.elements.financialDocumentCardViewButton().should('have.text', 'View');
        return this;
    }

    validateFinancialDocumentDeleteButton() {
        this.elements.financialDocumentDeleteIcon().should('exist').and('be.visible');
        return this;
    }

    assertFinancialDetailsUploadedByUser(userName) {
        this.elements.financialDocumentTile().parent().children('div').eq(1).find('span')
            .should('contain.text', 'Uploaded by');
        this.elements.financialDocumentTile().parent().children('div').eq(1).find('p')
            .should('contain.text', userName);
        this.elements.financialDocumentTile().parent().children('div').eq(1).find('p')
            .invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        })
        return this;
    }

    assertFinancialDetailsVerifiedByUser(userName) {
        this.elements.financialDocumentTile().parent().children('div').eq(2).find('span')
            .should('contain.text', 'Verified by');
        this.elements.financialDocumentTile().parent().children('div').eq(2).find('p')
            .should('contain.text', userName);
        this.elements.financialDocumentTile().parent().children('div').eq(2).find('p')
            .invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        })
        return this;
    }

    assertFinancialDetailsRejectedByUser(userName) {
        this.elements.financialDocumentTile().parent().children('div').eq(2).find('span')
            .should('contain.text', 'Rejected by');
        this.elements.financialDocumentTile().parent().children('div').eq(2).find('p')
            .should('contain.text', userName);
        this.elements.financialDocumentTile().parent().children('div').eq(2).find('p')
            .invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        })
        return this;
    }

    selectStartDate() {
        const today = DateTimeUtils.getEpochTimeOfDayStart(0);
        cy.contains('Start date').parent().find("[aria-label='Choose date']").click();

        // Select March 14 using the data-timestamp attribute
        cy.get(`[data-timestamp='${today}']`).click();
        return this;
    }

    selectEndDate() {
        cy.wait(1000);
        const today = DateTimeUtils.getEpochTimeOfDayStart(0);
        cy.contains('End date').parent().find("[aria-label='Choose date']").click();

        // Select date using the data-timestamp attribute
        cy.get(`[data-timestamp='${today}']`).click();
        return this;
    }

    selectCustomerBank() {
        this.elements.customerBank().eq(0).click();
        this.elements.listBox().find('div').contains('Automation Customer Bank').click();
        return this;
    }

    enterFinancialDocumentRemarks() {
        this.elements.financialDocRemarks().find('textarea').eq(0).clear().type('Test Remarks');
        return this;
    }

    validateBankStatementFinancialDocument(bankName) {
        this.elements.financialDocumentType().should('have.text', `${bankName}-Bank Statement`);
        return this;
    }

    validateBankStatementPeriod() {
        const yesterday = DateTimeUtils.getDateInDdMmYyyyFormat(-1) // Get today's date in dd/mm/yyyy format
        this.elements.bankStatementPeriod().should('have.text', `${yesterday} to ${yesterday}`);
        return this;
    }

    selectChequeType(chequeType) {
        this.elements.chequeType().click();
        this.elements.listBox().find('li').contains(chequeType).click();
        return this;
    }

    enterChequeNumber() {
        this.elements.chequeNumberField().find('input').clear().type('12345');
        return this;
    }

    enterChequeAmount(amount) {
        this.elements.chequeAmount().find('input').clear().type(amount);
        return this;
    }

    validateChequeFinancialDocument() {
        this.elements.financialDocumentType().should('have.text', 'Cheque');
        return this;
    }

    verifyItrFieldsErrorMessage(errorMessage) {
        this.elements.financialYearDropdown().next('p').should('have.text', errorMessage);
        this.elements.imageUploadButton().next('p').should('have.text', errorMessage);
        return this;
    }

    verifyBankStatementFieldsErrorMessage(errorMessage) {
        cy.contains('Start date').next('div').find('p').should('have.text', errorMessage);
        cy.contains('End date').next('div').find('p').should('have.text', errorMessage);
        this.elements.customerBank().find('p').should('have.text', errorMessage);
        this.elements.imageUploadButton().next('p').should('have.text', errorMessage);
        return this;
    }

    verifyChequeFieldsErrorMessage(errorMessage) {
        this.elements.chequeType().next('p').should('have.text', errorMessage);
        this.elements.chequeNumberField().find('p').should('have.text', errorMessage);
        this.elements.imageUploadButton().next('p').should('have.text', errorMessage);
        return this;
    }

    verifyBankGuaranteeFieldsErrorMessage(errorMessage) {
        cy.contains('Valid from date').next('div').find('p').should('have.text', errorMessage);
        cy.contains('Valid till date').next('div').find('p').should('have.text', errorMessage);
        this.elements.chequeAmount().find('p').should('have.text', errorMessage);
        this.elements.bankGuaranteeDocumentNumber().find('p').should('have.text', errorMessage);
        this.elements.imageUploadButton().next('p').should('have.text', errorMessage);
        return this;
    }

    clickSignedLedgersCard() {
        this.elements.signedLedgersCard().click();
        return this;
    }

    clickAddLedgerButton() {
        this.elements.addLedgerButton().click();
        return this;
    }

    enterLedgerOutstanding(amount) {
        this.elements.ledgerOutstanding().find('input').clear().type(amount);
        return this;
    }

    enterSignedLedgerRemarks(remarks) {
        this.elements.signedLedgerRemarks().find('textarea').eq(0).clear().type(remarks);
        return this;
    }

    clickSignedLedgerSaveButton() {
        this.elements.signedLedgerSaveButton().click();
        return this;
    }

    validateSignedLedgerCard(count) {
        this.elements.signedLedgerTile().should('have.length', count);
        return this;
    }

    validateSignedLedgerPeriod() {
        const yesterday = DateTimeUtils.getDateInDdMmYyyyFormat(-1).split('/').join('-');
        this.elements.signedLedgerTile().find('p').should('contains.text', `${yesterday} - ${yesterday}`);
        return this;
    }

    validateSignedLedgerViewButton() {
        this.elements.signedLedgerTile().find('span').should('have.text', 'View');
        return this;
    }

    validateSignedLedgerViewButtonNotPresent() {
        this.elements.signedLedgerTile().find('span').should('not.exist');
        return this;
    }

    validateSignedLedgerDeleteButton() {
        this.elements.bankAccountStatus().next('img').should('exist').and('be.visible');
        return this;
    }

    validateSignedLedgerDeleteButtonNotPresent() {
        this.elements.bankAccountStatus().next('img').should('not.exist');
        return this;
    }

    validateSignedLedgerOutstanding(outstandingAmount) {
        this.elements.signedLedgerTile().next('p').should('have.text', `Outstanding as per signed ledger: ${outstandingAmount}`);
        return this;
    }

    assertSignedLedgerUploadedByUser(userName) {
        this.elements.signedLedgerTile().parent().children('div').eq(1).find('span')
            .should('contain.text', 'Uploaded by');
        this.elements.signedLedgerTile().parent().children('div').eq(1).find('p')
            .should('contain.text', userName);
        this.elements.signedLedgerTile().parent().children('div').eq(1).find('p')
            .invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        })
        return this;
    }

    assertSignedLedgerVerifiedByUser(userName) {
        this.elements.signedLedgerTile().parent().children('div').eq(2).children('p')
            .find('span').should('contain.text', 'Verified by');
        this.elements.signedLedgerTile().parent().children('div').eq(2).children('p')
            .should('contain.text', userName);
        this.elements.signedLedgerTile().parent().children('div').eq(2).children('p')
            .invoke('text').should((text) => {

            // Extract the last portion of the text after the last comma (assumed to be date-time)
            const extractedDateTime = text.substring(text.lastIndexOf(',') + 2).trim();

            // Validate date-time format using the function
            expect(UsefulFunctionsUtils.validateDateTimeFormat(extractedDateTime)).to.be.true;
        })
        return this;
    }

    assertVerificationRemarks(remarks) {
        this.elements.signedLedgerTile().parent().children('div').eq(2).children('div').eq(1)
            .find('span').should('have.text', 'Verification Remarks:')
        this.elements.signedLedgerTile().parent().children('div').eq(2).children('div').eq(1)
            .find('p').should('have.text', remarks);
        return this;
    }

    verifySignedLedgerFieldsErrorMessage(errorMessage) {
        cy.contains('Start date').next('div').find('p').should('have.text', errorMessage);
        cy.contains('End date').next('div').find('p').should('have.text', errorMessage);
        this.elements.ledgerOutstanding().find('p').should('have.text', errorMessage);
        this.elements.imageUploadButton().next('p').should('have.text', errorMessage);
        return this;
    }

    clickDeleteButton() {
        this.elements.financialDocumentDeleteIcon().click();
        return this;
    }

    clickActivitiesCard() {
        this.elements.activitiesCard().click();
        return this;
    }

    clickNewCheckInButton() {
        this.elements.addFinancialDocumentsButton().contains('New Check in').click();
        return this;
    }

    assertCheckInCustomerNamePrefilled(customerName) {
        this.elements.checkInCustomerNameInput().find('input').should('have.value', customerName);
        return this;
    }

    selectPurposeOfVisit(purpose) {
        this.elements.purposeOfVisit().find(`label:contains(${purpose})`)
            .find('input[type="checkbox"]').click();
        return this;
    }

    assertPurposeCheckboxNotSelected(purpose) {
        this.elements.purposeOfVisit().find(`label:contains(${purpose})`)
            .find('input[type="checkbox"]').should('not.be.checked');
        return this;
    }

    assertPurposeCheckboxSelected(purpose) {
        this.elements.purposeOfVisit().find(`label:contains(${purpose})`)
            .find('input[type="checkbox"]').should('be.checked');
        return this;
    }

    clickCheckInLocation() {
        this.elements.checkInLocation().click();
        return this;
    }

    clickRecordEntryButton() {
        this.elements.recordEntryButton().click();
        return this;
    }

    assertLocationFetch() {
        this.elements.locationFetch().should('have.text', 'Location Fetched!');
        return this;
    }

    validateCheckInActivityCard(count) {
        this.elements.checkInActivityTile().should('have.length', count);
        return this;
    }

    assertCheckInActivityCardCustomerName(customerName, index = 0) {
        this.elements.checkInActivityCardCustomerName().eq(index).should('have.text', customerName);
        return this;
    }

    assertCheckInActivityCardDialIcon(index = 0) {
        this.elements.checkInActivityCardDialIcon().eq(index).should('exist').and('be.visible');
        return this;
    }

    assertCheckInActivityPurpose(purpose, index = 0) {
        this.elements.checkInActivityCardPurpose().eq(index).should('have.text', purpose);
        return this;
    }

    assertCheckInActivityDueDate(index = 0) {
        // const today = DateTimeUtils.getDateInDdMmYyyyFormat(0)
        // this.elements.checkInActivityCardDueDate().eq(index).should('have.text', today);
        this.elements.checkInActivityCardDueDate().eq(index).invoke('text').should('not.be.empty');
        return this;
    }

    assertCheckInActivityCompletedAt(index = 0) {
        this.elements.checkInActivityCompletedAt().eq(index).invoke('text').should('not.be.empty');
        return this;
    }

    clickBasicDetailsCard() {
        this.elements.basicDetailsTile().click();
        return this;
    }

    assertBasicDetailsOfCustomer() {
        this.elements.customerBusinessType().should('have.text', 'Full-Stack');
        this.elements.customerPaymentMode().should('have.text', 'Credit');
        this.elements.customerLanguage().should('have.text', 'English');
        this.elements.customerOwnershipType().should('have.text', 'Individual');
        this.elements.customerCompanyType().should('have.text', 'LLP');
        return this;
    }

    clickSeeMoreSeeLessButton() {
        this.elements.seeMoreSeeLessButton().click();
        return this;
    }

    assertAddressDetailsOfCustomer() {
        this.elements.customerBillingAddress().should('have.text', 'Rajiv Nagar, Vanagaram, Chennai, Tamil Nadu');
        return this;
    }

    clickAddAddressButton() {
        this.elements.addAddressButton().click();
        return this;
    }

    clickCustomerNewAddressTypeDropdown() {
        this.elements.customerNewAddressDropdown().click();
        return this;
    }

    clickBillingAddressType() {
        this.elements.billingAddressType().click();
        return this;
    }

    clickNewAddressGpsIcon() {
        this.elements.newAddressGpsIcon().click();
        return this;
    }

    clickCoordinateExpandIcon() {
        this.elements.customerNewAddressCoordinatesExpandIcon().click();
        return this;
    }

    validateNewAddressLatitudeAutofilled() {
        this.elements.customerNewAddressLatitude().find('input').invoke('val').should('not.be.empty');
        return this;
    }

    validateNewAddressLongitudeAutofilled() {
        this.elements.customerNewAddressLongitude().find('input').invoke('val').should('not.be.empty');
        return this;
    }

    enterCustomerNewAddressBuildingNumber() {
        this.elements.customerNewAddressBuildingNumber().find('input').clear().type('221B');
        return this;
    }

    enterCustomerNewAddressStreetName() {
        this.elements.customerNewAddressStreet().find('input').clear().type('MG Road');
        return this;
    }

    clickCustomerNewAddressCountryDropdown() {
        this.elements.customerNewAddressCountryDropdown().eq(1).click();
        return this;
    }

    selectCountryIndia() {
        this.elements.customerNewAddressCountryIndia().eq(1).click();
        return this;
    }

    enterCustomerNewAddressCity() {
        this.elements.customerNewAddressCity().find('input').clear().type('Chennai');
        return this;
    }

    clickCustomerNewAddressStateDropdown() {
        this.elements.customerNewAddressStateDropdown().click();
        return this;
    }

    selectCustomerNewAddressStateTamilNadu() {
        this.elements.customerNewAddressStateTamilNadu().click();
        return this;
    }

    clickCustomerNewAddressDistrictDropdown() {
        this.elements.customerNewAddressDistrictDropdown().click();
        return this;
    }

    selectCustomerNewAddressDistrictChennai() {
        this.elements.customerNewAddressDistrictChennai().click();
        return this;
    }

    enterCustomerNewAddressPincode() {
        this.elements.customerNewAddressPincode().find('input').clear().type('600023');
        return this;
    }

    enterCustomerNewAddressCluster() {
        this.elements.customerNewAddressCluster().find('input').clear().type('Vegrow');
        return this;
    }

    clickCustomerNewAddressSaveButton() {
        this.elements.customerNewAddressSaveButton().click();
        return ``
    }

    assertNewAddressDetailsOfCustomer() {
        this.elements.customerBillingAddress().should('have.text', '221B, MG Road, Chennai, Chennai, Tamil Nadu, 600023, India');
        return this;
    }

    validateCustomerBasicDetailsLanguage(language) {
        this.elements.customerBasicDetailsLanguageValue().should('have.text', language);
        return this;
    }

    validateCustomerBasicDetailsVisitingCardPhotosBeforeEdit() {
        this.elements.customerBasicDetailsVisitingCardPhotos().should('contain.text', '--');
        return this;
    }

    clickBasicDetailsEditIcon() {
        this.elements.basicDetailsEditIcon().click();
        return this;
    }

    clickCustomerBasicDetailsLanguageDropdown() {
        this.elements.customerBasicDetailsLanguageDropdown().click();
        return this;
    }

    selectTamilLanguage() {
        this.elements.customerBasicDetailsTamilLanguage().click();
        return this;
    }

    clickCustomerBasicDetailsSaveButton() {
        this.elements.customerBasicDetailsSaveButton().click();
        return this;
    }

    validateCustomerBasicDetailsVisitingCardPhotoValue(imagePath) {
        this.elements.customerBasicDetailsVisitingPhotoValue().invoke('attr', 'src').should((imageUrl) => {
            const actualFileName = imageUrl.split('/').pop();
            const expectedFileName = imagePath.split('/').pop();
            expect(actualFileName).to.be.equal(expectedFileName);
        })
        return this;
    }

    expandProductTitle() {
        this.elements.productTitleCard().click();
        return this;
    }

    validateProductDetails(truckValue, volume, gradeValue, packagingValue) {
        this.elements.avgTruckValue().should('have.text', truckValue);
        this.elements.avgVolumeValue().should('have.text', `${volume}Kgs`);
        this.elements.expGradeValue().should('have.text', gradeValue);
        this.elements.expPackagingValue().should('have.text', packagingValue);
        return this;
    }

    validateProductCategory(productCategory) {
        this.elements.customerProductCategory().should('have.text', productCategory);
        return this;
    }

    clickProductEditIcon() {
        this.elements.productsEditIcon().click();
        return this;
    }

    clickProductInputCloseIcon(index = 0) {
        this.elements.productInputCloseIcon().find('svg').eq(index).click();
        cy.wait(2000);
        return this;
    }

    clickProductDropdown() {
        this.elements.productInputCloseIcon().eq(1).click();
        cy.wait(2000);
        return this;
    }

    selectProductKinnow() {
        this.elements.productKinnow().eq(1).click();
        return this;
    }

    enterProductDetails(trucks, volume, packaging, grade) {
        this.elements.numberOfTrucksInput().clear().type(trucks);
        this.elements.avgVolumeInput().clear().type(volume);
        this.elements.expectedPackagingInput().clear().type(packaging);
        this.elements.expGradeInput().clear().type(grade);
        this.elements.remarkTextarea().eq(0).clear().type('Test');
        return this;
    }

    clickProductDetailsSaveButton() {
        this.elements.productSaveButton().click();
        return this;
    }

    validateAbsenceOfProductCardEditIcon() {
        this.elements.productsEditIcon().should('not.exist');
        return this;
    }

    enterBankGuaranteeDocumentNumber() {
        this.elements.bankGuaranteeDocumentNumber().find('input').clear().type('12345');
        return this;
    }

    validateBankGuaranteeFinancialDocument() {
        this.elements.financialDocumentType().should('have.text', 'Bank Guarantee');
        return this;
    }

    selectValidFromDate() {
        const today = DateTimeUtils.getEpochTimeOfDayStart(0);
        cy.contains('Valid from date').parent().find("[aria-label='Choose date']").click();

        // Select March 14 using the data-timestamp attribute
        cy.get(`[data-timestamp='${today}']`).click();
        return this;
    }

    selectValidTillDate() {
        cy.wait(1000);
        const today = DateTimeUtils.getEpochTimeOfDayStart(0);
        cy.contains('Valid till date').parent().find("[aria-label='Choose date']").click();

        // Select date using the data-timestamp attribute
        cy.get(`[data-timestamp='${today}']`).click();
        return this;
    }

    clickAddFinancialDocumentFloatingButton() {
        this.elements.addFinancialDocumentFloatingButton().click();
        return this;
    }
}

module.exports = new KamCustomerPage()