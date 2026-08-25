function consolidarDotacion() {
  // 1. CONFIGURACIÓN DE IDs 
  const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU"; // Reemplaza con el ID de tu matriz de URLs
  const ID_DESTINO = "18LBdfGN_I6KqdwRQSzfooXXFz6d_wp7Q-lusKKUVSg0"; // Reemplaza con el ID del archivo donde quieres consolidar
  const NOMBRE_HOJA_DESTINO = "DOTACION"; // Reemplaza con el nombre de tu pestaña de destino

  // 2. LISTADO DE ESTABLECIMIENTOS PERMITIDOS (Sacados de la imagen)
  const establecimientosFiltrados = [
    "CECOSF JUAN PABLO II",
    "CECOSF LAGUNA VERDE",
    "CECOSF PORVENIR BAJO",
    "CESFAM BARON",
    "CESFAM CORDILLERA",
    "CESFAM ESPERANZA",
    "CESFAM LAS CAÑAS",
    "CESFAM MENA",
    "CESFAM PADRE DAMIAN",
    "CESFAM PLACERES",
    "CESFAM PLACILLA",
    "CESFAM PUERTAS NEGRAS",
    "CESFAM QUEBRADA VERDE",
    "CESFAM REINA ISABEL II",
    "CESFAM RODELILLO"
  ];

  // Se asume que tienes esta función declarada en tu proyecto para obtener la matriz
  let tablaEstablecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);
  
  let ssDestino = SpreadsheetApp.openById(ID_DESTINO);
  let hojaDestino = ssDestino.getSheetByName(NOMBRE_HOJA_DESTINO);

  // Limpiar hoja destino (Asumiendo que la fila 1 tiene los encabezados del consolidado)
  // Limpiamos 7 columnas (1 para el nombre del centro + 6 columnas de la A a la F)
  if (hojaDestino.getLastRow() > 1) {
    hojaDestino.getRange(2, 1, hojaDestino.getLastRow(), 7).clearContent();
  }

  let datosConsolidados = [];

  // 3. RECORRER EL LISTADO MAESTRO
  for (let i = 1; i < tablaEstablecimientos.length; i++) {
    // Ajusta los índices [0] y [3] dependiendo de en qué columnas de tu hoja matriz 
    // están los Nombres de los centros y las URLs respectivamente.
    let nombreCentro = tablaEstablecimientos[i][0] ? tablaEstablecimientos[i][0].toString().trim() : ""; 
    let urlDestino = tablaEstablecimientos[i][3];   

    // Filtrar: Si el centro no está en la lista de la imagen, pasamos al siguiente
    if (!establecimientosFiltrados.includes(nombreCentro)) {
      continue; 
    }

    if (!urlDestino) continue;

    try {
      let ssOrigen = SpreadsheetApp.openByUrl(urlDestino);
      let hojaOrigen = ssOrigen.getSheetByName("DOTACION");

      if (hojaOrigen) {
        let ultimaFila = hojaOrigen.getLastRow();
        if (ultimaFila < 2) continue; // Si no hay datos saltamos

        // Traer información desde la fila 2, columna 1 (A) hasta la columna 6 (F)
        let datosRango = hojaOrigen.getRange(2, 1, ultimaFila - 1, 6).getValues();

        // La primera fila obtenida (índice 0) corresponde a la fila 2 de la hoja (los encabezados)
        let encabezados = datosRango[0].map(h => h.toString().trim().toUpperCase());
        let indiceEstamento = encabezados.indexOf("ESTAMENTO");

        if (indiceEstamento === -1) {
          console.log("No se encontró la columna 'ESTAMENTO' en " + nombreCentro);
          continue; // Si no hay columna ESTAMENTO, no podemos filtrar, pasamos al siguiente
        }

        // 4. FILTRAR Y CAPTURAR LOS DATOS
        // Recorremos desde el índice 1 en adelante, que equivalen a los datos desde la fila 3
        for (let j = 1; j < datosRango.length; j++) {
          let fila = datosRango[j];
          let valorEstamento = fila[indiceEstamento];

          // Condición: Que la columna ESTAMENTO tenga información
          if (valorEstamento && valorEstamento.toString().trim() !== "") {
            // Agregamos la fila. Se incluye el nombre del centro en la primera columna
            datosConsolidados.push([nombreCentro, ...fila]);
          }
        }
        console.log(nombreCentro + " procesado correctamente.");
      }
    } catch (e) {
      console.error("Error procesando " + nombreCentro + ": " + e.message);
    }
  }

  // 5. PEGAR LOS DATOS EN EL DESTINO
  if (datosConsolidados.length > 0) {
    // datosConsolidados[0].length determinará cuántas columnas se pegan (1 del nombre + 6 de A:F = 7 columnas)
    hojaDestino.getRange(2, 1, datosConsolidados.length, datosConsolidados[0].length).setValues(datosConsolidados);
    console.log("✅ Consolidación exitosa. Se consolidaron " + datosConsolidados.length + " filas.");
  } else {
    console.log("⚠️ No se encontraron datos que cumplieran las condiciones para consolidar.");
  }
}