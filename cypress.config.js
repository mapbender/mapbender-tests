const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    baseUrl: 'http://localhost',
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env : {
      application : {
        cypress :{
          layer : {
            1 : 'Themen'
          }
        },
      },
    },
  },
});
