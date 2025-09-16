function agregarTons() {
    const CATEGORIA = "CAT_C";
    const ESTAMENTO = "TECNICO EN ODONTOLOGIA";
    const CARGO = "TONS";
    const HOJA = "REF_CARGO";
    const DATOS_FILA = [CATEGORIA, ESTAMENTO, CARGO];
    agregarFilaEnRefHnc(HOJA, DATOS_FILA);
}

function agregarTensFarmacia() {
    const CATEGORIA = "CAT_C";
    const ESTAMENTO = "TECNICO DE FARMACIA";
    const CARGO = "TENS FARMACIA";
    const HOJA = "REF_CARGO";
    const DATOS_FILA = [CATEGORIA, ESTAMENTO, CARGO];
    agregarFilaEnRefHnc(HOJA, DATOS_FILA);
}

function agregarTerapeutaOcupacional() {
    const CATEGORIA = "CAT_B";
    const ESTAMENTO = "TERAPEUTA OCUPACIONAL";
    const CARGO = "TERAPEUTA OCUPACIONAL";
    const HOJA = "REF_CARGO";
    const DATOS_FILA = [CATEGORIA, ESTAMENTO, CARGO];
    agregarFilaEnRefHnc(HOJA, DATOS_FILA);
}
