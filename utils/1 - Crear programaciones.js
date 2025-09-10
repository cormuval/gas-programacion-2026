function crearProgramaciones() {
    //ID de la version mas reciente de la plantilla (Se puede obtener ejecutando la funcion obtenerIdsDeArchivos)
    let idPlantilla = "1Y0jq7BWO5DFO1EMXOeDb4QDvRAQMDRYrX6S6mGEXeYA";
    // Obtener la plantilla desde Google Drive usando su ID
    let plantilla = DriveApp.getFileById(idPlantilla);
    // ID de la carpeta donde se guardaran los archivos creados
    let carpetaDestino = DriveApp.getFolderById("17k4F8-48Dciwfwo87OybhUN_fU43Wxyf");
    // Obtener la lista de establecimientos desde la hoja de cálculo
    let establecimientos = obtenerListaEstablecimientos();

    Logger.log(establecimientos.length);

    for (var i = 1; i < establecimientos.length; i++) {
        let archivoNuevo = plantilla.makeCopy(establecimientos[i][0] + " - PROG APS 2026 v.1");
        let linkArchivoNuevo = archivoNuevo.getUrl();
        archivoNuevo.moveTo(carpetaDestino);
        guardarLinkProgramacion(i + 1, linkArchivoNuevo);
        Logger.log("Archivo de " + establecimientos[i][0] + " ha sido Creado!");
    }
}

function obtenerListaEstablecimientos() {
    let establecimientos = SpreadsheetApp.openById("1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU").getSheetByName("Establecimientos").getDataRange().getValues();
    console.log(establecimientos);
    return establecimientos;
}

function guardarLinkProgramacion(posicion, link) {
    let hoja = SpreadsheetApp.openById("1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU").getSheetByName("Establecimientos");
    hoja.getRange(posicion, 2).setValue(link);
}
