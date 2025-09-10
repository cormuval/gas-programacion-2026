function obtenerListaEstablecimientos() {
    let establecimientos = SpreadsheetApp.openById("1xVWBfmaSKHajoiw95Vg9Z1KJevPRm_-Ll4XIrYc3cmU").getSheetByName("Establecimientos").getDataRange().getValues();
    console.log(establecimientos);
    return establecimientos;
}
