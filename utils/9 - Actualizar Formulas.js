/**
 * Función reutilizable para actualizar una fórmula en una hoja y celda específica
 * para todos los establecimientos obtenidos de una hoja de establecimientos.
 *
 * @param {string} idHojaEstablecimientos - ID de la hoja de cálculo que contiene la lista de establecimientos.
 * @param {string} hoja - Nombre de la hoja donde se actualizará la fórmula.
 * @param {string} celda - Celda donde se establecerá la fórmula (ej. "A1").
 * @param {string} formula - La fórmula a establecer en la celda.
 */
function actualizarFormulaEnBdHnc(hoja, celda, formula) {
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(`Modificando el establecimiento: ${establecimientos[i][0]}`);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][5]);
        let sheet = progrmacion.getSheetByName(hoja);
        sheet.getRange(celda).setFormula(formula);
        console.log(`Modificacion realizada correctamente en el establecimiento: ${establecimientos[i][0]}`);
    }
}
