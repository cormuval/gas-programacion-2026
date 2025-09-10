// Fecha requerimiento: 28-04-2025

//Se requiere bloquear la hoja Dotacion excepto los siguientes rangos: A3:G199, H3:K199 y P3:S199
function desbloquearRangos() {
    let establecimientos = obtenerListaEstablecimientos();

    for (let i = 1; i < establecimientos.length; i++) {
        console.log(establecimientos[i][0]);
        let programacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let hojaDotacion = programacion.getSheetByName("DOTACION");

        // Desbloquear los rangos especificados
        const rangos = ["A3:G199", "H3:K199", "P3:S199"];
        desbloquearRangosHojaProtegida(hojaDotacion, rangos);
        console.log("Rangos desbloqueados en la hoja DOTACION de " + establecimientos[i][0]);
    }
}

function desbloquearRangosHojaProtegida(hoja, rangos) {
    // Obtener la protección de la hoja
    let proteccionHoja = hoja.protect();

    // Crear un array para almacenar los rangos a desbloquear
    let rangoDesprotegidos = [];

    // Desbloquear los rangos especificados
    for (let i = 0; i < rangos.length; i++) {
        let rango = hoja.getRange(rangos[i]);
        rangoDesprotegidos.push(rango);
    }

    // Establecer los rangos desbloqueados
    proteccionHoja.setUnprotectedRanges(rangoDesprotegidos);
}
