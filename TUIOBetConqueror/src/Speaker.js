const synth = window.speechSynthesis;


const speak = (message) => {
    synth.cancel();
    let utterThis = new SpeechSynthesisUtterance();
    utterThis.volume = 0;
    utterThis.lang = "fr-FR";
    utterThis.voice = synth.getVoices()[7];
    let boucle = message.length / 200;
    for (let i = 0; i < boucle; i++) {
        utterThis.text = message.slice(i * 200, (i + 1) * 200);
        synth.speak(utterThis);
    }
}


export default speak;
