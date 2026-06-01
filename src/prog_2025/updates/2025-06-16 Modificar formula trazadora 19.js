//Fecha: 16/06/2025
// Descripción: Modificar la formula de la trazadora 19 para que cuente personas en lugar de actividades.

/**
 * Modifica la fórmula de la trazadora 19 para que cuente personas en lugar de actividades.
 *
 * Esta función actualiza las fórmulas en la hoja "PROG TRAZADORAS 2025" para todos
 * los establecimientos, cambiando las referencias de las celdas E22 y P22.
 */
function modificacionFormulaTrazadora19() {
    const ID_HOJA_ESTABLECIMIENTOS = "1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

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
