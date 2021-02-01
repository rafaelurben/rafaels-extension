// 2021, Rafael Urben

console.log("Background running!");

//

function showConversion(text, type) {
    browser.tabs.create({ url: "/pages/conversion.html" }).then(() => {
        console.log("Opened conversion tab!");
        browser.tabs.executeScript({
            code: "setConversion(`"+text+"`,`"+type+"`); convert();"
        });
    });
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

for (c in converters) {
    browser.contextMenus.create({
        id: "convert-"+c,
        title: converters[c],
        contexts: ["selection"]
    });
}

//

browser.contextMenus.create({
    id: "convert-image-text",
    title: "Get hidden text in image",
    contexts: ["image"]
});

//

browser.contextMenus.onClicked.addListener(function (info, tab) {
    console.log(info);
    if (info.menuItemId.startsWith("convert-")) {
        showConversion(info.selectionText, info.menuItemId.replace("convert-", ""))
    } else if (info.menuItemId === "convert-image-text") {
        url = info.srcUrl;
        console.log(url);
        // TODO: Fetch url and read hidden text at the end of the file
    }
});
