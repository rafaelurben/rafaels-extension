// 2020, Rafael Urben

function nitrotype_check_session_reload() {
    console.log("[NitroType LoginHelper] - Testing for session reload button...");

    var aTags = document.getElementsByTagName("button");
    var searchText = "Yes, I'm here!";
    var found = null;

    for (var i = 0; i < aTags.length; i++) {
        if (aTags[i].textContent === searchText) {
            found = aTags[i];
            break;
        }
    }

    if (found) {
        console.log("[NitroType LoginHelper] - Button found! Clicking now!");
        found.click();
    } else {
        console.log("[NitroType LoginHelper] - No button found. Testing again in a minute...");
        setTimeout(nitrotype_check_session_reload, 60000);
    }
}

// Start

function onError(error) {
    console.log(`[NitroType LoginHelper] - Error: ${error}`);
}

function onGot(item) {
    state = item.nitrotype_activated || false;
    if (state) {
        console.log("[NitroType LoginHelper] - Enabled!");

        if (location.pathname == "/") {
            console.log("[NitroType LoginHelper] - Redirecting...");
            location.pathname = "/login";
        }

        nitrotype_check_session_reload();
    } else {
        console.log("[NitroType LoginHelper] - Disabled!");
    }
}

let getting = browser.storage.sync.get("nitrotype_activated");
getting.then(onGot, onError);