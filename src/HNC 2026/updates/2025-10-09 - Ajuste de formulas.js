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
        const URL_SHEET = establecimientos[i][5];
        const HOJA = "HNCxTIPO";
        const FILA_INICIO = 62;
        const FILA_FIN = 300;
        const COLUMNA = "";
        const FORMULA_BASE = "";

        //COLUMNA GESTION
        COLUMNA = "E";
        FORMULA_BASE = `=SI.ERROR(INDICE(QUERY(ENCUESTA_GESTION!$A$3:$H;"SELECT sum(H) WHERE B='"&$D{row}&"'   ";0);2);"")`;
        replicarFormulaEnRango(
            URL_SHEET, // urlSheet
            HOJA, // nombreHoja
            FILA_INICIO, // filaInicio
            FILA_FIN, // filaFin
            COLUMNA, // columna
            FORMULA_BASE // formulaBase
        );

        //COLUMNA REUNIONES
        COLUMNA = "F";
        FORMULA_BASE = `=SI.ERROR(INDICE(QUERY(ENCUESTA_REU!$A$3:$H;"SELECT sum(H) WHERE B='"&$D{row}&"'   ";0);2);"")`;
        replicarFormulaEnRango(
            URL_SHEET, // urlSheet
            HOJA, // nombreHoja
            FILA_INICIO, // filaInicio
            FILA_FIN, // filaFin
            COLUMNA, // columna
            FORMULA_BASE // formulaBase
        );

        //COLUMNA DERECHOS FUNCIONARIOS
        COLUMNA = "G";
        FORMULA_BASE = `=SI.ERROR(INDICE(QUERY(ENCUESTA_DER!$A$3:$H;"SELECT sum(H) WHERE B='"&$D{row}&"'   ";0);2);"")`;
        replicarFormulaEnRango(
            URL_SHEET, // urlSheet
            HOJA, // nombreHoja
            FILA_INICIO, // filaInicio
            FILA_FIN, // filaFin
            COLUMNA, // columna
            FORMULA_BASE // formulaBase
        );

        console.log(`Modificación realizada correctamente en el establecimiento: ${establecimientos[i][0]}`);
    }
}
