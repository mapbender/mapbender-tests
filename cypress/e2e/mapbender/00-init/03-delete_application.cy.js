describe('copy_delete_application', () => {
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

    it('Copy Application', () => {
        cy.contains(myAppTitle).scrollIntoView({ offset: { top: -200, left:0 } });
        cy.wait(2000);
        cy.deleteApplication({ _slug: myAppSlug });
    });

});