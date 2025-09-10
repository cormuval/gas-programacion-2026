function habilitarAccesoVisualizar() {
    // Obtiene la carpeta especificada por su ID
    let carpeta = DriveApp.getFolderById("1PuaxSbRWVsz6_eBsCCLldzd3gbhZ3TJn");

    // Recupera todos los archivos dentro de la carpeta
    let archivos = carpeta.getFiles();

    // Itera sobre cada archivo y bloquea el acceso
    while (archivos.hasNext()) {
        let archivo = archivos.next();
        Logger.log(archivo.getName());
        // if (archivo.getName() !== "CECOSF LAGUNA VERDE"){
        archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        // }
    }
}

function habilitarAccesoEditar() {
    // Obtiene la carpeta especificada por su ID
    let carpeta = DriveApp.getFolderById("1PuaxSbRWVsz6_eBsCCLldzd3gbhZ3TJn");

    // Recupera todos los archivos dentro de la carpeta
    let archivos = carpeta.getFiles();

    // Itera sobre cada archivo y bloquea el acceso
    while (archivos.hasNext()) {
        let archivo = archivos.next();
        Logger.log(archivo.getName());
        archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    }
}

function eliminarEditores() {
    let establecimientos = obtenerListaEstablecimientos();

    for (let i = 1; i < establecimientos.length; i++) {
        console.log(establecimientos[i][0]);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let editores = progrmacion.getEditors();

        for (let i = 1; i < editores.length; i++) {
            progrmacion.removeEditor(editores[i].getEmail());
            console.log("Eliminado: " + editores[i].getEmail());
        }
    }
    console.log("Modificacion realizada correctamente");
}
