describe('Delete Data Source', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    })

    const dataSourceTitleWMS = 'WMS NW ALKIS';
    const dataSourceTitleWMTS = 'WMTS NW ALKIS';
    const dataSourceTitleVT = 'OSM Liberty';
    const waitLong= 2000;
    it('test delete data source', () => {
        cy.CyLog('Test delete Data Source', 'Start');
        const url = Cypress.env('application')['mainUrl'];
        cy.visit(url + 'manager/repository');

        // WMS Service delete
        cy.get('a[data-test="mb-delete-source-' + dataSourceTitleWMS + '"]').then($elem =>{
            const wmsLength = $elem.length;
            for (let i = 0; i < $elem.length; i++){
                cy.deleteMapbenderSource(dataSourceTitleWMS);
            }
        });

        // WMTS Service delete
        cy.get('a[data-test="mb-delete-source-' + dataSourceTitleWMTS + '"]').then($elem =>{
            const wmsLength = $elem.length;
            for (let i = 0; i < $elem.length; i++){
                cy.deleteMapbenderSource(dataSourceTitleWMTS);
            }
        });

        // Vector tile Service delete
        cy.get('a[data-test="mb-delete-source-' + dataSourceTitleVT + '"]').then($elem =>{
            const wmsLength = $elem.length;
            for (let i = 0; i < $elem.length; i++){
                cy.deleteMapbenderSource(dataSourceTitleVT);
            }
        });


        cy.wait(waitLong);
        cy.CyLog('Test delete Data Source', 'End');
    });
})