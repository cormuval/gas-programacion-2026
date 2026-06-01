function migrarDotaciones() {
    // 1. Constantes del consolidado de origen
    const ID_ORIGEN_CONSOLIDADOR = "1Yc4t7SmTrXuffMsnr5le1a_V7uoBKmVMnw4WWgzv3Cs";
    const NOMBRE_HOJA_ORIGEN = "CONSO_HNC_HC";
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";

    // 2. Extraer datos del consolidado de origen (una sola vez)
    let origenSpreadsheet = SpreadsheetApp.openById(ID_ORIGEN_CONSOLIDADOR);
    let origenSheet = origenSpreadsheet.getSheetByName(NOMBRE_HOJA_ORIGEN);
    if (!origenSheet) {
        throw new Error("No se pudo encontrar la hoja " + NOMBRE_HOJA_ORIGEN + " en el consolidado de origen.");
    }

    let allData = origenSheet.getDataRange().getValues();
    // La fila de encabezados es la 4 (índice 3), por ende los datos reales inician en la fila 5 (índice 4)
    let dataRows = allData.slice(4);
    console.log("Se cargaron " + dataRows.length + " filas del consolidado HNC.");

    // 3. Obtener lista de establecimientos de destino
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    if (!establecimientos || establecimientos.length < 2) {
        console.log("No se encontraron establecimientos válidos para procesar.");
        return;
    }

    for (let i = 1; i < establecimientos.length; i++) {
        let nombreEstablecimiento = establecimientos[i][0];
        let programacionUrl = establecimientos[i][3]; // URL del sheet de destino (programacion)
        
        if (!programacionUrl) {
            console.warn("El establecimiento " + nombreEstablecimiento + " no tiene configurada una URL de destino.");
            continue;
        }

        try {
            let programacion = SpreadsheetApp.openByUrl(programacionUrl);
            migrarInformacionDotacionConsolidada(nombreEstablecimiento, dataRows, programacion);
            console.log(nombreEstablecimiento + " ha sido Migrado con éxito!");
        } catch (e) {
            console.error("Error al migrar el establecimiento " + nombreEstablecimiento + ": " + e.message);
        }
    }
}

function migrarInformacionDotacionConsolidada(nombreEstablecimiento, dataRows, destino) {
    let sheetDestino = destino.getSheetByName("DOTACION");
    if (!sheetDestino) {
        throw new Error("No se encontró la pestaña 'DOTACION' en el archivo de destino.");
    }

    // 1. Filtrar registros del consolidado correspondientes a este centro
    let rowsFiltradas = dataRows.filter(row => {
        let estValue = row[2]; // Columna ESTABLECIMIENTO (índice 2)
        return estValue && estValue.toString().trim().toUpperCase() === nombreEstablecimiento.toString().trim().toUpperCase();
    });

    // 2. Limpieza total de los registros anteriores en la pestaña DOTACION (columnas A a X, desde fila 3)
    let lastRow = sheetDestino.getLastRow();
    if (lastRow >= 3) {
        sheetDestino.getRange(3, 1, lastRow - 2, 24).clearContent();
    }

    let numRows = rowsFiltradas.length;
    if (numRows === 0) {
        console.log("No se encontraron registros de dotación para: " + nombreEstablecimiento);
        return;
    }

    // 3. Mapear y preparar datos por bloques
    let datosA_G = [];
    let datosV = [];
    let traduccion = traduccionEstamentos();

    for (let r = 0; r < numRows; r++) {
        let sourceRow = rowsFiltradas[r];
        let cargoOriginal = sourceRow[4]; // Columna CARGO (índice 4)
        let cargoTraducido = traduccion[cargoOriginal] ? traduccion[cargoOriginal] : cargoOriginal;

        // Bloque A-G: ESTAMENTO, CARGO, CAT, CALIDAD, NOMBRE FUNCIONARIO/A, HORAS FUNC, DIAS PROGRAMACION
        datosA_G.push([
            cargoTraducido,           // ESTAMENTO (Col A)
            cargoTraducido,           // CARGO (Col B)
            sourceRow[3],             // CAT (Col C - CATEGORIA)
            "DOTACION",               // CALIDAD (Col D - Valor Fijo)
            sourceRow[6],             // NOMBRE FUNCIONARIO/A (Col E - FUNCIONARIO)
            sourceRow[5],             // HORAS FUNC (Col F - JORNADA)
            248                       // DIAS PROGRAMACION (Col G - Valor Fijo)
        ]);

        // Bloque V: TOTAL HORAS CLINICAS AL AÑO
        datosV.push([
            sourceRow[16]             // TOTAL HORAS CLINICAS AL AÑO (Col V - HORAS CLINICAS año)
        ]);
    }

    // 4. Escritura masiva de alto rendimiento
    sheetDestino.getRange(3, 1, numRows, 7).setValues(datosA_G);
    sheetDestino.getRange(3, 22, numRows, 1).setValues(datosV);
    console.log("Migradas exitosamente " + numRows + " filas de dotación para " + nombreEstablecimiento);
}

