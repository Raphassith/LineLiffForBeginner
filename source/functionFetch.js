function sendData(param1, param2) {
    let raw = {
        "param1": param1,
        "param2": param2
    };

    let requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(raw)
    };

    fetch("<< API URL >>", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}