/**
 * Función reutilizable para agregar una fila con datos específicos a una hoja
 * en todos los establecimientos obtenidos de una hoja de establecimientos.
 *
 * @param {string} hoja - Nombre de la hoja donde se agregará la fila.
 * @param {Array} datosFila - Array de datos para la nueva fila.
 */
function agregarFilaEnRefHnc(hoja, datosFila) {
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(`Modificando el establecimiento: ${establecimientos[i][0]}`);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][6]);
        let sheet = progrmacion.getSheetByName(hoja);
        let fila = sheet.getLastRow();
        let datosFilaCopia = [...datosFila]; // Crear una copia para evitar modificar el array original
        datosFilaCopia.unshift(fila);
        console.log(datosFilaCopia);
        sheet.appendRow(datosFilaCopia);
        // sheet.getRange(16, 1, 1, 31).clearContent();
        console.log(`Se ha agregado la nueva fila en la posición: ${fila + 1}`);
    }
}
