// Esta función ahora se encuentra en utils/1 - Obtener establecimientos.js
// Para usar: obtenerListaEstablecimientos(spreadsheetId, sheetName)

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
        console.log(establecimientos[i][0]);
        console.log(establecimientos[i][5]);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][5]);
        let grafHrsFunc = progrmacion.getSheetByName("GRAF_HRSFUN");

        //Agregar fila con el nuego grupo etario.
        grafHrsFunc.getRange("A1").setFormula(`=QUERY(FUNC!A1:L;"SELECT B,C,SUM(L) WHERE A IS NOT NULL GROUP BY C,B ORDER BY B LABEL SUM(L) 'TOTAL HORAS DISPONIBLES AÑO'";1)`);
        //grafHrsFunc.getRange("A1").setValue("HOLA");
        console.log("Modificacion realizada correctamente");
    }
}
//OK
