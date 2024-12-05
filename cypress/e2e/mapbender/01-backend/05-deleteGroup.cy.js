describe('delete Mapbender User', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];
    const mbGroupTitle = 'Cypress';

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    })

    it('deleteMapbenderGroup ', () => {
        cy.deleteMapbenderGroup(mbGroupTitle);
    });


})