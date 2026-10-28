# Prog 2027

Este directorio contiene código asociado a la administración de las planillas de la programación APS del año 2027.

## Scripts

-   **`1 - Crear programaciones.js`**: `crearProgramaciones2027()` copia la plantilla `PROGRAMACION APS_2027 V.1` para los establecimientos entre la fila 2 y la fila 50 de la hoja `Establecimientos`, mueve las copias a la carpeta de destino 2027 y guarda el link en la columna F (`LINK PROGRAMACION 2027`).
-   **`2 - Habilitar edicion.js`**: `habilitarEdicionEnCarpeta2027()` habilita el acceso de edición en los archivos de la carpeta de destino 2027.

Las funciones llevan el sufijo `2027` para no colisionar con las de otros años, ya que todos los archivos comparten el mismo espacio global en Apps Script.
