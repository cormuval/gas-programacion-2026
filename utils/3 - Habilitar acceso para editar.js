/**
 * Habilita el acceso de edición para todos los archivos en una carpeta específica.
 *
 * Esta función configura todos los archivos de una carpeta de Google Drive para que
 * cualquier persona con el enlace pueda editarlos.
 *
 * @param {string} folderId - El ID de la carpeta de Google Drive
 * @param {Array<string>} [excludeFiles=[]] - Array de nombres de archivos a excluir del cambio de permisos
 * @returns {number} El número de archivos procesados
 */
function habilitarAccesoEditar(folderId, excludeFiles = []) {
    try {
        // Obtiene la carpeta especificada por su ID
        let carpeta = DriveApp.getFolderById(folderId);
        let archivos = carpeta.getFiles();
        let archivosProcessados = 0;

        // Itera sobre cada archivo y configura el acceso de edición
        while (archivos.hasNext()) {
            let archivo = archivos.next();
            let nombreArchivo = archivo.getName();

            // Verifica si el archivo debe ser excluido
            if (!excludeFiles.includes(nombreArchivo)) {
                Logger.log(`Configurando acceso de edición para: ${nombreArchivo}`);
                archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
                archivosProcessados++;
            } else {
                Logger.log(`Archivo excluido: ${nombreArchivo}`);
            }
        }

        console.log(`Se configuraron ${archivosProcessados} archivos para acceso de edición`);
        return archivosProcessados;
    } catch (error) {
        console.error(`Error al habilitar acceso de edición: ${error.message}`);
        throw new Error(`No se pudo configurar el acceso de edición: ${error.message}`);
    }
}
