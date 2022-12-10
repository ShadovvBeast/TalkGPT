import './App.css'
import "babel-polyfill";
import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { debounce } from 'underscore';
const synth = window.speechSynthesis;
const voices = synth.getVoices();
function App() {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();
    const [ gptResponse, setGptResponse ] = useState('')
    const sendToChatGPT = async () => {
        // ensure the API is properly authenticated
        const resp = await (await fetch(`${import.meta.env.VITE_BACKEND_URL}/gpt/${transcript}`)).json();
        const utterThis = new SpeechSynthesisUtterance(resp.answer);
        utterThis.voice = voices[2];
        synth.speak(utterThis);
        setGptResponse(resp.answer);
    }
    const debouncedSendToChatGPT = debounce(sendToChatGPT, 3000, false);
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    useEffect(() => {
        if (!listening && transcript)
            debouncedSendToChatGPT();
    }, [listening])
  return (
    <div className="App">
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
            <p>{gptResponse}</p>
            {import.meta.env.VITE_BACKEND_URL}
        </div>
    </div>
  )
}

export default App
