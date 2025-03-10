// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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
    cy.get('input[data-test="mb-submit"]').click();

    cy.get('body').then($body => {
        if( $body.find('[data-test="mb-login-box"]').length ){
            cy.mbLog("Login failed");
            throw new Error("Login failed!");
        }else{
            cy.mbLog("Login correct");
        }
    });
});

Cypress.Commands.add('showBanner', (message, duration = 2000) => {

    cy.document().then((doc) => {
        // Prüfen, ob ein Banner bereits existiert
        let banner = doc.getElementById('cypress-banner');
        if (!banner) {
            // Neues Banner erstellen
            banner = doc.createElement('div');
            banner.id = 'cypress-banner';
            banner.style.position = 'fixed';
            banner.style.top = '0';
            banner.style.left = '0';
            banner.style.width = '100%';
            banner.style.backgroundColor = '#009dde';
            banner.style.color = '#fff';
            banner.style.padding = '10px';
            banner.style.textAlign = 'center';
            banner.style.fontSize = '20px';
            banner.style.fontWeight = 'bold';
            banner.style.zIndex = '9999';
            doc.body.appendChild(banner);
        }
        // Update message
        banner.innerText = message;
        // Remove banner after a certain time (optional)
        if (duration > 0) {
            setTimeout(() => {
                if (banner) {
                    banner.remove();
                }
            }, duration);
        }
        cy.mbLog('Banner: ' + message);
    });
});

// close Symfony Toolbar
// cy.closeSymfonyToolbar()
Cypress.Commands.add('closeSymfonyToolbar', (source) => {
    cy.visit('/')
    cy.get('[class="hide-button"]').click()
})


