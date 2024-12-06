describe('check_backend_main_functions', () => {
    const myApp = Cypress.env('application');
    const myAppTitle = myApp['title'];
    const myAppSlug = myApp['slug'];
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl']

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    });

    it('Check backend application functions', () => {
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug });
        cy.visit(mainUrl);
        cy.contains(myAppTitle).scrollIntoView({ offset: { top: -200, left:0 } });
        cy.wait(2000);
        // Edit App
        cy.visit(mainUrl + 'manager/application/' + myAppSlug + '/edit');
        // Change description
        cy.get('#application_description').clear().type('Das ist die Anwendung für unsere Cypress Tests');
        // Save app
        cy.get('input[type="submit"]').click();
        cy.wait(2000);
        cy.get('#tabLayout').click();
        cy.wait(2000);
        cy.get('#tabLayers').click();
        cy.wait(2000);
        cy.get('#tabCustomCss').click();
        cy.wait(2000);
        cy.get('#tabSecurity').click();
        cy.wait(2000);
        cy.visit(mainUrl);
        cy.contains(myAppTitle).scrollIntoView({ offset: { top: -200, left:0 } });
        //cy.wait(3000);
        cy.deleteApplication({ _slug: myAppSlug });
    });

});