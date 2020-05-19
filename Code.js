function onOpen() {
    let ui = SpreadsheetApp.getUi();

    ui.createMenu('Custom Menu').addItem('Generate Link', 'showSidebar').addToUi();
}

function showSidebar() {
    let html = HtmlService.createHtmlOutputFromFile('Menu')
      .setHeight(600)
      .setWidth(300);

    SpreadsheetApp.getUi().showModalDialog(html, 'Generate Link');
}