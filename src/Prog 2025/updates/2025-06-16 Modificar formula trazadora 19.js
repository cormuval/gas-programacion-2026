//Fecha: 16/06/2025
// Descripción: Modificar la formula de la trazadora 19 para que cuente personas en lugar de actividades.

function modificacionFormulaTrazadora19() {
    let establecimientos = obtenerListaEstablecimientos();

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(establecimientos[i][0]);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let hojaProgTrazadoras = progrmacion.getSheetByName("PROG TRAZADORAS 2025");

        //Agregar fila con el nuego grupo etario.
        hojaProgTrazadoras.getRange("E22").setFormula("='PROG A. GRUPALES'!J5");
        hojaProgTrazadoras.getRange("P22").setFormula("='PROG A. GRUPALES'!J5");

        console.log("Modificación realizada correctamente");
    }
}
//OK
