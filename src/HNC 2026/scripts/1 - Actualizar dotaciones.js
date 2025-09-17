function migrarDotaciones() {
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

    // for (var i = 1; i < establecimientos.length; i++) {
    for (var i = 1; i < 2; i++) {
        let hnc = SpreadsheetApp.openByUrl(establecimientos[i][5]);
        let programacion = SpreadsheetApp.openByUrl(establecimientos[i][3]);
        migrarInformacionDotacion(hnc, programacion);
        Logger.log(establecimientos[i][0] + " ha sido Migrado!");
    }
}

function migrarInformacionDotacion(origen, destino) {
    let datosOrigen;
    //Columna estamento
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
