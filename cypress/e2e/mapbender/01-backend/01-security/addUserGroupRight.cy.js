describe('add user to group', () => {
    const myApp = Cypress.env('application');
    const user = myApp['user'];
    const password = myApp['password'];
    const mainUrl = myApp['mainUrl'];
    const myAppTitle = myApp['title'];
    const myAppSlug = myApp['slug'];

    const userName = 'Norbert Nordpol';
    const userMail = 'norbert.nordpol@nn.org';
    const userPassword = '12345678';
    const mbGroup = 'Cypress';
    const mbGroupDescription = 'This is the Cypress Test Group';

    beforeEach(() => {
        cy.visit(mainUrl);
        cy.login({_username: user, _password: password});
    })

    const myAppUrl = mainUrl + 'application/' + myAppSlug;
    const waitLong= 2000;
    it('test add mapbender user to group', () => {
        cy.CyLog('test user to group', 'Start');
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.visit(mainUrl);
        cy.showBanner('Add User: ' + userName);
        cy.addMapbenderUser({ _username: userName, _email: userMail, _password: userPassword });
        cy.showBanner('Add Group: ' + mbGroup);
        cy.addMapbenderGroup(mbGroup, mbGroupDescription);

        cy.showBanner('Call Application Secrutity');
        cy.visit(mainUrl);
        // Edit App
        cy.visit(mainUrl + 'manager/application/' + myAppSlug + '/edit');

        cy.wait(waitLong);
        cy.showBanner('Add user to application');
        cy.get('#tabSecurity').click();
        cy.get('span.-fn-add-permission').click();
        cy.get('input[data-label="' + userName + '"]').click();
        cy.get('div.modal-footer>button').first().click();
        cy.get('input[data-test="mb-submit"]').click();
        cy.wait(waitLong);

        cy.showBanner('delete User ' + userName);
        cy.deleteMapbenderUser(userName);
        cy.showBanner('delete Group ' + mbGroup);
        cy.deleteMapbenderGroup(mbGroup);
        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog('test add user to group', 'End');
    });
})