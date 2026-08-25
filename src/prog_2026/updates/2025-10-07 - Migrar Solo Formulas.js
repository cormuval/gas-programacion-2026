function MigrarSoloFormulas(nuevosNombres) {
    const ID_PLANTILLA_ORIGEN = "1Y0jq7BWO5DFO1EMXOeDb4QDvRAQMDRYrX6S6mGEXeYA";
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";

    let tablaEstablecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);
    let origen = SpreadsheetApp.openById(ID_PLANTILLA_ORIGEN);

    // Actualizar los nombres de los establecimientos
    for (let i = 1; i < tablaEstablecimientos.length; i++) {
        let destino = SpreadsheetApp.openByUrl(tablaEstablecimientos[i][3]);
        migracionFormulaPob(origen, destino);
        Logger.log(tablaEstablecimientos[i][0] + " ha sido Migrado!");
    }
}

function migracionFormulaPob(origen, destino) {
    // Copiar el rango completo D77:DV87 de la hoja "PoblaSimpleHom" incluyendo fórmulas
    copiarFormulaRangoPob(origen, destino, "PROG TRAZADORAS 2026", "K10", "K10");
}

// 🔹 Función utilitaria que copia solo las fórmulas entre archivos
function copiarFormulaRangoPob(origen, destino, nombreHoja, rangoOrigen, rangoDestino) {
    const hojaOrigen = origen.getSheetByName(nombreHoja);
    const hojaDestino = destino.getSheetByName(nombreHoja);

    if (!hojaOrigen || !hojaDestino) {
        Logger.log("❌ No se encontró la hoja '" + nombreHoja + "' en alguno de los archivos.");
        return;
    }

    const formulas = hojaOrigen.getRange(rangoOrigen).getFormulas();

    hojaDestino.getRange(rangoDestino).setFormulas(formulas);

    Logger.log("✅ Fórmulas copiadas de " + origen.getName() + " a " + destino.getName());
}
