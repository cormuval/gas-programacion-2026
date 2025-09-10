function obtenerListaEstablecimientos() {
    let establecimientos = SpreadsheetApp.openById("1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU").getSheetByName("Establecimientos").getDataRange().getValues();
    console.log(establecimientos);
    return establecimientos;
}

function arreglarFormulaGraficoFuncionarios() {
    let establecimientos = obtenerListaEstablecimientos();

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
