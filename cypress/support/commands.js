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




// add source
// cy.addSource({ _url: 'https://www.wms.nrw.de/wms/krankenhaus?' })
Cypress.Commands.add('addSource', (source) => {
    cy.get('a')
        .eq(5)
        .click()
    cy.url().should('include', '/repository')
    // click on the plus
    cy.get('.iconAdd.iconBig.right').click()
    cy.url().should('include', '/repository/new')
    cy.get('#http_source_origin_originUrl').type(source._url)
    cy.get('.button')
        .contains('Load')
        .click()
})



// close Symfony Toolbar
// cy.closeSymfonyToolbar()
Cypress.Commands.add('closeSymfonyToolbar', (source) => {
    cy.visit('/')
    cy.get('[class="hide-button"]').click()
})
/* Muss überarbeitet werden
// add source to layerset main
// cy.addSourceToLayerset({ _title: 'image_export_bug_01', _name: 'Krankenhäuser NRW'})
Cypress.Commands.add('addSourceToLayerset', (application, source) => {
        cy.visit('/manager/application/${application._title}')
        //cy.contains('Filter').click().type(application._title)
        //cy.get['class[title="Edit"]'].click({force: true})

        cy.get('a[title="Edit application ${application._title}"]').click()
        cy.get('#tabLayers').click()
        cy.get('a[data-layerset-title*="main"]').click()
        cy.get('#inputFilterSources').type('source._name')
        cy.get('.subTitle')
          .contains('source._name').click({force: true}) // Timed out retrying: cy.click() failed because this element: is being covered by another element:
        cy.contains('Save').click()
        cy.contains('Back').click()
//      cy.visit('/application/new_application._title')
})
*/

/*
// Image Snapshot Plugin
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
    customDiffConfig: { threshold: 0.0 },
    capture: 'viewport',
});


Cypress.Commands.add("setResolution", (size) => {
    if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
    } else {
        cy.viewport(size);
    }
})
*/