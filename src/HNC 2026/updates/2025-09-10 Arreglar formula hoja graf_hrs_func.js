/**
 * Actualiza la fórmula en la celda A1 de la hoja GRAF_HRSFUN.
 *
 * Esta función establece la fórmula QUERY en la celda A1 de la hoja GRAF_HRSFUN
 * para seleccionar datos de FUNC!A1:L, agrupando por las columnas C y B,
 * sumando la columna L donde A no es nulo, ordenando por B,
 * y etiquetando la suma como 'TOTAL HORAS DISPONIBLES AÑO',
 * para todos los establecimientos de HNC 2026.
 */
function actualizarFormulaGrafHrsFunc() {
    const HOJA = "GRAF_HRSFUN";
    const CELDA = "A1";
    const FORMULA = `=QUERY(FUNC!A1:L;"SELECT B,C,SUM(L) WHERE A IS NOT NULL GROUP BY C,B ORDER BY B LABEL SUM(L) 'TOTAL HORAS DISPONIBLES AÑO'";1)`;
    actualizarFormulaEnBdHnc(HOJA, CELDA, FORMULA);
}
