function crearGrupoEtario50AMas() {
    let establecimientos = obtenerListaEstablecimientos();

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(establecimientos[i][0]);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let hojaAntecedentes = progrmacion.getSheetByName("ANTECEDENTES");

        //Agregar fila con el nuego grupo etario.
        hojaAntecedentes.getRange("B80").setValue("50 A MAS AÑOS");
        hojaAntecedentes.getRange("C80").setValue("ADULTO");
        hojaAntecedentes.getRange("D80").setValue("PIV - Automatico");
        hojaAntecedentes.getRange("E80").setFormula("=SUM(H33:H40)");

        //Desprotegfer rangos
        let proteccionHoja = hojaAntecedentes.protect();
        let rangoDesprotejidos = [];
        rangoDesprotejidos.push(hojaAntecedentes.getRange("B3"));
        rangoDesprotejidos.push(hojaAntecedentes.getRange("E45:E79"));
        proteccionHoja.setUnprotectedRanges(rangoDesprotejidos);
    }

    console.log("Modificacion realizada correctamente");
}
//OK
