import apiCommands from "../../support/apiCommands";
import { ENDPOINTS } from "../../constants/endpoints";
import DateTimeUtils from "../../Utility/dateTimeUtils"

class SoAPITestData {
    constructor() {
        this.SeId;
    }

    Authentication() {
        cy.fixture("apiFixtures/authentication.json").then((auth) => {
            this.authData = auth;
            const user1Body = {
                user: auth.body.user
            };
            cy.ApiRequest("POST", ENDPOINTS.AUTHENTICATION , user1Body, this.authData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(201);
                    this.Auth = resp.headers['authorization'];
                    cy.log("Authentication successful");
                    cy.log(this.Auth);
                });
        });
        return this;
    }

    SECreationFromApi() {
        cy.fixture("apiFixtures/soCreation.json").then((SE) => {
            const currentTime = new Date();
            currentTime.setDate(currentTime.getDate() + 2);
            const deliveryDateTimestamp = currentTime.getTime();

            SE.sebody.indent.delivery_date = deliveryDateTimestamp;
            SE.sebody.indent.indent_metadata.enquiry_created_time = DateTimeUtils.getCurrentEpochTimeInMilliseconds() 
            this.SEData = SE;
            
            cy.ApiRequest("POST", ENDPOINTS.SALE_ENQUIRY , this.SEData.sebody, this.SEData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(200);
                    cy.log("Successfully Created SE");
                    this.SeId = resp.body.response_data.id;
                    cy.wrap(this.SeId).as('createdSeId');
                    cy.log(this.SeId);
                });
        });
        return this; 
    }

    SaleEnquiryCreationConsumerVehicle()
    {
        cy.fixture("apiFixtures/soCreationConsumerVehicle.json").then((SE) => {
            const currentTime = new Date();
            currentTime.setDate(currentTime.getDate() + 2);
            const deliveryDateTimestamp = currentTime.getTime();

            SE.sebody.indent.delivery_date = deliveryDateTimestamp;
            SE.sebody.indent.indent_metadata.enquiry_created_time = DateTimeUtils.getCurrentEpochTimeInMilliseconds()
            this.SEData = SE;
            
            cy.ApiRequest("POST", ENDPOINTS.SALE_ENQUIRY , this.SEData.sebody, this.SEData.headers, "")
                .then((resp) => {
                    cy.log(JSON.stringify(resp))
                    expect(resp.status).to.equal(200);
                    cy.log("Successfully Created SE");
                    this.SeId = resp.body.response_data.id;
                    cy.wrap(this.SeId).as('createdSeId');
                    cy.log(this.SeId);
                });
        });
        return this; 
    }

    SOCreationFromApi() {
        cy.fixture("apiFixtures/soCreation.json").then((SO) => {
            this.SOData = SO;
            
            cy.ApiRequest("PUT", ENDPOINTS.SALE_ORDER(this.SeId) , this.SOData.sobody, this.SEData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(200);
                    cy.log("Successfully Created SO");
                    this.SoID = resp.body.response_data.sale_order_id;
                    cy.wrap(this.SoID).as('createdSoID');
                });
        });
        return this; 
    }

    createSalesEnquiryWithMultipleProducts() {
        cy.fixture("apiFixtures/soCreationMultipleQuantity.json").then((SE) => {
            const twoDaysFromNow = new Date();
            twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
            const deliveryDateTimestamp = twoDaysFromNow.getTime();

            SE.sebody.indent.delivery_date = deliveryDateTimestamp;
            this.SEData = SE;

            cy.ApiRequest("POST", ENDPOINTS.SALE_ENQUIRY, this.SEData.sebody, this.SEData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(200);
                    cy.log("Successfully Created SE");
                    this.SeId = resp.body.response_data.id;
                    cy.wrap(this.SeId).as('createdSeId');
                    cy.log(this.SeId);
                });
        });
        return this; 
    }

    ChangeUserToMandiManager() {
        cy.fixture("apiFixtures/authentication.json").then((auth) => {
            this.authData = auth;

            cy.ApiRequest("DELETE", ENDPOINTS.LOGOUT , this.authData.body, this.authData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(204);
                    cy.log("LogOut successful");
                });

                const user2Body = {
                    user: auth.body.user2
                };


            cy.ApiRequest("POST", ENDPOINTS.AUTHENTICATION , user2Body, this.authData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(201);
                    this.Auth = resp.headers['authorization'];
                    cy.log("Authentication successful");
                    cy.log(this.Auth);
                });
        });
        return this;    
    }

    getVehicleIndentId() {
        cy.fixture("apiFixtures/getVehicleIndent.json").then((data) => {
            this.vehicleData = data;

            cy.ApiRequest("GET", ENDPOINTS.VEHICLE_INDENT(this.SoID) , this.vehicleData.body, this.vehicleData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(200);
                    cy.log("Successfully fetched Vehicle indent ID");
                    this.vehicleRequestID = resp.body.vehicle_indent.id;
                    cy.wrap(this.vehicleRequestID).as('vehicleRequest');
                    cy.log(this.vehicleRequestID);
                });
        });
        return this; 
    }

    AddFareFromApi() {
        cy.fixture("apiFixtures/addFare.json").then((data) => {
            this.fareData = data;
            this.fareData.addFareBody.vehicle_indent.id = this.vehicleRequestID;

            cy.ApiRequest("PATCH", ENDPOINTS.ADD_FARE(this.vehicleRequestID) , this.fareData.addFareBody, this.fareData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(200);
                    cy.log("Successfully added fare for vegrow logistics");
                });
        });
        return this;
    }

    AcceptFareFromApi() {
        cy.fixture("apiFixtures/acceptFarePrice.json").then((data)=> {
            this.fareData = data;
            this.fareData.body.vehicle_indent.id = this.vehicleRequestID;

            cy.ApiRequest("PUT", ENDPOINTS.ACCEPT_FARE(this.vehicleRequestID), this.fareData.body, this.fareData.headers, "")
            .then((resp) => {
                expect(resp.status).to.equal(200);
                cy.log("Successfully Accepted Fare for vegrow logistics");
            });
        })
        return this;
    }

    RecordTimeUpdate() {
        cy.fixture("apiFixtures/reportingTimeUpdate.json").then((data) => {
            const currentTime = new Date().toISOString();
            
            data.body.vehicle_indent.id = this.vehicleRequestID;
            data.body.vehicle_indent.expected_loading_time = currentTime;
    
            cy.ApiRequest(
                "PATCH", 
                ENDPOINTS.REPORT_TIME_UPDATE(this.vehicleRequestID), 
                data.body,  
                data.headers, 
                ""
            ).then((resp) => {
                expect(resp.status).to.equal(200);
                cy.log("Successfully Reported Time");
            });
        });
        return this;
    }

    getShipmentID() {
        cy.fixture("apiFixtures/getVehicleIndent.json").then((data)=> {
            this.vehicleData = data;

            cy.ApiRequest("GET", ENDPOINTS.SHIPMENT_ID(this.SoID) , this.vehicleData.body, this.vehicleData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(200);
                    cy.log("Successfully fetched shipment ID");
                    this.shipmentID = resp.body.recipient.sale_order_items[0].id;
                    cy.wrap(this.shipmentID).as('shipmentCreated');
                    cy.log(this.shipmentID);
                });
        });
        return this; 
    }

    FullAllot() {
        cy.fixture("apiFixtures/kamAllot.json").then((data)=> {
            this.shipmentData = data;
            this.shipmentData.body.sale_order_item.id = this.shipmentID;

            cy.ApiRequest("PUT", ENDPOINTS.ALLOT_ITEM(this.shipmentID) , this.shipmentData.body, this.shipmentData.headers, "")
                .then((resp) => {
                    expect(resp.status).to.equal(200);
                    this.saleOrderItemID = resp.body.id;
                    cy.wrap(this.saleOrderItemID).as('saleOrderItemID');
                    cy.log(`Successfully alloted the quantity. Sale Order Item ID: ${this.saleOrderItemID}`);
                });
        });
        return this; 
    }

    createTrip() {
        cy.fixture("apiFixtures/addNewTrips.json").then((data) => {
            this.tripData = data;
    
            this.tripData.body.trip.delivery_order_shipment_ids = [this.shipmentID];
            this.tripData.body.trip.pickup_order_shipment_ids = [this.shipmentID];
            this.tripData.body.trip.shipments[0].id = this.shipmentID;
            this.tripData.body.trip.shipments[0].identifier = `SHIP/KAM /${this.shipmentID}`;
            this.tripData.body.trip.shipments[0].recipient_id = this.SoID;
            this.tripData.body.trip.shipments[0].recipient_name = `KAM Order Customer one (SO-${this.SoID})`;
            this.tripData.body.trip.shipments[0].shipment_items[0].id = this.saleOrderItemID;
            this.tripData.body.trip.shipments[0].shipment_items[0].sale_order_id = this.SoID;
            this.tripData.body.trip.shipments[0].vehicle_indent_id = this.vehicleRequestID;
    
            cy.ApiRequest(
                "POST",
                ENDPOINTS.CREATE_TRIP,
                this.tripData.body, 
                this.tripData.headers, 
                "" 
            ).then((resp) => {
                expect(resp.status).to.equal(200);
                this.tripId = resp.body.id;
                this.deliveryID = resp.body.deliveries[0].id;
                cy.wrap(this.deliveryID).as('deliveryID')
                cy.wrap(this.tripId).as('tripID');
                cy.log(`Successfully created the delivery. Delivery ID is : ${this.deliveryID}`);
                cy.log(`Successfully created the trip. Trip ID is : ${this.tripId}`);
            });
        });
    
        return this;
    }

    createTripConsumerVehicle() {
        cy.fixture("apiFixtures/addNewTripsConsumerVehicle.json").then((data) => {
            this.tripData = data;
    

            this.tripData.body.trip.delivery_order_shipment_ids = [this.shipmentID];
            this.tripData.body.trip.pickup_order_shipment_ids = [this.shipmentID];
    

            this.tripData.body.trip.shipments[0].id = this.shipmentID;
            this.tripData.body.trip.shipments[0].identifier = `SHIP/KAM /${this.shipmentID}`;
            this.tripData.body.trip.shipments[0].recipient.comments = `Enquiry ${this.SeId} converted to SO`;
            this.tripData.body.trip.shipments[0].recipient.id = this.SoID;
            this.tripData.body.trip.shipments[0].recipient.label = `SO-${this.SoID}/15-Jan/KAM Order Customer one/Rajiv Nagar, Vanagaram, Chennai, Tamil Nadu`;
            this.tripData.body.trip.shipments[0].recipient.sale_order_items[0].id = this.saleOrderItemID;
            this.tripData.body.trip.shipments[0].recipient.sale_order_items[0].sale_order_id = this.SoID;
            this.tripData.body.trip.shipments[0].recipient_id = this.SoID;
            this.tripData.body.trip.shipments[0].recipient_name = `KAM Order Customer one (SO-${this.SoID})`;
    
            this.tripData.body.trip.shipments[1].id = this.shipmentID;
            this.tripData.body.trip.shipments[1].identifier = `SHIP/KAM /${this.shipmentID}`;
            this.tripData.body.trip.shipments[1].recipient.comments = `Enquiry ${this.SeId} converted to SO`;
            this.tripData.body.trip.shipments[1].recipient.id = this.SoID;
            this.tripData.body.trip.shipments[1].recipient.label = `SO-${this.SoID}/15-Jan/KAM Order Customer one/Rajiv Nagar, Vanagaram, Chennai, Tamil Nadu`;
            this.tripData.body.trip.shipments[1].recipient.sale_order_items[0].id = this.saleOrderItemID;
            this.tripData.body.trip.shipments[1].recipient.sale_order_items[0].sale_order_id = this.SoID;
            this.tripData.body.trip.shipments[1].recipient_id = this.SoID;
            this.tripData.body.trip.shipments[1].recipient_name = `KAM Order Customer one (SO-${this.SoID})`;
    
            cy.ApiRequest(
                "POST",
                ENDPOINTS.CREATE_TRIP,
                this.tripData.body,
                this.tripData.headers,
                ""
            ).then((resp) => {
                expect(resp.status).to.equal(200);
                this.tripId = resp.body.id;
                this.deliveryID = resp.body.deliveries[0].id;
                cy.wrap(this.deliveryID).as('deliveryID')
                cy.wrap(this.tripId).as('tripID');
                cy.log(`Successfully created the delivery. Delivery ID is : ${this.deliveryID}`);
                cy.log(`Successfully created the trip. Trip ID is : ${this.tripId}`);
            });
        });
        return this;
    }

    
    TruckArrival() {
        cy.fixture("apiFixtures/truckArrival.json").then((data) => {
            const currentTime = new Date().getTime(); 
    
            data.body.pickup.vehicle_arrival_time = currentTime;
            data.body.pickup.shipment_id = this.shipmentID;
    
            cy.ApiRequest(
                "PUT", 
                ENDPOINTS.VEHICLE_ARRIVAL(this.tripId), 
                data.body, 
                data.headers, 
                ""
            ).then((resp) => {
                expect(resp.status).to.equal(200);
                cy.log("Successfully Recorded Truck arrival time");
            });
        });
        return this;
    }

    initiateLoading() {
        cy.fixture("apiFixtures/initiateLoading.json").then((data) => {
            const currentTime = Date.now(); 

            data.body.loading_details_json.start_time = currentTime;
    
            cy.ApiRequest(
                "PUT",
                ENDPOINTS.VEHICLE_ARRIVAL(this.tripId), 
                data.body,
                data.headers,
                ""
            ).then((resp) => {
                expect(resp.status).to.equal(200);
                this.loadingStartTime = resp.body.loading_details_json.start_time;
                cy.log("Successfully initiated loading");
            });
        });
        return this;
    }
    
    completeLoading() {
        cy.fixture("apiFixtures/completeLoading.json").then((data) => {

            const currentTime = Date.now(); 
    
            data.body.loading_details_json.start_time = this.loadingStartTime;
            data.body.loading_details_json.end_time = currentTime;
    
            cy.ApiRequest(
                "PUT",
                ENDPOINTS.VEHICLE_ARRIVAL(this.tripId),
                data.body,
                data.headers,
                ""
            ).then((resp) => {
                expect(resp.status).to.equal(200);
                cy.log("Successfully recorded the complete loading details");
            });
        });
        return this;
    }

    TruckDispatch() {
        cy.fixture("apiFixtures/truckDispatch.json").then((data) => {
            const currentTime = Date.now();
            
            data.body.vehicle_dispatch_time = currentTime;
            
            data.body.shipment_id = this.shipmentID;
    
            cy.ApiRequest(
                "PUT", 
                ENDPOINTS.VEHICLE_ARRIVAL(this.tripId), 
                data.body,  
                data.headers, 
                ""
            ).then((resp) => {
                expect(resp.status).to.equal(200);
                cy.log("Successfully dispatched the truck");
            });
        });
        return this;
    }

    RecordArrival()
    {
        cy.fixture("apiFixtures/RecordArrival.json").then((data) =>{

            const currentTime = Date.now();

            data.body.delivery.vehicle_arrival_time = currentTime;
            
            cy.ApiRequest(
                "PUT", 
                ENDPOINTS.RECORD_ARRIVAL(this.deliveryID), 
                data.body,  
                data.headers, 
                ""
            ).then((resp) => {
                expect(resp.status).to.equal(200);
                cy.log(`Successfully Recorded the arrival the truck ${this.deliveryID}`);
            });
        })
        return this;
    }

    InitiateGRN()
    {
        cy.fixture("apiFixtures/initiateGrn.json").then((data) =>{

            data.body.sale_order_id = this.deliveryID ;
            data.body.sale_order_items[0].id = this.deliveryID
            cy.ApiRequest(
                "PUT", 
                ENDPOINTS.PUT_INITIATE_GRN(this.deliveryID), 
                data.body,  
                data.headers, 
                ""
                
            ).then((resp) => {
                expect(resp.status).to.equal(200);
                cy.log(`Successfull Initiated GRN is Done for Sale Order Id: ${this.deliveryID}`);
            });
        })
        return this;

    }
    
    
}

    

module.exports = new SoAPITestData();