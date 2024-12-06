describe('Delete Data Source', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    })

    const dataSourceId = '10';
    const dataSourceTitle = 'WMS NW ALKIS';
    const waitLong= 2000;
    it('deleteDataSource', () => {
        cy.CyLog('Test delete Data Source', 'Start');
        const url = Cypress.env('application')['mainUrl'];
        cy.visit(url + 'manager/repository');
        //cy.get('a[data-test="mb-delete-source-' + dataSourceTitle + '-' + dataSourceId + '"]').click();
        cy.get('a[data-test="mb-delete-source-' + dataSourceTitle + '-' + dataSourceId + '"]').then($elem =>{
            cy.wrap($elem).click();
            cy.get('button[data-test="mb-submit"]').click();
        });

        //cy.get('button[data-test="mb-submit"]').click();
        cy.wait(waitLong);
        cy.CyLog('Test delete Data Source', 'End');
    });
})