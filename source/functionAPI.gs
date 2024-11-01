// https://developers.google.com/apps-script/

function doPost(e) {
  let data = JSON.parse(e.postData.contents);
  let param1 = data.param1;
  let param2 = data.param2;
  let date = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd");
  let time = Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss");
  Logger.log(JSON.stringify(data));
  SpreadsheetApp.openById('<< ssid >>').getSheetByName('<< sheet name >>').appendRow([date, time, param1, param2]);
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  let param1 = e.parameter.param1;
  let param2 = e.parameter.param2;
  let date = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd");
  let time = Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss");
  let data = {
    "date": date,
    "time": time,
    "param1": param1,
    "param2": param2
  }
  Logger.log(JSON.stringify(data));
  SpreadsheetApp.openById('<< ssid >>').getSheetByName('<< sheet name >>').appendRow([date, time, param1, param2]);
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function filterData(search) {
  return SpreadsheetApp.openById('<< ssid >>').getSheetByName('<< sheet name >>').getDataRange()
    .getDisplayValues().slice(1)
    .filter(row => row[0] == search)
    .map(row => { return { 'id': row[0], 'subject': row[1], 'status': row[3] } });
}

function setDate(date, time) {
  // date format yyyy-MM-dd (2023-01-01)
  // itme format HH:mm:ss (15:05:20)
  let setdate = new Date(date + ' ' + time); // (2023-01-01 15:05:20)
  let tomorrow = Utilities.formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000), "GMT+7", "yyyy-MM-dd");
  let yesterday = Utilities.formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000), "GMT+7", "yyyy-MM-dd");
}

function dateDif(stdate, endate) {
  let sttime = new Date(stdate).getTime(); // (yyyy-MM-dd HH:mm:ss)
  let entime = new Date(endate).getTime(); // (yyyy-MM-dd HH:mm:ss)
  let days = parseInt((entime - sttime) / (24 * 60 * 60 * 1000));
  return days;
}

function fileUpload(rawLog, type, filename) {
  let datafile = Utilities.base64Decode(rawLog);
  let blob2 = Utilities.newBlob(datafile, type, filename);
  let folder = DriveApp.getFoldersByName("<< folder name >>");
  let newFile = folder.next().createFile(blob2);
  let fileUrl = 'https://lh3.googleusercontent.com/d/=' + newFile.getId();
  // let fileUrl = 'https://drive.usercontent.google.com/download?id=' + newFile.getId();
  return fileUrl;
}

function addData(id, subject, status) {
  let data = {
    "id": id,
    "subject": subject,
    "status": status
  }
  Logger.log(JSON.stringify(data));
  SpreadsheetApp.openById('<< ssid >>').getSheetByName('<< sheet name >>').appendRow([id, subject, status]);
}
