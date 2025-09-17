function migrarDotaciones() {
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    for (var i = 1; i < establecimientos.length; i++) {
        // for (var i = 1; i < 2; i++) {
        let hnc = SpreadsheetApp.openByUrl(establecimientos[i][5]);
        let programacion = SpreadsheetApp.openByUrl(establecimientos[i][3]);
        migrarInformacionDotacion(hnc, programacion);
        Logger.log(establecimientos[i][0] + " ha sido Migrado!");
    }
}

function migrarInformacionDotacion(origen, destino) {
    let datosOrigen;
    //*COLUMNA ESTAMENTO
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("B7:B199").getValues();
    // Obtener el mapeo de traducción
    let traduccion = traduccionEstamentos();
    // Traducir los valores
    for (let i = 0; i < datosOrigen.length; i++) {
        let estamentoOriginal = datosOrigen[i][0];
        if (traduccion[estamentoOriginal]) {
            datosOrigen[i][0] = traduccion[estamentoOriginal];
        }
        // Si no está en el mapeo, dejar el valor original
    }
    destino.getSheetByName("DOTACION").getRange("A3:A195").setValues(datosOrigen);

    //*COLUMNA CARGO
    destino.getSheetByName("DOTACION").getRange("B3:B195").setValues(datosOrigen);

    //*COLUMNA CATEGORIA
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("A7:A199").getValues();
    destino.getSheetByName("DOTACION").getRange("C3:C195").setValues(datosOrigen);

    //*COLUMNA NOMBRE FUNCIONARIO
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("C7:C199").getValues();
    destino.getSheetByName("DOTACION").getRange("E3:E195").setValues(datosOrigen);

    //*COLUMNA HORAS FUNCIONARIO
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("D7:D199").getValues();
    destino.getSheetByName("DOTACION").getRange("F3:F195").setValues(datosOrigen);

    //*COLUMNA DIAS FL
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("F7:F199").getValues();
    destino.getSheetByName("DOTACION").getRange("H3:H195").setValues(datosOrigen);

    //*COLUMNA DIAS ADM
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("E7:E199").getValues();
    destino.getSheetByName("DOTACION").getRange("I3:I195").setValues(datosOrigen);

    //*COLUMNA DIAS CAPACITACION
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("G7:G199").getValues();
    destino.getSheetByName("DOTACION").getRange("K3:K195").setValues(datosOrigen);

    //*COLUMNA HRS SEMANA ALMUERZO (DERECHOS FUNCIONARIOS)
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("N7:N199").getValues();
    destino.getSheetByName("DOTACION").getRange("P3:P195").setValues(datosOrigen);

    //*COLUMNA HRS SEMANA REUNIONES
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("M7:M199").getValues();
    destino.getSheetByName("DOTACION").getRange("R3:R195").setValues(datosOrigen);

    //*COLUMNA HRS SEMANA GESTION
    datosOrigen = origen.getSheetByName("Horas_FUNC").getRange("L7:L199").getValues();
    destino.getSheetByName("DOTACION").getRange("S3:S195").setValues(datosOrigen);

    //*COLUMNA CALIDAD (Se usa solo en la primera ejecución para llenar la columna con "DOTACION")
    // let dotacionArray = Array(193)
    //     .fill()
    //     .map(() => ["DOTACION"]);
    // destino.getSheetByName("DOTACION").getRange("D3:D195").setValues(dotacionArray);
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
