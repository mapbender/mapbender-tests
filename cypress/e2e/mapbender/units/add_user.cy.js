describe('create new user', () => {

    beforeEach(() => {
        cy.visit('http://localhost/mapbender_bahn/app_dev.php/')
        cy.login({_username: 'root', _password: 'voo6Sheb'})
    })

    it('addMapbenderUser ', () => {
        cy.addMapbenderUser({ _username: 'Norbert Nordpol', _email: 'norbert.nordpol@nn.org', _password: '12345678' });
    });


})