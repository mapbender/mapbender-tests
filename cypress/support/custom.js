
// login
// cy.login({ _username: 'root', _password: 'root' })
Cypress.Commands.add('login', (benutzer) => {
    cy.visit('http://localhost/mapbender4/index.php/user/login');

    cy.get('input[name=_username]')
        .type(benutzer._username);

    cy.get('input[name=_password]')
        .type(benutzer._password);

    cy.get('[type="submit"]').click();
});

// duplicate Mapbender Demo App
// cy.copyApplication({ _title: 'Beispiel', _slug:'beispiel' })
Cypress.Commands.add('copyApplication', (new_application) => {
    cy.visit('http://localhost/mapbender4/manager/application/mapbender_user/copydirectly');
    cy.get('#application_title').clear().type(new_application._title);
    cy.get('#application_slug').clear().type(new_application._slug);
    cy.contains('Speichern').click();
});

// delete application
// cy.deleteApplication({ _apptitle: 'test'})
Cypress.Commands.add('deleteApplication', (deleteApp) => {
    cy.visit('http://localhost/mapbender4/index.php/');
    cy.get(`[title="Anwendung löschen ${deleteApp._apptitle}"]`).click();
    cy.get('button').contains('Löschen').click();
});

// add User to Mapbender
// cy.addMapbenderUser({ _username: 'Norbert Nordpol', _email: 'Norbert.Nordpol@nn.org' })
Cypress.Commands.add( 'addMapbenderUser', (newUser)=> {
    cy.visit('http://localhost/mapbender_bahn/app_dev.php/manager/security');
    cy.get('[title="Neuen Benutzer hinzufügen"]').click();
    cy.get('[id="user_username"]').type(newUser._username);
    cy.get('[id="user_email"]').type(newUser._email);
    cy.get('[id="user_password_first"]').type(newUser._password);
    cy.get('[id="user_password_second"]').type(newUser._password);
    cy.get('[value="Speichern"]').click();
})

// delete User from Mapbender
// cy.deleteMapbenderUser(10);
Cypress.Commands.add('deleteMapbenderUser', (userNumber) => {
    let visitUrl = '/mapbender_bahn/app_dev.php/manager/user/' + userNumber + '/delete';
    cy.visit('http://localhost/mapbender_bahn/app_dev.php/manager/security');
    cy.get('[data-url="' + visitUrl + '"]').click();
    cy.contains('[type="button"]' ,'Löschen').click();

})

Cypress.Commands.add('CyLog', (key, value) => {
    // Turn off logging of the cy.window() to command log
    cy.window({ log: false }).then((window) => {
        window.sessionStorage.setItem(key, value)
    })

    const log = Cypress.log({
        name: 'CyLog',
        // shorter name for the Command Log
        displayName: 'CyLog',
        message: `${key}: ${value}`,
        consoleProps: () => {
            // return an object which will
            // print to dev tools console on click
            return {
                Key: key,
                Value: value,
                'Session Storage': window.sessionStorage,
            }
        },
    })
})