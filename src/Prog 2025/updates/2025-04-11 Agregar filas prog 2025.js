function modificacionECICEP() {
    let establecimientos = obtenerListaEstablecimientos();

    for (var i = 1; i < establecimientos.length; i++) {
        //Crear grupo de edad 66 a mas años)
        console.log(establecimientos[i][0]);
        let progrmacion = SpreadsheetApp.openByUrl(establecimientos[i][2]);
        //let hojaECICEP = progrmacion.getSheetByName("PROG ECICEP");

        //Desprotegfer rangos
        //let  proteccionHoja = hojaAntecedentes.protect();
        //let rangoDesprotejidos = [];
        //rangoDesprotejidos.push(hojaAntecedentes.getRange("B3"));
        //rangoDesprotejidos.push(hojaAntecedentes.getRange("E50:E70"));
        //proteccionHoja.setUnprotectedRanges(rangoDesprotejidos);

        //Agregar filas en la programacion de vacuna (66 a mas años)
        let hojaECICEP = progrmacion.getSheetByName("PROG 2025");
        hojaECICEP.getRange("118:119").activate(); //Selecionado
        hojaECICEP.insertRowsAfter(hojaECICEP.getActiveRange().getLastRow(), 8); // inserta X filas
    }
    console.log("Modificacion realizada correctamente");
}
