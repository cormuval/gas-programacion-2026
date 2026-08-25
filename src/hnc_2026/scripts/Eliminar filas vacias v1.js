/**
 * Analiza la columna B (ESTABLECIMIENTO) desde la fila 5 de la hoja "BD_HNC".
 * Si encuentra una celda vacía, elimina la fila correspondiente.
 */
function eliminarFilasVaciasEstablecimiento() {
  // 1. Identificadores de tu hoja de cálculo
  var spreadsheetId = "1Yc4t7SmTrXuffMsnr5le1a_V7uoBKmVMnw4WWgzv3Cs";
  var nombreHoja = "BD_HNC";
  
  // 2. Abrir el archivo y obtener la hoja
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(nombreHoja);
  
  // Validar si la hoja existe
  if (!sheet) {
    Logger.log("Error: No se encontró la hoja con el nombre '" + nombreHoja + "'.");
    return;
  }
  
  // 3. Obtener la última fila con datos en la hoja
  var lastRow = sheet.getLastRow();
  
  // Si la última fila es menor a 5, significa que no hay datos para procesar
  if (lastRow < 5) {
    Logger.log("No hay datos suficientes para analizar (la tabla empieza en la fila 5).");
    return;
  }
  
  // 4. Leer todos los valores de la columna B (Columna 2) desde la fila 5
  var filaInicio = 5;
  var columnaB = 2;
  var cantidadFilas = lastRow - filaInicio + 1;
  
  // Obtenemos los datos en una sola llamada para mejorar el rendimiento
  var rango = sheet.getRange(filaInicio, columnaB, cantidadFilas, 1);
  var valores = rango.getValues(); // Devuelve un array bidimensional [[valor1], [valor2]...]
  
  var filasEliminadas = 0;

  // 5. Iterar en reversa (desde el final hacia el principio)
  // i comienza en el último índice del array (valores.length - 1) y baja hasta 0
  for (var i = valores.length - 1; i >= 0; i--) {
    var valorCelda = valores[i][0];
    
    // Verificar si la celda está realmente vacía
    if (valorCelda === "" || valorCelda === null || valorCelda === undefined) {
      // Calcular la fila real en la hoja de cálculo
      var filaReal = i + filaInicio;
      
      // Eliminar la fila en la hoja de cálculo
      sheet.deleteRow(filaReal);
      filasEliminadas++;
    }
  }
  
  Logger.log("Proceso completado. Se eliminaron " + filasEliminadas + " filas.");
}