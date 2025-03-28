class filter_component
{
    elements =
    {
        flagStatusDropdown: ()=>cy.get("input[id='flagged']").click(),
        flagStatus: (LMDflagStatus)=>cy.get("ul[id='flagged-listbox'] div div").contains(LMDflagStatus),
        filterexecDD:()=>cy.get('input[id="executive"]'),
        selectfilterexec:()=>cy.get('ul[id="executive-listbox"] div div'),
        applyFilterTickButton:()=>cy.get('button[type="submit"]'),
    }


    filterLMDByFlagStatus(LMDflagStatus)
    {
        this.elements.flagStatusDropdown().type(LMDflagStatus);
        this.elements.flagStatus(LMDflagStatus).click();
        this.elements.applyFilterTickButton().click();
        return this;
    }
    filterLMDByExec(executive)
    {
        cy.wait(2000);
        this.elements.filterexecDD().type(executive)
        this.elements.selectfilterexec().contains(executive).click()
        this.elements.applyFilterTickButton().click()
        return this;
    }
}

module.exports=new filter_component();


