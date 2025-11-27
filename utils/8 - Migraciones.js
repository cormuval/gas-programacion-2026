/**
 * Funciones de migración para programaciones de establecimientos.
 * Incluye migración de formatos, fórmulas, valores y formateo numérico.
 */

/**
 * Obtiene la lista de establecimientos para migración desde una hoja específica.
 *
 * @returns {Array<Array>} Una matriz bidimensional con los datos de establecimientos para migración
 */
function obtenerListaEstablecimientosParaMigracion() {
    let establecimientos = SpreadsheetApp.openById("1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE").getSheetByName("Establecimientos Migracion").getDataRange().getValues();
    return establecimientos;
}

/**
 * Migra formatos y fórmulas desde un origen a múltiples destinos basados en la lista de establecimientos.
 */
function migrarFormato() {
    const establecimientosMigracion = obtenerListaEstablecimientosParaMigracion();

    for (var i = 48; i < establecimientosMigracion.length; i++) {
        if (establecimientosMigracion[i][2] !== "No aplica") {
            let poblacion = establecimientosMigracion[i][1];
            let origen = SpreadsheetApp.openById("1w0XUGLkXawLaqX7ZGahY6VG4Lya4cybWxcya5TeXPPg");
            let destino = SpreadsheetApp.openByUrl(establecimientosMigracion[i][3]);

            migrarFormatoCompleto(origen, destino);
            Logger.log(establecimientosMigracion[i][0] + " ha sido Migrado!");
        } else {
            Logger.log(establecimientosMigracion[i][0] + " No aplica!");
        }
    }
}

/**
 * Migra el formato completo (fórmulas, colores, bordes, etc.) de un rango específico.
 *
 * @param {Spreadsheet} origen - El archivo de origen
 * @param {Spreadsheet} destino - El archivo de destino
 */
function migrarFormatoCompleto(origen, destino) {
    const hojaOrigen = origen.getSheetByName("HORAS A PROGRAMAR");
    const hojaDestino = destino.getSheetByName("HORAS A PROGRAMAR");
    const rangoOrigen = hojaOrigen.getRange("L1:U32");
    const rangoDestino = hojaDestino.getRange("L1:U32");

    // 2. Copiar fórmulas
    rangoDestino.setFormulas(rangoOrigen.getFormulas());

    // 3. Copiar formato
    rangoDestino.setFontColors(rangoOrigen.getFontColors());
    rangoDestino.setFontWeights(rangoOrigen.getFontWeights());
    rangoDestino.setFontStyles(rangoOrigen.getFontStyles());
    rangoDestino.setBackgrounds(rangoOrigen.getBackgrounds());
    rangoDestino.setFontSizes(rangoOrigen.getFontSizes());
    rangoDestino.setHorizontalAlignments(rangoOrigen.getHorizontalAlignments());
    rangoDestino.setVerticalAlignments(rangoOrigen.getVerticalAlignments());
    rangoDestino.setWraps(rangoOrigen.getWraps());

    // 4. Validaciones de datos
    rangoDestino.setDataValidations(rangoOrigen.getDataValidations());

    // 5. Bordes (solo si están definidos manualmente)
    for (let row = 0; row < rangoOrigen.getNumRows(); row++) {
        for (let col = 0; col < rangoOrigen.getNumColumns(); col++) {
            const origenCell = rangoOrigen.getCell(row + 1, col + 1);
            const destinoCell = rangoDestino.getCell(row + 1, col + 1);
            destinoCell.setBorder(
                origenCell.getBorderTop(),
                origenCell.getBorderLeft(),
                origenCell.getBorderBottom(),
                origenCell.getBorderRight(),
                origenCell.getBorderVertical(),
                origenCell.getBorderHorizontal()
            );
        }
    }

    // 6. Combinaciones de celdas dentro del rango
    const mergedRanges = rangoOrigen.getMergedRanges();
    mergedRanges.forEach((r) => {
        const startRow = r.getRow();
        const startCol = r.getColumn();
        const numRows = r.getNumRows();
        const numCols = r.getNumColumns();
        hojaDestino.getRange(startRow, startCol, numRows, numCols).merge();
    });

    // 7. Ancho de columnas
    for (let col = 12; col <= 21; col++) {
        // L = 12, U = 21
        const width = hojaOrigen.getColumnWidth(col);
        hojaDestino.setColumnWidth(col, width);
    }
}

