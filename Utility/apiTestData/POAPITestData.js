import apiCommands from "../../support/apiCommands"

class POAPITestData {




    POAPITestData() {

        this.Auth;
        this.delivery_id;
        this.manyjsonpayload;
        this.authData;
        this.poData;
    }




    Authentication() {

        cy.fixture("apiFixtures/authentication.json").then((auth) => {
            this.authData = auth

            cy.ApiRequest("POST", this.authData.url, this.authData.body, this.authData.headers, "")

                .then((resp) => {
                    expect(resp.status).to.equal(201);
                    this.Auth = resp.headers['authorization'];
                    cy.log("succesfull");
                    cy.log(this.Auth);

                })


        })
    }



    CreatePO() {
        cy.fixture("apiFixtures/poCreation").then((purchaseOrder) => {
            this.poData = purchaseOrder

            cy.ApiRequest("POST", this.poData.url, this.poData.body, this.poData.headers, "")

                .then((resp) => {

                    expect(resp.status).to.equal(200);
                    const deliveryId = resp.body.delivery_id;
                    this.delivery_id = deliveryId;
                    const shipment_id = resp.body.shipment_ids[0]
                    this.shipment_id = shipment_id
                    cy.log("***********created PO************");
                    
                    cy.fixture("apiFixtures/nficonsumption").then((nfi) => {
                        this.nficonsumption = nfi
                        cy.ApiRequest("POST", this.nficonsumption.url + this.shipment_id, this.nficonsumption.body, this.nficonsumption.headers, "")
                        .then((resp)=> {
                            expect(resp.status).to.equal(200);
                            
                        })
                    })


                    cy.fixture("apiFixtures/getDeliveryId").then((lotdetails) => {
                        this.lotData = lotdetails

                        cy.ApiRequest("GET", this.lotData.url + deliveryId + "&dc=true", this.lotData.body, this.lotData.headers, "")
                        


                            .then((resp) => {
                                expect(resp.status).to.equal(200);
                                cy.log("Response body0: " + JSON.stringify(resp.body))

                                const modifiedItems = resp.body.items.map(item =>
                                ({
                                    ...item,
                                    quantity: 2
                                }));

                                const manyjsonpayload =
                                {

                                    lots: modifiedItems

                                }
                                cy.log("manyjsonpayload0: " + JSON.stringify(manyjsonpayload))


                                this.manyjsonpayload = manyjsonpayload;

                                cy.fixture("apiFixtures/poReceivemany").then((receive) => {
                                    this.receiveQty = receive


                                    cy.ApiRequest("PUT", this.receiveQty.url, manyjsonpayload, this.receiveQty.headers, "")

                                        .then((resp) => {
                                            cy.log("manyjsonpayload2: " + JSON.stringify(manyjsonpayload))
                                            cy.log("Response body3: " + JSON.stringify(resp))
                                            expect(resp.status).to.equal(200);
                                            cy.log("Manyjson  Response API Done")
                                            


                                            cy.fixture("apiFixtures/poCompleteStatus").then((status) => {
                                                this.completeStatus = status
                                                
                                                cy.ApiRequest("PUT", this.completeStatus.url+ this.delivery_id, this.completeStatus.headers, "")
                                                
                                                    .then((resp) => {
                                                        cy.log("status Response: " + JSON.stringify(resp))
                                                        // expect(resp.status).to.equal(200);
   
                                                    }) 
                                            })
                                        })
                                })
                            })
                    })
                })
        })


    }
}

module.exports = new POAPITestData();







