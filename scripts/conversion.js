// Rafael Urben, 2021

let forminput = document.getElementById("conversioninput");
let formoutput = document.getElementById("conversionoutput");
let formconversiontype = document.getElementById("conversiontype");
let formconvertbutton = document.getElementById("convertbutton");
let formclearbutton = document.getElementById("clearbutton");
let formoutput2inputbutton = document.getElementById("output2inputbutton");

//

function text2base64(text) {
    return btoa(text);
}

function base642text(text) {
    return atob(text);
}

//

function setConversion(text, type) {
    forminput.value = text;
    formconversiontype.value = type;
}

function setOutput(text) {
    console.log("Output: "+text);
    formoutput.value = text;
}

function convert() {
    console.log("Start conversion...");

    text = forminput.value;
    type = formconversiontype.value;
    try {
        if (type === "text-base64") {
            console.log(text);
            output = text2base64(text);
            setOutput(output);
        } else if (type === "base64-text") {
            output = base642text(text);
            setOutput(output);
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