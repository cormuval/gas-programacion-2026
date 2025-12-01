function actualizarEdadGeneracionCasosDermato20251201() {
    const hoja = "PROG. SALUD DIGITAL"; // Reemplaza con el nombre de tu hoja
    let celda;
    let valor;

    //FILA GENERACIÓN DE CASOS
    celda = "C5"; // Reemplaza con la celda que deseas actualizar
    valor = "TODAS LAS EDADES"; // Reemplaza con el valor que deseas establecer
    actualizarValorEnBdProg(hoja, celda, valor);
}
