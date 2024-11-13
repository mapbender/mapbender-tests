describe('copy_delete_application', () => {
    const myApp = Cypress.env('application');
    const myAppTitle = myApp['title'];
    const myAppSlug = myApp['slug'];
    const user = myApp['user'];
    const password = myApp['password'];

    beforeEach(() => {
        cy.visit('http://localhost/mapbender4/index.php/');
        cy.login({_username: user, _password: password});
    });

    it('Copy Application', () => {
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug });
        cy.visit('http://localhost/mapbender4/index.php/');
        cy.contains('Mapbender Demo Cypress').scrollIntoView({ offset: { top: -200, left:0 } });
        cy.wait(2000);
        cy.deleteApplication({ _slug: myAppSlug });
    });

});