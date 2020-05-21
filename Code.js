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
    let sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets().map(sheet => sheet.getName());

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

function generateBtn_clickHandler(ctaTitles, sheetName) {
    let link = generateLink(ctaTitles, sheetName);
    displayLink(link);
}

function displayLink(link) {
    let template = HtmlService.createTemplateFromFile('ModalDialog');
    template.textAreaValue = link;
    let html = template.evaluate().setWidth(600).setHeight(200);
    SpreadsheetApp.getUi().showModalDialog(html, 'Generated Link');
}

function generateLink(ctaTitles, sheetName) {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    let promotedArticle = sheet.getRange(1, 2).getValues()[0][0];
    let campaignLink = sheet.getRange(2, 2).getValues()[0][0];

    let link = `${promotedArticle}?cta_titles=${ctaTitles.join(';')}&cta_link=${campaignLink}&cta_fb_pixel=pixel_example`;

    return link;
}