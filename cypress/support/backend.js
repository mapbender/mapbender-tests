
// duplicate Mapbender Demo App
// cy.copyApplication({ _title: 'Beispiel', _slug:'beispiel' })
Cypress.Commands.add('copyApplication', (new_application) => {
    cy.CyLog('call function copyApplication', 'start');
    const url = Cypress.env('application')['mainUrl'] ;
    cy.visit(url + 'manager/application/mapbender_user/copydirectly' );
    cy.get('#application_title').clear()
        .type(new_application._title);
    cy.get('#application_slug').clear()
        .type(new_application._slug);
    cy.get('input[data-test="mb-submit"]').click();
    cy.CyLog('call function copyApplication', 'stopp');
});

// delete application
// cy.deleteApplication({ _apptitle: 'test'})
Cypress.Commands.add('deleteApplication', (app) => {
    cy.CyLog('call function deleteApplication', 'start');
    const url = Cypress.env('application')['mainUrl']
    cy.visit(url);
    cy.get('[data-test="' + app._slug + '-delete"]').click();
    cy.get('button[data-test="mb-submit"]').click();
    cy.CyLog('call function deleteApplication', 'stopp');
});

// add User to Mapbender
// cy.addMapbenderUser({ _username: 'Norbert Nordpol', _email: 'Norbert.Nordpol@nn.org' })
Cypress.Commands.add( 'addMapbenderUser', (newUser)=> {
    cy.CyLog('Call function addMapbenderUser', 'Start');
    const url = Cypress.env('application')['mainUrl'];
    cy.visit(url + 'manager/security');
    cy.get('[data-test="mb-security-user-add"]').click();
    cy.get('[id="user_username"]')
        .type(newUser._username);
    cy.get('[id="user_email"]')
        .type(newUser._email);
    cy.get('[id="user_password_first"]')
        .type(newUser._password);
    cy.get('[id="user_password_second"]')
        .type(newUser._password);
    cy.get('input[data-test="mb-submit"]').click();
    cy.get('body').then($body => {

        if($body.find('div.invalid-feedback').length){
            cy.mbLog("User could not saved!");
            throw new Error("Add user failed!");
        }else{
            cy.mbLog("User added");
        }
    });
    cy.CyLog('Call function addMapbenderUser', 'Stopp');
});

// delete User from Mapbender
// cy.deleteMapbenderUser(10);
Cypress.Commands.add('deleteMapbenderUser', (userName) => {
    cy.CyLog('Call function deleteMapbenderUser', 'start');
    const url = Cypress.env('application')['mainUrl'];
    cy.visit(url + 'manager/security');
    cy.get('span[data-test="' + userName + '-user-delete"]').click();
    cy.get('button[data-test="mb-submit"]').click();
    cy.CyLog('Call function deleteMapbenderUser', 'stopp');
})

// add Group to Mapbender
// cy.addMapbenderGroup({ _groupname: 'cypress'})
Cypress.Commands.add( 'addMapbenderGroup', (newGroup, description)=> {
    cy.CyLog('Call function addMapbenderGroup', 'Start');
    const url = Cypress.env('application')['mainUrl'];
    cy.visit(url + 'manager/security');

    cy.get('a#tabGroups').click();
    cy.get('[data-test="mb-security-group-add"]').click();
    cy.get('[id="group_title"]')
         .type(newGroup);
    cy.get('[id="group_description"]')
         .type(description);
    cy.get('input[data-test="mb-submit"]').click();
    cy.get('body').then($body => {
        if($body.find('div.invalid-feedback').length){
            cy.mbLog("Group could not saved!");
            throw new Error("Add group failed!");
        }else{
            cy.mbLog("Group added");
        }
    });
    cy.CyLog('Call function addMapbenderGroup', 'stopp');
});

// delete User from Mapbender
// cy.deleteMapbenderGroup(groupTitle);
Cypress.Commands.add('deleteMapbenderGroup', (groupTitle) => {
    cy.CyLog('call function deleteMapbenderGroup', 'start');
    const url = Cypress.env('application')['mainUrl'];
    cy.visit(url + 'manager/security');
    cy.get('a#tabGroups').click();
    cy.get('span[data-test="' + groupTitle + '-group-delete"]').click();
    cy.get('button[data-test="mb-submit"]').click();
    cy.CyLog('call function deleteMapbenderGroup', 'stopp');
});

// Add DataSource
// cy.addMapbenderSource(sourceServiceURI);
Cypress.Commands.add('addMapbenderSource', (sourceServiceURI, sourceLink) => {
    cy.CyLog('call function addMapbenderSource', 'start');
    const url = Cypress.env('application')['mainUrl'];
    //const inputID = (sourceLink.indexOf('vector_tiles') !== -1) ? 'http_source_selection_originUrl' : 'vector_tile_source_jsonUrl';
    const inputID = (!sourceLink.includes('vector_tiles')) ? 'http_source_selection_originUrl' : 'vector_tile_source_jsonUrl';
    cy.mbLog('Input ID: ' + inputID);
    cy.visit(url + sourceLink);
    cy.get('input#' + inputID).type(sourceServiceURI);
    cy.get('input[type="submit"]').click();
    cy.CyLog('call function addMapbenderSource', 'stopp');
});

// Delete first found Data Source
// cy.deleteMapbenderSource(sourceTitle);
Cypress.Commands.add('deleteMapbenderSource', (sourceTitle) => {
    cy.CyLog('call function deleteMapbenderSource', 'start');
    const mainUrl = Cypress.env('application')['mainUrl'];
    cy.visit(mainUrl + 'manager/repository');

    const selector = 'a[data-test="mb-delete-source-' + sourceTitle + '"]';

    // Delete-URL aus dem data-url-Attribut des Links auslesen,
    // dann per cy.request() direkt DELETE durchführen (kein Modal-Interaktion nötig).
    // 1. GET → HTML-Fragment mit Symfony-Formular + CSRF-Token
    // 2. POST mit CSRF-Token → Quelle wird gelöscht
    cy.get(selector).first().then($el => {
        const deleteRelUrl = $el.attr('data-url');
        const baseOrigin = 'http://localhost';
        const deleteFullUrl = deleteRelUrl.startsWith('http') ? deleteRelUrl : baseOrigin + deleteRelUrl;

        cy.request({ method: 'GET', url: deleteFullUrl }).then(response => {
            // CSRF-Token aus dem HTML-Fragment extrahieren
            const match = response.body.match(/name="form\[_token\]"\s+value="([^"]+)"/);
            const token = match ? match[1] : '';
            cy.mbLog('CSRF-Token gefunden: ' + (token ? 'ja' : 'NEIN'));

            cy.request({
                method: 'POST',
                url: deleteFullUrl,
                form: true,
                body: { 'form[_token]': token },
                followRedirect: true,
            });
        });
    });

    cy.CyLog('call function deleteMapbenderSource', 'stopp');
});

// Delete ALL Data Sources matching the given title (recursive)
// cy.deleteAllMapbenderSources(sourceTitle);
Cypress.Commands.add('deleteAllMapbenderSources', (sourceTitle) => {
    const url = Cypress.env('application')['mainUrl'];
    const selector = 'a[data-test="mb-delete-source-' + sourceTitle + '"]';

    const deleteNext = () => {
        cy.visit(url + 'manager/repository');
        cy.get('body').then($body => {
            if ($body.find(selector).length === 0) {
                return;
            }
            cy.deleteMapbenderSource(sourceTitle);
            deleteNext();
        });
    };

    deleteNext();
});

