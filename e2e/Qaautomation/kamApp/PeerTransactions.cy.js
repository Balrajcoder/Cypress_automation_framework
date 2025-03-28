import KamHomePage from "../../../components/pages/KamHomePage";
import KamPeerTransactionsPage from "../../../components/pages/KamPeerTransactionsPage";
import shared_component from "../../../components/common/shared_component";
import header_component from "../../../components/common/header_component";
import footer_component from "../../../components/common/footer_component";


describe('Peer Transactions flow', function() {
    let data;

    before(function() {
        // Load user data from fixture
        cy.fixture("kamLoginPage").then(function(userdata) {
            data = userdata;

        });
    });

    beforeEach(()=> {
        switch (Cypress.currentTest.title) {
            case 'Verify Successful Peer Collection':
            case 'Verify Error message for Collecting more amount than In hand':
                cy.LoginKAM(data.userPeer02, data.password)
                break;
            case 'Verify Amount Deducted from Cash in Hand':
                cy.LoginKAM(data.userPeer04, data.password)
                break;
            default:
                cy.LoginKAM(data.userPeer01, data.password)
                break;
        }

    });

    it('Verify Peer Transactions page Header', ()=> {
        let title = "Peer Transactions";
        KamHomePage.verifyVisibilityOfPeerTransactions();
        KamHomePage.clickPeerTransactions();
        header_component.verifyHeaderTitle(title);
    });

    it('Verify No Collections and Deposits text', ()=> {
        KamHomePage.clickPeerTransactions();
        shared_component.verifyNoDataText("No collections made");
        KamPeerTransactionsPage.clickDepositsTab();
        shared_component.verifyNoDataText("No deposits made");
    });

    it('Verify Mandatory fields in the popup', ()=> {
        let drawerTitle = "Initiate Peer Collection";
        let errorMsg = "Required";
        KamHomePage.clickPeerTransactions();
        KamPeerTransactionsPage.clickInitiatePeerCollection()
            .verifyDrawerTitle(drawerTitle)
            .clickCollectButton()
            .verifyRequiredErrorMsg(errorMsg);
    });

    it('Verify Click on Cancel Button closes the popup', ()=> {
        let drawerTitle = "Initiate Peer Collection";
        KamHomePage.clickPeerTransactions();
        KamPeerTransactionsPage.clickInitiatePeerCollection()
            .verifyDrawerTitle(drawerTitle)
            .clickCancelButton()
            .verifyDrawerIsClosed();
    });

    it('Verify Successful Peer Collection', ()=> {
        // Verify Toast message and Cash in Hand after Collection
        let peerName = "User Peer 01";
        let msg = "Payment Collected Successfully!";
        let cash = "100";
        KamHomePage.clickPeerTransactions();
        KamPeerTransactionsPage.clickInitiatePeerCollection()
            .enterPeerName(peerName)
            .selectPeerInDD()
            .enterAmount(cash)
            .enterRemarks("Test")
            .clickCollectButton()
            .clickSaveButton();
        shared_component.verifyToastSuccessMsg(msg);
        KamPeerTransactionsPage.verifyPeerNameInList(peerName)
            .verifyAmountInList(cash);
        footer_component.clickHomeButton();
        KamHomePage.verifyCashInHand(cash);

    });

    it('Verify Amount Deducted from Cash in Hand', ()=> {
         //Collect cash for the peer user
        let peerName = "User Peer 03";
        let cash = "100";
        let msg = "Payment Collected Successfully!";
        let cashInHand = "900";
        let amount = "100";
        KamHomePage.clickPeerTransactions();
        KamPeerTransactionsPage.clickInitiatePeerCollection()
            .enterPeerName(peerName)
            .selectPeerInDD()
            .enterAmount(cash)
            .enterRemarks("Test")
            .clickCollectButton()
            .clickSaveButton();
        shared_component.verifyToastSuccessMsg(msg);
        cy.LogoutKAM();
        //Verify Amount is deducted from Cash in Hand after successful deposit
        cy.LoginKAM(data.userPeer03, data.password);
        KamHomePage.verifyCashInHand(cashInHand)
            .clickPeerTransactions();
        KamPeerTransactionsPage.clickDepositsTab()
            .verifyAmountInList(amount);
    });

    it('Verify Error message for Collecting more amount than In hand', ()=> {
        //Verify Error message for Collecting more amount than In hand.
        let peerName = "User Peer 01";
        let msg = "Depositor peer doesn't have enough balance to make this cash transfer";
        let cash = "10000";
        KamHomePage.clickPeerTransactions();
        KamPeerTransactionsPage.clickInitiatePeerCollection()
            .enterPeerName(peerName)
            .selectPeerInDD()
            .enterAmount(cash)
            .enterRemarks("Test")
            .clickCollectButton()
            .clickSaveButton();
        shared_component.verifyToastErrorMsg(msg);
    });


    it('Verify Collecting in Negative amount', ()=> {
        //Verify Error message for Collecting in Negative amount
        let peerName = "User Peer 02";
        let msg = "Value should be greater than 0";
        KamHomePage.clickPeerTransactions();
        KamPeerTransactionsPage.clickInitiatePeerCollection()
            .enterPeerName(peerName)
            .selectPeerInDD()
            .enterAmount("-100")
            .enterRemarks("Test")
            .clickCollectButton()
            .verifyAmountShouldNotInNegativeErrorMsg(msg);
    });

    it('Verify Collecting in Float amount', ()=> {
        let peerName = "User Peer 03";
        let cash = "50.12";
        KamHomePage.clickPeerTransactions();
        KamPeerTransactionsPage.clickInitiatePeerCollection()
            .enterPeerName(peerName)
            .selectPeerInDD()
            .enterAmount(cash)
            .enterRemarks("Test")
            .clickCollectButton()
            .clickSaveButton();
        shared_component.verifyToastSuccessMsg("Payment Collected Successfully!");
        KamPeerTransactionsPage.verifyPeerNameInList(peerName)
            .verifyAmountInList(cash);

    });

    it('Verify Closing popup', ()=> {
        //Verify Closing popup using cross icon and cancel button
        let peerName = "User Peer 03";
        let cash = "50.12";
        KamHomePage.clickPeerTransactions();
        KamPeerTransactionsPage.clickInitiatePeerCollection()
            .enterPeerName(peerName)
            .selectPeerInDD()
            .enterAmount(cash)
            .enterRemarks("Test")
            .clickCollectButton()
            .clickPopUpCrossIcon()
            .verifyPopUpIsClosed()
            .clickCollectButton()
            .clickPopUpCancelBtn()
            .verifyPopUpIsClosed();
    });


    it('Verify peer list in the dropdown', ()=> {
        //Verify the Peer list
        let peerList = "Peer 02User Peer 03User Peer 04"
        KamHomePage.clickPeerTransactions();
        KamPeerTransactionsPage.clickInitiatePeerCollection()
            .clickSelectPeerDD()
            .verifyPeerList(peerList)
    });
});