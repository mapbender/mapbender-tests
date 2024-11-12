/ Beispiel für eine Cypress-Funktion, die einen Punkt auf einer OpenLayers-Karte ansteuert und anklickt
Cypress.Commands.add('clickOnMap', (map, lon, lat) => {
    // Umrechnen von Längen- und Breitengrad in Pixel-Koordinaten
    const view = map.getView();
    const mapCoords = ol.proj.fromLonLat([lon, lat], view.getProjection());
    const pixel = map.getPixelFromCoordinate(mapCoords);

    // Simuliere einen Klick auf die berechneten Pixel-Koordinaten
    cy.get('.ol-viewport').click(pixel[0], pixel[1]);
});