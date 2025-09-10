/**
 * Obtiene los IDs y nombres de todos los archivos en una carpeta específica de Google Drive.
 *
 * Esta función accede a una carpeta de Google Drive utilizando su ID, recupera todos los archivos
 * contenidos en ella y devuelve una lista de objetos con el ID y el nombre de cada archivo.
 *
 * @returns {Array<{id: string, nombre: string}>} Un arreglo de objetos, cada uno conteniendo el ID y el nombre de un archivo.
 */
function obtenerIdsDeArchivos() {
    let carpeta = DriveApp.getFolderById("13pD9PeY7_WWNPeLshv251MlhTFENCZjf");
    let archivos = carpeta.getFiles();
    let infoArchivos = [];
    while (archivos.hasNext()) {
        let archivo = archivos.next();
        let idArchivo = archivo.getId();
        let nombreArchivo = archivo.getName();
        infoArchivos.push({ id: idArchivo, nombre: nombreArchivo });
    }
    console.log(infoArchivos);
    return infoArchivos;
}
