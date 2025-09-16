/**
 * Obtiene los IDs y nombres de todos los archivos en una carpeta específica de Google Drive.
 *
 * Esta función accede a una carpeta de Google Drive utilizando su ID, recupera todos los archivos
 * contenidos en ella y devuelve una lista de objetos con el ID y el nombre de cada archivo.
 *
 * @param {string} folderId - El ID de la carpeta de Google Drive
 * @param {string} [filterType=null] - Tipo de archivo para filtrar (ej: 'application/vnd.google-apps.spreadsheet')
 * @returns {Array<{id: string, nombre: string, tipo: string}>} Un arreglo de objetos, cada uno conteniendo el ID, nombre y tipo de un archivo.
 */
function obtenerIdsDeArchivos(folderId, filterType = null) {
    try {
        let carpeta = DriveApp.getFolderById(folderId);
        let archivos = carpeta.getFiles();
        let infoArchivos = [];

        while (archivos.hasNext()) {
            let archivo = archivos.next();
            let tipoArchivo = archivo.getMimeType();

            // Aplicar filtro por tipo si se especifica
            if (filterType === null || tipoArchivo === filterType) {
                let idArchivo = archivo.getId();
                let nombreArchivo = archivo.getName();
                infoArchivos.push({
                    id: idArchivo,
                    nombre: nombreArchivo,
                    tipo: tipoArchivo,
                });
            }
        }

        console.log(`Se encontraron ${infoArchivos.length} archivos en la carpeta`);
        console.log(infoArchivos);
        return infoArchivos;
    } catch (error) {
        console.error(`Error al obtener IDs de archivos: ${error.message}`);
        throw new Error(`No se pudieron obtener los IDs de archivos: ${error.message}`);
    }
}

/**
 * Obtiene información detallada de un archivo específico por su ID.
 *
 * Esta función recupera información completa de un archivo de Google Drive,
 * incluyendo su ID, nombre, tipo MIME, URL, fecha de creación y modificación.
 *
 * @param {string} fileId - El ID del archivo de Google Drive
 * @returns {Object} Un objeto con toda la información del archivo
 */
function obtenerInfoArchivo(fileId) {
    try {
        let archivo = DriveApp.getFileById(fileId);
        let infoArchivo = {
            id: archivo.getId(),
            nombre: archivo.getName(),
            tipo: archivo.getMimeType(),
            url: archivo.getUrl(),
            fechaCreacion: archivo.getDateCreated(),
            fechaModificacion: archivo.getLastUpdated(),
            tamaño: archivo.getSize(),
        };

        console.log(`Información del archivo: ${infoArchivo.nombre}`);
        return infoArchivo;
    } catch (error) {
        console.error(`Error al obtener información del archivo: ${error.message}`);
        throw new Error(`No se pudo obtener la información del archivo: ${error.message}`);
    }
}

/**
 * Busca archivos por nombre en una carpeta específica.
 *
 * Esta función busca archivos que contengan un texto específico en su nombre
 * dentro de una carpeta de Google Drive.
 *
 * @param {string} folderId - El ID de la carpeta de Google Drive
 * @param {string} searchText - El texto a buscar en los nombres de archivos
 * @param {boolean} [exactMatch=false] - Si true, busca coincidencia exacta; si false, busca que contenga el texto
 * @returns {Array<{id: string, nombre: string}>} Un arreglo de objetos con los archivos encontrados
 */
function buscarArchivosPorNombre(folderId, searchText, exactMatch = false) {
    try {
        let carpeta = DriveApp.getFolderById(folderId);
        let archivos = carpeta.getFiles();
        let archivosEncontrados = [];

        while (archivos.hasNext()) {
            let archivo = archivos.next();
            let nombreArchivo = archivo.getName();

            let coincide = exactMatch ? nombreArchivo === searchText : nombreArchivo.toLowerCase().includes(searchText.toLowerCase());

            if (coincide) {
                archivosEncontrados.push({
                    id: archivo.getId(),
                    nombre: nombreArchivo,
                });
            }
        }

        console.log(`Se encontraron ${archivosEncontrados.length} archivos que coinciden con "${searchText}"`);
        return archivosEncontrados;
    } catch (error) {
        console.error(`Error al buscar archivos: ${error.message}`);
        throw new Error(`No se pudieron buscar los archivos: ${error.message}`);
    }
}
