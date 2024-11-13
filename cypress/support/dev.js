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