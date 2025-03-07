describe('Add Data Source', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    })

    const dataSource = 'https://www.wms.nrw.de/geobasis/wms_nw_alkis?VERSION=1.3.0&Service=WMS&Request=getCapabilities';
    const waitLong= 2000;
    it('test add data source', () => {
        cy.CyLog('Test add Data Source', 'Start');
        cy.addMapbenderSource(dataSource);

        cy.wait(waitLong);
        cy.get('a#tabApplications').click();
        cy.wait(waitLong);
        cy.get('a#tabContact').click();
        cy.wait(waitLong);
        cy.get('a#tabService').click();
        cy.wait(waitLong);
        cy.get('a#tabLayers').click();
        cy.wait(waitLong);
        cy.CyLog('Test add Data Source', 'End');
    });


})