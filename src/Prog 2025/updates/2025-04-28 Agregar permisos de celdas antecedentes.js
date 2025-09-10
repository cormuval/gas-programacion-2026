/**
 * Modifica las excepciones en la protección de la hoja ANTECEDENTES.
 *
 * Esta función agrega un nuevo rango (E72:E75) a las excepciones de protección
 * en la hoja ANTECEDENTES de todos los archivos de una carpeta específica.
 */
function modificarExcepcionesEnProteccion() {
    const CARPETA_ID = "1PuaxSbRWVsz6_eBsCCLldzd3gbhZ3TJn";
    modificarProteccionEnCarpeta(CARPETA_ID, "ANTECEDENTES", ["E72:E75"]);
}

/**
 * Modifica la protección de una hoja específica en todos los archivos de una carpeta.
 *
 * Esta función agrega rangos de excepción a la protección existente de una hoja
 * en todos los archivos de Google Sheets de una carpeta.
 *
 * @param {string} carpetaId - El ID de la carpeta que contiene los archivos
 * @param {string} nombreHoja - El nombre de la hoja a modificar
 * @param {Array<string>} nuevosRangosLibres - Array de rangos a agregar como excepciones
 * @returns {number} El número de archivos procesados exitosamente
 */
function modificarProteccionEnCarpeta(carpetaId, nombreHoja, nuevosRangosLibres) {
    try {
        const carpeta = DriveApp.getFolderById(carpetaId);
        const archivos = carpeta.getFilesByType(MimeType.GOOGLE_SHEETS);
        let archivosProcessados = 0;

        while (archivos.hasNext()) {
            const archivo = archivos.next();
            try {
                const spreadsheet = SpreadsheetApp.open(archivo);
                const hoja = spreadsheet.getSheetByName(nombreHoja);

                if (hoja) {
                    const protecciones = hoja.getProtections(SpreadsheetApp.ProtectionType.SHEET);

                    if (protecciones.length > 0) {
                        const proteccion = protecciones[0];
                        let rangosExcepciones = proteccion.getUnprotectedRanges();

                        // Agregar los nuevos rangos a las excepciones
                        nuevosRangosLibres.forEach((rangoTexto) => {
                            const nuevoRango = hoja.getRange(rangoTexto);
                            rangosExcepciones.push(nuevoRango);
                        });

                        proteccion.setUnprotectedRanges(rangosExcepciones);
                        Logger.log(`Protección actualizada en ${nombreHoja} del archivo: ${spreadsheet.getName()}`);
                        archivosProcessados++;
                    } else {
                        Logger.log(`No se encontró protección en ${nombreHoja} del archivo: ${spreadsheet.getName()}`);
                    }
                } else {
                    Logger.log(`No se encontró la hoja ${nombreHoja} en el archivo: ${spreadsheet.getName()}`);
                }
            } catch (error) {
                console.error(`Error procesando archivo ${archivo.getName()}: ${error.message}`);
            }
        }

        Logger.log(`Actualización completada. ${archivosProcessados} archivos procesados en la carpeta.`);
        return archivosProcessados;
    } catch (error) {
        console.error(`Error al modificar protección en carpeta: ${error.message}`);
        throw new Error(`No se pudo modificar la protección: ${error.message}`);
    }
}
