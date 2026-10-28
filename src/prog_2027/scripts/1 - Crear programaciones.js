/**
 * Crea programaciones para los establecimientos basándose en una plantilla.
 *
 * Esta función toma una plantilla de Google Sheets y crea una copia para cada
 * establecimiento entre la fila 2 y la fila 50 de la hoja de establecimientos,
 * guardándolas en una carpeta específica y registrando el enlace en la columna F.
 */
function crearProgramaciones2027() {
    // IDs específicos para el proyecto 2027
    const ID_PLANTILLA = "1TxvWlk0cu2mFzB-wCmke2Kj_iFByJYfzN5y1J_18mW0";
    const ID_CARPETA_DESTINO = "15y5QgKunkPMor5BAYNKjvFBnaBzcesW-";
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    // Solo los establecimientos entre la fila 2 y la fila 50 tienen programación 2027
    const ULTIMA_FILA = 50;
    // Columna F: LINK PROGRAMACION 2027
    const COLUMNA_LINK = 6;

    // Obtener la plantilla desde Google Drive usando su ID
    let plantilla = DriveApp.getFileById(ID_PLANTILLA);
    let carpetaDestino = DriveApp.getFolderById(ID_CARPETA_DESTINO);
    // Obtener la lista de establecimientos usando la función de utils
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);
    let limite = Math.min(ULTIMA_FILA, establecimientos.length);

    Logger.log(`Se procesarán ${limite - 1} establecimientos`);

    for (let i = 1; i < limite; i++) {
        let archivoNuevo = plantilla.makeCopy(establecimientos[i][0] + " - PROG APS 2027 v.1");
        let linkArchivoNuevo = archivoNuevo.getUrl();
        archivoNuevo.moveTo(carpetaDestino);
        guardarLinkProgramacion2027(ID_HOJA_ESTABLECIMIENTOS, i + 1, linkArchivoNuevo, COLUMNA_LINK);
        Logger.log("Archivo de " + establecimientos[i][0] + " ha sido Creado!");
    }
}

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
function guardarLinkProgramacion2027(spreadsheetId, fila, link, columna) {
    try {
        let hoja = SpreadsheetApp.openById(spreadsheetId).getSheetByName("Establecimientos");
        hoja.getRange(fila, columna).setValue(link);
        console.log(`Enlace guardado en fila ${fila}, columna ${columna}`);
    } catch (error) {
        console.error(`Error al guardar el enlace: ${error.message}`);
        throw new Error(`No se pudo guardar el enlace: ${error.message}`);
    }
}