/**
 * Migra fórmulas desde un origen a múltiples destinos.
 */
function migrarFormulas() {
    const establecimientosMigracion = obtenerListaEstablecimientosParaMigracion();

    for (var i = 48; i < establecimientosMigracion.length; i++) {
        if (establecimientosMigracion[i][2] !== "No aplica") {
            let poblacion = establecimientosMigracion[i][1];
            let origen = SpreadsheetApp.openById("1w0XUGLkXawLaqX7ZGahY6VG4Lya4cybWxcya5TeXPPg");
            let destino = SpreadsheetApp.openByUrl(establecimientosMigracion[i][3]);

            migrarFormulasEspecificas(origen, destino);
            Logger.log(establecimientosMigracion[i][0] + " ha sido Migrado!");
        } else {
            Logger.log(establecimientosMigracion[i][0] + " No aplica!");
        }
    }
}

/**
 * Migra fórmulas de un rango específico.
 *
 * @param {Spreadsheet} origen - El archivo de origen
 * @param {Spreadsheet} destino - El archivo de destino
 */
function migrarFormulasEspecificas(origen, destino) {
    // Copiar el rango completo L4:U32 de la hoja "HORAS A PROGRAMAR" incluyendo fórmulas
    copiarFormulasRango(origen, destino, "HORAS A PROGRAMAR", "L4:U32", "L4:U32");
}

/**
 * Migra valores desde un origen a múltiples destinos.
 */
function migrarValores() {
    const establecimientosMigracion = obtenerListaEstablecimientosParaMigracion();

    for (var i = 48; i < establecimientosMigracion.length; i++) {
        if (establecimientosMigracion[i][2] !== "No aplica") {
            let poblacion = establecimientosMigracion[i][1];
            let origen = SpreadsheetApp.openById("1w0XUGLkXawLaqX7ZGahY6VG4Lya4cybWxcya5TeXPPg");
            let destino = SpreadsheetApp.openByUrl(establecimientosMigracion[i][3]);

            migrarValoresEspecificos(origen, destino);
            Logger.log(establecimientosMigracion[i][0] + " ha sido Migrado!");
        } else {
            Logger.log(establecimientosMigracion[i][0] + " No aplica!");
        }
    }
}

/**
 * Migra valores de un rango específico.
 *
 * @param {Spreadsheet} origen - El archivo de origen
 * @param {Spreadsheet} destino - El archivo de destino
 */
function migrarValoresEspecificos(origen, destino) {
    let datosOrigen;
    //Parte 1
    datosOrigen = origen.getSheetByName("HORAS A PROGRAMAR").getRange("L1:U3").getValues();
    //console.log(datosOrigen);
    destino.getSheetByName("HORAS A PROGRAMAR").getRange("L1:U3").setValues(datosOrigen);
}

/**
 * Migra formato numérico a múltiples destinos.
 */
function migrarFormatoNumerico() {
    const establecimientosMigracion = obtenerListaEstablecimientosParaMigracion();

    for (var i = 48; i < establecimientosMigracion.length; i++) {
        if (establecimientosMigracion[i][2] !== "No aplica") {
            let origen = SpreadsheetApp.openById("1w0XUGLkXawLaqX7ZGahY6VG4Lya4cybWxcya5TeXPPg");
            let destino = SpreadsheetApp.openByUrl(establecimientosMigracion[i][3]);

            formatearComoNumeroConUnDecimal(destino);
            Logger.log(establecimientosMigracion[i][0] + " ha sido formateado!");
        } else {
            Logger.log(establecimientosMigracion[i][0] + " No aplica!");
        }
    }
}

/**
 * Formatea un rango como número con un decimal y configura otros formatos.
 *
 * @param {Spreadsheet} destino - El archivo de destino
 */
function formatearComoNumeroConUnDecimal(destino) {
    const hojaDestino = destino.getSheetByName("HORAS A PROGRAMAR");

    // 1. Formatear valores numéricos en L4:U32
    const rango = hojaDestino.getRange("L4:U32");
    rango.setNumberFormat("0.0");
    rango.setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.DOTTED);

    // 2. Ajuste de texto con desbordamiento en L1 (wrap desactivado)
    const celdaL1 = hojaDestino.getRange("L1");
    celdaL1.setWrap(false); // Esto permite el desbordamiento

    // 3. Inmovilizar la columna A
    hojaDestino.setFrozenColumns(1);
}
