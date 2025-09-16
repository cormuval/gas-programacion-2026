/**
 * Arregla la fórmula del gráfico de funcionarios en la hoja GRAF_HRSFUN.
 *
 * Esta función actualiza la fórmula QUERY en la celda A1 de la hoja GRAF_HRSFUN
 * para todos los establecimientos de HNC 2026.
 */
function arreglarFormulaGraficoFuncionarios() {
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(`Modificando el establecimiento: ${establecimientos[i][0]}`);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][5]);
        let hoja = progrmacion.getSheetByName("GRAF_HRSFUN");
        hoja.getRange("A1").setFormula(`=QUERY(FUNC!A1:L;"SELECT B,C,SUM(L) WHERE A IS NOT NULL GROUP BY C,B ORDER BY B LABEL SUM(L) 'TOTAL HORAS DISPONIBLES AÑO'";1)`);
        console.log(`Modificacion realizada correctamente en el establecimiento: ${establecimientos[i][0]}`);
    }
}
