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
