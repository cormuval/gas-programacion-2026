/**
 * Función reutilizable para replicar una fórmula base en un rango específico de filas
 * dentro de una columna determinada en una hoja de cálculo de Google Sheets.
 * La fórmula base puede contener un marcador {row} que será reemplazado por el número de fila actual.
 *
 * @param {string} urlSheet - URL de la hoja de cálculo de Google Sheets.
 * @param {string} nombreHoja - Nombre de la hoja donde se replicará la fórmula.
 * @param {number} filaInicio - Número de la fila de inicio del rango (inclusive).
 * @param {number} filaFin - Número de la fila de fin del rango (inclusive).
 * @param {string} columna - Letra de la columna donde se aplicará la fórmula (ej. "D").
 * @param {string} formulaBase - La fórmula base a replicar, puede incluir {row} para insertar el número de fila.
 */
function replicarFormulaEnRango(urlSheet, nombreHoja, filaInicio, filaFin, columna, formulaBase) {
    let spreadsheet = SpreadsheetApp.openByUrl(urlSheet);
    let sheet = spreadsheet.getSheetByName(nombreHoja);

    for (let fila = filaInicio; fila <= filaFin; fila++) {
        let formula = formulaBase.replace(/{row}/g, fila);
        sheet.getRange(columna + fila).setFormula(formula);
        console.log(`Fórmula aplicada en ${columna}${fila}: ${formula}`);
    }

    console.log(`Replicación de fórmula completada en el rango ${columna}${filaInicio}:${columna}${filaFin}`);
}

/**
 * Ejemplo de uso de la función replicarFormulaEnRango:
 *
 * Para replicar la fórmula =SI.ERROR(INDICE(QUERY(ENCUESTA_GESTION!$A$3:$H;"SELECT sum(H) WHERE B='"&$D{row}&"'   ";0);2);"")
 * en la columna "E", filas 10 a 20, en la hoja "MiHoja" del spreadsheet con ID "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU":
 *
 * replicarFormulaEnRango(
 *     "urlSheet",                                       // urlSheet
 *     "MiHoja",                                         // nombreHoja
 *     10,                                               // filaInicio
 *     20,                                               // filaFin
 *     "E",                                              // columna
 *     `=SI.ERROR(INDICE(QUERY(ENCUESTA_GESTION!$A$3:$H;"SELECT sum(H) WHERE B='"&$D{row}&"'   ";0);2);"")`  // formulaBase
 * );
 */
