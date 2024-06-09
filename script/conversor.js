
let textarea = document.getElementById('textarea');
let voices = document.getElementById('voices');
let button = document.getElementById('button');
let selectedVoice = 0;
const readButton = document.getElementById('button');
let playButton = document.getElementById('playButton');
let pauseButton = document.getElementById('pauseButton');
let resumeButton = document.getElementById('resumeButton');
let resetButton = document.getElementById('resetButton');
let generalResetButton = document.getElementById('generalResetButton');
let prevButton = document.getElementById('prevButton');
let nextButton = document.getElementById('nextButton');
let output = document.getElementById('output');
let rate = document.getElementById('rate');
let utterance = new SpeechSynthesisUtterance();
let paragraphs = [];
let currentParagraphIndex = 0;

window.speechSynthesis.addEventListener('voiceschanged', () => {
    let voicesList = window.speechSynthesis.getVoices();
    voices.innerHTML = ''; // Limpar as opções anteriores
    for (let i in voicesList) {
        let optionEl = document.createElement('option');
        optionEl.setAttribute('value', i);
        optionEl.innerText = voicesList[i].name;
        voices.appendChild(optionEl);
    }
});

button.addEventListener('click', () => {
    startSpeaking();
});

playButton.addEventListener('click', () => {
    startSpeaking();
});

pauseButton.addEventListener('click', () => {
    window.speechSynthesis.pause();
});

resumeButton.addEventListener('click', () => {
    window.speechSynthesis.resume();
});

resetButton.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    updateStatus();
    clearHighlights();
});

prevButton.addEventListener('click', () => {
    if (currentParagraphIndex > 0) {
        currentParagraphIndex--;
        highlightParagraph(currentParagraphIndex);
        window.speechSynthesis.cancel();
        startSpeaking(); // Restart speaking from the previous paragraph
    }
});

nextButton.addEventListener('click', () => {
    if (currentParagraphIndex < paragraphs.length - 1) {
        currentParagraphIndex++;
        highlightParagraph(currentParagraphIndex);
        window.speechSynthesis.cancel();
        startSpeaking(); // Restart speaking from the next paragraph
    }
});

voices.addEventListener('change', () => {
    selectedVoice = parseInt(voices.value);
});

rate.addEventListener('change', () => {
    utterance.rate = parseFloat(rate.value);
});

utterance.onend = () => {
    if (currentParagraphIndex < paragraphs.length - 1) {
        currentParagraphIndex++;
        highlightParagraph(currentParagraphIndex);
        startSpeaking(); // Continue speaking the next paragraph
    } else {
        updateStatus();
    }
};

function startSpeaking() {
    if (paragraphs.length === 0) {
        clearHighlights();
        paragraphs = textarea.value.replace(/\n/g, ' ').split('. ').map(p => p.replace(/^\s*\d+[\.\)\-]?\s*/, ''));
        currentParagraphIndex = 0;
        renderParagraphs();
    }
    if (paragraphs[currentParagraphIndex]) {
        let voicesList = window.speechSynthesis.getVoices();
        utterance.text = paragraphs[currentParagraphIndex];
        utterance.voice = voicesList[selectedVoice];
        utterance.rate = parseFloat(rate.value); // Set the speech rate
        highlightParagraph(currentParagraphIndex);
        window.speechSynthesis.speak(utterance);
        updateStatus();
    }
}



function renderParagraphs() {
    output.innerHTML = '';
    paragraphs.forEach((p, index) => {
        let pEl = document.createElement('p');
        pEl.innerText = p;
        pEl.style.marginBottom = '10px'; // Adiciona margem inferior para separar os parágrafos
        pEl.style.lineHeight = '1.6'; // Define a altura da linha para melhorar a legibilidade
        output.appendChild(pEl);
    });
}


function highlightParagraph(index) {
    let pElements = output.getElementsByTagName('p');
    for (let i = 0; i < pElements.length; i++) {
        pElements[i].classList.remove('highlight');
    }
    pElements[index].classList.add('highlight');
}

