/**
 * Copia datos de un rango específico de una hoja a otra.
 *
 * Esta función copia valores desde un rango de origen en una hoja de cálculo
 * a un rango de destino en otra hoja de cálculo.
 *
 * @param {Spreadsheet} origen - El archivo de origen
 * @param {Spreadsheet} destino - El archivo de destino
 * @param {string} nombreHojaOrigen - El nombre de la hoja de origen
 * @param {string} nombreHojaDestino - El nombre de la hoja de destino
 * @param {string} rangoOrigen - El rango de origen (ej: "A1:C10")
 * @param {string} rangoDestino - El rango de destino (ej: "A1:C10")
 * @returns {boolean} True si la operación fue exitosa
 */
function copiarDatosRango(origen, destino, nombreHojaOrigen, nombreHojaDestino, rangoOrigen, rangoDestino) {
    try {
        let hojaOrigen = origen.getSheetByName(nombreHojaOrigen);
        let hojaDestino = destino.getSheetByName(nombreHojaDestino);

        let datos = hojaOrigen.getRange(rangoOrigen).getValues();
        hojaDestino.getRange(rangoDestino).setValues(datos);

        console.log(`Datos copiados desde ${nombreHojaOrigen}!${rangoOrigen} a ${nombreHojaDestino}!${rangoDestino}`);
        return true;
    } catch (error) {
        console.error(`Error al copiar datos: ${error.message}`);
        throw new Error(`No se pudieron copiar los datos: ${error.message}`);
    }
}

/**
 * Copia fórmulas de un rango específico de una hoja a otra.
 *
 * Esta función copia fórmulas (no valores) desde un rango de origen
 * a un rango de destino, manteniendo las referencias relativas.
 *
 * @param {Spreadsheet} origen - El archivo de origen
 * @param {Spreadsheet} destino - El archivo de destino
 * @param {string} nombreHojaOrigen - El nombre de la hoja de origen
 * @param {string} nombreHojaDestino - El nombre de la hoja de destino
 * @param {string} rangoOrigen - El rango de origen (ej: "A1:C10")
 * @param {string} rangoDestino - El rango de destino (ej: "A1:C10")
 * @returns {boolean} True si la operación fue exitosa
 */
function copiarFormulasRango(origen, destino, nombreHojaOrigen, nombreHojaDestino, rangoOrigen, rangoDestino) {
    try {
        let hojaOrigen = origen.getSheetByName(nombreHojaOrigen);
        let hojaDestino = destino.getSheetByName(nombreHojaDestino);

        let formulas = hojaOrigen.getRange(rangoOrigen).getFormulas();
        hojaDestino.getRange(rangoDestino).setFormulas(formulas);

        console.log(`Fórmulas copiadas desde ${nombreHojaOrigen}!${rangoOrigen} a ${nombreHojaDestino}!${rangoDestino}`);
        return true;
    } catch (error) {
        console.error(`Error al copiar fórmulas: ${error.message}`);
        throw new Error(`No se pudieron copiar las fórmulas: ${error.message}`);
    }
}

/**
 * Actualiza una fórmula específica en una celda de múltiples hojas de cálculo.
 *
 * Esta función permite actualizar una fórmula en la misma celda de múltiples
 * archivos de Google Sheets de forma masiva.
 *
 * @param {Array<string>} urlsArchivos - Array de URLs de los archivos a actualizar
 * @param {string} nombreHoja - El nombre de la hoja donde actualizar la fórmula
 * @param {string} celda - La celda donde actualizar la fórmula (ej: "A1")
 * @param {string} nuevaFormula - La nueva fórmula a establecer
 * @returns {number} El número de archivos actualizados exitosamente
 */
function actualizarFormulaMasiva(urlsArchivos, nombreHoja, celda, nuevaFormula) {
    let archivosActualizados = 0;

    for (let i = 0; i < urlsArchivos.length; i++) {
        try {
            let archivo = SpreadsheetApp.openByUrl(urlsArchivos[i]);
            let hoja = archivo.getSheetByName(nombreHoja);
            hoja.getRange(celda).setFormula(nuevaFormula);
            archivosActualizados++;
            console.log(`Fórmula actualizada en archivo ${i + 1}: ${celda} = ${nuevaFormula}`);
        } catch (error) {
            console.error(`Error al actualizar archivo ${i + 1}: ${error.message}`);
        }
    }

    console.log(`Se actualizaron ${archivosActualizados} de ${urlsArchivos.length} archivos`);
    return archivosActualizados;
}

