// 2021, Rafael Urben

console.log("Background running!");

//

function openConverter(text, type = "text-base64") {
    browser.tabs.create({ url: "/pages/conversion.html" }).then(() => {
        console.log("Opened conversion tab!");
        browser.tabs.executeScript({
            code: "setConversion(`" + text + "`,`" + type + "`); convert();"
        });
    });
}

function openUrl(url) {
    console.log("Opening "+url);
    browser.tabs.create({ url: url });
}

function openPhotopea(fileUrl, script="") {
    data = { "files": [fileUrl], "script": script };
    data = encodeURI(JSON.stringify(data));
    url = "https://www.photopea.com#" + data;
    openUrl(url);
}

function readQR(imageUrl) {
    data = encodeURI(imageUrl);
    url = "http://api.qrserver.com/v1/read-qr-code/?fileurl=" + data;
    openUrl(url);
}

//

let converters = {
    "base64-text": "Base64 -> Text",
    "text-base64": "Text -> Base64",
    "bin-hex": "Bin -> Hex",
    "hex-bin": "Hex -> Bin",
    "bin-dec": "Bin -> Dec",
    "dec-bin": "Dec -> Bin",
    "dec-hex": "Dec -> Hex",
    "hex-dec": "Hex -> Dec"
}

//

browser.contextMenus.create({
    id: "text-open-in-converter",
    title: "Open in converter",
    contexts: ["selection"]
});

browser.contextMenus.create({
    id: "convert-separator",
    type: "separator",
    contexts: ["selection"]
});

for (c in converters) {
    browser.contextMenus.create({
        id: "convert-" + c,
        title: converters[c],
        contexts: ["selection"]
    });
}

browser.contextMenus.create({
    id: "image-open-in-photopea",
    title: "Open in Photopea",
    contexts: ["image"]
});

browser.contextMenus.create({
    id: "image-read-qr",
    title: "Read QR code",
    contexts: ["image"]
});

//

browser.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId.startsWith("convert-")) {
        openConverter(info.selectionText, info.menuItemId.replace("convert-", ""))
    } else if (info.menuItemId === "text-open-in-converter") {
        openConverter(info.selectionText);
    } else if (info.menuItemId === "image-open-in-photopea") {
        openPhotopea(info.srcUrl, "alert('Loaded document!')");
    } else if (info.menuItemId === "image-read-qr") {
        readQR(info.srcUrl);
    }
});
