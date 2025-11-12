/**
 * Función reutilizable para actualizar el valor de una celda en una hoja específica
 * para todos los establecimientos obtenidos de una hoja de establecimientos.
 *
 * @param {string} hoja - Nombre de la hoja donde se actualizará el valor.
 * @param {string} rango - Rango de la columna que se ocultará (ej. "E:E").
 */
function ocultarColumnaEnBdProg(hoja, rango) {
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(`Modificando el establecimiento: ${establecimientos[i][0]}`);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][3]);
        let sheet = progrmacion.getSheetByName(hoja);
        sheet.hideColumn(sheet.getRange(rango));
        console.log(`Modificacion realizada correctamente en el establecimiento: ${establecimientos[i][0]}`);
    }
}
