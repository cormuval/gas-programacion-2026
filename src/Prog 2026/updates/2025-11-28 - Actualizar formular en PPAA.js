/**
 * Actualiza fórmulas específicas en la hoja "PROG PPAA".
 *
 * Esta función establece fórmulas en las celdas J19, L19 y M19 de la hoja "PROG PPAA":
 * - J19: Multiplica los valores de I19 y H19.
 * - L19: Calcula J19 dividido por K19 si K19 no es cero, de lo contrario 0.
 * - M19: Calcula L19 dividido por 40 si L19 no está vacío, de lo contrario 0.
 */
function actualizarFormulaPPAA20251128() {
    let hoja = "PROG PPAA";
    let celda;
    let formula;

    celda = "J19";
    formula = `=+$I19*H19`;
    actualizarFormulaEnProg2026(hoja, celda, formula);

    celda = "L19";
    formula = `=IF(K19=0;0;+J19/K19)`;
    actualizarFormulaEnProg2026(hoja, celda, formula);

    celda = "M19";
    formula = `=IF(L19="";0;+L19/40)`;
    actualizarFormulaEnProg2026(hoja, celda, formula);
}
