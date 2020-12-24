// 2020, Rafael Urben

data = {
    tryingtoinsert: false,
    name: null,
};

function kahoot_enter_name() {
    data["tryingtoinsert"] = true;
    i = document.querySelector("#nickname");
    i.value = data["name"].slice(0, -1);
    i.focus();
    b = i.nextSibling;
    console.log("[Kahoot NameEnterer] - Waiting for user input...");
    i.addEventListener("input", () => {
        if (i.value === data["name"]
        ) {
            setTimeout(() => {b.click()}, 10);
            console.log("[Kahoot NameEnterer] - Done!");
        } else {
            i.focus();
        }
    })
}

// Start

function onError(error) {
    console.log(`[Kahoot NameEnterer] - Error: ${error}`);
}

function onGot(item) {
    if (item.kahoot_activated || false) {
        document.querySelector("#nickname").focus();

        playername = item.kahoot_name || "";
        if (playername !== data["name"] || !(data["tryingtoinsert"])) {
            data["name"] = playername;
            kahoot_enter_name();
        }
    } 
}

function testUrl() {
    if (window.location.pathname === "/v2/join") {
        let getting = browser.storage.sync.get(["kahoot_activated", "kahoot_name"]);
        getting.then(onGot, onError);
    } else if (window.location.pathname === "/v2/") {
        document.querySelector("#game-input").focus();
    }
}

data["interval"] = setInterval(testUrl, 250);