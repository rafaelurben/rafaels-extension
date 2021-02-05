// Rafael Urben, 2021

let forminput = document.getElementById("conversioninput");
let formoutput = document.getElementById("conversionoutput");
let formconversiontype = document.getElementById("conversiontype");
let formconvertbutton = document.getElementById("convertbutton");
let formclearbutton = document.getElementById("clearbutton");
let formoutput2inputbutton = document.getElementById("output2inputbutton");

let syslengths = { 2: 8, 10: 3, 16: 2};

//

function text2base64(text) { return btoa(text) }

function base642text(text) { return atob(text) }

function sysConvert(start, end, text) {
    result = "";
    for (part of text.trim().split(" ")) {
        num = parseInt(part, start).toString(end);
        result += num.padStart(syslengths[end] || 0, "0")+" ";
    }
    return result.trim();
}

//

function setConversion(text, type="text-base64") {
    forminput.value = text;
    formconversiontype.value = type;
}

function setOutput(text) {
    console.log("Output: '"+text+"'");
    formoutput.value = text;
}

function convert() {
    formoutput.value = "";
    console.log("Start conversion...");

    text = forminput.value;
    type = formconversiontype.value;

    console.log("Input: '" + text + "' - Type: " + type);
    try {
        if (type === "text-base64") {
            setOutput(text2base64(text));
        } else if (type === "base64-text") {
            setOutput(base642text(text));
        } else if (type === "bin-hex") {
            setOutput(sysConvert(2, 16, text).toUpperCase());
        } else if (type === "hex-bin") {
            setOutput(sysConvert(16, 2, text));
        } else if (type === "bin-dec") {
            setOutput(sysConvert(2, 10, text));
        } else if (type === "dec-bin") {
            setOutput(sysConvert(10, 2, text));
        } else if (type === "dec-hex") {
            setOutput(sysConvert(10, 16, text));
        } else if (type === "hex-dec") {
            setOutput(sysConvert(16, 10, text));
        }
    } catch (e) {
        alert("Conversion failed!");
    }
}

//

formconvertbutton.onclick = e => {
    e.preventDefault();
    convert();
};

formclearbutton.onclick = e => {
    e.preventDefault();
    formoutput.value = "";
    forminput.value = "";
}

formoutput2inputbutton.onclick = e => {
    e.preventDefault();
    forminput.value = formoutput.value;
    formoutput.value = "";
}