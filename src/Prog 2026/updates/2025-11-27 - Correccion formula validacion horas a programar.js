function actualizarFormulaHorasAProgramar20251127() {
    // Obtenemos la lista de establecimientos que serán afectados
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(`Modificando el establecimiento: ${establecimientos[i][0]}`);
        let urlSheet = establecimientos[i][3];
        let hoja = "HORAS A PROGRAMAR";
        let filaInicio = 5;
        let filaFin = 32;
        let columna = "";
        let formulaBase = "";

        //COLUMNA GESTIÓN
        columna = "L";
        formulaBase = `=IF((B{row}-1)>J{row};"EL TOTAL HORAS PROGRAMAS DEBE SER IGUAL O CERCANO AL TOTAL DE HORAS ASISTENCIALES";IF((B{row}+1)<J{row};"EL TOTAL HORAS PROGRAMAS DEBE SER IGUAL O CERCANO AL TOTAL DE HORAS ASISTENCIALES";"OK"))`;
        replicarFormulaEnRango(
            urlSheet, // urlSheet
            hoja, // nombreHoja
            filaInicio, // filaInicio
            filaFin, // filaFin
            columna, // columna
            formulaBase // formulaBase
        );

        console.log(`Modificación realizada correctamente en el establecimiento: ${establecimientos[i][0]}`);
    }
}
