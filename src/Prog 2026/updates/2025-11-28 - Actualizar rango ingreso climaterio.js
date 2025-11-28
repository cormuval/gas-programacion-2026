function actualizarEdadIngresoClimaterio20251128() {
    const hoja = "PROG 2026"; // Reemplaza con el nombre de tu hoja
    let celda;
    let valor;

    //FILA MEDICO
    celda = "F160"; // Reemplaza con la celda que deseas actualizar
    valor = "40 A 64 AÑOS MUJERES"; // Reemplaza con el valor que deseas establecer
    actualizarValorEnBdProg(hoja, celda, valor);
    //FILA MATRON/A
    celda = "F161"; // Reemplaza con la celda que deseas actualizar
    valor = "40 A 64 AÑOS MUJERES"; // Reemplaza con el valor que deseas establecer
    actualizarValorEnBdProg(hoja, celda, valor);
}
