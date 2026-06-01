/**
 * Migra datos de programaciones del año 2024 a las programaciones 2025.
 *
 * Esta función procesa una lista de establecimientos para migración y transfiere
 * datos de antecedentes, dotación y programación del año anterior.
 */
function migrarDatos() {
    const ID_HOJA_MIGRACION = "1_mdKkbKGyw4xjC6vgKt7JxMLQDph2IEvlhEpz2KHDgE";
    const establecimienetosMigracion = obtenerListaEstablecimientos(ID_HOJA_MIGRACION, "Establecimientos Migracion");

    for (var i = 1; i < establecimienetosMigracion.length; i++) {
        if (establecimienetosMigracion[i][2] !== "No aplica") {
            let poblacion = establecimienetosMigracion[i][1];
            let origen = SpreadsheetApp.openByUrl(establecimienetosMigracion[i][2]);
            let destino = SpreadsheetApp.openByUrl(establecimienetosMigracion[i][3]);

            migracionAntecedentes(origen, destino, poblacion);
            migracionDotacion(origen, destino);
            migracionProg2024(origen, destino);
            Logger.log(establecimienetosMigracion[i][0] + " ha sido Migrado!");
        } else {
            Logger.log(establecimienetosMigracion[i][0] + " No aplica!");
        }
    }
}

// Esta función ahora se encuentra en utils/1 - Obtener establecimientos.js
// Para usar: obtenerListaEstablecimientos(spreadsheetId, "Establecimientos Migracion")

function migracionAntecedentes(origen, destino, poblacion) {
    console.log(poblacion);
    let datosOrigen;
    datosOrigen = origen.getSheetByName("ANTECEDENTES").getRange("E46:E66").getValues();
    destino.getSheetByName("ANTECEDENTES").getRange("E50:E70").setValues(datosOrigen);
    destino.getSheetByName("ANTECEDENTES").getRange("B3").setValue(poblacion);
}

function migracionDotacion(origen, destino) {
    let datosOrigen;
    datosOrigen = origen.getSheetByName("DOTACION").getRange("A3:F199").getValues();
    destino.getSheetByName("DOTACION").getRange("A3:F199").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("DOTACION").getRange("H3:K199").getValues();
    destino.getSheetByName("DOTACION").getRange("H3:K199").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("DOTACION").getRange("P3:S199").getValues();
    destino.getSheetByName("DOTACION").getRange("P3:S199").setValues(datosOrigen);
}

