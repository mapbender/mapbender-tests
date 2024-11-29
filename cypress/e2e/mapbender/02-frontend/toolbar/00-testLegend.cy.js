describe('Test Legend', () => {
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
    // create selector for layertree (layers must be activated for legend)
    const mbSelector = 'div.accordion-cell div.mb-element-layertree';
    it('Test', () => {
        cy.CyLog("Test Legend", "Start");
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
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
                    cy.activateLayer({_layerNodeTitle: $elems[i].title});
                }
            })
        // Legende anschalten.
        //cy.get('li[title="Legend"]').click();
        cy.get('span.iconBig > i.fa-th-list').parent().click();
        cy.wait(2000);
        cy.get('div.legend-dialog > div.popupButtons > button.popupClose').click();

        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test Legend", "End");
    })
})