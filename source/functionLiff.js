// https://developers.line.biz/en/reference/liff/

function sendMsg(msg) {
    liff.sendMessages([
        {
            type: "text",
            text: msg,
        },
    ])
        .then(() => {
            console.log("message sent");
            liff.closeWindow();
        })
        .catch((err) => {
            console.log("error", err);
            liff.closeWindow();
        });
}

function getLineUser() {
    liff.getProfile()
        .then((profile) => {
            userId = profile.userId;
            displayName = profile.displayName;
            pictureUrl = profile.pictureUrl;
        })
        .catch((err) => {
            console.log("error", err);
        });
}

liff.init({ liffId: "<< Liff ID >>" }, () => {
    if (liff.isLoggedIn()) getLineUser();
    else liff.login();
}, err => {
    console.error(err.code, error.message);
});

// URL: https://liff.line.me/liff-id/getparam.html?param=1
liff.init({ liffId: "<< LIFF ID >>" }, () => {
    if (!liff.isLoggedIn()) {
        let destinationUrl = window.location.href;
        liff.login({ redirectUri: destinationUrl });
    } else {
        let urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams.get('param'));
    }
});
