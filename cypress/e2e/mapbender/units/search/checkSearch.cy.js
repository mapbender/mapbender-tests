describe('mapbender login to app', () => {
    beforeEach(() => {
        cy.visit('http://localhost/mapbender_bahn/app_dev.php/');
        cy.login({_username: 'root', _password: 'voo6Sheb'});
    })


    // it('cloneFlaecheninfo_DB_AG', () => {
    //     cy.cloneFlaecheninfo_DB_AG({ _title: 'Flächeninfo DB AG CYPRESS', _slug:'Flaecheninformation_DB_AG_CYPRESS' })
    // })

    let glVarTest = Cypress.env('layer');
    // console.log(glVarTest);
    // console.log(glVarTest[1]);

    // let layerCount = glVarTest.length;
    // console.log(layerCount);
    it('goto new Application', () => {
        //cy.intercept('GET', '/api/data').as('getData');
        //cy.visit('http://localhost/mapbender_bahn/app_dev.php/application/Flaecheninformation_DB_AG_CYPRESS');
        cy.visit('http://localhost/mapbender_bahn/app_dev.php/application/Flaecheninformation_DB_AG_CYPRESS?#150000@8.93784/50.11554r0@EPSG:25832');

        // cy.wait('@getData').then((interception) => {
        //     expect(interception.response.statusCode).to.eq(200);
        // })
        cy.contains('OK, ich habe verstanden').click();
        cy.get('.toggleSideBar').click();

        cy.get('.optgroupify').invoke('css', 'display', 'block');
        cy.get('.optgroupify').contains('Liegenschaftsdaten DBImm')
        cy.contains('Liegenschaftsdaten DBImm').next('ul').invoke('css', 'display', 'block');
        cy.get('a').contains('Bauliche Anlagen (BA)').click();


        //cy.get('.searchfields input').first().type('126');
        cy.get('.searchfields input').first().type(126);

        //cy.get('.searchfields input').contains('Anlagennummer Bezeichnung BE-Nummer PLZ Ort');


        //cy.get('input').contains('[placeholder="Anlagennummer Bezeichnung BE-Nummer PLZ Ort"]'); //.clear().type('126');
        //cy.log
    })
    /*
          it('delete_Flaecheninfo_DB_AG', () => {
              //cy.deleteApplication({ _apptitle: 'Flächeninfo DB AG CYPRESS'});
          })
    */
})