/**
 * Establece un valor específico en una celda de múltiples hojas de cálculo.
 *
 * Esta función permite establecer un valor en la misma celda de múltiples
 * archivos de Google Sheets de forma masiva.
 *
 * @param {Array<string>} urlsArchivos - Array de URLs de los archivos a actualizar
 * @param {string} nombreHoja - El nombre de la hoja donde establecer el valor
 * @param {string} celda - La celda donde establecer el valor (ej: "A1")
 * @param {any} valor - El valor a establecer
 * @returns {number} El número de archivos actualizados exitosamente
 */
function establecerValorMasivo(urlsArchivos, nombreHoja, celda, valor) {
    let archivosActualizados = 0;

    for (let i = 0; i < urlsArchivos.length; i++) {
        try {
            let archivo = SpreadsheetApp.openByUrl(urlsArchivos[i]);
            let hoja = archivo.getSheetByName(nombreHoja);
            hoja.getRange(celda).setValue(valor);
            archivosActualizados++;
            console.log(`Valor establecido en archivo ${i + 1}: ${celda} = ${valor}`);
        } catch (error) {
            console.error(`Error al actualizar archivo ${i + 1}: ${error.message}`);
        }
    }

    console.log(`Se actualizaron ${archivosActualizados} de ${urlsArchivos.length} archivos`);
    return archivosActualizados;
}

/**
 * Obtiene información básica de una hoja de cálculo.
 *
 * Esta función devuelve información útil sobre un archivo de Google Sheets,
 * como el número de hojas, nombres de hojas y última modificación.
 *
 * @param {string} spreadsheetId - El ID del archivo de Google Sheets
 * @returns {Object} Un objeto con la información del archivo
 */
function obtenerInfoSheet(spreadsheetId) {
    try {
        let archivo = SpreadsheetApp.openById(spreadsheetId);
        let hojas = archivo.getSheets();
        let nombresHojas = hojas.map((hoja) => hoja.getName());

        let info = {
            id: archivo.getId(),
            nombre: archivo.getName(),
            url: archivo.getUrl(),
            numeroHojas: hojas.length,
            nombresHojas: nombresHojas,
            propietario: archivo.getOwner().getEmail(),
        };

        console.log(`Información obtenida para: ${info.nombre}`);
        return info;
    } catch (error) {
        console.error(`Error al obtener información del archivo: ${error.message}`);
        throw new Error(`No se pudo obtener la información del archivo: ${error.message}`);
    }
}

/**
 * Configura protección en un rango específico de una hoja.
 *
 * Esta función permite proteger o desproteger rangos específicos en una hoja,
 * útil para controlar qué celdas pueden ser editadas.
 *
 * @param {string} spreadsheetId - El ID del archivo de Google Sheets
 * @param {string} nombreHoja - El nombre de la hoja
 * @param {Array<string>} rangosProtegidos - Array de rangos a proteger (ej: ["A1:B10", "D1:E5"])
 * @param {Array<string>} rangosLibres - Array de rangos que quedan libres para editar
 * @returns {boolean} True si la protección se configuró correctamente
 */
function configurarProteccionHoja(spreadsheetId, nombreHoja, rangosProtegidos = [], rangosLibres = []) {
    try {
        let archivo = SpreadsheetApp.openById(spreadsheetId);
        let hoja = archivo.getSheetByName(nombreHoja);

        // Remover protecciones existentes
        let protecciones = hoja.getProtections(SpreadsheetApp.ProtectionType.RANGE);
        protecciones.forEach((proteccion) => proteccion.remove());

        // Aplicar nueva protección si se especifican rangos
        if (rangosProtegidos.length > 0) {
            let proteccionHoja = hoja.protect();

            if (rangosLibres.length > 0) {
                let rangosSinProteger = rangosLibres.map((rango) => hoja.getRange(rango));
                proteccionHoja.setUnprotectedRanges(rangosSinProteger);
            }
        }

        console.log(`Protección configurada en ${nombreHoja}`);
        return true;
    } catch (error) {
        console.error(`Error al configurar protección: ${error.message}`);
        throw new Error(`No se pudo configurar la protección: ${error.message}`);
    }
}
