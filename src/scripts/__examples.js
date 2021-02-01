// Open new tab and execute script

browser.tabs.create({ url: "/pages/result.html" }).then(() => {
    browser.tabs.executeScript({
        code: `console.log('location:', window.location.href);`
    });
});

// Add Script to page

var script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@10";
document.head.appendChild(script);