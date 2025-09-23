/**
 * Aplica estilos personalizados a un rango específico en una hoja de cálculo de Google Sheets.
 *
 * Esta función permite configurar bordes, color de fondo y negrita en un rango de celdas.
 * Es útil para dar formato a secciones específicas de una hoja de cálculo de manera reutilizable.
 *
 * @param {string} spreadsheetId - El ID único del Google Spreadsheet (puedes encontrarlo en la URL del documento).
 * @param {string} sheetName - El nombre de la hoja dentro del spreadsheet donde se aplicarán los estilos.
 * @param {string} range - El rango de celdas a formatear, en notación A1 (ejemplo: "A1:N30").
 * @param {Object} opciones - Un objeto con las opciones de estilo a aplicar.
 * @param {boolean} [opciones.borders=false] - Si es true, aplica bordes sólidos negros alrededor de cada celda en el rango.
 * @param {string} [opciones.backgroundColor=null] - El color de fondo en formato hexadecimal (ejemplo: "#FFFFFF" para blanco). Si es null, no se cambia el color de fondo.
 * @param {boolean} [opciones.bold=false] - Si es true, aplica negrita al texto en el rango.
 *
 * @example
 * // Aplicar bordes y negrita a las celdas A1:B10 en la hoja "Datos" del spreadsheet con ID "123456789"
 * aplicarEstilos("123456789", "Datos", "A1:B10", { borders: true, bold: true });
 *
 * @example
 * // Cambiar el color de fondo a amarillo en las celdas C5:D20
 * aplicarEstilos("123456789", "Datos", "C5:D20", { backgroundColor: "#FFFF00" });
 */
function aplicarEstilos(spreadsheetId, sheetName, range, opciones = {}) {
    // Abrir el spreadsheet por ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    // Obtener la hoja por nombre
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
        throw new Error(`La hoja "${sheetName}" no existe en el spreadsheet con ID "${spreadsheetId}".`);
    }

    // Obtener el rango especificado
    const rango = sheet.getRange(range);

    // Aplicar bordes si se especifica
    if (opciones.borders) {
        rango.setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID);
    }

    // Aplicar color de fondo si se especifica
    if (opciones.backgroundColor) {
        rango.setBackground(opciones.backgroundColor);
    }

    // Aplicar negrita si se especifica
    if (opciones.bold) {
        rango.setFontWeight("bold");
    } else if (opciones.bold === false) {
        rango.setFontWeight("normal");
    }
}
