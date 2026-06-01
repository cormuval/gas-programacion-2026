//FECHA: 08/04/2025
//1. Actualizar nombre de la trazadora 20
//PROG TRAZADORAS 2025 - Celda G23 = "Estrategia ECICEP (Diabetes) REM A09 Sección G Celdas D222 a 226"
//PROG TRAZADORAS 2025 - Celdas A23:E23 = "SIN REFERENCIA (NO PROGRAMADO)"
//TRAZADORAS 2025 - Celda B23 = "Estrategia ECICEP (Diabetes) REM A09 Sección G Celdas D222 a 226"

//2. Actualizar las trazadoras 12 (Formulas)
//PROG TRAZADORAS 2025 - Celda A15 = "REM A04 SECCION A + A23 SECCION D + A32 SECCION C"
//PROG TRAZADORAS 2025 - Celdas E15 Y N15 = SUM('PROG 2025'!$M$75;'PROG 2025'!$M$281;'PROG 2025'!$M$419)

function actualizarTrazadora20() {
    let establecimientos = obtenerListaEstablecimientos();

    for (var i = 1; i < establecimientos.length; i++) {
        let establecimiento = establecimientos[i][0];
        let programacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let hojaProgTrazadoras = programacion.getSheetByName("PROG TRAZADORAS 2025");
        let hojaTrazadoras = programacion.getSheetByName("TRAZADORAS 2025");

        //Actualizar trazadora 20
        hojaProgTrazadoras.getRange("G23").setValue("Estrategia ECICEP (Diabetes) REM A09 Sección G Celdas D222 a 226");
        hojaProgTrazadoras.getRange("A23").setValue("SIN REFERENCIA (NO PROGRAMADO)");
        hojaProgTrazadoras.getRange("B23").setValue("SIN REFERENCIA (NO PROGRAMADO)");
        hojaProgTrazadoras.getRange("E23").setValue("SIN REFERENCIA (NO PROGRAMADO)");
        hojaTrazadoras.getRange("B23").setValue("Estrategia ECICEP (Diabetes) REM A09 Sección G Celdas D222 a 226");

        console.log("Modificación realizada correctamente en el " + establecimiento);
    }
}

function actualizarTrazadora12() {
    let establecimientos = obtenerListaEstablecimientos();

    for (var i = 1; i < establecimientos.length; i++) {
        let establecimiento = establecimientos[i][0];
        let programacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let hojaProgTrazadoras = programacion.getSheetByName("PROG TRAZADORAS 2025");

        //Actualizar trazadora 12
        hojaProgTrazadoras.getRange("A15").setValue("REM A04 SECCION A + A23 SECCION D + A32 SECCION C");
        hojaProgTrazadoras.getRange("E15").setFormula("SUM('PROG 2025'!$M$75;'PROG 2025'!$M$281;'PROG 2025'!$M$419)");
        hojaProgTrazadoras.getRange("N15").setFormula("SUM('PROG 2025'!$M$75;'PROG 2025'!$M$281;'PROG 2025'!$M$419)");

        console.log("Modificación realizada correctamente en el " + establecimiento);
    }
}
