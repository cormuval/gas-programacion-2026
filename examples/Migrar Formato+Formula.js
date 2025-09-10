function migrarFormat() {
    const establecimienetosMigracion = obtenerListaEstablecimientosMigracion();

    for (var i = 48; i < establecimienetosMigracion.length; i++) {
        if (establecimienetosMigracion[i][2] !== "No aplica") {
            let poblacion = establecimienetosMigracion[i][1];
            let origen = SpreadsheetApp.openById("1w0XUGLkXawLaqX7ZGahY6VG4Lya4cybWxcya5TeXPPg");
            let destino = SpreadsheetApp.openByUrl(establecimienetosMigracion[i][3]);

            migracionFORMATO(origen, destino);
            Logger.log(establecimienetosMigracion[i][0] + " ha sido Migrado!");
        } else {
            Logger.log(establecimienetosMigracion[i][0] + " No aplica!");
        }
    }
}

function obtenerListaEstablecimientosMigracion() {
    let establecimienetos = SpreadsheetApp.openById("1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE").getSheetByName("Establecimientos Migracion").getDataRange().getValues();
    return establecimienetos;
}

function migracionFORMATO(origen, destino) {
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
