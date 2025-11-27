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

/**
 * Actualiza la fórmula en la celda A1 de la hoja RESUMEN_HNCxTIPO_porcent.
 *
 * Esta función establece la fórmula QUERY en la celda A1 de la hoja RESUMEN_HNCxTIPO_porcent
 * para seleccionar datos de HNCxTIPO!A3:I, agrupando por las columnas A y B,
 * sumando la columna C donde B no es nulo, y etiquetando la suma como 'JORNADAS',
 * para todos los establecimientos de HNC 2026.
 */
function actualizarFormulaResumenHncTipoPorcent20250916() {
    const HOJA = "RESUMEN_HNCxTIPO_porcent";
    const CELDA = "A1";
    const FORMULA = `=QUERY(HNCxTIPO!A3:I;"SELECT A,B,SUM(C) WHERE B IS NOT NULL GROUP BY A,B LABEL SUM(C) 'JORNADAS' ";1)`;
    actualizarFormulaEnBdHnc(HOJA, CELDA, FORMULA);
}

/**
 * Actualiza la fórmula en la celda A3 de la hoja HNCxTIPO.
 *
 * Esta función establece la fórmula QUERY en la celda A3 de la hoja HNCxTIPO
 * para seleccionar datos de FUNC!A1:E, filtrando donde B no es nulo y B coincide con 'CAT_A' o 'CAT_B',
 * ordenando por B y D, y etiquetando D como 'JORNADA',
 * para todos los establecimientos de HNC 2026.
 */
function actualizarFormulaHncTipo20250916() {
    const HOJA = "HNCxTIPO";
    const CELDA = "A3";
    const FORMULA = `=QUERY(FUNC!A1:E;"SELECT B,C,D,E WHERE B IS NOT NULL AND B MATCHES '.*CAT_A|CAT_B.*' ORDER BY B,D LABEL D 'JORNADA' ";1)`;
    actualizarFormulaEnBdHnc(HOJA, CELDA, FORMULA);
}

/**
 * Actualiza la fórmula en la celda A1 de la hoja BORRAR_REPETIDOS.
 *
 * Esta función establece la fórmula QUERY anidada en la celda A1 de la hoja BORRAR_REPETIDOS
 * para seleccionar datos de CONSO_ENCUESTAS!A4:H, contando H agrupando por B,A,C,D donde B no es nulo,
 * y luego filtrando las filas donde el conteo es >=2,
 * para todos los establecimientos de HNC 2026.
 */
function actualizarFormulaBorrarRepetidos20250916() {
    const HOJA = "BORRAR_REPETIDOS";
    const CELDA = "A1";
    const FORMULA = `=QUERY(QUERY(CONSO_ENCUESTAS!A4:H;"SELECT B,A,C,D,COUNT(H) WHERE B IS NOT NULL  GROUP BY B,A,C,D";1);"SELECT * WHERE Col5 >=2";1)`;
    actualizarFormulaEnBdHnc(HOJA, CELDA, FORMULA);
}

/**
 * Actualiza la fórmula en la celda A6 de la hoja Horas_FUNC.
 *
 * Esta función establece la fórmula UNIQUE con QUERY en la celda A6 de la hoja Horas_FUNC
 * para seleccionar datos únicos de FUNC!A1:AC, incluyendo B, C, E y sumas de D, F, G, H, I, J, K, L
 * donde B no es nulo, agrupando por B, C, E, con etiquetas descriptivas para las sumas,
 * para todos los establecimientos de HNC 2026.
 */
function actualizarFormulaHorasFunc20250916() {
    const HOJA = "Horas_FUNC";
    const CELDA = "A6";
    const FORMULA = `=UNIQUE(QUERY(FUNC!A1:AC;"SELECT B,C,E,SUM(D),SUM(F),SUM(G),SUM(H),SUM(I),SUM(J),SUM(K),SUM(L) WHERE B IS NOT NULL group by B,C,E LABEL SUM(D) 'JORNADA',SUM(F) 'DIAS ADM',SUM(G) 'DIAS FL',SUM(H) 'DIAS CAPAC',SUM(I) 'TOTAL DIAS AUSENCIA JUSTIF',SUM(J) 'TOTAL DIAS DISPONIBLES',SUM(K) 'TOTAL SEMANAS DISPONIBLES',SUM(L) 'TOTAL HORAS DISPONIBLES'"))`;
    actualizarFormulaEnBdHnc(HOJA, CELDA, FORMULA);
}

/**
 * Actualiza la fórmula en la celda B6 de la hoja HORAS_RESUMEN.
 *
 * Esta función establece la fórmula QUERY en la celda B6 de la hoja HORAS_RESUMEN
 * para seleccionar datos de Horas_FUNC!A6:R, incluyendo A, B y sumas de D, L, M, N, O, P, Q, R,
 * además de cálculos de porcentajes para HNC y HC anuales, donde E no es nulo,
 * agrupando por B, A, con etiquetas descriptivas,
 * para todos los establecimientos de HNC 2026.
 */
function actualizarFormulaHorasResumen20250916() {
    const HOJA = "HORAS_RESUMEN";
    const CELDA = "B6";
    const FORMULA = `=QUERY(Horas_FUNC!A6:R;"SELECT A,B,SUM(D),SUM(L),SUM(M),SUM(N),SUM(O),SUM(P),SUM(Q),SUM(R),SUM(Q)/(SUM(Q)+SUM(R)),SUM(R)/(SUM(R)+SUM(Q)) WHERE E IS NOT NULL GROUP BY B,A  LABEL  SUM(D) 'Hrs Func',SUM(L) 'Hrs GESTION',SUM(M) 'Hrs REUNION',SUM(N) 'Hrs DERECHO',SUM(O) 'HNC(sem)',SUM(P) 'HC(sem)',SUM(Q) 'HNC(año)',SUM(R) 'HC(año)',SUM(Q)/(SUM(Q)+SUM(R)) '%HNC(año)',SUM(R)/(SUM(R)+SUM(Q)) '%HC(año)' ";1)`;
    actualizarFormulaEnBdHnc(HOJA, CELDA, FORMULA);
}
