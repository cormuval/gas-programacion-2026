/**
 * Habilita el acceso de visualización para todos los archivos en una carpeta específica.
 *
 * Esta función configura todos los archivos de una carpeta de Google Drive para que
 * cualquier persona con el enlace pueda visualizarlos (solo lectura).
 *
 * @param {string} folderId - El ID de la carpeta de Google Drive
 * @param {Array<string>} [excludeFiles=[]] - Array de nombres de archivos a excluir del cambio de permisos
 * @returns {number} El número de archivos procesados
 */
function habilitarAccesoVisualizar(folderId, excludeFiles = []) {
    try {
        // Obtiene la carpeta especificada por su ID
        let carpeta = DriveApp.getFolderById(folderId);
        let archivos = carpeta.getFiles();
        let archivosProcessados = 0;

        // Itera sobre cada archivo y configura el acceso de visualización
        while (archivos.hasNext()) {
            let archivo = archivos.next();
            let nombreArchivo = archivo.getName();

            // Verifica si el archivo debe ser excluido
            if (!excludeFiles.includes(nombreArchivo)) {
                Logger.log(`Configurando acceso de visualización para: ${nombreArchivo}`);
                archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
                archivosProcessados++;
            } else {
                Logger.log(`Archivo excluido: ${nombreArchivo}`);
            }
        }

        console.log(`Se configuraron ${archivosProcessados} archivos para acceso de visualización`);
        return archivosProcessados;
    } catch (error) {
        console.error(`Error al habilitar acceso de visualización: ${error.message}`);
        throw new Error(`No se pudo configurar el acceso de visualización: ${error.message}`);
    }
}

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

/**
 * Elimina todos los editores (excepto el propietario) de un archivo de Google Sheets específico.
 *
 * Esta función remueve todos los editores que tienen acceso a un archivo, dejando solo
 * al propietario del archivo con acceso de edición.
 *
 * @param {string} spreadsheetId - El ID del archivo de Google Sheets
 * @returns {number} El número de editores eliminados
 */
function eliminarEditoresDeArchivo(spreadsheetId) {
    try {
        let archivo = SpreadsheetApp.openById(spreadsheetId);
        let editores = archivo.getEditors();
        let editoresEliminados = 0;

        // Elimina todos los editores excepto el primero (propietario)
        for (let i = 1; i < editores.length; i++) {
            archivo.removeEditor(editores[i].getEmail());
            console.log(`Editor eliminado: ${editores[i].getEmail()}`);
            editoresEliminados++;
        }

        console.log(`Se eliminaron ${editoresEliminados} editores del archivo`);
        return editoresEliminados;
    } catch (error) {
        console.error(`Error al eliminar editores: ${error.message}`);
        throw new Error(`No se pudieron eliminar los editores: ${error.message}`);
    }
}

/**
 * Elimina todos los editores de múltiples archivos de programación basándose en una lista de establecimientos.
 *
 * Esta función obtiene una lista de establecimientos y elimina todos los editores de cada
 * archivo de programación asociado, exceptuando al propietario.
 *
 * @param {string} spreadsheetId - El ID de la hoja de cálculo que contiene la lista de establecimientos
 * @param {string} [sheetName="Establecimientos"] - El nombre de la hoja (opcional)
 * @param {number} [urlColumnIndex=2] - El índice de la columna que contiene las URLs (base 0)
 * @returns {number} El número total de editores eliminados
 */
function eliminarEditoresDeEstablecimientos(spreadsheetId, sheetName = "Establecimientos", urlColumnIndex = 2) {
    try {
        let establecimientos = obtenerListaEstablecimientos(spreadsheetId, sheetName);
        let totalEditoresEliminados = 0;

        for (let i = 1; i < establecimientos.length; i++) {
            console.log(`Procesando: ${establecimientos[i][0]}`);

            if (establecimientos[i][urlColumnIndex]) {
                let programacion = SpreadsheetApp.openByUrl(establecimientos[i][urlColumnIndex]);
                let editores = programacion.getEditors();

                for (let j = 1; j < editores.length; j++) {
                    programacion.removeEditor(editores[j].getEmail());
                    console.log(`Eliminado: ${editores[j].getEmail()} de ${establecimientos[i][0]}`);
                    totalEditoresEliminados++;
                }
            }
        }

        console.log(`Modificación realizada correctamente. Total editores eliminados: ${totalEditoresEliminados}`);
        return totalEditoresEliminados;
    } catch (error) {
        console.error(`Error al eliminar editores de establecimientos: ${error.message}`);
        throw new Error(`No se pudieron eliminar los editores de los establecimientos: ${error.message}`);
    }
}