function migracionProg2024(origen, destino) {
    let datosOrigen;
    //Parte 1
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J2:J15").getValues();
    destino.getSheetByName("PROG 2025").getRange("J2:J15").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L2:L15").getValues();
    destino.getSheetByName("PROG 2025").getRange("L2:L15").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N2:N15").getValues();
    destino.getSheetByName("PROG 2025").getRange("N2:N15").setValues(datosOrigen);

    //Parte 2
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J17:J50").getValues();
    destino.getSheetByName("PROG 2025").getRange("J17:J50").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L17:L50").getValues();
    destino.getSheetByName("PROG 2025").getRange("L17:L50").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N17:N50").getValues();
    destino.getSheetByName("PROG 2025").getRange("N17:N50").setValues(datosOrigen);

    //Parte 3
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J62:J91").getValues();
    destino.getSheetByName("PROG 2025").getRange("J53:J82").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L62:L91").getValues();
    destino.getSheetByName("PROG 2025").getRange("L53:L82").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N62:N91").getValues();
    destino.getSheetByName("PROG 2025").getRange("N53:N82").setValues(datosOrigen);

    //Parte 4
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J93").getValues();
    destino.getSheetByName("PROG 2025").getRange("J84").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L93").getValues();
    destino.getSheetByName("PROG 2025").getRange("L84").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N93").getValues();
    destino.getSheetByName("PROG 2025").getRange("N84").setValues(datosOrigen);

    //Parte 5
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J96:J133").getValues();
    destino.getSheetByName("PROG 2025").getRange("J87:J124").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L96:L133").getValues();
    destino.getSheetByName("PROG 2025").getRange("L87:L124").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N96:N133").getValues();
    destino.getSheetByName("PROG 2025").getRange("N87:N124").setValues(datosOrigen);

    //Parte 6
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J136").getValues();
    destino.getSheetByName("PROG 2025").getRange("J126").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L136").getValues();
    destino.getSheetByName("PROG 2025").getRange("L126").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N136").getValues();
    destino.getSheetByName("PROG 2025").getRange("N126").setValues(datosOrigen);

    //Parte 7
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J137:J138").getValues();
    destino.getSheetByName("PROG 2025").getRange("J129:J130").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L137:L138").getValues();
    destino.getSheetByName("PROG 2025").getRange("L129:L130").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N137:N138").getValues();
    destino.getSheetByName("PROG 2025").getRange("N129:N130").setValues(datosOrigen);

    //Parte 8
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J140:J150").getValues();
    destino.getSheetByName("PROG 2025").getRange("J132:J142").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L140:L150").getValues();
    destino.getSheetByName("PROG 2025").getRange("L132:L142").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N140:N150").getValues();
    destino.getSheetByName("PROG 2025").getRange("N132:N142").setValues(datosOrigen);

    //Parte 9
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J152:J172").getValues();
    destino.getSheetByName("PROG 2025").getRange("J144:J164").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L152:L172").getValues();
    destino.getSheetByName("PROG 2025").getRange("L144:L164").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N152:N172").getValues();
    destino.getSheetByName("PROG 2025").getRange("N144:N164").setValues(datosOrigen);

    //Parte 10
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J173:J238").getValues();
    destino.getSheetByName("PROG 2025").getRange("J167:J232").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L173:L238").getValues();
    destino.getSheetByName("PROG 2025").getRange("L167:L232").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N173:N238").getValues();
    destino.getSheetByName("PROG 2025").getRange("N167:N232").setValues(datosOrigen);

    //Parte 11
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J240:J253").getValues();
    destino.getSheetByName("PROG 2025").getRange("J234:J247").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L240:L253").getValues();
    destino.getSheetByName("PROG 2025").getRange("L234:L247").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N240:N253").getValues();
    destino.getSheetByName("PROG 2025").getRange("N234:N247").setValues(datosOrigen);

    //Parte 12
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J255:J309").getValues();
    destino.getSheetByName("PROG 2025").getRange("J249:J303").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L255:L309").getValues();
    destino.getSheetByName("PROG 2025").getRange("L249:L303").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N255:N309").getValues();
    destino.getSheetByName("PROG 2025").getRange("N249:N303").setValues(datosOrigen);

    //Parte 13
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J312").getValues();
    destino.getSheetByName("PROG 2025").getRange("J306").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L312").getValues();
    destino.getSheetByName("PROG 2025").getRange("L306").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N312").getValues();
    destino.getSheetByName("PROG 2025").getRange("N306").setValues(datosOrigen);

    //Parte 14
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J314:J315").getValues();
    destino.getSheetByName("PROG 2025").getRange("J308:J309").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L314:L315").getValues();
    destino.getSheetByName("PROG 2025").getRange("L308:L309").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N314:N315").getValues();
    destino.getSheetByName("PROG 2025").getRange("N308:N309").setValues(datosOrigen);

    //Parte 15
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J319:J320").getValues();
    destino.getSheetByName("PROG 2025").getRange("J313:J314").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L319:L320").getValues();
    destino.getSheetByName("PROG 2025").getRange("L313:L314").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N319:N320").getValues();
    destino.getSheetByName("PROG 2025").getRange("N313:N314").setValues(datosOrigen);

    //Parte 16
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J321:J323").getValues();
    destino.getSheetByName("PROG 2025").getRange("J317:J319").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L321:L323").getValues();
    destino.getSheetByName("PROG 2025").getRange("L317:L319").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N321:N323").getValues();
    destino.getSheetByName("PROG 2025").getRange("N317:N319").setValues(datosOrigen);

    //Parte 17
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J328:J332").getValues();
    destino.getSheetByName("PROG 2025").getRange("J324:J328").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L328:L332").getValues();
    destino.getSheetByName("PROG 2025").getRange("L324:L328").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N328:N332").getValues();
    destino.getSheetByName("PROG 2025").getRange("N324:N328").setValues(datosOrigen);

    //Parte 18
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J334:J358").getValues();
    destino.getSheetByName("PROG 2025").getRange("J330:J354").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L334:L358").getValues();
    destino.getSheetByName("PROG 2025").getRange("L330:L354").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N334:N358").getValues();
    destino.getSheetByName("PROG 2025").getRange("N330:N354").setValues(datosOrigen);

    //Parte 19
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J360:J389").getValues();
    destino.getSheetByName("PROG 2025").getRange("J356:J385").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L360:L389").getValues();
    destino.getSheetByName("PROG 2025").getRange("L356:L385").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N360:N389").getValues();
    destino.getSheetByName("PROG 2025").getRange("N356:N385").setValues(datosOrigen);

    //Parte 20
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J391:J421").getValues();
    destino.getSheetByName("PROG 2025").getRange("J387:J417").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L391:L421").getValues();
    destino.getSheetByName("PROG 2025").getRange("L387:L417").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N391:N421").getValues();
    destino.getSheetByName("PROG 2025").getRange("N387:N417").setValues(datosOrigen);

    //Parte 21
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J422:J424").getValues();
    destino.getSheetByName("PROG 2025").getRange("J421:J423").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L422:L424").getValues();
    destino.getSheetByName("PROG 2025").getRange("L421:L423").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N422:N424").getValues();
    destino.getSheetByName("PROG 2025").getRange("N421:N423").setValues(datosOrigen);

    //Parte 22
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J425:J430").getValues();
    destino.getSheetByName("PROG 2025").getRange("J427:J432").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L425:L430").getValues();
    destino.getSheetByName("PROG 2025").getRange("L427:L432").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N425:N430").getValues();
    destino.getSheetByName("PROG 2025").getRange("N427:N432").setValues(datosOrigen);

    //Parte 23
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J434:J440").getValues();
    destino.getSheetByName("PROG 2025").getRange("J434:J440").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L434:L440").getValues();
    destino.getSheetByName("PROG 2025").getRange("L434:L440").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N434:N440").getValues();
    destino.getSheetByName("PROG 2025").getRange("N434:N440").setValues(datosOrigen);

    //Parte 24
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J441:J453").getValues();
    destino.getSheetByName("PROG 2025").getRange("J445:J457").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L441:L453").getValues();
    destino.getSheetByName("PROG 2025").getRange("L445:L457").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N441:N453").getValues();
    destino.getSheetByName("PROG 2025").getRange("N445:N457").setValues(datosOrigen);

    //Parte 25
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J456:J476").getValues();
    destino.getSheetByName("PROG 2025").getRange("J460:J480").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L456:L476").getValues();
    destino.getSheetByName("PROG 2025").getRange("L460:L480").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N456:N476").getValues();
    destino.getSheetByName("PROG 2025").getRange("N460:N480").setValues(datosOrigen);

    //Parte 26
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("J478:J482").getValues();
    destino.getSheetByName("PROG 2025").getRange("J482:J486").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("L478:L482").getValues();
    destino.getSheetByName("PROG 2025").getRange("L482:L486").setValues(datosOrigen);
    datosOrigen = origen.getSheetByName("PROG 2024").getRange("N478:N482").getValues();
    destino.getSheetByName("PROG 2025").getRange("N482:N486").setValues(datosOrigen);
}
