// 2020, Rafael Urben

function nitrotype_check_session_reload() {
    console.log("[NitroType SessionSaver] - Testing for session reload button...");

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
        console.log("[NitroType SessionSaver] - Button found! Clicking now!");
        found.click();
    } else {
        console.log("[NitroType SessionSaver] - No button found. Testing again in a minute...");
        setTimeout(nitrotype_check_session_reload, 60000);
    }
}

// Start

function onError(error) {
    console.log(`[NitroType SessionSaver] - Error: ${error}`);
}

function onGot(item) {
    state = item.nitrotype_activated || false;
    if (state) {
        console.log("[NitroType SessionSaver] - Activated!");
        nitrotype_check_session_reload();
    } else {
        console.log("[NitroType SessionSaver] - NOT Activated!");
    }
}

let getting = browser.storage.sync.get("nitrotype_activated");
getting.then(onGot, onError);