function clearHighlights() {
    let pElements = output.getElementsByTagName('p');
    for (let i = 0; i < pElements.length; i++) {
        pElements[i].classList.remove('highlight');
    }
}

function updateStatus() {
    if (window.speechSynthesis.speaking) {
        voices.setAttribute('disabled', 'disabled');
        button.setAttribute('disabled', 'disabled');
        playButton.setAttribute('disabled', 'disabled');
        pauseButton.removeAttribute('disabled');
        resumeButton.removeAttribute('disabled');
        prevButton.removeAttribute('disabled');
        nextButton.removeAttribute('disabled');
    } else {
        voices.removeAttribute('disabled');
        button.removeAttribute('disabled');
        playButton.removeAttribute('disabled');
        pauseButton.setAttribute('disabled', 'disabled');
        resumeButton.setAttribute('disabled', 'disabled');
        prevButton.removeAttribute('disabled');
        nextButton.removeAttribute('disabled');
    }
}

// Função para reiniciar os campos
function resetFields() {
    textarea.value = '';
    output.innerHTML = ''; // Limpa todos os parágrafos dentro do output
    rateSelect.value = '1.0'; // Resetando a velocidade para o valor padrão
    // Para o select de vozes, você pode adicionar lógica adicional se necessário

}

// Função para reiniciar todos os campos, incluindo a seleção de voz
function resetAllFields() {
    resetFields();
    voicesSelect.selectedIndex = -1; // Deseleciona a voz
    // Habilitar os botões "Ler Texto" e "Tocar"
    button.removeAttribute('disabled') = false;
    playButton.removeAttribute('disabled') = false;
}

// Evento de clique para o botão de reiniciar
resetButton.addEventListener('click', function() {
    const currentTime = new Date().getTime();

    // Verifica se o tempo desde o último clique é menor que 300 ms
    if (currentTime - lastClickTime < 300) {
        // Clique duplo detectado, reiniciar todos os campos
        resetAllFields();
    } else {
        // Clique único, reiniciar campos sem mexer na voz
        resetFields();
    }

    // Atualiza o tempo do último clique
    lastClickTime = currentTime;
});

// Evento de clique para o botão de reiniciar geral
generalResetButton.addEventListener('click', resetAllFields);

let mediaRecorder;
let audioChunks = [];

window.speechSynthesis.addEventListener('voiceschanged', () => {
    let voicesList = window.speechSynthesis.getVoices();
    voices.innerHTML = '';
    for (let i = 0; i < voicesList.length; i++) {
        let option = document.createElement('option');
        option.textContent = voicesList[i].name;
        option.value = i;
        voices.appendChild(option);
    }
});

button.addEventListener('click', () => {
    startSpeaking();
});

playButton.addEventListener('click', () => {
    startSpeaking();
});

pauseButton.addEventListener('click', () => {
    window.speechSynthesis.pause();
});

resumeButton.addEventListener('click', () => {
    window.speechSynthesis.resume();
});

resetButton.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    updateStatus();
    clearHighlights();
});

prevButton.addEventListener('click', () => {
    if (currentParagraphIndex > 0) {
        currentParagraphIndex--;
        highlightParagraph(currentParagraphIndex);
        window.speechSynthesis.cancel();
        startSpeaking();
    }
});

nextButton.addEventListener('click', () => {
    if (currentParagraphIndex < paragraphs.length - 1) {
        currentParagraphIndex++;
        highlightParagraph(currentParagraphIndex);
        window.speechSynthesis.cancel();
        startSpeaking();
    }
});

voices.addEventListener('change', () => {
    selectedVoice = parseInt(voices.value);
});

rate.addEventListener('change', () => {
    utterance.rate = parseFloat(rate.value);
});

