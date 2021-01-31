// 2021, Rafael Urben

// https://attacomsian.com/blog/javascript-base64-encode-decode

// MAIN

function showConversion(text, type) {
    browser.tabs.create({ url: "/pages/conversion.html" }).then(() => {
        console.log("Opened conversion tab!");
        browser.tabs.executeScript({
            code: "setConversion(`"+text+"`,`"+type+"`); convert();"
        });
    });
}

console.log("Background running!");

browser.contextMenus.create({
    id: "convert-base64-text",
    title: "Base64 -> Text",
    contexts: ["selection"]
});
browser.contextMenus.create({
    id: "convert-text-base64",
    title: "Text -> Base64",
    contexts: ["selection"]
});
browser.contextMenus.create({
    id: "convert-image-text",
    title: "Get hidden text in image",
    contexts: ["image"]
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    console.log(info);
    switch (info.menuItemId) {
        case "convert-base64-text":
            {
                showConversion(info.selectionText, "base64-text");
                break;
            }
        case "convert-text-base64":
            {
                showConversion(info.selectionText, "text-base64");
                break;
            }
        case "convert-image-text":
            {
                url = info.srcUrl;
                console.log(url);   
                break;
            };
    }
});
