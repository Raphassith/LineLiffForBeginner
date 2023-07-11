var ssid = '<< Spreadsheet ID >>';
function doPost(e) {
  let data = JSON.parse(e.postData.contents);
  let date = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd");
  let time = Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss");
  let userId = data.userId;
  let photo = data.photo;
  let name = data.name;
  let subject = data.subject;
  let detail = data.detail;

  SpreadsheetApp.openById(ssid).getSheetByName('request').appendRow([date, time, userId, photo, name, subject, detail]);

  let result = {
    result: true,
    msg: 'เสร็จสิ้น'
  };

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
