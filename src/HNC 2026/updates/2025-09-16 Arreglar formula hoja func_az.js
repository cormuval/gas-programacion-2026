/**
 * Arregla la fórmula en la celda A2 de la hoja FUNC_AZ.
 *
 * Esta función actualiza la fórmula ARRAY_CONSTRAIN con ARRAYFORMULA, SORT y UNIQUE
 * en la celda A2 de la hoja FUNC_AZ para obtener valores únicos ordenados de FUNC!E2:E,
 * limitados a 800 filas, para todos los establecimientos de HNC 2026.
 */
function arreglarFormulaGraficoFuncionarios() {
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(`Modificando el establecimiento: ${establecimientos[i][0]}`);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][5]);
        let hoja = progrmacion.getSheetByName("FUNC_AZ");
        hoja.getRange("A2").setFormula(`=ARRAY_CONSTRAIN(ARRAYFORMULA(SORT(UNIQUE(FUNC!E2:E))); 800; 1)`);
        console.log(`Modificacion realizada correctamente en el establecimiento: ${establecimientos[i][0]}`);
    }
}
