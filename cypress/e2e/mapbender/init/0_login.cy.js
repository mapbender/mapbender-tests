describe('mapbender login to app', () => {
    beforeEach(() => {
        cy.visit('http://localhost/mapbender4/');
    });

    it('login', () => {
        cy.login({_username: 'root', _password: 'root'});
    });
});