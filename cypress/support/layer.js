//
// cy.checkLayerTree({ _layerNodeName: 'Fachdaten (DB)' })
Cypress.Commands.add('checkLayerTree', ({_layerNodeName: layerNodeName}) => {

    cy.CyLog('LayerNodeName', layerNodeName)

    cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
        .siblings(`[title="öffnen/schließen"]`)
        .then($el => {

        if ($el.hasClass('active')){
            cy.CyLog('LOG: Layerknoten','open')
        }else {
            cy.CyLog('LOG: ', 'Layerknoten closed')
            cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
                .siblings(`[title="öffnen/schließen"]`)
                .click();
        }
    })

    cy.activateLayer({_layerNodeName: layerNodeName})

})

// cy.layerNodeRecursion({ _layerNodeName: 'Fachdaten (DB)' })
Cypress.Commands.add('layerNodeRecursion', ({_layerNodeName: layerNodeName}) => {

    //cy.CyLog('dev',  'layerNodeRecursion Layer: ' + layerNodeName)
    cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
        .then($elem =>{

            const hasClass = $elem.parent().siblings('ul.layers').length > 0

            if (hasClass){
                $elem.parent()
                    .siblings('ul.layers')
                    .find('span.layer-title')
                    .then($underElem =>{
                        const z = $underElem.length
                        cy.CyLog('dev',"Anzahl Unterlayer: " + z);
                        for(let i = 0; i < z; i++){

                        }
                })

                cy.CyLog('DEV', 'Hat Unterlayer!!')
            }else {
                cy.CyLog('DEV', 'Hat KEINE Unterlayer!!')
            }
    })
})

Cypress.Commands.add('showLayerTree', ({_layerNodeName: layerNodeName}) => {

    cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
        .siblings(`[title="öffnen/schließen"]`)
        .then($el =>{

            // class active: Layer is shown allready; class disabled-placeholder: No dependent layers
            if(!$el.hasClass('active') && !$el.hasClass('disabled-placeholder')) {

                cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
                    .siblings(`[title="öffnen/schließen"]`)
                    .click()
                //cy.CyLog('LOG:',  'Layernode open (' + layerNodeName + ')')
            }
    })
})

Cypress.Commands.add('hideLayerTree', ({_layerNodeName: layerNodeName}) => {
    cy.CyLog('TEST', 'call hideLayerTree with layerNodeName: ' + layerNodeName)

    cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
        .siblings(`[title="öffnen/schließen"]`)
        .then($el =>{

            if($el.children('i').hasClass('fa-folder-open')) {

                cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
                    .siblings(`[title="öffnen/schließen"]`)
                    .click()
                //cy.CyLog('LOG:',  'Layernode close (' + layerNodeName + ')')
            }
    })
})

Cypress.Commands.add('activateLayer', ({_layerNodeName: layerNodeName}) => {

    cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
        .siblings(`[title="Sichtbarkeit an/aus"]`)
        .then($el =>{

            if(!$el.hasClass('active')) {

                cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
                    .siblings(`[title="Sichtbarkeit an/aus"]`)
                    .click()
                //cy.CyLog('LOG:', 'Layernode activated (' + layerNodeName + ')')
            }
    })
})

Cypress.Commands.add('deactivateLayer', ({_layerNodeName: layerNodeName}) => {

    cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
        .siblings(`[title="Sichtbarkeit an/aus"]`)
        .then($el =>{

            if($el.hasClass('active')) {

                cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
                    .siblings(`[title="Sichtbarkeit an/aus"]`)
                    .click()
                //cy.CyLog('LOG:', 'Layernode deactivated (' + layerNodeName + ')')
            }
    })
})