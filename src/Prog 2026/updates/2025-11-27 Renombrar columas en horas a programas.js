function renombrarColumnasHorasAProgramar() {
    const hoja = "HORAS A PROGRAMAR"; // Reemplaza con el nombre de tu hoja
    let celda;
    let valor;

    //COLUMNA C
    celda = "C4"; // Reemplaza con la celda que deseas actualizar
    valor = "HORAS ANUALES PROGRAMACION GENERAL"; // Reemplaza con el valor que deseas establecer
    actualizarValorEnBdProg(hoja, celda, valor);
    //COLUMNA D
    celda = "D4"; // Reemplaza con la celda que deseas actualizar
    valor = "HORAS ANUALES PROGRAMACION ECICEP"; // Reemplaza con el valor que deseas establecer
    actualizarValorEnBdProg(hoja, celda, valor);
    //COLUMNA E
    celda = "E4"; // Reemplaza con la celda que deseas actualizar
    valor = "HORAS ANUALES PROGRAMACION VISITAS"; // Reemplaza con el valor que deseas establecer
    actualizarValorEnBdProg(hoja, celda, valor);
    //COLUMNA F
    celda = "F4"; // Reemplaza con la celda que deseas actualizar
    valor = "HORAS ANUALES PROGRAMACION INFANTO ADOLESCENTES"; // Reemplaza con el valor que deseas establecer
    actualizarValorEnBdProg(hoja, celda, valor);
    //COLUMNA G
    celda = "G4"; // Reemplaza con la celda que deseas actualizar
    valor = "HORAS ANUALES PROGRAMACION PROGRAMAS ALIMENTARIOS"; // Reemplaza con el valor que deseas establecer
    actualizarValorEnBdProg(hoja, celda, valor);
    //COLUMNA H
    celda = "H4"; // Reemplaza con la celda que deseas actualizar
    valor = "HORAS ANUALES PROGRAMACION ACTIVIDADES GRUPALES"; // Reemplaza con el valor que deseas establecer
    actualizarValorEnBdProg(hoja, celda, valor);
    //COLUMNA I
    celda = "I4"; // Reemplaza con la celda que deseas actualizar
    valor = "HORAS ANUALES PROGRAMACION VACUNACION"; // Reemplaza con el valor que deseas establecer
    actualizarValorEnBdProg(hoja, celda, valor);
}
