describe('Test POI', () => {
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
    const waitLong = 1000;
    const waitShort = 200;
    const srsLiArray = ['EPSG:4326','EPSG:3857','EPSG:25832','EPSG:25833','EPSG:31466','EPSG:31467','EPSG:4326'];
    it('Test POI', () => {
        cy.CyLog("Test Srs Selector", "Start");
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.viewport(1200, 800);
        cy.visit(myUrl);

        srsLiArray.forEach((srs) => {
            const selector = 'li[data-value="'+srs+'"]';
            cy.CyLog('Scale: ', selector);
            // open ScaleSelector
            cy.get('div.toolBar.bottom')
                .find('li.mb-element-srsselector')
                .click();
            cy.wait(waitShort);
            cy.get('div.toolBar.bottom')
                .find('li.mb-element-srsselector')
                .find(selector)
                .click();
            cy.wait(waitLong);
        });

        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test Srs Selector", "End");
    })
})