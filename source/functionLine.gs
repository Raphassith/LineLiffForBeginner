// https://developers.line.biz/en/reference/messaging-api/

function pushMessage() {
  let url = "https://api.line.me/v2/bot/message/push";

  let lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer << Your Channel Access Token >>"
  };

  let postData = {
    "to": "<< UserId >>",
    "messages": [
      {
        "type": "text",
        "text": "Hello World 1"
      },
      {
        "type": "text",
        "text": "Hello World 2"
      }
    ]
  };

  let options = {
    "method": "POST",
    "headers": lineHeader,
    "payload": JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);
}

function replyMessage(e) {
  let requestJSON = e.postData.contents;
  Logger.log(requestJSON);

  let requestObj = JSON.parse(requestJSON).events[0];
  let userMessage = requestObj.message.text;
  Logger.log(userMessage);

  let replytoken = requestObj.replyToken;
  let replyText = userMessage;

  var url = "https://api.line.me/v2/bot/message/reply";
  var lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer << Your Channel Access Token >>"
  };

  var postData = {
    "replyToken": replytoken,
    "messages": [
      {
        "type": "text",
        "text": userMessage
      }
    ]
  };

  var options = {
    "method": "POST",
    "headers": lineHeader,
    "payload": JSON.stringify(postData)
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
  } catch (error) {
    Logger.log(error.name + ": " + error.message);
    return;
  }

  if (response.getResponseCode() === 200) {
    Logger.log("Sending message completed.");
  }
}

function replyDialogflow(e) {
  let data = JSON.parse(e.postData.contents);
  Logger.log(JSON.stringify(data));
  let queryText = data.queryResult.queryText;
  let parameter1 = data.queryResult.parameter1;
  let parameter2 = data.queryResult.parameter2;
  let userMsg = data.originalDetectIntentRequest.payload.data.message.text;
  let userId = data.originalDetectIntentRequest.payload.data.source.userId;

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

function getUserProfiles(userId) {
  let url = "https://api.line.me/v2/bot/profile/" + userId;
  let lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer << Your Channel Access Token >>" //แก้ไข
  };

  let options = {
    "method": "GET",
    "headers": lineHeader
  };

  let responseJson = UrlFetchApp.fetch(url, options);
  let displayName = JSON.parse(responseJson).displayName;
  let pictureUrl = JSON.parse(responseJson).pictureUrl;

  return [displayName, pictureUrl];
}

function lineNotify(msg, img) {
  let token = "<< LINE NOTIFY TOKEN >>";

  let formData = {
    'message': msg,
    'imageThumbnail': img,
    'imageFullsize': img
  };

  let options = {
    "method": "post",
    "payload": formData,
    "headers": { "Authorization": "Bearer " + token }
  }

  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}