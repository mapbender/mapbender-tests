const userName = 'Norbert Nordpol';
const userMail = 'norbert.nordpol@nn.org';
const userPassword = '12345678';
describe('create new user', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    });

    it('test add mapbender user ', () => {
        cy.CyLog("create new user", "Start");
        cy.addMapbenderUser({ _username: userName, _email: userMail, _password: userPassword });
        cy.CyLog("create new user", "Stopp");
    });

})