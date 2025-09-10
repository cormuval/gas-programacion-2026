//Fecha: 16/06/2025
//Descripción: Modificar la formula que calcula cuantas visitas domiciliarias se debe realizar mensualmente
//Hoja de trabajo: AGENDA
//Filas afectadas: 102 y 103
//Formulas a modificar
//Celda B102 debe tener la siguiente formula: =SUMA('PROG 2025'!P318:P319)
//Celda B103 debe tener la siguiente formula: =SUMA('PROG 2025'!P313;'PROG 2025'!P320)
//Fila 102 desde la columna C a la Y: Reemplazar todas las apariciones de "$60" por "$48" de la formula
//Fila 103 desde la columna C a la Y: Reemplazar todas las apariciones de "$60" por "$48" de la formula

function modificacionFormulaVdAgenda() {
    let establecimientos = obtenerListaEstablecimientos();

    for (var i = 1; i < establecimientos.length; i++) {
        console.log(establecimientos[i][0]);
        let programacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        let hojaAgenda = programacion.getSheetByName("AGENDA");

        // Modificar fórmula en celda B102
        hojaAgenda.getRange("B102").setFormula("=SUM('PROG 2025'!P318:P319)");

        // Modificar fórmula en celda B103
        hojaAgenda.getRange("B103").setFormula("=SUM('PROG 2025'!P313;'PROG 2025'!P320)");

        // Modificar fórmulas en fila 102 desde columna C a Y
        // Reemplazar todas las apariciones de "$60" por "$48" en todas las celdas de la fila 102
        let rangoFila102 = hojaAgenda.getRange("C102:Y102");
        let formulasFila102 = rangoFila102.getFormulas();

        for (let col = 0; col < formulasFila102[0].length; col++) {
            if (formulasFila102[0][col] && formulasFila102[0][col].includes("$60")) {
                let nuevaFormula = formulasFila102[0][col].replaceAll("$60", "$48");
                hojaAgenda.getRange(102, col + 3).setFormula(nuevaFormula); // col + 3 porque C es la columna 3
            }
        }

        // Modificar fórmulas en fila 103 desde columna C a Y
        // Reemplazar todas las apariciones de "$60" por "$48" en todas las celdas de la fila 103
        let rangoFila103 = hojaAgenda.getRange("C103:Y103");
        let formulasFila103 = rangoFila103.getFormulas();

        for (let col = 0; col < formulasFila103[0].length; col++) {
            if (formulasFila103[0][col] && formulasFila103[0][col].includes("$60")) {
                let nuevaFormula = formulasFila103[0][col].replaceAll("$60", "$48");
                hojaAgenda.getRange(103, col + 3).setFormula(nuevaFormula); // col + 3 porque C es la columna 3
            }
        }

        console.log("Modificación realizada correctamente para " + establecimientos[i][0]);
    }

    console.log("Todas las modificaciones han sido completadas");
}
//OK
