function AgregarFilasProgramacion(nuevosNombres) {
    const ID_PLANTILLA_ORIGEN = "1Y0jq7BWO5DFO1EMXOeDb4QDvRAQMDRYrX6S6mGEXeYA";
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";

    let tablaEstablecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);
    let origen = SpreadsheetApp.openById(ID_PLANTILLA_ORIGEN);

    // Recorrer todos los establecimientos desde la fila 49 en adelante
    for (let i = 1; i < tablaEstablecimientos.length; i++) {
        let destino = SpreadsheetApp.openByUrl(tablaEstablecimientos[i][3]);

        // Migrar los valores desde la plantilla origen
        MigrarValores(origen, destino);
        Logger.log(tablaEstablecimientos[i][0] + " ha sido Migrado!");

        // Modificar la hoja "AGENDA" en cada archivo destino
        let hojaAGENDA = destino.getSheetByName("AGENDA");
        if (hojaAGENDA) {
            hojaAGENDA.getRange("100:101").activate(); // seleccionar fila base
            hojaAGENDA.insertRowsAfter(hojaAGENDA.getActiveRange().getLastRow(), 8); // insertar 8 filas
            Logger.log("Filas agregadas en " + tablaEstablecimientos[i][0]);
        } else {
            Logger.log("⚠️ No se encontró la hoja 'AGENDA' en " + tablaEstablecimientos[i][0]);
        }
    }

    console.log("✅ Modificación realizada correctamente en todas las planillas.");
}
