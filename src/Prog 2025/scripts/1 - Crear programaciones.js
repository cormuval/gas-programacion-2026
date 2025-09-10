/**
 * Crea programaciones para todos los establecimientos basándose en una plantilla.
 *
 * Esta función toma una plantilla de Google Sheets y crea una copia para cada
 * establecimiento de la lista, guardándolas en una carpeta específica y registrando
 * el enlace en la hoja de establecimientos.
 */
function crearProgramaciones() {
    // IDs específicos para el proyecto 2025
    const ID_PLANTILLA = "1iDJrG3fYg23cvaPPZ1b2BQVdfddD0HMrLTq9dZjAQJU";
    const ID_CARPETA_DESTINO = "1PuaxSbRWVsz6_eBsCCLldzd3gbhZ3TJn";
    const ID_HOJA_ESTABLECIMIENTOS = "1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE";

    let plantilla = DriveApp.getFileById(ID_PLANTILLA);
    let carpetaDestino = DriveApp.getFolderById(ID_CARPETA_DESTINO);
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    Logger.log(`Se procesarán ${establecimientos.length - 1} establecimientos`);

    for (var i = 1; i < establecimientos.length; i++) {
        let archivoNuevo = plantilla.makeCopy(establecimientos[i][0] + " - PROG APS 2025 v.1");
        let linkArchivoNuevo = archivoNuevo.getUrl();
        archivoNuevo.moveTo(carpetaDestino);
        guardarLinkProgramacion(ID_HOJA_ESTABLECIMIENTOS, i + 1, linkArchivoNuevo, 2);
        Logger.log("Archivo de " + establecimientos[i][0] + " ha sido Creado!");
    }
}

// Esta función ahora se encuentra en utils/1 - Obtener establecimientos.js
// Para usar: obtenerListaEstablecimientos(spreadsheetId, sheetName)

/**
 * Guarda el enlace de una programación en la hoja de establecimientos.
 *
 * Esta función actualiza una celda específica en la hoja de establecimientos
 * con el enlace del archivo de programación creado.
 *
 * @param {string} spreadsheetId - El ID de la hoja de cálculo de establecimientos
 * @param {number} fila - La fila donde guardar el enlace
 * @param {string} link - El enlace del archivo de programación
 * @param {number} columna - La columna donde guardar el enlace
 */
function guardarLinkProgramacion(spreadsheetId, fila, link, columna) {
    try {
        let hoja = SpreadsheetApp.openById(spreadsheetId).getSheetByName("Establecimientos");
        hoja.getRange(fila, columna).setValue(link);
        console.log(`Enlace guardado en fila ${fila}, columna ${columna}`);
    } catch (error) {
        console.error(`Error al guardar el enlace: ${error.message}`);
        throw new Error(`No se pudo guardar el enlace: ${error.message}`);
    }
}
