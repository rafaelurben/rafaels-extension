// 2020, Rafael Urben

data = {
    tryingtoinsert: false,
    name: null,
    interval: null,
};

function kahoot_enter_name() {
    data["tryingtoinsert"] = true;
    i = document.querySelector("#nickname");
    i.value = data["name"].slice(0, -1);
    i.focus();
    b = i.nextSibling;
    console.log("[Kahoot FastJoin] - Waiting for user input...");
    i.addEventListener("input", () => {
        if (i.value === data["name"]
        ) {
            setTimeout(() => {b.click()}, 10);
            console.log("[Kahoot FastJoin] - Done!");
        } else {
            i.focus();
        }
    })
}

// Loop

function kahootLoop() {
    if (window.location.pathname === "/v2/join") {
        document.querySelector("#nickname").focus();

        if (data["name"] !== "" && !data["tryingtoinsert"]) {
            kahoot_enter_name();
        }
    } else if (window.location.pathname === "/v2/" || window.location.pathname === "/") {
        data["tryingtoinsert"] = false;
        document.querySelector("#game-input").focus();
    } else if (window.location.pathname === "/v2/instructions") {
        data["tryingtoinsert"] = false;
    }
}


// Initial setup

function onGot(item) { 
    if (item.kahoot_activated || false) {
        console.log("[Kahoot FastJoin] Enabled!");
        data["name"] = item.kahoot_name || "";
        data["interval"] = setInterval(kahootLoop, 250);
    } else {
        console.log("[Kahoot FastJoin] Disabled!");
    }
}

function onError(error) {
    console.log(`[Kahoot FastJoin] - Error: ${error}`);
}

let getting = browser.storage.sync.get(["kahoot_activated", "kahoot_name"]);
getting.then(onGot, onError);