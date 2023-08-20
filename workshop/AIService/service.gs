var ssid = '<< Spreadsheet ID >>';

function doPost(e) {
  let data = JSON.parse(e.postData.contents);
  let userId = data.userId;
  let displayName = data.displayName;
  let pictureUrl = data.pictureUrl;
  let subject = data.subject;
  let detail = data.detail;
  let area = data.area;
  let requseter = data.requseter;
  let phone = data.phone;
  let rawLog = data.rawLog;
  let filetype = data.filetype;

  let date = Utilities.formatDate(new Date(), "GMT+7", "MM/dd/yyyy");
  let time = Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss");
  let filename = 'img_' + Utilities.formatDate(new Date(), "GMT+7", "yyyyMMddHHmmss");

  let datafile = Utilities.base64Decode(rawLog);
  let blob2 = Utilities.newBlob(datafile, filetype, filename);
  let folder = DriveApp.getFoldersByName("img");
  let newFile = folder.next().createFile(blob2);
  let img = 'https://drive.google.com/uc?id=' + newFile.getId();

  SpreadsheetApp.openById(ssid).getSheetByName('request').appendRow([date, time, userId, displayName, pictureUrl, subject, detail, img, area, requseter, "'" + phone, "แจ้งเรื่อง", date]);

  let result = {
    'result': true,
    'msg': 'Completed'
  };
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
