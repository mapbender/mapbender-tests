
// showLayerNodes
// cy.showLayerNodes({ _layerNodeTitle: 'Node title' })
Cypress.Commands.add('showLayerNodes', ({_layerNodeTitle: layerNodeTitle}) => {
    cy.CyLog('showLayerNodes( layerNodeTitle ) - layerNodeTitle: ', layerNodeTitle);
    cy.get('span.layer-title[title="'+layerNodeTitle+'"]').then(($elem) => {

            if ($elem.parent().siblings('ul.layers').length > 0){
                cy.showLayerNode({_layerNodeTitle: layerNodeTitle});
                cy.wrap($elem)
                    .parent()
                    .siblings('ul.layers')
                    .find('span.layer-title')
                    .then($subElem =>{

                        for(let i = 0; i < $subElem.length; i++){
                            cy.showLayerNodes({_layerNodeTitle: $subElem[i].title});
                        }
                });
            }

    })
})

// showLayerNode
// cy.showLayerNode({ _layerNodeTitle: 'Node title' })
Cypress.Commands.add('showLayerNode', ({_layerNodeTitle: layerNodeTitle}) => {
    cy.CyLog('showLayerNode( layerNodeTitle ) - layerNodeTitle: ',  layerNodeTitle);
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

// hideLayerNode
// cy.hideLayerNode({ _layerNodeTitle: 'Node title' })
Cypress.Commands.add('hideLayerNode', ({_layerNodeTitle: layerNodeTitle}) => {
    cy.CyLog('hideLayerNode( layerNodeTitle ) - layerNodeTitle: ',  layerNodeTitle);

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

// activateLayer
// cy.activateLayer({ _layerNodeTitle: 'Node title' })
Cypress.Commands.add('activateLayer', ({_layerNodeTitle: layerNodeTitle}) => {
    cy.CyLog('activateLayer( layerNodeTitle ) - layerNodeTitle: ',  layerNodeTitle);
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

// deactivateLayer
// cy.deactivateLayer({ _layerNodeTitle: 'Node title' })
Cypress.Commands.add('deactivateLayer', ({_layerNodeTitle: layerNodeTitle}) => {
    cy.CyLog('deactivateLayer( layerNodeTitle ) - layerNodeTitle: ',  layerNodeTitle);
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