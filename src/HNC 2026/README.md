# HNC 2026

Este directorio contiene código y scripts asociados a las planillas de Google Sheets para las aplicaciones de **HNC (Horas No Clínicas)** del año 2026. Estos scripts están diseñados para automatizar tareas relacionadas con la gestión de datos, migraciones de información y actualizaciones de fórmulas en las hojas de cálculo utilizadas por el equipo motor.

## ¿Qué es HNC?

HNC se refiere a las aplicaciones y planillas de Google Sheets utilizadas para gestionar la programación y dotación de personal. Estas herramientas ayudan a organizar la información realizada con tiempos de gestión, reuniones y derechos funcionarios para el año 2026.

## Estructura del Directorio

### Carpeta `scripts/`

Esta carpeta contiene scripts principales para operaciones automatizadas en las planillas de HNC 2026. Estos scripts se ejecutan para realizar migraciones y actualizaciones iniciales.

-   **`1 - Actualizar dotaciones.js`**: Este script migra información de dotaciones entre hojas de cálculo. Específicamente, copia datos de la hoja "Horas_FUNC" a la hoja "DOTACION", traduciendo estamentos y actualizando columnas como cargo, categoría, nombre del funcionario, horas y días. Es útil para sincronizar datos de personal entre diferentes planillas. Además, este script se ejecuta cada hora para mantener la información sincronizada entre las Apps de HNC y las planillas de programación APS.  
    [Ver el código completo](scripts/1%20-%20Actualizar%20dotaciones.js)

### Carpeta `updates/`

Esta carpeta incluye actualizaciones y correcciones específicas aplicadas a las planillas de HNC 2026. Cada archivo está fechado y describe cambios realizados para mejorar la funcionalidad o corregir errores.

-   **`2025-09-10 Arreglar formula hoja graf_hrs_func.js`**: Actualiza la fórmula en la hoja "GRAF_HRSFUN" para calcular el total de horas disponibles por año, agrupando datos por estamento y cargo.  
    [Ver el código completo](updates/2025-09-10%20Arreglar%20formula%20hoja%20graf_hrs_func.js)

-   **`2025-09-16 Agregar estamentos faltantes.js`**: Agrega estamentos faltantes a la hoja de referencia "REF_CARGO". Incluye funciones para añadir categorías como Técnico en Odontología, Terapeuta Ocupacional, Agente de Medicina Indígena, entre otros.  
    [Ver el código completo](updates/2025-09-16%20Agregar%20estamentos%20faltantes.js)

-   **`2025-09-16 Arreglar formulas primer despliegue.js`**: Corrige fórmulas en varias hojas como "FUNC_AZ", "RESUMEN_HNCxTIPO" y "HNCxTIPO". Actualiza consultas para agrupar y sumar datos, como jornadas y porcentajes, asegurando cálculos precisos.  
    [Ver el código completo](updates/2025-09-16%20Arreglar%20formulas%20primer%20despliegue.js)

## Cómo Usar Estos Scripts

1. **Acceso Requerido**: Todos los scripts deben ejecutarse desde la cuenta de modernización de Google.
2. **Entorno**: Estos son scripts de Google Apps Script, que se ejecutan directamente en Google Sheets.
3. **Ejecución**: Abre el script en el editor de Apps Script de Google y ejecuta las funciones principales (como `migrarDotaciones()` o `actualizarFormulaGrafHrsFunc()`).
4. **Pruebas**: Antes de aplicar cambios en producción, prueba en una copia de las planillas.

## Notas Importantes

-   **Cuenta de Ejecución**: Todas las funciones de esta carpeta deben ejecutarse desde la cuenta de modernización para evitar problemas de permisos.
-   **Dependencias**: Algunos scripts dependen de funciones auxiliares definidas en otras partes del proyecto (como en la carpeta `utils/` del directorio principal).
-   **Actualizaciones**: Los archivos en `updates/` son correcciones puntuales; revisa las fechas para entender el contexto de cada cambio.
-   **Soporte**: Si no estás familiarizado con Google Apps Script, consulta la [documentación oficial de Google](https://developers.google.com/apps-script) para aprender más sobre cómo ejecutar y modificar estos scripts.

Si tienes preguntas o necesitas ayuda para ejecutar estos scripts, contacta al equipo de desarrollo.
