describe('Add Data Source', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];
    const sourceWMTS = "manager/repository/new/wmts";
    const sourceWMS = "manager/repository/new/wms";
    const sourceVT = "manager/repository/new/vector_tiles";

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    })

    const serviceWMS = Cypress.env('application')['sources']['wms'];
    const serviceWMTS = Cypress.env('application')['sources']['wmts'];
    const serviceVT = Cypress.env('application')['sources']['vt'];

    //const serviceWMS = Cypress.env('application').sources.wms;
    const waitLong= 2000;
    it('test add data source', () => {
        cy.CyLog('Test add Data Source', 'Start');

        // Test vector tiles
        cy.addMapbenderSource(serviceVT, sourceVT);
        cy.wait(waitLong);
        cy.get('a#tabApplications').click();
        cy.wait(waitLong);
        cy.get('a#tabService').click();
        cy.wait(waitLong);
        cy.get('a#tabLayers').click();
        cy.wait(waitLong);


        // Test WMS Service
        cy.addMapbenderSource(serviceWMS, sourceWMS);
        cy.wait(waitLong);
        cy.get('a#tabApplications').click();
        cy.wait(waitLong);
        cy.get('a#tabContact').click();
        cy.wait(waitLong);
        cy.get('a#tabService').click();
        cy.wait(waitLong);
        cy.get('a#tabLayers').click();
        cy.wait(waitLong);

        // Test WMTS Service
        cy.addMapbenderSource(serviceWMTS, sourceWMTS);
        cy.wait(waitLong);
        cy.get('a#tabApplications').click();
        cy.wait(waitLong);
        cy.get('a#tabContact').click();
        cy.wait(waitLong);
        cy.get('a#tabService').click();
        cy.wait(waitLong);
        cy.get('a#tabLayers').click();
        cy.wait(waitLong);
        cy.get('a[data-test="mb-containerMatrixsets"]').click();
        cy.CyLog('Test add Data Source', 'End');
    });


})