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
    const mbSelector = 'div.accordion-cell div.mb-element-sketch';
    const waitLong = 1000;
    const waitShort = 200;
    const btnBlue = 'button[data-color="#009ee0"]';
    const btnRed = 'button[data-color="#cf003d"]';
    const btnYellow = 'button[data-color="#ffff33"]';
    const btnGreen = 'button[data-color="#00837e"]';
    const btnOrange = 'button[data-color="#ff7f00"]';
    it('test sketches', () => {
        cy.CyLog("Test Sketches", "Start");
        // Create test application
        cy.copyApplication({ _title: myAppTitle, _slug: myAppSlug } );
        cy.visit(myUrl);

        // activate the sketches
        cy.selectSidePaneElement( mbSelector );
        /*
        cy.get('div.container-accordion').each(($container, index) =>{
            const $mbElement = $container.find(mbSelector);
            if($mbElement.length > 0 ){
                const cssClass = $mbElement.attr('class');
                cy.CyLog('>>>>>>>>', `Container ${index + 1} hat Mapbender-Klasse: ${cssClass}`)
                cy.get(`div#accordion${index + 1}`).click();
            }
        })
*/
        // test sketch point
        cy.get('button[data-tool-name="point"]').click();

        cy.get('canvas').then(($canvas) => {
            const width = $canvas.width();
            const height = $canvas.height();
            const x = Math.floor(width / 2 );
            const y = Math.floor(height / 2 );
            cy.get('div.mb-element-sketch').find('input[name="label-text"').type('Point Test');
            cy.wrap($canvas).click(x,y);
            cy.wait(waitShort);
            cy.get(btnRed).click(); // red
            cy.wrap($canvas).click(x + 20,y + 20);
            cy.wait(waitShort);
            cy.get(btnYellow).click(); // yellow
            cy.wrap($canvas).click(x + 40,y + 40);
            cy.wait(waitShort);
            cy.get(btnGreen).click(); // green
            cy.wrap($canvas).click(x + 60,y + 60);
            cy.wait(waitShort);
            cy.get(btnOrange).click(); // orange
            cy.wrap($canvas).click(x + 80,y + 80 );
            cy.wait(waitShort);
        });
        cy.wait(waitLong);

        // test sketch Line
        cy.get('button[data-tool-name="line"]').click();
        cy.get('canvas').then(($canvas) => {
            const width = $canvas.width();
            const height = $canvas.height();
            const x = Math.floor(width / 2 ) - 100;
            const y = Math.floor(height / 2 ) - 100;
            cy.get(btnBlue).click();
            cy.get('div.mb-element-sketch').find('input[name="label-text"').type('Line Test');
            cy.wrap($canvas).click(x,y);
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 20,y - 20);
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 40,y - 40);
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 60,y - 100);
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 120,y - 100 );
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 140,y - 60 );
            cy.wrap($canvas).click(x + 120,y - 40 );
            cy.wrap($canvas).dblclick(x + 120,y - 40 );
        });
        cy.wait(waitLong);

        // test sketch polygon
        cy.get('button[data-tool-name="polygon"]').click();
        cy.get('canvas').then(($canvas) => {
            const width = $canvas.width();
            const height = $canvas.height();
            const x = Math.floor(width / 2 ) + 100;
            const y = Math.floor(height / 2 ) - 100;
            cy.get(btnGreen).click();
            cy.get('div.mb-element-sketch').find('input[name="label-text"').type('Polygon Test');
            cy.wrap($canvas).click(x,y);
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 50,y - 50 );
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 100,y - 50 );
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 150, y );
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 100, y + 50);
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 50,y + 50 );
            cy.wrap($canvas).dblclick(x + 50,y + 50 );
        });
        cy.wait(waitLong);

        // test sketch rectangle
        cy.get('button[data-tool-name="rectangle"]').click();
        cy.get('canvas').then(($canvas) => {
            const width = $canvas.width();
            const height = $canvas.height();
            const x = Math.floor(width / 2 ) + 300;
            const y = Math.floor(height / 2 ) - 100;
            cy.get(btnOrange).click();
            cy.get('div.mb-element-sketch').find('input[name="label-text"').type('Rectangle Test');
            cy.wrap($canvas).click(x,y);
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 100,y + 100 );
        });
        cy.wait(waitLong);

        // test sketch circle
        cy.get('button[data-tool-name="circle"]').click();
        cy.get('canvas').then(($canvas) => {
            const width = $canvas.width();
            const height = $canvas.height();
            const x = Math.floor(width / 2 ) + 300;
            const y = Math.floor(height / 2 ) + 100;
            cy.get('button[data-color="#009ee0"]').click();
            cy.get('div.mb-element-sketch').find('input[name="label-text"').type('Circle Test');
            cy.wrap($canvas).click(x,y);
            cy.wait(waitShort);
            cy.wrap($canvas).click(x + 50,y + 50 );
        });
        cy.wait(waitLong);

        // Delete test application
        cy.deleteApplication({ _slug: myAppSlug });
        cy.CyLog("Test Sketches", "End");
    })
})