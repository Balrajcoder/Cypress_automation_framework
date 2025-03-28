import KamOrderPage from "../../../components/pages/KamOrderPage";
import BtrHomePage from "../../../components/pages/BtrHomePage";
import SoTestData from "../../../Utility/apiTestData/SoAPITestData";
import { KAM_URL } from "../../../constants/kamUrls";
import KamGrnCompletePage from "../../../components/pages/KamGrnCompletePage";
import KamDelievredPage from "../../../components/pages/KamDeliveredPage";



describe('Grn Complete Tab component level testcases', function () {
    let data;
   

    before(function () {
        cy.fixture("kamOrderFlow").then(function (userdata) {
            data = userdata;
        });
    });

    beforeEach(function () {
        cy.sessionLogin(data.kam_username, data.kam_password);
        cy.visit(KAM_URL.HOME_PAGE);
        SoTestData.Authentication()
        cy.viewport('samsung-s10')
        BtrHomePage
            .validateOrderLandingButton()
            .clickOrderLandingButton();



    });

    it("To validate Grn Complete tab is present inside Orders page", () => {

        KamOrderPage
            .validateGrnCompleteTab();
    })

    it("To validate Grn Complete tab label", () => {
        KamOrderPage
            .validateGrnCompleteTab()
            .validateGrnCompleteLabel();
    })

    it("To validate Grn Complete tab icon", () => {
        KamOrderPage
            .validateGrnCompleteTab()
            .validateGrnCompleteIcon();
    })

    it("To validate Grn tab is clickable and lands on the targeted page", () => {
        KamOrderPage
            .validateGrnCompleteTab()
            .clickGrnCompleteTab();
        KamGrnCompletePage
            .validateGrnCompleteOrderPage();
    })

    it.skip("To check whether after acknowledegeGrn, Sale order state is Grn Complete (Costumer Logistics)", () => {
        SoTestData
            .Authentication()
            .SaleEnquiryCreationConsumerVehicle()
            .SOCreationFromApi()
            .ChangeUserToMandiManager()
            .getShipmentID()
            .FullAllot()
            .createTripConsumerVehicle()
            .TruckArrival()
            .initiateLoading()
            .completeLoading()
            .TruckDispatch()
            .RecordArrival()
            .InitiateGRN()
        cy.get('@createdSoID').then((soID) => {
            cy.viewport('samsung-note9')
            KamOrderPage.clickDeliveredTab()
            KamDelievredPage
                .clickOrdersCard(soID)
                .validateAcknowlegeGrn()
            cy.wait(2000)
            BtrHomePage.clickHomeIcon()
                .clickOrderLandingButton()
            KamOrderPage.clickGrnCompleteTab()
            KamGrnCompletePage.clickOrderFromlistings(soID)
                .validatePerformaInvoice()
        })

    });

    it.skip("To check whether after acknowledegeGrn, Sale order state is Grn Complete (Vegrow Logistics)", () => {
        SoTestData
            .Authentication()
            .SECreationFromApi()
            .SOCreationFromApi()
            .ChangeUserToMandiManager()
            .getVehicleIndentId()
            .AddFareFromApi()
            .AcceptFareFromApi()
            .RecordTimeUpdate()
            .getShipmentID()
            .FullAllot()
            .createTrip()
            .TruckArrival()
            .initiateLoading()
            .completeLoading()
            .TruckDispatch()
            .RecordArrival()
            .InitiateGRN()
        cy.get('@createdSoID').then((soID) => {
            cy.viewport('samsung-note9')
            KamOrderPage.clickDeliveredTab()
            KamDelievredPage
                .clickOrdersCard(soID)
                .validateAcknowlegeGrn()
            cy.wait(2000)
            BtrHomePage.clickHomeIcon()
                .clickOrderLandingButton()
            KamOrderPage.clickGrnCompleteTab()
            KamGrnCompletePage.clickOrderFromlistings(soID)
                .validatePerformaInvoice()
        })
    });


})

