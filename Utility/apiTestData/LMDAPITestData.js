import apiCommands from "../../support/apiCommands"

class LMDTestData {
    constructor() {

        this.LMDData;
        this.Qty;
        this.LMD_id;
        this.avg_wt;
        this.lot_id;
        this.attachment;
        this.TruckData;

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

    LMDCreation(executive_id) {

        cy.fixture("apiFixtures/lmdCreation.json").then((LMD) => {

            const currentTimestamp = new Date().getTime();
            cy.log("millis:" + currentTimestamp)
            LMD.body.last_mile_delivery.delivery_date = currentTimestamp
            LMD.body.last_mile_delivery.executive_id= executive_id
            this.LMDData = LMD

            cy.ApiRequest("POST", this.LMDData.url, this.LMDData.body, this.LMDData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(200);

                    this.LMD_id = resp.body.response_data.id
                    cy.log('LMD ID:', this.LMD_id);
                })
        })
    }


    MarkReady() {   
        cy.fixture("apiFixtures/markReady.json").then((status) => {
            this.StatusUpdate = status

            cy.ApiRequest("PATCH", this.StatusUpdate.url + "/" + this.LMD_id, this.StatusUpdate.body, this.StatusUpdate.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(200);
                })
        })


    }

    GetInventoryAndAllot() {
        cy.fixture("apiFixtures/getInventory.json").then((Inv) => {
            this.InvData = Inv


            cy.ApiRequest("GET", this.InvData.url, this.InvData.body, this.InvData.headers, this.InvData.params)

                .then((resp) => {
                    expect(resp.status).to.equal(200);

                    this.Qty = resp.body.items[0].current_quantity;
                    this.avg_wt = resp.body.items[0].average_weight;
                    this.lot_id = resp.body.items[0].id;

                    cy.fixture("apiFixtures/allot.json").then((Allot) => {

                        Allot.body.last_mile_delivery_item_id = this.LMD_id;
                        Allot.body.lots.input[0].lot_id = this.lot_id;
                        Allot.body.lots.output[0].average_weight = this.avg_wt;
                        Allot.body.lots.input[0].quantity = this.Qty;
                        Allot.body.lots.output[0].quantity = this.Qty
                        this.AllotData = Allot
                        cy.ApiRequest("POST", this.AllotData.url, this.AllotData.body, this.AllotData.headers, "")

                            .then((resp) => {
                                expect(resp.status).to.equal(200);
                            })
                    })
                })

        })
    }



    TruckDetails() {
        cy.fixture("apiFixtures/directUpload.json").then((upload) => {
            this.UploadData = upload
            cy.ApiRequest("POST", this.UploadData.url, this.UploadData.body, this.UploadData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(200);
                    const attachment = resp.body.signed_id;
                    cy.log("upload image :" + attachment)


                    cy.fixture("apiFixtures/truck_TruckInventory.json").then((truckInv) => {
                        truckInv.body.truck.truck_photos[0] = attachment
                        this. TruckData = truckInv
                        truckInv.body.truck.last_mile_delivery_id = this.LMD_id
                        cy.log(JSON.stringify(truckInv, null, 2))
                        cy.ApiRequest("POST", this.TruckData.url, this.TruckData.body, this.TruckData.headers, "")
                            .then((resp) => {
                                // expect(resp.status).to.equal(500);

                            })
                    })
                })
            cy.fixture("apiFixtures/markReady.json").then((status) => {
                this.StatusUpdate = status
                cy.log(status);
                cy.ApiRequest("PATCH", this.StatusUpdate.url + "/" + this.LMD_id, this.StatusUpdate.body1, this.StatusUpdate.headers, "")
                    .then((resp) => {
                        expect(resp.status).to.equal(200);
                    })



            })
        })
    }



}

module.exports = new LMDTestData();