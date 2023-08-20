var ssid = '<< Spreadsheet ID >>';

function doPost(e) {
  let data = JSON.parse(e.postData.contents);
  let userId = data.originalDetectIntentRequest.payload.data.source.userId;
  let date = data.queryResult.parameters.date;
  let time = data.queryResult.parameters.time;
  SpreadsheetApp.openById(ssid).getSheetByName('karaoke').appendRow([userId, date, time]);
  // SpreadsheetApp.openById(ssid).getSheetByName('log').appendRow([JSON.stringify(data)]);

  let result = {
    "fulfillmentMessages": [
      {
        "platform": "line", "type": 4, "payload": {
          "line": {
            "type": "text",
            "text": "เราได้ทำการบันทึกข้อมูลการจองของคุณเรียบร้อยแล้วค่ะ"
          }
        }
      }]
  };

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}