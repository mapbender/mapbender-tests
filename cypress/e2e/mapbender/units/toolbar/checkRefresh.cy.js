describe('Test Neu laden', () => {
    beforeEach(() => {
        cy.visit('http://localhost/mapbender_bahn/app_dev.php/')
        cy.login({_username: 'root', _password: 'voo6Sheb'})
    })


    // const myUrl = "https://dbimmaps-eu.lsg-test.comp.db.de/mapserv?map=%2Fvar%2Fapp%2Fdbimmaps%2Fmapserver%2Ffachdaten_db.map&application=Flaecheninformation_DB_AG_CYPRESS&dbimm_key=3098&_signature=39%3ACepGnLnqdTsxc2jFbISKWhl0Yhc&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=TRUE&LAYERS=fahrradparkhaus%2Cleitungsmaste%2Cstreckenreaktivierung_09_in_betrieb%2Cstreckenreaktivierung_09_in_betrieb_buffer%2Cstreckenreaktivierung_08_im_bau%2Cstreckenreaktivierung_08_im_bau_buffer%2Cstreckenreaktivierung_07_lph_5_7%2Cstreckenreaktivierung_07_lph_5_7_buffer%2Cstreckenreaktivierung_06_lph_3_4%2Cstreckenreaktivierung_06_lph_3_4_buffer%2Cstreckenreaktivierung_05_lph_1_2%2Cstreckenreaktivierung_05_lph_1_2_buffer%2Cstreckenreaktivierung_04_minus_neg_ergebnis%2Cstreckenreaktivierung_04_minus_neg_ergebnis_buffer%2Cstreckenreaktivierung_04_plus_nkv%2Cstreckenreaktivierung_04_plus_nkv_buffer%2Cstreckenreaktivierung_04_nku%2Cstreckenreaktivierung_04_nku_buffer%2Cstreckenreaktivierung_03_machbarkeitsstudie_positiv%2Cstreckenreaktivierung_03_machbarkeitsstudie_positiv_buffer%2Cstreckenreaktivierung_03_machbarkeitsstudie%2Cstreckenreaktivierung_03_machbarkeitsstudie_buffer%2Cstreckenreaktivierung_02_potenzialstudie%2Cstreckenreaktivierung_02_potenzialstudie_buffer%2Cstreckenreaktivierung_01_projektidee%2Cstreckenreaktivierung_01_projektidee_buffer%2Cwirkraeume_17%2Cwirkraeume_18%2Cwirkraeume_19%2Cwirkraeume_20%2Cengpassbeseitigung_projekte%2Claermschutz%2Cnetzkonzeption_2040_ma%2Cnetzkonzeption_2040_ha20%2Cnetzkonzeption_2040_ha%2Cnetzkonzeption_2040_haplus20%2Cnetzkonzeption_2040_haplus%2Cubhf%2Cbrueckensanierung%2Cengpassbeseitigung_knoten%2Cvordrbedarf_vor_17_line%2Cvordrbedarf_vor_17_1000%2Cvordrbedarf_vor_17_5000%2Cvordrbedarf_17_line%2Cvordrbedarf_17_1000%2Cvordrbedarf_17_5000%2Cvordrbedarf_18_line%2Cvordrbedarf_18_1000%2Cvordrbedarf_18_5000%2Cvordrbedarf_19_line%2Cvordrbedarf_19_1000%2Cvordrbedarf_19_5000%2Cvordrbedarf_20_line%2Cvordrbedarf_20_1000%2Cvordrbedarf_20_5000%2Cvordrbedarf_22_line%2Cvordrbedarf_22_1000%2Cvordrbedarf_22_5000%2Clogistik_fachdaten%2Cflaechenreservierung%2Cmobilfunk%2Cvfkf_info%2Cstandort_info&STYLES=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&_OLSALT=0.6882501127401324&CRS=EPSG%3A25832&WIDTH=1346&HEIGHT=1236&BBOX=459943.19683007465%2C5518776.591767311%2C531169.1726153595%2C5584181.722577572";
    const myUrl = 'http://localhost/mapbender_bahn/app_dev.php/application/Flaecheninformation_DB_AG_CYPRESS?#150000@8.52417/50.18313r0@EPSG:25832';
    it('Test', () => {

        // Muss überarbeitet werden. Layer in Cypress.env ???
        cy.visit(myUrl);
        // Willkommens Info wegklicken
        cy.contains('OK, ich habe verstanden').click()

        // Eventuelle SQL Fehlermeldung wegklickien.
        cy.get('body').then($body =>{
            if($body.find('.notifyjs-corner').length > 0){
                cy.get('.notifyjs-corner').click()
            }
        })


        // Neu laden aufrufen.
        cy.get(`[title="Neu Laden"]`).click()
        cy.contains('OK, ich habe verstanden').click()

        // Eventuelle SQL Fehlermeldung wegklickien.
        cy.get('body').then($body =>{
            if($body.find('.notifyjs-corner').length > 0){
                cy.get('.notifyjs-corner').click()
            }
        })

    })

})