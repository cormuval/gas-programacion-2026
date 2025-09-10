function agregarFormulaPoblaSimpleHom() {
    let establecimientos = obtenerListaEstablecimientos();

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(establecimientos[i][0]);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let hojaProg = progrmacion.getSheetByName("PoblaSimpleHom");

        //Completa formulas repetitivas.
        for (var j = 10; j <= 73; j++) {
            hojaProg.getRange("D" + j).setFormula("=SUM(E" + j + ":DV" + j + ")");
        }
    }

    console.log("Modificacion realizada correctamente");
}
