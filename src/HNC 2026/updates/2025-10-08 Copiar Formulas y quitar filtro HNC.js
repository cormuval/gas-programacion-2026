function actualizarFormulasHNC(nuevosNombres) {
    const ID_PLANTILLA_ORIGEN = "1kP2bL9OXpIWDUAJQldOYBRhgpalJ2Kc8zi7XCCsP1rc";
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    
    let tablaEstablecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);
    let origen = SpreadsheetApp.openById(ID_PLANTILLA_ORIGEN);

  // Actualizar los nombres de los establecimientos
  for (let i = 1; i < tablaEstablecimientos.length; i++) {
    let destino = SpreadsheetApp.openByUrl(tablaEstablecimientos[i][6]);
    migracionFormulaHNC(origen, destino);
    Logger.log(tablaEstablecimientos[i][0] + " ha sido Migrado!");
  }

}

function migracionFormulaHNC(origen, destino) {
  const hoja = destino.getSheetByName("BD_REF_REUNIONES");
  const filter = hoja.getFilter();
// Removes the filter from the active sheet.
  if (filter) {
    filter.remove();
    Logger.log("Filtro eliminado en hoja BD_REF_REUNIONES de " + destino.getName());
  } else {
    Logger.log("No había filtro en hoja BD_REF_REUNIONES de " + destino.getName());
  }
  // Copiar el rango completo D77:DV87 de la hoja "PoblaSimpleHom" incluyendo fórmulas
  copiarFormulaRangoHNC(origen, destino, "BD_REF_REUNIONES", "E2:E224", "E2:E224");
}

// 🔹 Función utilitaria que copia solo las fórmulas entre archivos
function copiarFormulaRangoHNC(origen, destino, nombreHoja, rangoOrigen, rangoDestino) {
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