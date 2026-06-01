# Actualización de Dotaciones desde Consolidado Único HNC 2026 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modify the update script to extract personal clinical hours from a single consolidated Google Sheet, filter the rows by establishment, clean the destination sheet, and paste the specific columns using ultra-high-performance batch writing in Google Apps Script.

**Architecture:** Open the consolidated sheet once outside the loop. In the loop, filter rows dynamically per center, translate cargo/estamento, wipe previous data in the target sheet (A3:X) to avoid stale data, and batch write using `setValues()` in two contiguous blocks (A-G and V) to optimize Google Apps Script API calls.

**Tech Stack:** JavaScript (ES6+), Google Apps Script API.

---

### Task 1: Definir Constantes e Implementar Extracción Única del Consolidado
**Files:**
- Modify: `src/hnc_2026/scripts/2 - Actualizar dotaciones v3.js`

- [ ] **Step 1: Modificar la cabecera e implementar la extracción inicial**
  Reemplazar la función principal `migrarDotaciones` para definir las constantes del consolidado de origen y abrir la hoja una única vez antes del bucle de establecimientos.

  ```javascript
  function migrarDotaciones() {
      // 1. Constantes del consolidado de origen
      const ID_ORIGEN_CONSOLIDADOR = "1Yc4t7SmTrXuffMsnr5le1a_V7uoBKmVMnw4WWgzv3Cs";
      const NOMBRE_HOJA_ORIGEN = "CONSO_HNC_HC";
      const ID_HOJA_ESTABLECIMIENTOS = "1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU";

      // 2. Extraer datos del consolidado de origen (una sola vez)
      let origenSpreadsheet = SpreadsheetApp.openById(ID_ORIGEN_CONSOLIDADOR);
      let origenSheet = origenSpreadsheet.getSheetByName(NOMBRE_HOJA_ORIGEN);
      if (!origenSheet) {
          throw new Error("No se pudo encontrar la hoja " + NOMBRE_HOJA_ORIGEN + " en el consolidado de origen.");
      }

      let allData = origenSheet.getDataRange().getValues();
      // La fila de encabezados es la 4 (índice 3), por ende los datos reales inician en la fila 5 (índice 4)
      let dataRows = allData.slice(4);
      console.log("Se cargaron " + dataRows.length + " filas del consolidado HNC.");

      // 3. Obtener lista de establecimientos de destino
      let establecimientos = obtenerListaEstablecimientos(ID_HOJA_ESTABLECIMIENTOS);

      for (var i = 1; i < establecimientos.length; i++) {
          let nombreEstablecimiento = establecimientos[i][0];
          let programacionUrl = establecimientos[i][3]; // URL del sheet de destino (programacion)
          
          if (!programacionUrl) {
              console.warn("El establecimiento " + nombreEstablecimiento + " no tiene configurada una URL de destino.");
              continue;
          }

          try {
              let programacion = SpreadsheetApp.openByUrl(programacionUrl);
              migrarInformacionDotacionConsolidada(nombreEstablecimiento, dataRows, programacion);
              Logger.log(nombreEstablecimiento + " ha sido Migrado con éxito!");
          } catch (e) {
              console.error("Error al migrar el establecimiento " + nombreEstablecimiento + ": " + e.message);
          }
      }
  }
  ```

- [ ] **Step 2: Verificar la sintaxis localmente**
  Comprobar que no existan llaves sin cerrar en el código modificado y que Clasp reconozca la estructura de la función.

---

### Task 2: Implementar la Función de Migración y Mapeo de Datos
**Files:**
- Modify: `src/hnc_2026/scripts/2 - Actualizar dotaciones v3.js`

- [ ] **Step 1: Reemplazar/Agregar la función de migración consolidada**
  Agregar la nueva función `migrarInformacionDotacionConsolidada(nombreEstablecimiento, dataRows, destino)` que realiza el filtrado por establecimiento, traduce los estamentos/cargos, limpia la pestaña `DOTACION` y escribe los bloques masivamente.

  ```javascript
  function migrarInformacionDotacionConsolidada(nombreEstablecimiento, dataRows, destino) {
      let sheetDestino = destino.getSheetByName("DOTACION");
      if (!sheetDestino) {
          throw new Error("No se encontró la pestaña 'DOTACION' en el archivo de destino.");
      }

      // 1. Filtrar registros del consolidado correspondientes a este centro
      let rowsFiltradas = dataRows.filter(row => {
          let estValue = row[2]; // Columna ESTABLECIMIENTO (índice 2)
          return estValue && estValue.toString().trim().toUpperCase() === nombreEstablecimiento.toString().trim().toUpperCase();
      });

      // 2. Limpieza total de los registros anteriores en la pestaña DOTACION (columnas A a X, desde fila 3)
      let lastRow = sheetDestino.getLastRow();
      if (lastRow >= 3) {
          sheetDestino.getRange(3, 1, lastRow - 2, 24).clearContent();
      }

      let numRows = rowsFiltradas.length;
      if (numRows === 0) {
          console.log("No se encontraron registros de dotación para: " + nombreEstablecimiento);
          return;
      }

      // 3. Mapear y preparar datos por bloques
      let datosA_G = [];
      let datosV = [];
      let traduccion = traduccionEstamentos();

      for (let r = 0; r < numRows; r++) {
          let sourceRow = rowsFiltradas[r];
          let cargoOriginal = sourceRow[4]; // Columna CARGO (índice 4)
          let cargoTraducido = traduccion[cargoOriginal] ? traduccion[cargoOriginal] : cargoOriginal;

          // Bloque A-G: ESTAMENTO, CARGO, CAT, CALIDAD, NOMBRE FUNCIONARIO/A, HORAS FUNC, DIAS PROGRAMACION
          datosA_G.push([
              cargoTraducido,           // ESTAMENTO (Col A)
              cargoTraducido,           // CARGO (Col B)
              sourceRow[3],             // CAT (Col C - CATEGORIA)
              "DOTACION",               // CALIDAD (Col D - Valor Fijo)
              sourceRow[6],             // NOMBRE FUNCIONARIO/A (Col E - FUNCIONARIO)
              sourceRow[5],             // HORAS FUNC (Col F - JORNADA)
              248                       // DIAS PROGRAMACION (Col G - Valor Fijo)
          ]);

          // Bloque V: TOTAL HORAS CLINICAS AL AÑO
          datosV.push([
              sourceRow[16]             // TOTAL HORAS CLINICAS AL AÑO (Col V - HORAS CLINICAS año)
          ]);
      }

      // 4. Escritura masiva de alto rendimiento
      sheetDestino.getRange(3, 1, numRows, 7).setValues(datosA_G);
      sheetDestino.getRange(3, 22, numRows, 1).setValues(datosV);
      console.log("Migradas exitosamente " + numRows + " filas de dotación para " + nombreEstablecimiento);
  }
  ```

