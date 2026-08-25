function MigrarSoloValores(nuevosNombres) {
    const ID_PLANTILLA_ORIGEN = "1Y0jq7BWO5DFO1EMXOeDb4QDvRAQMDRYrX6S6mGEXeYA";
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";

    let tablaEstablecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);
    let origen = SpreadsheetApp.openById(ID_PLANTILLA_ORIGEN);

    // Actualizar los nombres de los establecimientos
    for (let i = 1; i < tablaEstablecimientos.length; i++) {
        let destino = SpreadsheetApp.openByUrl(tablaEstablecimientos[i][3]);
        MigrarValores(origen, destino);
        Logger.log(tablaEstablecimientos[i][0] + " ha sido Migrado!");
    }
}

function MigrarValores(origen, destino) {
    let datosOrigen;
    //Parte 1
    datosOrigen = origen.getSheetByName("PROG TRAZADORAS 2026").getRange("C10").getValues();
    //console.log(datosOrigen);
    destino.getSheetByName("PROG TRAZADORAS 2026").getRange("C10").setValues(datosOrigen);
}
