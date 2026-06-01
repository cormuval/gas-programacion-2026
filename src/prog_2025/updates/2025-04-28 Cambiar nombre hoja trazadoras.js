/**
 * Cambia el nombre de la hoja "TRAZADORAS 2024" a "TRAZADORAS 2025".
 *
 * Esta función actualiza el nombre de la hoja de trazadoras en todos los
 * archivos de programación de los establecimientos.
 */
function cambiarNombreDeHoja() {
    const ID_HOJA_ESTABLECIMIENTOS = "1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(establecimientos[i][0]);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let hojaTrazadoras = progrmacion.getSheetByName("TRAZADORAS 2024");

        // Cambia el nombre de la hoja
        if (hojaTrazadoras) {
            hojaTrazadoras.setName("TRAZADORAS 2025");
        } else {
            console.log("No se encontró la hoja con el nombre especificado.");
        }
    }

    console.log("Modificacion realizada correctamente");
}
