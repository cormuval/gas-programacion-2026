function modificarExcepcionesEnProteccion() {
    const carpetaId = "1PuaxSbRWVsz6_eBsCCLldzd3gbhZ3TJn"; // ID de la carpeta
    const carpeta = DriveApp.getFolderById(carpetaId);

    // Obtén todos los archivos de la carpeta
    const archivos = carpeta.getFilesByType(MimeType.GOOGLE_SHEETS);

    while (archivos.hasNext()) {
        const archivo = archivos.next();
        const spreadsheet = SpreadsheetApp.open(archivo); // Abre el archivo de Google Sheets
        const hoja = spreadsheet.getSheetByName("ANTECEDENTES"); // Busca la hoja "ANTECEDENTES"

        if (hoja) {
            // Obtén las protecciones existentes en la hoja
            const protecciones = hoja.getProtections(SpreadsheetApp.ProtectionType.SHEET);

            if (protecciones.length > 0) {
                const proteccion = protecciones[0]; // Supongamos que solo hay una protección en la hoja

                // Obtén los rangos desbloqueados actuales
                let rangosExcepciones = proteccion.getUnprotectedRanges();

                // Agrega el nuevo rango a las excepciones
                const nuevoRango = hoja.getRange("E72:E75");
                rangosExcepciones.push(nuevoRango);

                // Aplica los rangos actualizados
                proteccion.setUnprotectedRanges(rangosExcepciones);

                Logger.log(`Se actualizó la protección en la hoja ANTECEDENTES del archivo: ${spreadsheet.getName()}`);
            } else {
                Logger.log(`No se encontró protección en la hoja ANTECEDENTES del archivo: ${spreadsheet.getName()}`);
            }
        } else {
            Logger.log(`No se encontró la hoja ANTECEDENTES en el archivo: ${spreadsheet.getName()}`);
        }
    }

    Logger.log("Actualización completada en todos los archivos de la carpeta.");
}
