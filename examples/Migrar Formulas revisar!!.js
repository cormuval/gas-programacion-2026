function migrarFormula() {
    const establecimientosMigracion = obtenerListaEstablecimientosMigracion();

    for (var i = 48; i < establecimientosMigracion.length; i++) {
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

function migracionFormula(origen, destino) {
    // Copiar el rango completo C100:Y103 de la hoja "AGENDA" incluyendo fórmulas
    copiarFormulaRango(origen, destino, "HORAS A PROGRAMAR", "L4:U32", "L4:U32");
}

function copiarFormulaRango(origen, destino, nombreHojaOrigen, rangoOrigen, rangoDestino) {
    // Obtener las fórmulas del rango de origen
    var formulas = origen.getSheetByName("HORAS A PROGRAMAR").getRange("L4:U32").getFormulas();

    // Establecer las fórmulas en el rango de destino
    destino.getSheetByName("HORAS A PROGRAMAR").getRange("L4:U32").setFormulas(formulas);

    
}