describe('Update Data Source', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    })

    const dataSource = 'FOSS4G Conference Locations';
    const waitLong= 2000;
    it('updateDataSource', () => {
        cy.CyLog('Test update Data Source', 'Start');
        const url = Cypress.env('application')['mainUrl'];
        cy.visit(url + 'manager/repository');
        cy.get('a[data-test="mb-update-source-'+dataSource+'"]').click();
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