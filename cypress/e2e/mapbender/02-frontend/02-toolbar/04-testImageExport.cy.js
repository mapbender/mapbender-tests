describe('Test Bildexport', () => {
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

    const myUrl = mainUrl + 'application/' + myAppSlug + '?#150000@8.52417/50.18313r0@EPSG:25832';
    it('Test', () => {
        cy.CyLog("Test Image Export", "Start");
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );

        cy.visit(myUrl);

        // Print menu select.
        cy.get('span[data-test="mb-iconImageExport"]').click();

        cy.get('input[data-test="imageexport-btn-submit"]').click()

        //cy.wait(10000)
        cy.get('button.popupClose').last().click()

        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test Image Export", "End");
    })

})