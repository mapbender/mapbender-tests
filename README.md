# mapbender-testing

## Cypress for Mapbender

### Configuration

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