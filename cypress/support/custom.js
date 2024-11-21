
// login
// cy.login({ _username: 'root', _password: 'root' })
Cypress.Commands.add('login', (benutzer) => {
    const url = Cypress.env('application')['mainUrl'];
    cy.visit(url);
    cy.get('ul[data-test="login"] > li').click();
    cy.get('input[name=_username]')
        .type(benutzer._username);
    cy.get('input[name=_password]')
        .type(benutzer._password);
    //cy.get('[type="submit"]').click();
    cy.get('input[data-test="mb-submit"]').click();
});

// duplicate Mapbender Demo App
// cy.copyApplication({ _title: 'Beispiel', _slug:'beispiel' })
Cypress.Commands.add('copyApplication', (new_application) => {
    const url = Cypress.env('application')['mainUrl'] ;
    cy.visit(url + 'manager/application/mapbender_user/copydirectly' );
    cy.get('#application_title').clear()
        .type(new_application._title);
    cy.get('#application_slug').clear()
        .type(new_application._slug);
    cy.get('input[data-test="mb-submit"]').click();
});

// delete application
// cy.deleteApplication({ _apptitle: 'test'})
Cypress.Commands.add('deleteApplication', (app) => {
    const url = Cypress.env('application')['mainUrl']
    cy.visit(url);
    cy.get('[data-test="' + app._slug + '-delete"]').click();
    cy.get('button[data-test="mb-submit"]').click();
});

// add User to Mapbender
// cy.addMapbenderUser({ _username: 'Norbert Nordpol', _email: 'Norbert.Nordpol@nn.org' })
Cypress.Commands.add( 'addMapbenderUser', (newUser)=> {
    const url = Cypress.env('application')['mainUrl'];
    cy.visit(url + 'manager/security');
    cy.get('[data-test="user-add"]').click();
    cy.get('[id="user_username"]')
        .type(newUser._username);
    cy.get('[id="user_email"]')
        .type(newUser._email);
    cy.get('[id="user_password_first"]')
        .type(newUser._password);
    cy.get('[id="user_password_second"]')
        .type(newUser._password);
    //cy.get('[value="Speichern"]').click();
    cy.get('input[data-test="mb-submit"]').click();
})

// delete User from Mapbender
// cy.deleteMapbenderUser(10);
Cypress.Commands.add('deleteMapbenderUser', (userName) => {
    const url = Cypress.env('application')['mainUrl'];
    cy.visit(url + 'manager/security');
    cy.get('span[data-test="' + userName + '-user-delete"]').click();
    cy.get('button[data-test="mb-submit"]').click();

})

