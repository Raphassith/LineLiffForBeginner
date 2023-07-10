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

function doPost(e){
  let data = JSON.parse(e.postData.contents);
  let fn = parseInt(data.queryResult.parameters.fn);
  if(fn==1){
    return saveRate(data);
  }
}
