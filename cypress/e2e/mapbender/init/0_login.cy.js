describe('mapbender login to app', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    beforeEach(() => {
        cy.visit('http://localhost/mapbender4/');
    });

    it('login', () => {
        cy.login({_username: user, _password: password});
    });
});