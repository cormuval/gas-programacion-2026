// Fecha requerimiento: 28-10-2026

// Se requiere desproteger el rango M5:M18 de la pestaña "PROG ECICEP" en las programaciones 2027
// ya creadas (filas 2 a 50, link en columna F). No se modifica ningún dato, solo las protecciones.
//
// Uso:
//   1. Ejecutar diagnosticarProteccionesEcicep2027() y revisar en el log cómo está protegida la pestaña.
//   2. Ejecutar desprotegerRangoEcicep2027() con SOLO_PRIMERA = true para probar en un establecimiento.
//   3. Cambiar SOLO_PRIMERA a false y ejecutar nuevamente para el resto.

const ID_HOJA_ESTABLECIMIENTOS_2027 = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
const HOJA_ECICEP_2027 = "PROG ECICEP";
const RANGO_ECICEP_2027 = "M5:M18";

/**
 * Muestra en el log las protecciones de la pestaña PROG ECICEP del primer establecimiento,
 * indicando cuáles afectan al rango M5:M18. No modifica nada.
 */
function diagnosticarProteccionesEcicep2027() {
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS_2027);
    let programacion = SpreadsheetApp.openByUrl(establecimientos[1][5]);
    let hoja = programacion.getSheetByName(HOJA_ECICEP_2027);
    let objetivo = hoja.getRange(RANGO_ECICEP_2027);

    console.log("Establecimiento: " + establecimientos[1][0]);

    hoja.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach((p) => {
        let desprotegidos = p.getUnprotectedRanges().map((r) => r.getA1Notation());
        console.log("Protección de HOJA. Rangos desprotegidos: " + (desprotegidos.join(", ") || "ninguno"));
    });

    hoja.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach((p) => {
        let rango = p.getRange();
        let afecta = intersectarRangos2027(rango, objetivo) ? "AFECTA a " + RANGO_ECICEP_2027 : "no afecta";
        console.log("Protección de RANGO " + rango.getA1Notation() + " (" + (p.getDescription() || "sin descripción") + "): " + afecta);
    });
}

/**
 * Libera el rango M5:M18 de la pestaña PROG ECICEP en las programaciones 2027.
 *
 * - Si la pestaña tiene protección de hoja, agrega M5:M18 a sus rangos desprotegidos
 *   (conservando los que ya existían).
 * - Si hay protecciones de rango que tocan M5:M18, las reemplaza por protecciones que cubren
 *   el mismo rango menos M5:M18, copiando descripción, editores y modo advertencia.
 */
function desprotegerRangoEcicep2027() {
    // Cambiar a false después de validar en el primer establecimiento
    const SOLO_PRIMERA = true;
    const ULTIMA_FILA = 50;

    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS_2027);
    let limite = SOLO_PRIMERA ? 2 : Math.min(ULTIMA_FILA, establecimientos.length);

    for (let i = 1; i < limite; i++) {
        let nombreEstablecimiento = establecimientos[i][0];
        try {
            let programacion = SpreadsheetApp.openByUrl(establecimientos[i][5]);
            let hoja = programacion.getSheetByName(HOJA_ECICEP_2027);
            if (!hoja) {
                throw new Error("No se encontró la pestaña " + HOJA_ECICEP_2027);
            }
            let cambios = liberarRangoProtegido2027(hoja, hoja.getRange(RANGO_ECICEP_2027));
            console.log(nombreEstablecimiento + ": " + cambios + " protección(es) ajustada(s)");
        } catch (e) {
            console.error("Error en " + nombreEstablecimiento + ": " + e.message);
        }
    }
}

function liberarRangoProtegido2027(hoja, objetivo) {
    let cambios = 0;

    // 1. Protección de hoja: agregar el rango a los desprotegidos si no está cubierto
    hoja.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach((p) => {
        let desprotegidos = p.getUnprotectedRanges();
        let yaIncluido = desprotegidos.some((r) => contieneRango2027(r, objetivo));
        if (!yaIncluido) {
            desprotegidos.push(objetivo);
            p.setUnprotectedRanges(desprotegidos);
            cambios++;
        }
    });

    // 2. Protecciones de rango: recortar el rango objetivo
    hoja.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach((p) => {
        let rango = p.getRange();
        let interseccion = intersectarRangos2027(rango, objetivo);
        if (!interseccion) {
            return;
        }

        restarRango2027(rango, interseccion).forEach((pieza) => {
            let nueva = hoja.getRange(pieza.fila, pieza.columna, pieza.filas, pieza.columnas).protect();
            copiarConfiguracionProteccion2027(p, nueva);
        });
        p.remove();
        cambios++;
    });

    return cambios;
}

function copiarConfiguracionProteccion2027(origen, destino) {
    destino.setDescription(origen.getDescription());
    if (origen.isWarningOnly()) {
        destino.setWarningOnly(true);
        return;
    }
    destino.removeEditors(destino.getEditors());
    destino.addEditors(origen.getEditors().map((u) => u.getEmail()));
    if (destino.canDomainEdit()) {
        destino.setDomainEdit(origen.canDomainEdit());
    }
}

/**
 * Devuelve la intersección de dos rangos como {fila, columna, filas, columnas}, o null si no se tocan.
 */
function intersectarRangos2027(a, b) {
    let f1 = Math.max(a.getRow(), b.getRow());
    let f2 = Math.min(a.getLastRow(), b.getLastRow());
    let c1 = Math.max(a.getColumn(), b.getColumn());
    let c2 = Math.min(a.getLastColumn(), b.getLastColumn());
    if (f1 > f2 || c1 > c2) {
        return null;
    }
    return { fila: f1, columna: c1, filas: f2 - f1 + 1, columnas: c2 - c1 + 1 };
}

function contieneRango2027(contenedor, contenido) {
    return (
        contenedor.getRow() <= contenido.getRow() &&
        contenedor.getLastRow() >= contenido.getLastRow() &&
        contenedor.getColumn() <= contenido.getColumn() &&
        contenedor.getLastColumn() >= contenido.getLastColumn()
    );
}

/**
 * Divide el rango en hasta 4 rectángulos (arriba, abajo, izquierda, derecha) que cubren
 * todo el rango original excepto el hueco.
 */
function restarRango2027(rango, hueco) {
    let f1 = rango.getRow();
    let f2 = rango.getLastRow();
    let c1 = rango.getColumn();
    let c2 = rango.getLastColumn();
    let hf1 = hueco.fila;
    let hf2 = hueco.fila + hueco.filas - 1;
    let hc1 = hueco.columna;
    let hc2 = hueco.columna + hueco.columnas - 1;
    let piezas = [];

    if (hf1 > f1) piezas.push({ fila: f1, columna: c1, filas: hf1 - f1, columnas: c2 - c1 + 1 });
    if (hf2 < f2) piezas.push({ fila: hf2 + 1, columna: c1, filas: f2 - hf2, columnas: c2 - c1 + 1 });
    if (hc1 > c1) piezas.push({ fila: hf1, columna: c1, filas: hf2 - hf1 + 1, columnas: hc1 - c1 });
    if (hc2 < c2) piezas.push({ fila: hf1, columna: hc2 + 1, filas: hf2 - hf1 + 1, columnas: c2 - hc2 });

    return piezas;
}
