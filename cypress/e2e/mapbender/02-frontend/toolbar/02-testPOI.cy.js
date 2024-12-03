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
    const waitLong = 2000;
    it('Test POI', () => {
        cy.CyLog("Test POI", "Start");
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.viewport(1200, 800);
        cy.visit(myUrl);

        // open POI
        cy.get('span.iconBig > i.fa-thumbtack').parent().click();
        // write POI Text
        cy.get('div.mb-poi-popup').find('textarea.form-control').type('{enter}Cypress Test POI!');
        // Create POI
        cy.get('div.mb-element-map').find('canvas').then(($canvas) => {
            const width = $canvas.width();
            const height = $canvas.height();
            const x = Math.floor(width / 2 ) + 300;
            const y = Math.floor(height / 2 );
            cy.wrap($canvas).click(x,y);
        });
        cy.wait(waitLong);
        // add POI
        cy.get('div.mb-poi-popup')
            .find('button[data-test="mb-poi-btn-add"]')
            .click();
        cy.wait(waitLong);
        cy.get('div.mb-poi-popup')
            .find('button.popupClose')
            .click();
        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test POI", "End");
    })
})