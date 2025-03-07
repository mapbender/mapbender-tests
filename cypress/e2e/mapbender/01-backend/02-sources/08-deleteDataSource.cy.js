describe('Delete Data Source', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    })

    const dataSourceTitle = 'WMS NW ALKIS';
    const waitLong= 2000;
    it('test delete data source', () => {
        cy.CyLog('Test delete Data Source', 'Start');
        const url = Cypress.env('application')['mainUrl'];
        cy.visit(url + 'manager/repository');

        cy.get('a[data-test="mb-delete-source-' + dataSourceTitle + '"]').then($elem =>{
            const wmsLength = $elem.length;
            for (let i = 0; i < $elem.length; i++){
                cy.deleteMapbenderSource(dataSourceTitle);
            }
        });
        cy.wait(waitLong);
        cy.CyLog('Test delete Data Source', 'End');
    });
})