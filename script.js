const message = document.querySelector("#message")
const fileButton = document.querySelector("#file")
const img = document.querySelector("#img")
const synth = window.speechSynthesis

fileButton.addEventListener("change", event => loadFile(event))
img.addEventListener("load", () => userImageUploaded())
// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

function loadFile(event) {
    img.src = URL.createObjectURL(event.target.files[0])
}

function userImageUploaded() {
    message.innerHTML = "Image was loaded!"

    classifier.classify(img, (err, results) => {
        console.log(results);
        message.innerHTML = `I think it's a ${results[0].label}!`
    });
}

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
    message.innerHTML = "Please upload an image of any animal!"
}


function speak(text) {
    if (synth.speaking) {
        return
    }
    if (text !== "") {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}