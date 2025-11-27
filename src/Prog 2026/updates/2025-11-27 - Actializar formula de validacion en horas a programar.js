function replicarFormulaHncTipo20251010() {
    // Obtenemos la lista de establecimientos que serán afectados
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(`Modificando el establecimiento: ${establecimientos[i][0]}`);
        let urlSheet = establecimientos[i][5];
        let hoja = "HNCxTIPO";
        let filaInicio = 62;
        let filaFin = 300;
        let columna = "";
        let formulaBase = "";

        //COLUMNA GESTIÓN
        columna = "E";
        formulaBase = `=IFERROR(INDEX(QUERY(ENCUESTA_GESTION!$A$3:$H;"SELECT sum(H) WHERE B='"&$D{row}&"'   ";0);2);"")`;
        replicarFormulaEnRango(
            urlSheet, // urlSheet
            hoja, // nombreHoja
            filaInicio, // filaInicio
            filaFin, // filaFin
            columna, // columna
            formulaBase // formulaBase
        );

        //COLUMNA REUNIONES
        columna = "F";
        formulaBase = `=IFERROR(INDEX(QUERY(ENCUESTA_REU!$A$3:$H;"SELECT sum(H) WHERE B='"&$D{row}&"'   ";0);2);"")`;
        replicarFormulaEnRango(
            urlSheet, // urlSheet
            hoja, // nombreHoja
            filaInicio, // filaInicio
            filaFin, // filaFin
            columna, // columna
            formulaBase // formulaBase
        );

        //COLUMNA DERECHOS FUNCIONARIOS
        columna = "G";
        formulaBase = `=IFERROR(INDEX(QUERY(ENCUESTA_DER!$A$3:$H;"SELECT sum(H) WHERE B='"&$D{row}&"'   ";0);2);"")`;
        replicarFormulaEnRango(
            urlSheet, // urlSheet
            hoja, // nombreHoja
            filaInicio, // filaInicio
            filaFin, // filaFin
            columna, // columna
            formulaBase // formulaBase
        );

        //COLUMNA TOTAL HNC
        columna = "H";
        formulaBase = `=SUM(E{row}:G{row})`;
        replicarFormulaEnRango(
            urlSheet, // urlSheet
            hoja, // nombreHoja
            filaInicio, // filaInicio
            filaFin, // filaFin
            columna, // columna
            formulaBase // formulaBase
        );

        console.log(`Modificación realizada correctamente en el establecimiento: ${establecimientos[i][0]}`);
    }
}
