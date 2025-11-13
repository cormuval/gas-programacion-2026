/**
 * Actualiza la fórmula en la celda A2 de la hoja FUNC_AZ.
 *
 * Esta función establece la fórmula ARRAY_CONSTRAIN con ARRAYFORMULA, SORT y UNIQUE
 * en la celda A2 de la hoja FUNC_AZ para obtener valores únicos ordenados de FUNC!E2:E,
 * limitados a 800 filas, para todos los establecimientos de HNC 2026.
 */
function actualizarFormulaNncTipo20251113() {
    const HOJA = "HNCxTIPO";
    const CELDA = "A3";
    const FORMULA = `=QUERY(FUNC!A1:E;"SELECT B,C,D,E WHERE B IS NOT NULL AND B MATCHES '.*CAT_A|CAT_B|CAT_C|CAT_D.*' ORDER BY B,D LABEL D 'JORNADA' ";1)`;
    actualizarFormulaEnBdHnc(HOJA, CELDA, FORMULA);
}
