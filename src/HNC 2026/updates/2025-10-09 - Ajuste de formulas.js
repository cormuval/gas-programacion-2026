/**
 * Función para ajustar fórmulas en la hoja "HNCxTIPO" de todos los establecimientos,
 * reemplazando "$H123" por "$H" en el rango "E4:G61".
 */
function actualizarFormulaHncTipo20251010() {
    // Obtenemos la lista de establecimientos que serán afectados
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    // Definimos las constantes necesarias para la función de reemplazo
    const HOJA = "HNCxTIPO";
    const RANGO = "E4:G61";
    const VALOR_ANTIGUO = "$H123";
    const VALOR_NUEVO = "$H";

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(`Modificando el establecimiento: ${establecimientos[i][0]}`);
        const URL_SHEET = establecimientos[i][5];
        reemplazarValorEnFormula(URL_SHEET, HOJA, RANGO, VALOR_ANTIGUO, VALOR_NUEVO);
        console.log(`Modificación realizada correctamente en el establecimiento: ${establecimientos[i][0]}`);
    }
}

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
