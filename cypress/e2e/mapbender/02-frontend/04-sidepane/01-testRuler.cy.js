describe('Test Ruler', () => {
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
    // create selector for ruler
    const mbSelector = 'div.accordion-cell div.mb-element-ruler';
    it('Test Ruler', () => {
        cy.CyLog("Test Ruler", "Start");
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.visit(myUrl);

        // activate the ruler in the sidepane
        cy.selectSidePaneElement( mbSelector );

        // line test
        cy.get('input[data-test="mb-ruler-rb-line"]').click();
        cy.get('canvas').then(($canvas) => {
            const width = $canvas.width();
            const height = $canvas.height();
            const x = Math.floor(width / 2 );
            const y = Math.floor(height / 2 );
            cy.wrap($canvas).click(x,y);
            cy.wrap($canvas).click(x,y + 100);
            cy.wrap($canvas).click(x + 100,y + 100);
            cy.wrap($canvas).click(x + 100,y );
            cy.wrap($canvas).dblclick(x,y);
        });
        cy.wait(2000);
        // area test
        cy.get('input[data-test="mb-ruler-rb-area"]').click();
        cy.get('canvas').then(($canvas) => {
            const width = $canvas.width();
            const height = $canvas.height();
            const x = Math.floor(width / 2 );
            const y = (Math.floor(height / 2 )) + 100;
            cy.wrap($canvas).click(x,y);
            cy.wrap($canvas).click(x,y + 100);
            cy.wrap($canvas).click(x + 100,y + 100);
            cy.wrap($canvas).click(x + 100,y );
            cy.wrap($canvas).click(x,y);
            cy.wait(2000);
            cy.wrap($canvas).dblclick(x,y);

        });
        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test Ruler", "End");
    })
})