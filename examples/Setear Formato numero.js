function migrarFormatNum() {
    const establecimienetosMigracion = obtenerListaEstablecimientosMigracion();

    for (var i = 48; i < establecimienetosMigracion.length; i++) {
        if (establecimienetosMigracion[i][2] !== "No aplica") {
            let origen = SpreadsheetApp.openById("1w0XUGLkXawLaqX7ZGahY6VG4Lya4cybWxcya5TeXPPg");
            let destino = SpreadsheetApp.openByUrl(establecimienetosMigracion[i][3]);

            FormatearComoNumeroConUnDecimal(destino);
            Logger.log(establecimienetosMigracion[i][0] + " ha sido formateado!");
        } else {
            Logger.log(establecimienetosMigracion[i][0] + " No aplica!");
        }
    }
}

function obtenerListaEstablecimientosMigracion() {
    return SpreadsheetApp.openById("1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE").getSheetByName("Establecimientos Migracion").getDataRange().getValues();
}

function FormatearComoNumeroConUnDecimal(destino) {
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
