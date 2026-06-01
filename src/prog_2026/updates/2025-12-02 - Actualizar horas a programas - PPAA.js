function actualizarFormulaPPAA20251202() {
    let hoja = "HORAS A PROGRAMAR";
    let celda;
    let formula;

    celda = "G22";
    formula = `='PROG PPAA'!L41`;
    actualizarFormulaEnProg2026(hoja, celda, formula);
}
