// Functions

function updateDisplay() {
    if (document.querySelector("#nitrotype_activated").checked) {
        document.querySelector("#nitrotype_activated").parentElement.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
    } else {
        document.querySelector("#nitrotype_activated").parentElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    }
}

function saveOptions() {
    options = {
        nitrotype_activated: document.querySelector("#nitrotype_activated").checked,
    };

    browser.storage.sync.set(options);
    
    console.log("[Options] - Saved!");
    updateDisplay();
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#nitrotype_activated").checked = result.nitrotype_activated || false;
        
        console.log("[Options] - Loaded!");
        updateDisplay();
    }

    function onError(error) {
        console.log(`[Options] - Error: ${error}`);
    }

    let getting = browser.storage.sync.get("nitrotype_activated");
    getting.then(setCurrentChoice, onError);
}

// Events

document.addEventListener("DOMContentLoaded", restoreOptions);

document.querySelector("#nitrotype_activated").addEventListener("change", saveOptions);