function migrarFormula() {
    const establecimientosMigracion = obtenerListaEstablecimientosMigracion();

    for (var i = 1; i < establecimientosMigracion.length; i++) {
        if (establecimientosMigracion[i][2] !== "No aplica") {
            let poblacion = establecimientosMigracion[i][1];
            let origen = SpreadsheetApp.openById("1w0XUGLkXawLaqX7ZGahY6VG4Lya4cybWxcya5TeXPPg");
            let destino = SpreadsheetApp.openByUrl(establecimientosMigracion[i][3]);

            migracionFormulaAgenda(origen, destino);
            Logger.log(establecimientosMigracion[i][0] + " ha sido Migrado!");
        } else {
            Logger.log(establecimientosMigracion[i][0] + " No aplica!");
        }
    }
}

function obtenerListaEstablecimientosMigracion() {
    let establecimientos = SpreadsheetApp.openById("1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE").getSheetByName("Establecimientos Migracion").getDataRange().getValues();
    // console.log(establecimienetos[1][1]);
    return establecimientos;
}

function migracionFormulaAgenda(origen, destino) {
    // Copiar el rango completo C100:Y103 de la hoja "AGENDA" incluyendo fórmulas
    copiarFormulaRango(origen, destino, "AGENDA", "C4:Y104", "C4:Y104");
}

function copiarFormulaRango(origen, destino, nombreHojaOrigen, rangoOrigen, rangoDestino) {
    // Obtener las fórmulas del rango de origen
    var formulas = origen.getSheetByName("AGENDA").getRange("C4:Y104").getFormulas();

    // Establecer las fórmulas en el rango de destino
    destino.getSheetByName("AGENDA").getRange("C4:Y104").setFormulas(formulas);
}
