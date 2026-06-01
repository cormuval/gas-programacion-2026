/**
 * Script para habilitar el acceso de edición en los archivos de una carpeta específica.
 * Utiliza la función habilitarAccesoEditar del archivo 2 - Controlar acceso.js
 */

function habilitarEdicionEnCarpeta() {
    const folderId = "17k4F8-48Dciwfwo87OybhUN_fU43Wxyf";
    const excludeFiles = []; // Agregar nombres de archivos a excluir si es necesario

    try {
        const archivosProcesados = habilitarAccesoEditar(folderId, excludeFiles);
        console.log(`Se habilitó la edición para ${archivosProcesados} archivos en la carpeta.`);
    } catch (error) {
        console.error(`Error al habilitar la edición: ${error.message}`);
    }
}
