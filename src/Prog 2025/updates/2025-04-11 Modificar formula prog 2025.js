function agregarFormulaProg2025() {
    let establecimientos = obtenerListaEstablecimientos();

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(establecimientos[i][0]);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let hojaProg = progrmacion.getSheetByName("PROG 2025");

        //Completa formulas repetitivas.
        for (var j = 120; j <= 127; j++) {
            hojaProg.getRange("G" + j).setFormula("=ArrayFormula(IFERROR(VLOOKUP(F" + j + ';ANTECEDENTES!$B$6:$E$89;4;"")))');
            hojaProg.getRange("I" + j).setFormula("=IF(H" + j + "=0;G" + j + ";G" + j + "*H" + j + ")");
            hojaProg.getRange("K" + j).setFormula("=ArrayFormula(IFERROR(I" + j + "*J" + j + "))");
            hojaProg.getRange("M" + j).setFormula("=IF(H" + j + '="";G' + j + "*J" + j + "*L" + j + ";G" + j + "*H" + j + "*J" + j + "*L" + j + ")");
            hojaProg.getRange("P" + j).setFormula("=IFERROR(M" + j + "/ANTECEDENTES!$M$21)*4,3");
            hojaProg.getRange("Q" + j).setFormula("=IFERROR(IF(M" + j + "=0;0;IF(M" + j + '="";0;IF(M' + j + ">0;M" + j + "/N" + j + '/ANTECEDENTES!$M$21;"")));0)');
            hojaProg
                .getRange("O" + j)
                .setFormula(
                    "=IF(AND(M" +
                        j +
                        "=0;N" +
                        j +
                        '<0,01);"NO PROGRAMADO";IF(AND(M' +
                        j +
                        "=0;N" +
                        j +
                        '="");"NO PROGRAMADO";IF(AND(M' +
                        j +
                        ">0;N" +
                        j +
                        '>0);"PROGRAMADO";IF(OR(J' +
                        j +
                        "=0;L" +
                        j +
                        "=0;N" +
                        j +
                        '=0);"Si va a programar, complete COB-CONC-REND";))))'
                );
        }
    }

    console.log("Modificacion realizada correctamente");
}
