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
    id: "base64-text",
    title: "Base64 -> Text",
    contexts: ["selection"]
});
browser.contextMenus.create({
    id: "text-base64",
    title: "Text -> Base64",
    contexts: ["selection"]
});
browser.contextMenus.create({
    id: "image-text",
    title: "Get hidden text in image",
    contexts: ["image"]
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    console.log(info);
    switch (info.menuItemId) {
        case "base64-text":
            {
                showConversion(info.selectionText, "base64-text");
                // try {
                //     newtext = atob(info.selectionText);
                //     console.log(info.selectionText, " -> ", newtext);
                //     navigator.clipboard.writeText(newtext);
                //     browser.tabs.executeScript({
                //         code: "alert(`" + newtext + "`);"
                //     });
                // } catch (e) {
                //     console.log(e);
                //     browser.tabs.executeScript({
                //         code: `alert("Failed to decode base64!");`
                //     });
                // }
                break;
            }
        case "text-base64":
            {
                showConversion(info.selectionText, "text-base64");
                // try {
                //     newtext = btoa(info.selectionText);
                //     console.log(info.selectionText, " -> ", newtext);
                //     navigator.clipboard.writeText(newtext);
                //     browser.tabs.executeScript({
                //         code: "alert(`" + newtext + "`);"
                //     });
                // } catch (e) {
                //     console.log(e);
                //     browser.tabs.executeScript({
                //         code: `alert("Failed to encode base64!");`
                //     });
                // }
                break;
            }
        case "image-text":
            {
                url = info.srcUrl;
                console.log(url);   
                break;
            };
    }
});
