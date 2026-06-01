function corregirTrazadora() {
    //REQUETIMIENTOS:
    // Modificar formula prog trazadora E8 para el calculo por personas

    let establecimientos = obtenerListaEstablecimientos();

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(establecimientos[i][0]);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let programacionGeneral = progrmacion.getSheetByName("PROG TRAZADORAS 2025");
        programacionGeneral.getRange("E8").setValue("=SUM('PROG A. GRUPALES'!$J$31:$J$32)");
        programacionGeneral.getRange("E9").setValue("=SUMIFS('PROG 2025'!$M$2:$M$467;'PROG 2025'!$C$2:$C$467;B9)");
        programacionGeneral.getRange("E10").setValue("=SUMIFS('PROG 2025'!$M$2:$M$467;'PROG 2025'!$C$2:$C$467;B10)");
        programacionGeneral.getRange("E11").setValue("=SUM('PROG 2025'!$M$108:$M$115)");
        programacionGeneral.getRange("E12").setValue("=SUMIFS('PROG 2025'!$M$2:$M$467;'PROG 2025'!$C$2:$C$467;B12)");
        programacionGeneral.getRange("E15").setValue("=SUMIFS('PROG 2025'!$M$2:$M$467;'PROG 2025'!$C$2:$C$467;B15)");
        programacionGeneral.getRange("E19").setValue("=SUMIFS('PROG 2025'!$M$2:$M$467;'PROG 2025'!$C$2:$C$467;B19)");
        programacionGeneral.getRange("E22").setValue("=SUMIFS('PROG 2025'!$M$2:$M$467;'PROG 2025'!$C$2:$C$467;B22)");
        programacionGeneral.getRange("E23").setValue("=SUMIFS('PROG 2025'!$M$2:$M$467;'PROG 2025'!$C$2:$C$467;B23)");
    }

    console.log("Modificacion realizada correctamente");
}
//OK
