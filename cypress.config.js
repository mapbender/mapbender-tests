const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    baseUrl: 'http://mapbender4.localhost',
    experimentalRunAllSpecs: true,
    viewportHeight: 800,
    viewportWidth: 1280,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
    env : {
      application : {
        title : 'Mapbender Demo Cypress',
        slug : 'Mapbender_Demo_CYPRESS',
        user: 'root',
        password: 'root',
        mainUrl: 'http://mapbender4.localhost',
        layer : {
            1 : 'Themen'
        },
        sources :{
          wmts: 'https://www.wmts.nrw.de/geobasis/wmts_nw_alkis',
          wms: 'https://www.wms.nrw.de/geobasis/wms_nw_alkis?VERSION=1.3.0&Service=WMS&Request=getCapabilities',
          vt: 'https://wms.wheregroup.com/tileserver/style/osm-liberty.json'
        },
      },
    },
  },
});
