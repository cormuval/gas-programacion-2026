/**
 * Función reutilizable para limpiar el contenido de un rango específico de celdas
 * en una hoja de todos los establecimientos obtenidos de una hoja de establecimientos.
 *
 * @param {string} hoja - Nombre de la hoja donde se limpiará el rango.
 * @param {string} rangoString - Rango de celdas a limpiar, en formato A1:B2 (ej. "D4:V4").
 */
function limpiarRangoEnBdHnc(hoja, rangoString) {
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(`Modificando el establecimiento: ${establecimientos[i][0]}`);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][6]);
        let sheet = progrmacion.getSheetByName(hoja);
        sheet.getRange(rangoString).clearContent();
        console.log(`Se ha limpiado el rango en la hoja: ${hoja} y rango: ${rangoString}`);
    }
}
