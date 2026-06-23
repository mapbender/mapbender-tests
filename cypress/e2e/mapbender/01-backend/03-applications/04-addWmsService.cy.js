describe('add wms service to layerset', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];
    const myAppTitle = myApp['title'];
    const myAppSlug = myApp['slug'];

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    })

    const myAppUrl = mainUrl + 'application/' + myAppSlug;
    const dataSource = 'https://www.wms.nrw.de/geobasis/wms_nw_alkis?VERSION=1.3.0&Service=WMS&Request=getCapabilities';
    const dataSourceTitle = ['WMS NW ALKIS', 'FOSS4G'];
    const waitLong= 2000;
    const waitShort = 500;
    it('test add wms service', () => {
        cy.CyLog('test add wms service layerset main', 'Start');
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );

        cy.addMapbenderSource(dataSource, 'manager/repository/new/wms');

        cy.visit(mainUrl);
        cy.get('[data-test="' + myAppSlug + '-edit"]').click();
        cy.get('[data-test="mb-containerLayers"]').click();

        cy.wait(waitShort);
        dataSourceTitle.forEach((item) => {
            cy.get('[data-test="mb-add-instance-main"]').click();
            cy.get('a.checkContainer').contains(item).first().click();
            cy.get('input[type="submit"]').first().click();
            cy.wait(waitShort);
            //cy.get('a.btn-light').contains('Back').click();
            cy.get('[data-test="mb-back"]').first().click();
            cy.wait(waitShort);
        })
        cy.get('[data-test="mb-add-instance-main"]').scrollIntoView();
        cy.wait(waitLong);

        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog('test add wms service layerset main', 'End');
    });
})