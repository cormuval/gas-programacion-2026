function cambiarNombreDeHoja() {
    let establecimientos = obtenerListaEstablecimientos();

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
