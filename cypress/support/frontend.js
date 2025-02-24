// Activate element in the sidepane
// cy.selectSidePaneElement(mbElementSelector);
Cypress.Commands.add( 'selectSidePaneElement', (mbElementSelector) => {
    cy.get('div.container-accordion').each(($container, index) =>{
        const $mbElement = $container.find(mbElementSelector);
        if($mbElement.length > 0 ){
            const cssClass = $mbElement.attr('class');
            cy.CyLog('Test Layertree', `sidepane class to activate: ${cssClass}`)
            cy.get(`div#accordion${index + 1}`).click();
        }
    })
})