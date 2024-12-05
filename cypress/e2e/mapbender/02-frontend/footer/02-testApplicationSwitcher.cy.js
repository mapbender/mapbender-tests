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
    const appLiArray = ['mapbender_user','mapbender_user_basic'];
    it('Test POI', () => {
        cy.CyLog("Test App Switcher", "Start");
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.viewport(1200, 800);
        cy.visit(myUrl);

        appLiArray.forEach((app) => {
            const selector = 'li[data-value="'+app+'"]';
            cy.CyLog('Scale: ', selector);
            // open ScaleSelector
            cy.get('div.toolBar.bottom')
                .find('li.mb-element-applicationswitcher')
                .click();
            cy.wait(waitShort);
            cy.get('div.toolBar.bottom')
                .find('li.mb-element-applicationswitcher')
                .find(selector)
                .click();
            cy.wait(waitLong);
        });

        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test App Switcher", "End");
    })
})