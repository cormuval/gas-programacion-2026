function consolidarDotacion() {
  // 1. CONFIGURACIÓN DE IDs 
  const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU"; // Reemplaza con el ID de tu matriz de URLs
  const ID_DESTINO = "18LBdfGN_I6KqdwRQSzfooXXFz6d_wp7Q-lusKKUVSg0"; // Reemplaza con el ID del archivo donde quieres consolidar
  const NOMBRE_HOJA_DESTINO = "DOTACION"; // Reemplaza con el nombre de tu pestaña de destino

  // Rango de extracción: desde la columna A (1) hasta la columna V (22)
  const TOTAL_COLUMNAS_ORIGEN = 22;
  // 1 columna para el nombre del centro + las 22 columnas de la A a la V
  const TOTAL_COLUMNAS_DESTINO = TOTAL_COLUMNAS_ORIGEN + 1;

  // Semanas programables del año: convierte las horas clínicas anuales en semanales
  const SEMANAS_PROGRAMABLES = 49.6;
  const ENCABEZADO_HORAS_ANUALES = "TOTAL HORAS CLINICAS AL AÑO";
  const INDICE_COLUMNA_V = 21; // Respaldo si el encabezado no se encuentra

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
  if (hojaDestino.getLastRow() > 1) {
    hojaDestino.getRange(2, 1, hojaDestino.getLastRow() - 1, TOTAL_COLUMNAS_DESTINO).clearContent();
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

        // Traer información desde la fila 2, columna 1 (A) hasta la columna 22 (V)
        let datosRango = hojaOrigen.getRange(2, 1, ultimaFila - 1, TOTAL_COLUMNAS_ORIGEN).getValues();

        // La primera fila obtenida (índice 0) corresponde a la fila 2 de la hoja (los encabezados)
        let encabezados = datosRango[0].map(h => normalizarEncabezado(h));
        let indiceEstamento = encabezados.indexOf("ESTAMENTO");

        if (indiceEstamento === -1) {
          console.log("No se encontró la columna 'ESTAMENTO' en " + nombreCentro);
          continue; // Si no hay columna ESTAMENTO, no podemos filtrar, pasamos al siguiente
        }

        // Ubicamos la columna de horas anuales por su encabezado; si no aparece usamos la columna V
        let indiceHorasAnuales = encabezados.indexOf(normalizarEncabezado(ENCABEZADO_HORAS_ANUALES));
        if (indiceHorasAnuales === -1) {
          indiceHorasAnuales = INDICE_COLUMNA_V;
          console.log("No se encontró el encabezado '" + ENCABEZADO_HORAS_ANUALES + "' en " + nombreCentro + ". Se usará la columna V.");
        }

        // 4. FILTRAR Y CAPTURAR LOS DATOS
        // Recorremos desde el índice 1 en adelante, que equivalen a los datos desde la fila 3
        for (let j = 1; j < datosRango.length; j++) {
          let fila = datosRango[j];
          let valorEstamento = fila[indiceEstamento];

          // Condición: Que la columna ESTAMENTO tenga información
          if (valorEstamento && valorEstamento.toString().trim() !== "") {
            // Copiamos la fila para no alterar los datos leídos del origen
            let filaProcesada = fila.slice();

            // Las horas clínicas anuales se expresan en horas clínicas semanales
            filaProcesada[indiceHorasAnuales] = convertirHorasAnualesASemanales(filaProcesada[indiceHorasAnuales], SEMANAS_PROGRAMABLES);

            // Agregamos la fila. Se incluye el nombre del centro en la primera columna
            datosConsolidados.push([nombreCentro, ...filaProcesada]);
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
    // datosConsolidados[0].length determinará cuántas columnas se pegan (1 del nombre + 22 de A:V = 23 columnas)
    hojaDestino.getRange(2, 1, datosConsolidados.length, datosConsolidados[0].length).setValues(datosConsolidados);
    console.log("✅ Consolidación exitosa. Se consolidaron " + datosConsolidados.length + " filas.");
  } else {
    console.log("⚠️ No se encontraron datos que cumplieran las condiciones para consolidar.");
  }
}

/**
 * Normaliza un encabezado para poder compararlo: quita espacios sobrantes,
 * lo pasa a mayúsculas y elimina las tildes y la virgulilla de la Ñ.
 */
function normalizarEncabezado(valor) {
  return valor
    .toString()
    .trim()
    .toUpperCase()
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Convierte un total de horas clínicas anuales en horas clínicas semanales.
 * Si el valor no es numérico se devuelve tal cual vino del origen.
 */
function convertirHorasAnualesASemanales(valor, semanasProgramables) {
  if (valor === "" || valor === null || valor === undefined) return valor;

  let numero = typeof valor === "number" ? valor : Number(valor.toString().trim().replace(",", "."));
  if (isNaN(numero)) return valor;

  return numero / semanasProgramables;
}
