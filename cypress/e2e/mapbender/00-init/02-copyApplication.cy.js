describe('copy application', () => {
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

    it('test copy application', () => {
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.visit(mainUrl);
        cy.contains(myAppTitle).scrollIntoView({ offset: { top: -200, left:0 } });
    });

});