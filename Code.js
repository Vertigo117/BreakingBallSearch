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

function selectedValueChangedHandler(sheetName) {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    let range = sheet.getRange('B4:B');
    let values = range.getValues();
    let ctaTitles = new Array();

    for (let row in values) {
        for (let col in values[row]) {
          let value = values[row][col];

          if(value) {
            ctaTitles.push(value);
          }
        }
    }

    return ctaTitles;
}

function generateBtn_clickHandler() {
    let ui = SpreadsheetApp.getUi();
    ui.alert('Generated Link', 'www.testlink.com', )
}