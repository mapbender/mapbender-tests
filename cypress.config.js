const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    baseUrl: 'http://localhost',
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
        mainUrl: 'http://localhost/mapbender4/',
        layer : {
            1 : 'Themen'
        },
      },
    },
  },
});
