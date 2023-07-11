var ssid = '<< ssid >>';

function saveRate(data){
  let date = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd");
  let time = Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss");
  let score = parseInt(data.queryResult.queryText);
  SpreadsheetApp.openById(ssid).getSheetByName('rate').appendRow([date, time, score]);
  let result = {
    "fulfillmentMessages": [
      {
        "platform": "line", "type": 4, "payload": {
          "line": {
            "type": "text",
            "text": "เราได้ทำการบันทึกข้อมูลเรียบร้อยแล้วค่ะ"
          }
        }
      }]
  };

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function saveRegis(data) {
  let sid = data.queryResult.parameters.id;
  let userId = data.originalDetectIntentRequest.payload.data.source.userId;
  SpreadsheetApp.openById(ssid).getSheetByName('regis').appendRow([userId, sid]);

  let result = {
    "fulfillmentMessages": [
      {
        "platform": "line", "type": 4, "payload": {
          "line": {
            "type": "text",
            "text": "เราได้ทำการลงทะเบียนเรียบร้อยแล้วค่ะ"
          }
        }
      }]
  };

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function showScore(data) {
  let userId = data.originalDetectIntentRequest.payload.data.source.userId;
  let sid = null;
  let name = 'ไม่พบข้อมูล';
  let score = '0';
  let x = SpreadsheetApp.openById(ssid).getSheetByName('regis').getDataRange().getDisplayValues().slice(1)
    .filter(row => row[0] == userId);

  if (x.length > 0) sid = x[0][1];

  let y = SpreadsheetApp.openById(ssid).getSheetByName('score').getDataRange().getDisplayValues().slice(1)
    .filter(row => row[0] == sid);

  if (y.length > 0) {
    name = y[0][1];
    score = y[0][2];
  }

  let msg = 'คุณ ' + name + '\nคะแนน ' + score;

  let result = {
    "fulfillmentMessages": [
      {
        "platform": "line", "type": 4, "payload": {
          "line": {
            "type": "text",
            "text": msg
          }
        }
      }]
  };

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let data = JSON.parse(e.postData.contents);
  let fn = parseInt(data.queryResult.parameters.fn);
  if (fn == 1) {
    return saveRate(data);
  } else if (fn == 2) {
    return saveRegis(data);
  } else if (fn == 3) {
    return showScore(data);
  }
}
