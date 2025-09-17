function migrarDotaciones() {
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    // for (var i = 1; i < establecimientos.length; i++) {
    for (var i = 1; i < 2; i++) {
        let hnc = SpreadsheetApp.openByUrl(establecimientos[i][5]);
        let refHnc = SpreadsheetApp.openByUrl(establecimientos[i][6]);
        let programacion = SpreadsheetApp.openByUrl(establecimientos[i][3]);
        migrarInformacionListaEstamentos(refHnc, programacion);
        //migrarInformacionDotacion(hnc, programacion);
        Logger.log(establecimientos[i][0] + " ha sido Migrado!");
    }
}

function migrarInformacionListaEstamentos(origen, destino) {
    let datosOrigen;
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("B7:B199").getValues();
    destino.getSheetByName("DOTACION").getRange("A3:A195").setValues(datosOrigen);
}

function migrarInformacionDotacion(origen, destino) {
    let datosOrigen;
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("B7:B199").getValues();
    destino.getSheetByName("DOTACION").getRange("A3:A195").setValues(datosOrigen);
}
