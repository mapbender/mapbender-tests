//
// cy.checkLayerTree({ _layerNodeName: 'Fachdaten (DB)' })
Cypress.Commands.add('checkLayerTree', ({_layerNodeTitle: layerNodeTitle}) => {

    cy.CyLog('LayerTree Check: ', layerNodeTitle)

    cy.get('.mb-element-layertree [title="'+layerNodeTitle+'"]')
        .siblings(`[title="öffnen/schließen"]`)
        .then($el => {

        if ($el.hasClass('active')){
            cy.CyLog('LOG: Layerknoten','open')
        }else {
            cy.CyLog('LOG: ', 'Layerknoten closed')
            cy.get('.mb-element-layertree [title="'+layerNodeTitle+'"]')
                .siblings(`[title="öffnen/schließen"]`)
                .click();
        }
    })

    cy.activateLayer({_layerNodeTitle: layerNodeTitle})

})

// cy.layerNodeRecursion({ _layerNodeTitle: 'Fachdaten (DB)' })
Cypress.Commands.add('layerNodeRecursion', ({_layerNodeTitle: layerNodeTitle}) => {

    cy.get('span.layer-title[title="'+layerNodeTitle+'"]').then(($elem) => {

            if ($elem.parent().siblings('ul.layers').length > 0){
                cy.showLayerTree({_layerNodeTitle: layerNodeTitle});
                cy.wrap($elem)
                    .parent()
                    .siblings('ul.layers')
                    .find('span.layer-title')
                    .then($subElem =>{
                        cy.CyLog('Test Layer',"Count Sublayer: " + $subElem.length);
                        for(let i = 0; i < $subElem.length; i++){
                            cy.CyLog('######', 'span Title: ' + $subElem[i].title);
                            //cy.CyLog('<<<<<<', 'Unterlayer nummmmber: ' + (i + 1));
                            cy.layerNodeRecursion({_layerNodeTitle: $subElem[i].title});
                        }
                });
                // cy.CyLog('DEV', 'Hat Unterlayer!!');
            }
            // else
            // {
            //     cy.CyLog('DEV', 'Hat KEINE Unterlayer!!');
            // }
    })
})

Cypress.Commands.add('showLayerTree', ({_layerNodeTitle: layerNodeTitle}) => {
    cy.CyLog('Test LayerTree show: ',  layerNodeTitle);
    cy.get('.mb-element-layertree [title="'+layerNodeTitle+'"]')
        .siblings(`span[data-test="mb-lt-layer-folder-icon"]`)
        .then($el =>{

            // class active: Layer is shown allready; class disabled-placeholder: No dependent layers
            if($el.children('i').hasClass('fa-folder')) {
                cy.get('.mb-element-layertree [title="'+layerNodeTitle+'"]')
                    .siblings(`span[data-test="mb-lt-layer-folder-icon"]`)
                    .click()
            }
    })
})

Cypress.Commands.add('hideLayerTree', ({_layerNodeTitle: layerNodeTitle}) => {
    cy.CyLog('Test LayerTree hide: ',  layerNodeTitle);
    //cy.CyLog('TEST', 'call hideLayerTree with layerNodeTitle: ' + layerNodeTitle)

    cy.get('.mb-element-layertree [title="'+layerNodeTitle+'"]')
        .siblings(`span[data-test="mb-lt-layer-folder-icon"]`)
        .then($el =>{

            if($el.children('i').hasClass('fa-folder-open')) {

                cy.get('.mb-element-layertree [title="'+layerNodeTitle+'"]')
                    .siblings(`span[data-test="mb-lt-layer-folder-icon"]`)
                    .click();
            }
    });
});

Cypress.Commands.add('activateLayer', ({_layerNodeTitle: layerNodeTitle}) => {
    cy.CyLog('Test LayerTree activate: ',  layerNodeTitle);
    cy.get('.mb-element-layertree [title="'+layerNodeTitle+'"]')
        .siblings(`span[data-test="mb-lt-layer-visibility"]`)
        .then($el =>{

            if(!$el.hasClass('active')) {

                cy.get('.mb-element-layertree [title="'+layerNodeTitle+'"]')
                    .siblings(`span[data-test="mb-lt-layer-visibility"]`)
                    .click()
            }
    })
})

Cypress.Commands.add('deactivateLayer', ({_layerNodeTitle: layerNodeTitle}) => {
    cy.CyLog('Test LayerTree deactivate: ',  layerNodeTitle);
    cy.get('.mb-element-layertree [title="'+layerNodeTitle+'"]')
        .siblings(`span[data-test="mb-lt-layer-visibility"]`)
        .then($el =>{

            if($el.hasClass('active')) {

                cy.get('.mb-element-layertree [title="'+layerNodeTitle+'"]')
                    .siblings(`span[data-test="mb-lt-layer-visibility"]`)
                    .click()
            }
    })
})