describe('Test WMS-Loader', () => {
    const myApp = Cypress.env('application');
    const myAppTitle = myApp['title'];
    const myAppSlug = myApp['slug'];
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    });

    const myUrl = mainUrl + 'application/' + myAppSlug;
    const waitLong = 2000;
    const wms1 = 'https://www.wms.nrw.de/geobasis/wms_nw_tfis?REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.3.0'; // geoportal.nrw touristic informations
    const wms2 = 'https://www.wms.nrw.de/wms/kitas?REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.3.0'; // geoportal.nrw kindertagesstätten
    it('Test WMS-Loader', () => {
        cy.CyLog("Test WMS-Loader", "Start");
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.visit(myUrl);


        // test wms1
        // open wmsloader
        cy.get('span.iconBig > i.fa-globe').parent().click();

        // add wms-link
        cy.get('div.mb-element-wmsloader')
            .find('input[name="loadWmsUrl"]')
            .clear()
            .type(wms1);

        // add wms service
        cy.get('div.mapbender-popup')
            .find('button[data-test="mb-wms-btn-add"]')
            .click();

        // test wms2
        cy.get('span.iconBig > i.fa-globe').parent().click();
        cy.get('div.mb-element-wmsloader')
            .find('input[name="loadWmsUrl"]')
            .clear()
            .type(wms2);
        cy.get('div.mapbender-popup')
            .find('button[data-test="mb-wms-btn-add"]')
            .click();

        cy.wait(waitLong);
        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test WMS-Loader", "End");
    })
})