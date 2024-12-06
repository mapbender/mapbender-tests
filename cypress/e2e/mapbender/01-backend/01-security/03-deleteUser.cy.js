describe('delete Mapbender User', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];
    const userName = 'Norbert Nordpol';

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    })

    it('deleteMapbenderUser ', () => {
        cy.deleteMapbenderUser(userName);
    });


})