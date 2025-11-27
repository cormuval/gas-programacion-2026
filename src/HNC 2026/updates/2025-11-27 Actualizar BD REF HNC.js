function actualizarBdRefHNC20251127() {
    const ID_PLANTILLA_ORIGEN = "1kP2bL9OXpIWDUAJQldOYBRhgpalJ2Kc8zi7XCCsP1rc";
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";

    let tablaEstablecimientosReuniones = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);
    let origen = SpreadsheetApp.openById(ID_PLANTILLA_ORIGEN);

    //* Actualizar la bd de referencia en cada establecimiento (reuniones, cargos de gestión y derechos funcionarios)
    for (let i = 1; i < tablaEstablecimientosReuniones.length; i++) {
        let destino = SpreadsheetApp.openByUrl(tablaEstablecimientosReuniones[i][6]);
        //PARTE 1
        //ACTUALIZACIÓN DE  BD DE REUNIONES
        copiarDatosRango(origen, destino, "BD_REF_REUNIONES", "BD_REF_REUNIONES", "A2:D237", "A2:D237");
        copiarFormulasRango(origen, destino, "BD_REF_REUNIONES", "BD_REF_REUNIONES", "E2:E237", "E2:E237");
        copiarDatosRango(origen, destino, "BD_REF_REUNIONES", "BD_REF_REUNIONES", "F2:M237", "F2:M237");
        copiarFormulasRango(origen, destino, "BD_REF_REUNIONES", "BD_REF_REUNIONES", "N2:Q237", "N2:Q237");
        //PARTE 2
        //ACTUALIZACIÓN DE BD DE DERECHOS FUNCIONARIOS
        // copiarDatosRango(origen, destino, "BD_REF_DERECHOS", "BD_REF_DERECHOS", "A2:F41", "A2:F41");
        //PARTE 3
        //ACTUALIZACIÓN DE BD DE CARGOS DE GESTION
        copiarDatosRango(origen, destino, "BD_REF_GESTION", "BD_REF_GESTION", "A2:G329", "A2:G329");
        Logger.log("La información del " + tablaEstablecimientosReuniones[i][0] + " ha sido actualizada!");
    }
}
