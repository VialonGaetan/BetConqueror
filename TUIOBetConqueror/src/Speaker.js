

const synth = window.speechSynthesis;


const speak = (message) => {
    let utterThis = new SpeechSynthesisUtterance();
    utterThis.text = message;
    utterThis.volume = 10;
    utterThis.lang = "fr-FR";
    console.log(synth.getVoices())
    utterThis.voice = synth.getVoices()[9];
    synth.speak(utterThis);
}


export default speak;