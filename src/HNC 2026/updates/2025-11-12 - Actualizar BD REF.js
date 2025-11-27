function actualizarBdRefHNC2026() {
    const ID_PLANTILLA_ORIGEN = "1kP2bL9OXpIWDUAJQldOYBRhgpalJ2Kc8zi7XCCsP1rc";
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";

    let tablaEstablecimientosReuniones = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);
    let origen = SpreadsheetApp.openById(ID_PLANTILLA_ORIGEN);

    //* Actualizar la bd de referencia en cada establecimiento (reuniones, cargos de gestión y derechos funcionarios)
    for (let i = 1; i < tablaEstablecimientosReuniones.length; i++) {
        let destino = SpreadsheetApp.openByUrl(tablaEstablecimientosReuniones[i][6]);
        MigrarValoresHNC(origen, destino);
        Logger.log("La información del " + tablaEstablecimientosReuniones[i][0] + " ha sido actualizada!");
    }
}

function MigrarValoresHNC(origen, destino) {
    let datosOrigen;
    //ACTUALIZACION DE BD DE REUBIONES
    //Parte 1
    datosOrigen = origen.getSheetByName("BD_REF_REUNIONES").getRange("A2:D235").getValues();
    //console.log(datosOrigen);
    destino.getSheetByName("BD_REF_REUNIONES").getRange("A2:D235").setValues(datosOrigen);

    //Parte 1.2
    datosOrigen = origen.getSheetByName("BD_REF_REUNIONES").getRange("F2:M235").getValues();
    //console.log(datosOrigen);
    destino.getSheetByName("BD_REF_REUNIONES").getRange("F2:M235").setValues(datosOrigen);

    //ACTUALIZACION DE BD DE DERECHOS FUNCIONARIOS
    //Parte 2
    datosOrigen = origen.getSheetByName("BD_REF_DERECHOS").getRange("A2:F41").getValues();
    //console.log(datosOrigen);
    destino.getSheetByName("BD_REF_DERECHOS").getRange("A2:F41").setValues(datosOrigen);
    //console.log(datosOrigen);

    //ACTUALIZACION DE BD DE CARGOS DE GESTION
    //Parte 3
    datosOrigen = origen.getSheetByName("BD_REF_GESTION").getRange("A2:G328").getValues();
    //console.log(datosOrigen);
    destino.getSheetByName("BD_REF_GESTION").getRange("A2:G328").setValues(datosOrigen);
    //console.log(datosOrigen);
}
