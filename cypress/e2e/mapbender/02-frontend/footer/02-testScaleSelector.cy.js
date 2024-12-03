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
    const scaleLiArray = ['500','1000','2500','5000','7500','10000','25000','500000','50000000','25000'];
    it('Test POI', () => {
        cy.CyLog("Test POI", "Start");
//        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.viewport(1200, 800);
        cy.visit(myUrl);

        scaleLiArray.forEach((scale) => {
            const selector = 'li[data-value="'+scale+'"]';
            cy.CyLog('Scale: ', selector);
            // open ScaleSelector
            cy.get('div.toolBar.bottom')
                .find('li.mb-element-scaleselector')
                .click();
            cy.wait(waitShort);
            cy.get('div.toolBar.bottom')
                .find('li.mb-element-scaleselector')
                .find(selector)
                .click();
            cy.wait(waitLong);
        });

//        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test POI", "End");
    })
})