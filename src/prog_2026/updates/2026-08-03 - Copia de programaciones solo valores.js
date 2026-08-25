function prepararArchivosExcel() {
  // 1. Pega aquí el ID de la carpeta donde están tus 45 archivos originales
  var sourceFolderId = "1LZsCURu-yASkQ3FTCdVRGKdCJxvIoaNj"; 
  
  // 2. Pega aquí el ID de la carpeta destino donde se guardarán las copias
  var targetFolderId = "16w2YYkcmy6OUf-xFfhLuNWEPIJ9j2ron"; 
  
  var sourceFolder = DriveApp.getFolderById(sourceFolderId);
  var exportFolder = DriveApp.getFolderById(targetFolderId);
  
  var files = sourceFolder.getFilesByType(MimeType.GOOGLE_SHEETS);
  
  while (files.hasNext()) {
    var file = files.next();
    
    // Hacemos una copia del archivo en tu carpeta destino definida
    var fileCopy = file.makeCopy(file.getName() + " - Valores", exportFolder);
    
    // Abrimos la copia para limpiar las fórmulas
    var ss = SpreadsheetApp.openById(fileCopy.getId());
    var sheets = ss.getSheets();
    
    // Recorremos todas las pestañas del archivo
    for (var i = 0; i < sheets.length; i++) {
      var sheet = sheets[i];
      var range = sheet.getDataRange();
      
      // Reemplazamos todo el contenido por "Solo Valores"
      range.copyTo(range, {contentsOnly: true});
    }
  }
}