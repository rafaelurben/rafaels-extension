// 2020, Rafael Urben

// Functions

booleanfields = ["nitrotype_activated", "kahoot_activated"];
valuefields = ["kahoot_name"];
allfields = booleanfields.concat(valuefields);

function updateDisplay() {
    for (i=0; i<booleanfields.length; i++) {
        elem = document.querySelector("#" + booleanfields[i])
        if (elem.checked) {
            elem.parentElement.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
        } else {
            elem.parentElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        }
    }
}

function saveOptions() {
    options = {};
    for (i = 0; i < booleanfields.length; i++) {
        elem = document.querySelector("#" + booleanfields[i]);
        options[booleanfields[i]] = elem.checked;
    }
    for (i = 0; i < valuefields.length; i++) {
        elem = document.querySelector("#" + valuefields[i]);
        options[valuefields[i]] = elem.value;
    }

    browser.storage.sync.set(options);
    
    console.log("[Options] - Saved!", options);
    updateDisplay();
}

function restoreOptions() {
    function setCurrentChoice(result) {
        for (i = 0; i < booleanfields.length; i++) {
            elem = document.querySelector("#" + booleanfields[i]);
            elem.checked = result[booleanfields[i]] || false;
        }
        for (i = 0; i < valuefields.length; i++) {
            elem = document.querySelector("#" + valuefields[i]);
            elem.value = result[valuefields[i]] || "";
        }

        console.log("[Options] - Loaded!", result);
        updateDisplay();
    }

    function onError(error) {
        console.log(`[Options] - Error: ${error}`);
    }

    let getting = browser.storage.sync.get(allfields);
    getting.then(setCurrentChoice, onError);
}

// Events

document.addEventListener("DOMContentLoaded", restoreOptions);

for (i = 0; i < booleanfields.length; i++) {
    elem = document.querySelector("#"+booleanfields[i]);
    elem.addEventListener("change", saveOptions);
}
for (i = 0; i < valuefields.length; i++) {
    elem = document.querySelector("#" + valuefields[i]);
    elem.addEventListener("input", saveOptions);
}