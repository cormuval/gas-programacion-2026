/**
 * Función reutilizable para reemplazar un valor específico dentro de las fórmulas de una celda o rango en una hoja de cálculo de Google Sheets.
 *
 * @param {string} urlSheet - URLSheet de la hoja de cálculo de Google Sheets.
 * @param {string} nombreHoja - Nombre de la hoja donde se realizará el reemplazo.
 * @param {string} celdaORango - Celda específica (ej. "A1") o rango (ej. "C102:Y102") donde se buscarán y reemplazarán los valores en las fórmulas.
 * @param {string} valorAntiguo - El valor a reemplazar dentro de las fórmulas (ej. "$60").
 * @param {string} valorNuevo - El nuevo valor que reemplazará al antiguo (ej. "$48").
 */
function reemplazarValorEnFormula(urlSheet, nombreHoja, celdaORango, valorAntiguo, valorNuevo) {
    let spreadsheet = SpreadsheetApp.openByUrl(urlSheet);
    let sheet = spreadsheet.getSheetByName(nombreHoja);
    let rango = sheet.getRange(celdaORango);
    let formulas = rango.getFormulas();

    for (let fila = 0; fila < formulas.length; fila++) {
        for (let col = 0; col < formulas[fila].length; col++) {
            if (formulas[fila][col] && formulas[fila][col].includes(valorAntiguo)) {
                let nuevaFormula = formulas[fila][col].replaceAll(valorAntiguo, valorNuevo);
                let filaActual = rango.getRow() + fila;
                let colActual = rango.getColumn() + col;
                sheet.getRange(filaActual, colActual).setFormula(nuevaFormula);
            }
        }
    }
}
