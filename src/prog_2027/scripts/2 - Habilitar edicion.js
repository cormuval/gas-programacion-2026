/**
 * Script para habilitar el acceso de edición en los archivos de una carpeta específica.
 * Utiliza la función habilitarAccesoEditar del archivo 2 - Controlar acceso.js
 */

function habilitarEdicionEnCarpeta2027() {
    const folderId = "15y5QgKunkPMor5BAYNKjvFBnaBzcesW-";
    const excludeFiles = []; // Agregar nombres de archivos a excluir si es necesario

    try {
        const archivosProcesados = habilitarAccesoEditar(folderId, excludeFiles);
        console.log(`Se habilitó la edición para ${archivosProcesados} archivos en la carpeta.`);
    } catch (error) {
        console.error(`Error al habilitar la edición: ${error.message}`);
    }
}
