describe('Update Data Source', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    })

    // Instead of relying on a hard-coded data source title (which may change),
    // click the first available update link. This avoids failures when the
    // datasource name changes in the test environment.
    //const dataSource = 'FOSS4G Conference Locations';
    //const dataSource = 'FOSS4G Conferences';
    const waitLong= 2000;
    it('test update data source', () => {
        cy.CyLog('Test update Data Source', 'Start');
        const url = Cypress.env('application')['mainUrl'];
        cy.visit(url + 'manager/repository');
        // Try to click the first update link for any datasource. Use a starts-with
        // attribute selector to match data-test values like
        // data-test="mb-update-source-<title>". If no element is found the test
        // will fail with a clearer message.
        cy.get('a[data-test^="mb-update-source-"]').first().click();
        cy.get('input[type="submit"]').click();
        cy.wait(waitLong);
        cy.get('a#tabApplications').click();
        cy.wait(waitLong);
        cy.get('a#tabContact').click();
        cy.wait(waitLong);
        cy.get('a#tabService').click();
        cy.wait(waitLong);
        cy.get('a#tabLayers').click();
        cy.wait(waitLong);
        cy.CyLog('Test update Data Source', 'End');
    });


})