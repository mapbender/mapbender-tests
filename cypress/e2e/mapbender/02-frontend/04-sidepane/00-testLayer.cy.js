describe('Test layer', () => {
    const myApp = Cypress.env('application');
    const myAppTitle = myApp['title'];
    const myAppSlug = myApp['slug'];
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    });

    const myUrl = mainUrl + 'application/' + myAppSlug;
    // create selector for layertree
    const mbSelector = 'div.accordion-cell div.mb-element-layertree';
    it('test layertree', () => {
        cy.CyLog("Test layertree", "Start");
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.visit(myUrl);

        // activate Layertree.
        cy.selectSidePaneElement( mbSelector );

        /**
         * Read and process all main layer nodes
         * elements: Array with Layer Node Namen
         */
        cy.get('li.serviceContainer')
            .children('div.leaveContainer')
            .children('span.layer-title')
            .then($elems =>{
                for(let i = 0; i < $elems.length; i++){
                    cy.CyLog('Test Layertree: ', 'Test layer name: ' + $elems[i].title);
                    cy.showBanner('Test Layertree Node: ' + $elems[i].title);

                    cy.showLayerNode({_layerNodeTitle: $elems[i].title});
                    cy.deactivateLayer({_layerNodeTitle: $elems[i].title});
                    cy.activateLayer({_layerNodeTitle: $elems[i].title});
                    cy.showLayerNodes({_layerNodeTitle: $elems[i].title});
                    cy.wait(2000);
                    cy.hideLayerNode({_layerNodeTitle: $elems[i].title});
                }
            })

        cy.visit(mainUrl);
        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test Layertree", "End");
    })

})