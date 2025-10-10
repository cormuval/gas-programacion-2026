function actualizarReunionesHNC2026(nuevosNombres) {
    const ID_PLANTILLA_ORIGEN = "1kP2bL9OXpIWDUAJQldOYBRhgpalJ2Kc8zi7XCCsP1rc";
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    
    let tablaEstablecimientosReuniones = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);
    let origen = SpreadsheetApp.openById(ID_PLANTILLA_ORIGEN);

  // Actualizar los nombres de los establecimientos
  for (let i = 1; i < tablaEstablecimientosReuniones.length; i++) {
    let destino = SpreadsheetApp.openByUrl(tablaEstablecimientosReuniones[i][6]);
    MigrarValoresHNC(origen, destino);
    Logger.log(tablaEstablecimientosReuniones[i][0] + " ha sido Migrado!");
  }

}

function MigrarValoresHNC(origen, destino) {
    let datosOrigen;
    //Parte 1
    datosOrigen = origen.getSheetByName("BD_REF_REUNIONES").getRange("K2:M175").getValues();
    //console.log(datosOrigen);
    destino.getSheetByName("BD_REF_REUNIONES").getRange("K2:M175").setValues(datosOrigen);

    //Parte 2
    //datosOrigen = origen.getSheetByName("BD_REF_GESTION").getRange("F2:M175").getValues();
    //console.log(datosOrigen);
    //destino.getSheetByName("BD_REF_REUNIONES").getRange("F2:M175").setValues(datosOrigen);


    }