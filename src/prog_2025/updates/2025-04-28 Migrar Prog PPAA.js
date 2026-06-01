function migrarDatos() {
    const establecimienetosMigracion = obtenerListaEstablecimientosMigracion();

    for (var i = 1; i < establecimienetosMigracion.length; i++) {
        if (establecimienetosMigracion[i][2] !== "No aplica") {
            let poblacion = establecimienetosMigracion[i][1];
            let origen = SpreadsheetApp.openById("1w0XUGLkXawLaqX7ZGahY6VG4Lya4cybWxcya5TeXPPg");
            let destino = SpreadsheetApp.openByUrl(establecimienetosMigracion[i][3]);

            migracionPPAA(origen, destino);
            Logger.log(establecimienetosMigracion[i][0] + " ha sido Migrado!");
        } else {
            Logger.log(establecimienetosMigracion[i][0] + " No aplica!");
        }
    }
}

function obtenerListaEstablecimientosMigracion() {
    let establecimienetos = SpreadsheetApp.openById("1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE").getSheetByName("Establecimientos Migracion").getDataRange().getValues();
    // console.log(establecimienetos[1][1]);
    return establecimienetos;
}

function migracionPPAA(origen, destino) {
    let datosOrigen;
    //Parte 1
    datosOrigen = origen.getSheetByName("PROG VACUNACION").getRange("F5:F6").getValues();
    //console.log(datosOrigen);
    destino.getSheetByName("PROG VACUNACION").getRange("F5:F6").setValues(datosOrigen);
}
