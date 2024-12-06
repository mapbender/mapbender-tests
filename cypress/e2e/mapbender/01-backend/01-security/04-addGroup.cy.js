const mbGroup = 'Cypress';
const mbGroupDescription = 'This is the Cypress Test Group';
describe('create new user', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    });

    it('addMapbenderGroup ', () => {
        cy.addMapbenderGroup(mbGroup, mbGroupDescription);
    });

})