- [ ] **Step 2: Eliminar la función obsoleta `migrarInformacionDotacion`**
  Eliminar la función `migrarInformacionDotacion(origen, destino)` antigua para evitar código duplicado y confusiones.

---

### Task 3: Agregar Función Auxiliar de Validación y Depuración
**Files:**
- Modify: `src/hnc_2026/scripts/2 - Actualizar dotaciones v3.js`

- [ ] **Step 1: Agregar función de prueba en seco**
  Implementar la función `validarConsolidadoHNC` que permite simular la carga de datos del consolidado y el filtrado para dos centros de prueba (`CECOSF CERRO ALEGRE` y `CECOSF ISLA NEGRA`) sin escribir en ningún archivo de destino real. Esto permite validar el direccionamiento de las columnas del consolidado en un entorno de desarrollo.

  ```javascript
  function validarConsolidadoHNC() {
      const ID_ORIGEN_CONSOLIDADOR = "1Yc4t7SmTrXuffMsnr5le1a_V7uoBKmVMnw4WWgzv3Cs";
      const NOMBRE_HOJA_ORIGEN = "CONSO_HNC_HC";
      
      let origenSpreadsheet = SpreadsheetApp.openById(ID_ORIGEN_CONSOLIDADOR);
      let origenSheet = origenSpreadsheet.getSheetByName(NOMBRE_HOJA_ORIGEN);
      if (!origenSheet) {
          console.error("No se pudo encontrar la hoja " + NOMBRE_HOJA_ORIGEN);
          return;
      }
      
      let allData = origenSheet.getDataRange().getValues();
      let dataRows = allData.slice(4);
      console.log("--- PRUEBA EN SECO CONSOLIDADO HNC ---");
      console.log("Total filas de datos leídas: " + dataRows.length);

      // Probar con un establecimiento muestra
      const centrosMuestra = ["CECOSF CERRO ALEGRE", "CECOSF ISLA NEGRA"];
      
      centrosMuestra.forEach(centro => {
          let rowsFiltradas = dataRows.filter(row => {
              let estValue = row[2];
              return estValue && estValue.toString().trim().toUpperCase() === centro.toString().trim().toUpperCase();
          });
          
          console.log("\nEstablecimiento: " + centro);
          console.log("Registros encontrados: " + rowsFiltradas.length);
          
          if (rowsFiltradas.length > 0) {
              console.log("Primer registro de muestra:");
              let r = rowsFiltradas[0];
              console.log(" - ID: " + r[0]);
              console.log(" - Establecimiento: " + r[2]);
              console.log(" - Categoría (Copia a CAT Col C): " + r[3]);
              console.log(" - Cargo (Copia a ESTAMENTO/CARGO Col A/B): " + r[4]);
              console.log(" - Jornada (Copia a HORAS FUNC Col F): " + r[5]);
              console.log(" - Funcionario (Copia a NOMBRE Col E): " + r[6]);
              console.log(" - Horas Clínicas Año (Copia a TOTAL HORAS CLINICAS AL AÑO Col V): " + r[16]);
          }
      });
      console.log("\n--- FIN DE PRUEBA EN SECO ---");
  }
  ```

---

### Task 4: Revisión General y Plan de Cierre
**Files:**
- Modify: `src/hnc_2026/scripts/2 - Actualizar dotaciones v3.js`

- [ ] **Step 1: Realizar verificación sintáctica completa**
  Revisar que no queden rastros de código inacabado, comentarios rotos o variables no definidas.
- [ ] **Step 2: Commitear los cambios locales**
  Hacer git commit de los cambios realizados en el proyecto.
  ```bash
  git add "src/hnc_2026/scripts/2 - Actualizar dotaciones v3.js"
  git commit -m "feat: migrar dotaciones desde consolidador único HNC con Enfoque 1"
  ```
