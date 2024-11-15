# mapbender-testing

## Cypress for Mapbender

### Configuration

The following parameters must be entered in cypress.config.js.

- title : 'Mapbender Demo Cypress',
- slug : 'Mapbender_Demo_CYPRESS',
- user: 'root',
- password: 'root',
- mainUrl: 'http://localhost/mapbender4/',

Explanation:  
title: Application name for the test  
slug: Part of the url for the test application  
user: for login  
password: for login  
mainUrl: which application is to be tested  

To be able to read the parameters, they must be added in json format under env -> application.  
Example:
```
    env : {
      application : {
        title : 'Mapbender Demo Cypress',
        slug : 'Mapbender_Demo_CYPRESS',
        user: 'username',
        password: 'password',
        mainUrl: 'http://localhost/mapbender/',
        layer : {
            1 : 'Themen'
        },
      },
    }
```

Here is an example of a complete cypress.config.js  
```
const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    baseUrl: 'http://localhost',
    experimentalRunAllSpecs: true,
    env : {
      application : {
        title : 'Mapbender Demo Cypress',
        slug : 'Mapbender_Demo_CYPRESS',
        user: 'username',
        password: 'password',
        mainUrl: 'http://localhost/mapbender/',
        layer : {
            1 : 'Themen'
        },
      },
    },
  },
});
```
The other parameters are Cypress specific and can be found here:
https://docs.cypress.io/app/references/configuration

It is possible that the tests must be language-dependent. To do this, it must be ensured that the mapbender is started in the corresponding language:  

Customise the `paramters.yaml` for this.
```
parameters:  
    \# locale en, de, es, fr, it, nl, pt, ru, tr, uk are available  
    fallback_locale: de  
    locale: de  
    \# uncomment this if you don't want the language to automatically adapt to the browser language  
    mapbender.automatic_locale: false  
```