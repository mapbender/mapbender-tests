describe('mapbender login to app', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];
    beforeEach(() => {
        cy.visit(mainUrl);
    });

    it('test login to mapbender', () => {
        cy.login({_username: user, _password: password});
    });
});