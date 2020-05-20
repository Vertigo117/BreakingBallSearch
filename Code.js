function onOpen() {
    let ui = SpreadsheetApp.getUi();

    ui.createMenu('Custom Menu').addItem('Generate Link', 'showMenu').addToUi();
}

function showMenu() {
    let html = HtmlService.createTemplateFromFile('Menu').evaluate().setWidth(300).setHeight(600);

    SpreadsheetApp.getUi().showModalDialog(html, 'Generate Link');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getSheets() {
    let sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets().map((sheet) => sheet.getName());

    return sheets;
}