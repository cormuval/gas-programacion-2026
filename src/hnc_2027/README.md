# HNC 2027

Este directorio contiene código y scripts asociados a las planillas de **HNC (Horas No Clínicas)** del año 2027.

## Scripts

-   **`1 - Actualizar dotaciones.js`**: basado en la v3 de HNC 2026. `migrarDotaciones2027()` lee la hoja `CONSO_HNC_HC` del consolidado HNC 2027 y escribe en la pestaña `DOTACION` de cada programación 2027 (link en la columna F de `Establecimientos`, filas 2 a 50). `validarConsolidadoHNC2027()` es una prueba en seco que solo muestra en el log lo que se migraría.

Requiere que las programaciones 2027 ya estén creadas con `crearProgramaciones2027()`.
