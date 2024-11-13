describe('check_backend_main_functions', () => {
    const myApp = Cypress.env('application');
    const myAppTitle = myApp['title'];
    const myAppSlug = myApp['slug'];
    const user = myApp['user'];
    const password = myApp['password'];

    beforeEach(() => {
        cy.visit('http://localhost/mapbender4/index.php/');
        cy.login({_username: user, _password: password});
    });

    it('Check main functions', () => {
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug });
        cy.visit('http://localhost/mapbender4/index.php/');
        cy.contains('Mapbender Demo Cypress').scrollIntoView({ offset: { top: -200, left:0 } });
        cy.wait(2000);
        // Edit App
        cy.visit('http://localhost/mapbender4/index.php/manager/application/Mapbender_Demo_CYPRESS/edit');
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
        cy.visit('http://localhost/mapbender4/index.php/');
        cy.contains('Mapbender Demo Cypress').scrollIntoView({ offset: { top: -200, left:0 } });
        //cy.wait(3000);
        cy.deleteApplication({ _slug: myAppSlug });
    });

});