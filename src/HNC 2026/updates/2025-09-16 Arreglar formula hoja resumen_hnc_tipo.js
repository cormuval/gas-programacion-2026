/**
 * Arregla la fórmula en la celda A2 de la hoja FUNC_AZ.
 *
 * Esta función actualiza la fórmula ARRAY_CONSTRAIN con ARRAYFORMULA, SORT y UNIQUE
 * en la celda A2 de la hoja FUNC_AZ para obtener valores únicos ordenados de FUNC!E2:E,
 * limitados a 800 filas, para todos los establecimientos de HNC 2026.
 */
function arreglarFormulaGraficoFuncionarios() {
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    const HOJA = "RESUMEN_HNCxTIPO";
    const CELDA = "A1";
    const FORMULA = `=QUERY(HNCxTIPO!A3:I;"SELECT A,B,SUM(C) WHERE B IS NOT NULL GROUP BY A,B LABEL SUM(C) 'JORNADAS' ";1)`;
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(`Modificando el establecimiento: ${establecimientos[i][0]}`);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][5]);
        let hoja = progrmacion.getSheetByName(HOJA);
        hoja.getRange(CELDA).setFormula(FORMULA);
        console.log(`Modificacion realizada correctamente en el establecimiento: ${establecimientos[i][0]}`);
    }
}
