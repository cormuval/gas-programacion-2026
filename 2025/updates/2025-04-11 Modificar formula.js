function agregarFormulaPROG2025() {
    let establecimientos = obtenerListaEstablecimientos();

    for (var i = 48; i < establecimientos.length; i++) {
        console.log(establecimientos[i][0]);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let hojaProgPROG2025 = progrmacion.getSheetByName("PROG 2025");

        //Agregar fila con el nuego grupo etario.
        hojaProgPROG2025.getRange("M241").setFormula("='PROG A. GRUPALES'!M6");
        hojaProgPROG2025.getRange("M257").setFormula("='PROG A. GRUPALES'!M7");
        hojaProgPROG2025.getRange("M312").setFormula("='PROG A. GRUPALES'!M8");
        hojaProgPROG2025.getRange("M315").setFormula("='PROG A. GRUPALES'!M9");
        hojaProgPROG2025.getRange("M313").setFormula("='PROG VISITAS'!I5");
        hojaProgPROG2025.getRange("M318").setFormula("='PROG VISITAS'!I6");
        hojaProgPROG2025.getRange("M319").setFormula("='PROG VISITAS'!I7");
        hojaProgPROG2025.getRange("M320").setFormula("='PROG VISITAS'!I8");
        hojaProgPROG2025.getRange("M466").setFormula("='PROG VISITAS'!I9");
        hojaProgPROG2025.getRange("M467").setFormula("='PROG VISITAS'!I10");
        hojaProgPROG2025.getRange("M328").setFormula("=SUM('PROG A. GRUPALES'!M10:M43)");
        hojaProgPROG2025.getRange("M329").setFormula("='PROG A. GRUPALES'!M44");
        hojaProgPROG2025.getRange("M330").setFormula("='PROG A. GRUPALES'!M45");
        hojaProgPROG2025.getRange("M331").setFormula("='PROG A. GRUPALES'!M46");
        hojaProgPROG2025.getRange("M337").setFormula("='PROG A. GRUPALES'!M47");
        hojaProgPROG2025.getRange("M363").setFormula("='PROG A. GRUPALES'!M48");
        hojaProgPROG2025.getRange("M394").setFormula("='PROG A. GRUPALES'!M49");
        hojaProgPROG2025.getRange("M441").setFormula("=SUM('PROG INFANTO-ADOLESCENTE'!L28:L30)");
        hojaProgPROG2025.getRange("M489").setFormula("='PROG INFANTO-ADOLESCENTE'!L27");

        console.log("Modificacion realizada correctamente");
    }
}
//OK
