describe('Test print', () => {
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
    it('test print', () => {
        cy.CyLog("Test Print", "Start");
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        // Chance default ViewPort. Because the print button is not visible in smaller sizes
        cy.viewport(1200, 800);
        cy.visit(myUrl);

        // Open print menu.
        cy.get('span[data-test="mb-iconPrint"]').click();

        // Test the template choice
        cy.get('label.form-label[for="template"]')
            .siblings('div.dropdown')
            .then(($element) =>{

                cy.CyLog("PRINT:", " test the templates: Element length: " + $element.length);
                cy.wrap($element).click();
                cy.wait(200);
                cy.wrap($element).find('ul > li[data-value="a4_landscape_offical"]').click();
                cy.wait(200);
                cy.wrap($element).click();
                cy.wait(200);
                cy.wrap($element).find('ul > li[data-value="a4portrait"]').click();
                cy.wait(200);
                cy.wrap($element).click();
                cy.wait(200);
                cy.wrap($element).find('ul > li[data-value="a3landscape"]').click();
                cy.wait(200);
                cy.wrap($element).click();
                cy.wait(200);
                cy.wrap($element).find('ul > li[data-value="a4landscape"]').click();
                cy.wait(200);
        });

        // Test the quality choice
        cy.get('label.form-label[for="quality"]')
            .siblings('div.dropdown')
            .then(($element) => {

                cy.CyLog("PRINT: ", "test the qualities: Element length: " + $element.length);
                cy.wrap($element).click();
                cy.wait(200);
                cy.wrap($element).find('ul > li[data-value="288"]').click();
                cy.wait(200);
                cy.wrap($element).click();
                cy.wait(200);
                cy.wrap($element).find('ul > li[data-value="72"]').click();
                cy.wait(200);
        });

        // Test the scale choice
        cy.get('label.form-label[for="scale_select"]')
            .siblings('div.dropdown')
            .then(($element) => {
                cy.CyLog("PRINT: ", "test the scales: Element length:" + $element.length);
                cy.wrap($element).click();
                cy.wait(200);
                cy.wrap($element).find('ul > li[data-value="500"]').click();
                cy.wait(200);
                cy.wrap($element).click();
                cy.wait(200);
                cy.wrap($element).find('ul > li[data-value="1000"]').click();
                cy.wait(200);
                cy.wrap($element).click();
                cy.wait(200);
                cy.wrap($element).find('ul > li[data-value="5000"]').click();
                cy.wait(200);
                cy.wrap($element).click();
                cy.wait(200);
                cy.wrap($element).find('ul > li[data-value="10000"]').click();
                cy.wait(200);
                cy.wrap($element).click();
                cy.wait(200);
                cy.wrap($element).find('ul > li[data-value="25000"]').click();
                cy.wait(200);

        });

        // Test the scale rotation
        cy.get('label.form-label[for="rotation"]')
            .siblings('input#rotation')
            .then(($element) => {
                cy.CyLog("PRINT: ", "test the rotation");
                cy.wrap($element).clear().type('500');
                cy.wait(200);
        });

        // Test the scale Title
        cy.get('label.form-label[for="custom_bottom_extra_title"]')
            .siblings('input#custom_bottom_extra_title')
            .then(($element) => {
                cy.CyLog("PRINT: ", "test the rotation");
                cy.wrap($element).clear().type('Print my Cypress Test');
                cy.wait(200);
        });

        cy.get('input#printLegend').click();
        cy.get('div.customPrintDialog')
            .find('div.text-end')
            .find('input[type="submit"]')
            .click();

        cy.visit(mainUrl);
        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test Print", "End");

    })

})