function modificacionVacunaNeumo() {
    let establecimientos = obtenerListaEstablecimientos();

    for (var i = 1; i < establecimientos.length; i++) {
        //Crear grupo de edad 66 a mas años)
        console.log(establecimientos[i][0]);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let hojaAntecedentes = progrmacion.getSheetByName("ANTECEDENTES");

        //Agregar fila con el nuego grupo etario.
        hojaAntecedentes.getRange("B71").setValue("66 A MAS AÑOS");
        hojaAntecedentes.getRange("C71").setValue("ADULTO MAYOR");
        hojaAntecedentes.getRange("D71").setValue("PIV - Automatico");
        hojaAntecedentes.getRange("E71").setFormula("=SUM(H36:H40)-H42");

        //Desprotegfer rangos
        let proteccionHoja = hojaAntecedentes.protect();
        let rangoDesprotejidos = [];
        rangoDesprotejidos.push(hojaAntecedentes.getRange("B3"));
        rangoDesprotejidos.push(hojaAntecedentes.getRange("E50:E70"));
        proteccionHoja.setUnprotectedRanges(rangoDesprotejidos);

        //Agregar filas en la programacion de vacuna (66 a mas años)
        let hojaVacinacion = progrmacion.getSheetByName("PROG VACUNACION");
        hojaVacinacion.getRange("5:6").activate(); //Selecionado
        hojaVacinacion.insertRowsAfter(hojaVacinacion.getActiveRange().getLastRow(), 2); // inserta 2 filas

        hojaVacinacion.getRange("A7").setValue("3");
        hojaVacinacion.getRange("B7").setValue("RNI");
        hojaVacinacion.getRange("C7").setValue("VACUNA NEUMOCÓCICA POLISACARIDA");
        hojaVacinacion.getRange("D7").setValue("PROCEDIMIENTOS");
        hojaVacinacion.getRange("E7").setValue("ENFERMERA/O");
        hojaVacinacion.getRange("F7").setValue("66 A MAS AÑOS");
        hojaVacinacion.getRange("G7").setFormula('=ArrayFormula(IFERROR(VLOOKUP(F7;ANTECEDENTES!$B$6:$E$88;4;"")))');
        hojaVacinacion.getRange("I7").setFormula("=IF(H7=0;G7;G7*H7)");
        hojaVacinacion.getRange("K7").setFormula("=ArrayFormula(IFERROR(I7*J7))");
        hojaVacinacion.getRange("M7").setFormula('=IF(H7="";G7*J7*L7;G7*H7*J7*L7)');
        hojaVacinacion
            .getRange("O7")
            .setFormula(
                '=IF(AND(M7=0;N7<0,01);"NO PROGRAMADO";IF(AND(M7=0;N7="");"NO PROGRAMADO";IF(AND(M7>0;N7>0);"PROGRAMADO";IF(OR(J7=0;L7=0;N7=0);"Si va a programar, complete COB-CONC-REND";))))'
            );
        hojaVacinacion.getRange("P7").setFormula("=IFERROR(M7/ANTECEDENTES!$M$21)*4,3");
        hojaVacinacion.getRange("Q7").setFormula('=IFERROR(IF(M7=0;0;IF(M7="";0;IF(M7>0;M7/N7/ANTECEDENTES!$M$21;"")));0)');

        hojaVacinacion.getRange("A8").setValue("4");
        hojaVacinacion.getRange("B8").setValue("RNI");
        hojaVacinacion.getRange("C8").setValue("VACUNA NEUMOCÓCICA POLISACARIDA");
        hojaVacinacion.getRange("D8").setValue("PROCEDIMIENTOS");
        hojaVacinacion.getRange("E8").setValue("TECNICO EN ENFERMERIA");
        hojaVacinacion.getRange("F8").setValue("66 A MAS AÑOS");
        hojaVacinacion.getRange("G8").setFormula('ArrayFormula(IFERROR(VLOOKUP(F8;ANTECEDENTES!$B$6:$E$88;4;"")))');
        hojaVacinacion.getRange("I8").setFormula("=IF(H8=0;G8;G8*H8)");
        hojaVacinacion.getRange("K8").setFormula("=ArrayFormula(IFERROR(I8*J8))");
        hojaVacinacion.getRange("M8").setFormula('=IF(H8="";G8*J8*L8;G8*H8*J8*L8)');
        hojaVacinacion
            .getRange("O8")
            .setFormula(
                '=IF(AND(M8=0;N8<0,01);"NO PROGRAMADO";IF(AND(M8=0;N8="");"NO PROGRAMADO";IF(AND(M8>0;N8>0);"PROGRAMADO";IF(OR(J8=0;L8=0;N8=0);"Si va a programar, complete COB-CONC-REND";))))'
            );
        hojaVacinacion.getRange("P8").setFormula("=IFERROR(M8/ANTECEDENTES!$M$21)*4,3");
        hojaVacinacion.getRange("Q8").setFormula('=IFERROR(IF(M8=0;0;IF(M8="";0;IF(M8>0;M8/N8/ANTECEDENTES!$M$21;"")));0)');
    }

    console.log("Modificacion realizada correctamente");
}
