/**
 * Actualiza fórmulas específicas en la hoja "PROG PPAA".
 *
 * Esta función establece fórmulas en las celdas J19, L19 y M19 de la hoja "PROG PPAA":
 * - J19: Multiplica los valores de I19 y H19.
 * - L19: Calcula J19 dividido por K19 si K19 no es cero, de lo contrario 0.
 * - M19: Calcula L19 dividido por 40 si L19 no está vacío, de lo contrario 0.
 */
function actualizarFormula80AmasAnos20251128() {
    let hoja = "ANTECEDENTES";
    let celda;
    let formula;

    //LIMPIAR RANGO POBLACIÓN SIMPLE HOMBRES Y MUJERES 80 A MAS AÑOS
    limpiarRangoEnBdProg("PoblaSimpleHom", "A74:DV76");
    limpiarRangoEnBdProg("PoblaSimpleMuj", "A74:DV76");

    //HOMBRES 80 A MAS AÑOS
    celda = "I40";
    formula = `=SUMPRODUCT((PoblaSimpleHom!$B$9:$B$90=$C$3)*(PoblaSimpleHom!$CG$9:$DU$90))`;
    actualizarFormulaEnProg2026(hoja, celda, formula);
    //MUJERES 80 A MAS AÑOS
    celda = "J40";
    formula = `=SUMPRODUCT((PoblaSimpleMuj!$B$9:$B$90=$C$3)*(PoblaSimpleMuj!$CG$9:$DU$90))`;
    actualizarFormulaEnProg2026(hoja, celda, formula);
}
