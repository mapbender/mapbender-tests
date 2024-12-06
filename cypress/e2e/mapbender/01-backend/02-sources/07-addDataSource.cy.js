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
    it('addDataSource', () => {
        cy.CyLog('Test add Data Source', 'Start');
        const url = Cypress.env('application')['mainUrl'];
        cy.visit(url + 'manager/repository');
        cy.get('a[data-test="mb-source-add"]').click();
        cy.get('div.dropdownValue').click();
        cy.get('li[data-value="wms"]').click();

        cy.get('input#http_source_selection_originUrl').type(dataSource);
        cy.wait(waitLong);
        cy.get('input[type="submit"]').click();
        cy.wait(waitLong);
        cy.CyLog('Test add Data Source', 'End');
    });


})