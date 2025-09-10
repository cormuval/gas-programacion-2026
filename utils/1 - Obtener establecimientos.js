/**
 * Obtiene la lista de establecimientos desde una hoja de cálculo específica.
 *
 * Esta función accede a una hoja de cálculo de Google Sheets utilizando su ID,
 * obtiene todos los datos de la hoja "Establecimientos" y los devuelve como una matriz.
 *
 * @param {string} spreadsheetId - El ID de la hoja de cálculo que contiene los establecimientos
 * @param {string} [sheetName="Establecimientos"] - El nombre de la hoja dentro del spreadsheet (opcional, por defecto "Establecimientos")
 * @returns {Array<Array>} Una matriz bidimensional con todos los datos de los establecimientos
 */
function obtenerListaEstablecimientos(spreadsheetId, sheetName = "Establecimientos") {
    try {
        let hoja = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
        let establecimientos = hoja.getDataRange().getValues();
        console.log(`Se obtuvieron ${establecimientos.length} registros de establecimientos`);
        return establecimientos;
    } catch (error) {
        console.error(`Error al obtener establecimientos: ${error.message}`);
        throw new Error(`No se pudo obtener la lista de establecimientos: ${error.message}`);
    }
}
