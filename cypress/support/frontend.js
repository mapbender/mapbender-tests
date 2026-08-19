// Activate element in the sidepane
// cy.selectSidePaneElement(mbElementSelector);
Cypress.Commands.add( 'selectSidePaneElement', (mbElementSelector) => {
    cy.get('div.container-accordion, div.list-group-item-content').each(($container, index) =>{
        const $mbElement = $container.find(mbElementSelector);
        if($mbElement.length > 0 ){
            const cssClass = $mbElement.attr('class');
            cy.CyLog('Test Layertree', `sidepane class to activate: ${cssClass}`)
            cy.get(`div#accordion${index + 1}, div#list_group_item${index + 1}`).click();
            cy.wait(300);
        }
    })
})