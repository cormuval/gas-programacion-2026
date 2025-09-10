function crearProgramaciones() {
    let plantilla = DriveApp.getFileById("1iDJrG3fYg23cvaPPZ1b2BQVdfddD0HMrLTq9dZjAQJU");
    let carpetaDestino = DriveApp.getFolderById("1PuaxSbRWVsz6_eBsCCLldzd3gbhZ3TJn");
    let establecimientos = obtenerListaEstablecimientos();

    Logger.log(establecimientos.length);

    for (var i = 1; i < establecimientos.length; i++) {
        let archivoNuevo = plantilla.makeCopy(establecimientos[i][0] + " - PROG APS 2025 v.1");
        let linkArchivoNuevo = archivoNuevo.getUrl();
        archivoNuevo.moveTo(carpetaDestino);
        guardarLinkProgramacion(i + 1, linkArchivoNuevo);
        Logger.log("Archivo de " + establecimientos[i][0] + " ha sido Creado!");
    }
}

function obtenerListaEstablecimientos() {
    let establecimienetos = SpreadsheetApp.openById("1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE").getSheetByName("Establecimientos").getDataRange().getValues();
    return establecimienetos;
}

function guardarLinkProgramacion(posicion, link) {
    let hoja = SpreadsheetApp.openById("1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE").getSheetByName("Establecimientos");
    hoja.getRange(posicion, 2).setValue(link);
}
