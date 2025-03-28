class TruckDetailsPage
{
    elements={

        selectDeliveryPersonDrpdwn :()=> cy.get("#driver"),
        selectDeliveryPerson :()=> cy.get("#driver-listbox div div"),  
        truckNumber:()=>cy.get('input[placeholder="Enter Truck Number"]'),
        driverName:()=>cy.get('input[placeholder="Enter Driver name"]'),
        driverNumber:()=>cy.get('input[placeholder="Enter Driver Number"]'),
        sealNumber:()=>cy.get('input[placeholder="Enter Seal Number"]'),     
        uploadAttachment:()=>cy.get('span').contains('Upload'),
        save:()=>cy.get('span').contains(/Save$/),
        successMsg:()=>cy.get('div[id="notistack-snackbar"]'),
        fileUpload:()=> cy.get('input[type=file]')

    }

    enterTruckNumber(truckNumber)
    {
        this.elements.truckNumber().clear();
        this.elements.truckNumber().type(truckNumber);
        return this;
    }

    enterDriverName(driverNamer)
    {
        this.elements.driverName().clear().type(driverNamer);
        return this;
    }

    enterDriverNumber(driverNumber)
    {
        this.elements.driverNumber().clear().type(driverNumber);
        return this;
    }

    enterSealNumber(sealNumber)
    {
        this.elements.sealNumber().clear().type(sealNumber);
        return this;
    }

    clickUploadAttachment()
    {
        this.elements.uploadAttachment().click();
        return this;
    }

    clickSave()
    {
        cy.wait(2000);
        this.elements.save().click();
        return this;
    }
    clickSelectDeliveryPerson()
    {
        this.elements.selectDeliveryPersonDrpdwn().click();
        return this;
    }
    selectDeliveryPerson(deliveryPerson)
    {
        this.elements.selectDeliveryPerson().contains(deliveryPerson).click();
        return this;
    }
    verifyUpdateMsg()
    {
        
        this.elements.successMsg().should('have.text','Truck details updated successfully.');
        return this;
    }

    verifySucessMsg()
    {
        this.elements.successMsg().should('have.text','Truck details added successfully.');
        return this;
    }

    selectAttachement()
    {
        this.elements.fileUpload().invoke('show').selectFile('cypress/Utility/Upload files/meme4.png');
        return this;
    }
   
    }


module.exports=new TruckDetailsPage();