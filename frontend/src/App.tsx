import './App.css'
import "babel-polyfill";
import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { debounce } from 'underscore';
const synth = window.speechSynthesis;
function App() {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();
    const [ gptResponse, setGptResponse ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const sendToChatGPT = async () => {
        setLoading(true);
        const resp = await (await fetch(`${import.meta.env.VITE_BACKEND_URL}/gpt/${transcript}`)).json();
        const utterThis = new SpeechSynthesisUtterance(resp.answer);
        utterThis.voice = synth.getVoices()[2];
        synth.speak(utterThis);
        setGptResponse(resp.answer);
        setLoading(false);
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
            <button onClick={() => SpeechRecognition.startListening()}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
            { loading ? <div className="loader">
                    <div className="inner one"></div>
                    <div className="inner two"></div>
                    <div className="inner three"></div>
                     </div>
                : '' }
            <p>{gptResponse}</p>
        </div>
    </div>
  )
}

export default App
