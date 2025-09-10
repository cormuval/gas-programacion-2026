/**
 * Migra las fórmulas de la pestaña agenda desde una plantilla a todos los establecimientos.
 *
 * Esta función copia las fórmulas de la hoja "AGENDA" desde un archivo plantilla
 * a todos los archivos de programación de los establecimientos.
 */
function migrarFormula() {
    const ID_HOJA_MIGRACION = "1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE";
    const ID_PLANTILLA_ORIGEN = "1w0XUGLkXawLaqX7ZGahY6VG4Lya4cybWxcya5TeXPPg";

    const establecimientosMigracion = obtenerListaEstablecimientos(ID_HOJA_MIGRACION, "Establecimientos Migracion");

    for (var i = 1; i < establecimientosMigracion.length; i++) {
        if (establecimientosMigracion[i][2] !== "No aplica") {
            let poblacion = establecimientosMigracion[i][1];
            let origen = SpreadsheetApp.openById(ID_PLANTILLA_ORIGEN);
            let destino = SpreadsheetApp.openByUrl(establecimientosMigracion[i][3]);

            migracionFormulaAgenda(origen, destino);
            Logger.log(establecimientosMigracion[i][0] + " ha sido Migrado!");
        } else {
            Logger.log(establecimientosMigracion[i][0] + " No aplica!");
        }
    }
}

// Esta función ahora se encuentra en utils/1 - Obtener establecimientos.js
// Para usar: obtenerListaEstablecimientos(spreadsheetId, "Establecimientos Migracion")

/**
 * Migra las fórmulas de la pestaña agenda desde el origen al destino.
 *
 * @param {Spreadsheet} origen - El archivo de origen
 * @param {Spreadsheet} destino - El archivo de destino
 */
function migracionFormulaAgenda(origen, destino) {
    // Usar la función utilitaria para copiar fórmulas
    copiarFormulasRango(origen, destino, "AGENDA", "AGENDA", "C4:Y104", "C4:Y104");
}

// Las funciones de copia ahora están en utils/4 - Operaciones hojas.js
