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
