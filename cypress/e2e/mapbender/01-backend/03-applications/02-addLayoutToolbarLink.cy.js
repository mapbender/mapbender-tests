describe('add link to toolbar in layout', () => {
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
    const waitLong= 2000;
    it('deleteDataSource', () => {
        cy.CyLog('test add link to toolbar in layout', 'Start');
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );

        cy.visit(mainUrl);
        cy.get('[data-test="' + myAppSlug + '-edit"]').click();
        cy.get('[data-test="mb-containerLayout"]').click();
        cy.get('[data-test="mb-toolbar-element-add"]').click();
        cy.get('[data-test="mb-LinkButton"]').scrollIntoView();
        cy.get('[data-test="mb-LinkButton"]').click();
        cy.get('form#element-new')
            .find('input#form_title')
            .clear();
        cy.get('form#element-new')
            .find('input#form_title')
            .type('Copyright!');
        cy.get('form#element-new')
            .find('input#form_configuration_tooltip')
            .type('Mapbender Copyright!');
        cy.get('form#element-new')
            .find('div.dropdown')
            .find('div.dropdownValue.iconDown')
            .click();
        cy.get('form#element-new')
            .find('div.dropdown')
            .find('li[data-value="iconCopyright"]')
            .click();
        cy.get('form#element-new')
            .find('input#form_configuration_click')
            .type('https://mapbender.org');
        cy.get('button[data-test="mb-element-save"]')
            .click();
        cy.wait(waitLong);
        cy.scrollTo('top');
        cy.visit(myAppUrl);
        cy.wait(waitLong);

        cy.visit(mainUrl);
        cy.get('[data-test="' + myAppSlug + '-edit"]').click();
        cy.get('[data-test="mb-containerLayout"]').click();
        cy.get('[data-test="mb-element-delete-Copyright!"]').click();
        cy.get('button[data-test="mb-submit"]').click();
        cy.wait(waitLong);

        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog('test add link to toolbar in layout', 'End');
    });
})