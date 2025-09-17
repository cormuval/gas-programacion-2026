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
