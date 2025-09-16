/**
 * Actualiza la fórmula en la celda A2 de la hoja FUNC_AZ.
 *
 * Esta función establece la fórmula ARRAY_CONSTRAIN con ARRAYFORMULA, SORT y UNIQUE
 * en la celda A2 de la hoja FUNC_AZ para obtener valores únicos ordenados de FUNC!E2:E,
 * limitados a 800 filas, para todos los establecimientos de HNC 2026.
 */
function actualizarFormulaFuncAz20250916() {
    const HOJA = "FUNC_AZ";
    const CELDA = "A2";
    const FORMULA = `=ARRAY_CONSTRAIN(ARRAYFORMULA(SORT(UNIQUE(FUNC!E2:E))); 800; 1)`;
    actualizarFormulaEnBdHnc(HOJA, CELDA, FORMULA);
}

/**
 * Arregla la fórmula en la celda A1 de la hoja RESUMEN_HNCxTIPO.
 *
 * Esta función actualiza la fórmula QUERY en la celda A1 de la hoja RESUMEN_HNCxTIPO
 * para seleccionar datos de HNCxTIPO!A3:I, agrupando por las columnas A y B,
 * sumando la columna C donde B no es nulo, y etiquetando la suma como 'JORNADAS',
 * para todos los establecimientos de HNC 2026.
 */
function actualizarFormulaResumenHncTipo20250916() {
    const HOJA = "RESUMEN_HNCxTIPO";
    const CELDA = "A1";
    const FORMULA = `=QUERY(HNCxTIPO!A3:I;"SELECT A,B,SUM(C) WHERE B IS NOT NULL GROUP BY A,B LABEL SUM(C) 'JORNADAS' ";1)`;
    actualizarFormulaEnBdHnc(HOJA, CELDA, FORMULA);
}
