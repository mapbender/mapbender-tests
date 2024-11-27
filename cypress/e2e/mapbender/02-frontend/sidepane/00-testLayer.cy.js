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
    it('Test LayerTree', () => {
        cy.CyLog("Test Layertree", "Start");
        //cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.visit(myUrl);

        // activate Layertree.
        cy.get('div.container-accordion').each(($container, index) =>{
            const $mbElement = $container.find(mbSelector);
            if($mbElement.length > 0 ){
                const cssClass = $mbElement.attr('class');
                cy.CyLog('Test Layertree', `sidepane class to activate: ${cssClass}`)
                cy.get(`div#accordion${index + 1}`).click();
            }
        })

        /**
         * Alle Hauptlayer Nodes auslesen und verarbeiten
         * elements: Array mit Layer Node Namen
         */
        cy.get('li.serviceContainer')
            .children('div.leaveContainer')
            .children('span.layer-title')
            .then($elems =>{
                for(let i = 0; i < $elems.length; i++){
                    cy.CyLog('Test Layertree: ', 'Test layer name: ' + $elems[i].title);

                    cy.showLayerTree({_layerNodeTitle: $elems[i].title});
                    cy.deactivateLayer({_layerNodeTitle: $elems[i].title});
                    cy.wait(1000);
                    cy.activateLayer({_layerNodeTitle: $elems[i].title});
                    cy.wait(1000);
                    cy.layerNodeRecursion({_layerNodeTitle: $elems[i].title});
                    cy.hideLayerTree({_layerNodeTitle: $elems[i].title});
                }
            })

        //cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test Layertree", "End");
    })

})