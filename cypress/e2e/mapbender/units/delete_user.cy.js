describe('delete Mapbender User', () => {

    beforeEach(() => {
        cy.visit('http://localhost/mapbender_bahn/app_dev.php/')
        cy.login({_username: 'root', _password: 'voo6Sheb'})
    })

    it('deleteMapbenderUser ', () => {
        cy.deleteMapbenderUser(10);
    });


})