function traduccionEstamentos() {
    let traduccion = {
        "CIRUJANO DENTISTA": "ODONTOLOGO/A",
        "MEDICO CIRUJANO": "MEDICO",
        "QUIMICO FARMACEUTICO": "QUIMICO FARMACEUTICO",
        "ACOMPAÑAMIENTO PSICOSOCIAL": "PSICOLOGO/A",
        "EDUCADORA DE PARVULOS": "EDUCADORA DE PARVULOS",
        "ENFERMERA(O)": "ENFERMERA/O",
        FONOAUDIOLOGA: "FONOAUDIOLOGO/A",
        "KINESIOLOGA/O": "KINESIOLOGA/O",
        "MATRON/A": "MATRON/A",
        NUTRICIONISTA: "NUTRICIONISTA",
        "PSICOLOGA/O": "PSICOLOGO/A",
        "TRABAJADOR/A SOCIAL": "TRABAJADOR/A SOCIAL",
        PODOLOGA: "PODOLOGO/A",
        TENS: "TECNICO EN ENFERMERIA",
        TONS: "TONS (HIGIENISTA DENTAL)",
        "TENS FARMACIA": "TENS FARMACIA",
        "TERAPEUTA OCUPACIONAL": "TERAPEUTA OCUPACIONAL",
        "AGENTE DE MEDICINA INDIGENA": "AGENTE DE MEDICINA INDIGENA",
        "FACILITADOR/A INTERCULTURAL": "FACILITADOR/A INTERCULTURAL",
        "GESTOR COMUNITARIO": "GESTOR COMUNITARIO",
        "MEDICO OFTALMOLOGIA": "MEDICO OFTALMOLOGIA",
        "MEDICO OTORRINOLARINGOLOGIA": "MEDICO OTORRINOLARINGOLOGIA",
        "PROFESIONAL DE ACTIVIDAD FÍSICA": "PROFESIONAL DE ACTIVIDAD FÍSICA",
        "TECNOLOGO MEDICO": "TECNOLOGO MEDICO",
        "TENS PPAA": "TENS PPAA",
        "TECNICO EN TRABAJO SOCIAL": "TECNICO EN TRABAJO SOCIAL",
        "TONS (HIGIENISTA DENTAL)": "TONS (HIGIENISTA DENTAL)",
    };
    return traduccion;
}

function validarConsolidadoHNC() {
    const ID_ORIGEN_CONSOLIDADOR = "1Yc4t7SmTrXuffMsnr5le1a_V7uoBKmVMnw4WWgzv3Cs";
    const NOMBRE_HOJA_ORIGEN = "CONSO_HNC_HC";
    
    let origenSpreadsheet = SpreadsheetApp.openById(ID_ORIGEN_CONSOLIDADOR);
    let origenSheet = origenSpreadsheet.getSheetByName(NOMBRE_HOJA_ORIGEN);
    if (!origenSheet) {
        console.error("No se pudo encontrar la hoja " + NOMBRE_HOJA_ORIGEN);
        return;
    }
    
    let allData = origenSheet.getDataRange().getValues();
    let dataRows = allData.slice(4);
    console.log("--- PRUEBA EN SECO CONSOLIDADO HNC ---");
    console.log("Total filas de datos leídas: " + dataRows.length);

    // Probar con un establecimiento muestra
    const centrosMuestra = ["CECOSF CERRO ALEGRE", "CECOSF ISLA NEGRA"];
    
    centrosMuestra.forEach(centro => {
        let rowsFiltradas = dataRows.filter(row => {
            let estValue = row[2];
            return estValue && estValue.toString().trim().toUpperCase() === centro.toString().trim().toUpperCase();
        });
        
        console.log("\nEstablecimiento: " + centro);
        console.log("Registros encontrados: " + rowsFiltradas.length);
        
        if (rowsFiltradas.length > 0) {
            console.log("Primer registro de muestra:");
            let r = rowsFiltradas[0];
            console.log(" - ID: " + r[0]);
            console.log(" - Establecimiento: " + r[2]);
            console.log(" - Categoría (Copia a CAT Col C): " + r[3]);
            console.log(" - Cargo (Copia a ESTAMENTO/CARGO Col A/B): " + r[4]);
            console.log(" - Jornada (Copia a HORAS FUNC Col F): " + r[5]);
            console.log(" - Funcionario (Copia a NOMBRE Col E): " + r[6]);
            console.log(" - Horas Clínicas Año (Copia a TOTAL HORAS CLINICAS AL AÑO Col V): " + r[16]);
        }
    });
    console.log("\n--- FIN DE PRUEBA EN SECO ---");
}
