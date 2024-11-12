describe('copy_delete_application', () => {

    beforeEach(() => {
        cy.visit('http://localhost/mapbender4/index.php/');
        cy.login({_username: 'root', _password: 'root'});
    });

    it('Copy Application', () => {
        cy.copyApplication({ _title: 'Mapbender Demo Cypress', _slug:'Mapbender_Demo_CYPRESS' });
        cy.visit('http://localhost/mapbender4/index.php/');
        cy.contains('Mapbender Demo Cypress').scrollIntoView({ offset: { top: -100, left:0 } });
        //cy.contains('Mapbender Demo Cypress').scrollIntoView({ block: 'center', offset: { top: -100, left:0 } });
        cy.wait(6000);
        cy.deleteApplication({ _apptitle: 'Mapbender Demo Cypress'});
    });

});