utterance.onend = () => {
    if (currentParagraphIndex < paragraphs.length - 1) {
        currentParagraphIndex++;
        highlightParagraph(currentParagraphIndex);
        startSpeaking();
    } else {
        updateStatus();
    }
};

function startSpeaking() {
    if (paragraphs.length === 0) {
        clearHighlights();
        paragraphs = textarea.value.split('\n');
        currentParagraphIndex = 0;
        renderParagraphs();
    }
    if (paragraphs[currentParagraphIndex]) {
        let voicesList = window.speechSynthesis.getVoices();
        utterance.text = paragraphs[currentParagraphIndex];
        utterance.voice = voicesList[selectedVoice];
        utterance.rate = parseFloat(rate.value);
        highlightParagraph(currentParagraphIndex);
        window.speechSynthesis.speak(utterance);
        updateStatus();
    }
}

function renderParagraphs() {
    output.innerHTML = '';
    paragraphs.forEach((p, index) => {
        let pEl = document.createElement('p');
        pEl.innerText = p;
        output.appendChild(pEl);
    });
}

function highlightParagraph(index) {
    let pElements = output.getElementsByTagName('p');
    for (let i = 0; i < pElements.length; i++) {
        pElements[i].classList.remove('highlight');
    }
    pElements[index].classList.add('highlight');
}

function clearHighlights() {
    let pElements = output.getElementsByTagName('p');
    for (let i = 0; i < pElements.length; i++) {
        pElements[i].classList.remove('highlight');
    }
}

function updateStatus() {
    if (window.speechSynthesis.speaking) {
        voices.setAttribute('disabled', 'disabled');
        button.setAttribute('disabled', 'disabled');
        playButton.setAttribute('disabled', 'disabled');
        pauseButton.removeAttribute('disabled');
        resumeButton.removeAttribute('disabled');
        prevButton.removeAttribute('disabled');
        nextButton.removeAttribute('disabled');
    } else {
        voices.removeAttribute('disabled');
        button.removeAttribute('disabled');
        playButton.removeAttribute('disabled');
        pauseButton.setAttribute('disabled', 'disabled');
        resumeButton.setAttribute('disabled', 'disabled');
        prevButton.removeAttribute('disabled');
        nextButton.removeAttribute('disabled');
    }
}

async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioData = new Uint8Array(arrayBuffer);
        const mp3Blob = convertToMP3(audioData);
        downloadMP3(mp3Blob);
        audioChunks = [];
    };

    mediaRecorder.start();
}

function convertToMP3(audioData) {
  const sampleRate = 44100;
  const channels = 1;
  const mp3Encoder = new lamejs.Mp3Encoder(channels, sampleRate, 128);
  const samples = new Int16Array(audioData);
  const mp3Data = [];

  let remaining = samples.length;
  let samplesPerFrame = 1152;

  for (let i = 0; remaining >= samplesPerFrame; i += samplesPerFrame) {
      const left = samples.subarray(i, i + samplesPerFrame);
      const mp3buf = mp3Encoder.encodeBuffer(left);
      if (mp3buf.length > 0) {
          mp3Data.push(new Int8Array(mp3buf));
      }
      remaining -= samplesPerFrame;
  }

  const d = mp3Encoder.flush();
  if (d.length > 0) {
      mp3Data.push(new Int8Array(d));
  }

  status.textContent = 'Conversão para MP3 concluída. Baixando arquivo...';
  return new Blob(mp3Data, { type: 'audio/mp3' });
}

function downloadMP3(mp3Blob) {
    const url = URL.createObjectURL(mp3Blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'voice.mp3';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

recordButton.addEventListener('click', async () => {
    await startRecording();
    startSpeaking();
    utterance.onend = () => {
        mediaRecorder.stop();
        if (currentParagraphIndex < paragraphs.length - 1) {
            currentParagraphIndex++;
            highlightParagraph(currentParagraphIndex);
            startSpeaking();
        } else {
            updateStatus();
        }
    };
});

setInterval(updateStatus, 100);