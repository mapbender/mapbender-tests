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
    it('Test', () => {
        //cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.visit(myUrl);

        // Erst layer an/aus schalten damit ein neuer Request erzeugt wird.
        const layerNodeName = 'Fachdaten (DB)'
        // Layertree anschalten.
        cy.get(`[title="Layerbaum"]`).click()
        // Layer Node anzeigen
        cy.showLayerTree({_layerNodeName: layerNodeName})
        // Layer Node ein/ausschalten
        cy.get('.mb-element-layertree [title="'+layerNodeName+'"]')
            .siblings(`[title="Sichtbarkeit an/aus"]`)
            .then($el =>{
                    cy.get('.mb-element-layertree [title="'+layerNodeName+'"]').siblings(`[title="Sichtbarkeit an/aus"]`).click()

            })

        /*cy.stub('open', (request) => {
            const url = request.url
            const method = request.method
            const headers = request.headers
            cy.CyLog('DEV', 'url: ' + url)
            cy.CyLog('DEV', 'method: ' + method)
            cy.CyLog('DEV', 'headers: ' + headers)
        })*/

        // Legende anschalten.
        cy.get(`[title="Legende"]`).click()


        //cy.deleteApplication({ _slug: myAppSlug });
    })

})