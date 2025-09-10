# Funciones Utilitarias - Gas Programación 2026

Este documento describe las funciones utilitarias disponibles en la carpeta `utils` y cómo utilizarlas correctamente.

## Estructura de Utils

### 1. Obtener establecimientos.js

**Función principal:** `obtenerListaEstablecimientos(spreadsheetId, sheetName)`

**Propósito:** Obtiene la lista de establecimientos desde una hoja de cálculo específica.

**Parámetros:**

-   `spreadsheetId` (string): El ID de la hoja de cálculo que contiene los establecimientos
-   `sheetName` (string, opcional): El nombre de la hoja dentro del spreadsheet (por defecto "Establecimientos")

**Ejemplo de uso:**

```javascript
// Para obtener establecimientos de la hoja principal
const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

// Para obtener de una hoja específica
let establecimientosMigracion = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS, "Establecimientos Migracion");
```

### 2. Controlar acceso.js

**Funciones disponibles:**

#### `habilitarAccesoVisualizar(folderId, excludeFiles)`

-   **Propósito:** Configura archivos para acceso de solo lectura
-   **Parámetros:**
    -   `folderId` (string): ID de la carpeta de Google Drive
    -   `excludeFiles` (array, opcional): Nombres de archivos a excluir

#### `habilitarAccesoEditar(folderId, excludeFiles)`

-   **Propósito:** Configura archivos para acceso de edición
-   **Parámetros:** Igual que la función anterior

#### `eliminarEditoresDeArchivo(spreadsheetId)`

-   **Propósito:** Elimina todos los editores excepto el propietario de un archivo específico

#### `eliminarEditoresDeEstablecimientos(spreadsheetId, sheetName, urlColumnIndex)`

-   **Propósito:** Elimina editores de múltiples archivos basándose en una lista de establecimientos

**Ejemplo de uso:**

```javascript
// Habilitar acceso de visualización a una carpeta
const CARPETA_ID = "1PuaxSbRWVsz6_eBsCCLldzd3gbhZ3TJn";
habilitarAccesoVisualizar(CARPETA_ID);

// Excluir archivos específicos
habilitarAccesoVisualizar(CARPETA_ID, ["CECOSF LAGUNA VERDE"]);

// Eliminar editores de establecimientos
const ID_HOJA = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
eliminarEditoresDeEstablecimientos(ID_HOJA, "Establecimientos", 2);
```

### 3. Obtener ids de archivos.js

**Funciones disponibles:**

#### `obtenerIdsDeArchivos(folderId, filterType)`

-   **Propósito:** Obtiene información de todos los archivos en una carpeta
-   **Parámetros:**
    -   `folderId` (string): ID de la carpeta
    -   `filterType` (string, opcional): Tipo MIME para filtrar archivos

#### `obtenerInfoArchivo(fileId)`

-   **Propósito:** Obtiene información detallada de un archivo específico

#### `buscarArchivosPorNombre(folderId, searchText, exactMatch)`

-   **Propósito:** Busca archivos por nombre en una carpeta

**Ejemplo de uso:**

```javascript
// Obtener todos los archivos de una carpeta
const CARPETA_ID = "13pD9PeY7_WWNPeLshv251MlhTFENCZjf";
let archivos = obtenerIdsDeArchivos(CARPETA_ID);

// Filtrar solo hojas de cálculo
let hojas = obtenerIdsDeArchivos(CARPETA_ID, "application/vnd.google-apps.spreadsheet");

// Buscar archivos específicos
let archivosBuscados = buscarArchivosPorNombre(CARPETA_ID, "PROG APS", false);
```

### 4. Operaciones hojas.js

**Funciones disponibles:**

#### `copiarDatosRango(origen, destino, nombreHojaOrigen, nombreHojaDestino, rangoOrigen, rangoDestino)`

-   **Propósito:** Copia valores de un rango a otro

#### `copiarFormulasRango(origen, destino, nombreHojaOrigen, nombreHojaDestino, rangoOrigen, rangoDestino)`

-   **Propósito:** Copia fórmulas de un rango a otro

#### `actualizarFormulaMasiva(urlsArchivos, nombreHoja, celda, nuevaFormula)`

-   **Propósito:** Actualiza una fórmula en múltiples archivos

#### `establecerValorMasivo(urlsArchivos, nombreHoja, celda, valor)`

-   **Propósito:** Establece un valor en múltiples archivos

**Ejemplo de uso:**

```javascript
// Copiar datos entre archivos
let origen = SpreadsheetApp.openById("ID_ORIGEN");
let destino = SpreadsheetApp.openById("ID_DESTINO");
copiarDatosRango(origen, destino, "HOJA1", "HOJA2", "A1:C10", "A1:C10");

// Actualizar fórmula en múltiples archivos
let urls = ["url1", "url2", "url3"];
actualizarFormulaMasiva(urls, "PROG 2025", "A1", "=SUM(B1:B10)");
```

## Buenas Prácticas

### 1. Manejo de Errores

Todas las funciones incluyen manejo de errores con try-catch. Siempre revisa los logs para identificar problemas.

### 2. IDs de Archivos y Carpetas

Define los IDs como constantes al inicio de tus funciones:

```javascript
function miFuncion() {
    const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";
    const ID_CARPETA_DESTINO = "17k4F8-48Dciwfwo87OybhUN_fU43Wxyf";

    // resto del código...
}
```

### 3. Documentación

Todas las funciones están documentadas con JSDoc. Incluye siempre:

-   Descripción del propósito
-   Parámetros con tipos y descripciones
-   Valor de retorno
-   Ejemplo de uso si es complejo

### 4. Reutilización

Antes de crear una nueva función, verifica si ya existe una función utilitaria que puedas usar o extender.

## Migración de Código Existente

### Funciones Deprecadas

Las siguientes funciones ya no deben usarse directamente en los archivos de `src`:

-   `obtenerListaEstablecimientos()` sin parámetros
-   `obtenerListaEstablecimientosMigracion()`
-   Funciones de copia de datos específicas

### Pasos para Migrar

1. Identifica las funciones hardcodeadas en tu archivo
2. Reemplaza por las funciones de utils correspondientes
3. Pasa los IDs como parámetros en lugar de hardcodearlos
4. Agrega documentación JSDoc a tus funciones principales
5. Prueba la funcionalidad

## IDs de Referencia

### Proyectos 2025

-   Hoja de establecimientos: `1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE`
-   Carpeta de archivos: `1PuaxSbRWVsz6_eBsCCLldzd3gbhZ3TJn`

### Proyectos 2026

-   Hoja de establecimientos: `1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU`
-   Carpeta de archivos: `17k4F8-48Dciwfwo87OybhUN_fU43Wxyf`

## Soporte

Si encuentras problemas o necesitas nuevas funciones utilitarias, revisa primero si pueden implementarse como extensiones de las funciones existentes antes de crear código duplicado.
