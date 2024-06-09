'use strict';

// Seleciona os elementos do DOM
let inputText = document.querySelector('#inputText');
let voz = document.querySelector('#voz');
let button = document.querySelector('#button');

// Inicializa a variável selecionaVoz
let selecionaVoz = 0;

// Evento que é acionado quando as vozes mudam
window.addEventListener('voiceschanged', carregarVozes);

// Função para carregar as vozes disponíveis
function carregarVozes() {
    // Limpa as opções de voz anteriores
    voz.innerHTML = '';
  
    // Obtém a lista de vozes disponíveis
    let vozes = window.speechSynthesis.getVoices();
    
    // Loop para adicionar as vozes ao elemento select
    for (let i = 0; i < vozes.length; i++) {
        // Cria o elemento option
        let option = document.createElement('option');
        option.textContent = vozes[i].name;
        option.setAttribute('value', i);
        voz.appendChild(option);
    }
}

// Carregar as vozes disponíveis ao carregar a página
window.addEventListener('load', carregarVozes);

// Evento de clique no botão para converter texto em áudio
button.addEventListener('click', converterParaAudio);

// Função para converter o texto inserido no textarea em áudio
function converterParaAudio() {
    // Obtém o texto do textarea
    var texto = inputText.value;
    
    // Cria um objeto SpeechSynthesisUtterance para representar o texto a ser convertido em áudio
    var utterance = new SpeechSynthesisUtterance(texto);

    // Obtém a síntese de voz do navegador
    var synth = window.speechSynthesis;
    
    // Obtém o elemento de áudio no qual o áudio gerado será reproduzido
    var audioElement = document.getElementById('audio');
    
    // Limpa qualquer conversão anterior
    synth.cancel();
    
    // Inicia a conversão de texto para áudio
    synth.speak(utterance);

    // Quando a conversão terminar, cria um blob do objeto utterance e define a URL do áudio gerado para reprodução
    utterance.onend = function() {
        var blob = new Blob([new XMLSerializer().serializeToString(utterance)], { type: "application/ssml+xml" });
        var url = URL.createObjectURL(blob);
        audioElement.src = url;
    };

    // Adiciona controles de pausar e adiantar à reprodução do áudio
    audioElement.addEventListener('pause', function() {
        synth.pause();
    });

    audioElement.addEventListener('play', function() {
        synth.resume();
    });

    // Controla a velocidade de reprodução do áudio de acordo com a velocidade de reprodução definida no elemento de áudio
    audioElement.addEventListener('timeupdate', function() {
        synth.rate = audioElement.playbackRate;
    });
}





// Função para carregar as vozes disponíveis
function carregarVozes() {
    let vozes = window.speechSynthesis.getVoices();
    for (let i = 0; i < vozes.length; i++) {
        let option = document.createElement('option');
        option.textContent = vozes[i].name;
        option.setAttribute('value', i);
        voz.appendChild(option);
    }
}

// Carregar as vozes disponíveis ao carregar a página
window.speechSynthesis.onvoiceschanged = carregarVozes;

button.addEventListener('click', () => {
    let ms = new SpeechSynthesisUtterance(inputText.value);
    let selecionaVoz = voz.value;
    ms.voice = window.speechSynthesis.getVoices()[selecionaVoz];
    window.speechSynthesis.speak(ms);
});

   // Função para converter o texto inserido no textarea em áudio
   function converterParaAudio() {
    // Obtém o texto do textarea
    var texto = document.getElementById('inputText').innerText;
    
    // Cria um objeto SpeechSynthesisUtterance para representar o texto a ser convertido em áudio
    var utterance = new SpeechSynthesisUtterance(texto);

    // Obtém a síntese de voz do navegador
    var synth = window.speechSynthesis;
    
    // Obtém o elemento de áudio no qual o áudio gerado será reproduzido
    var audioElement = document.getElementById('audio');
    
    // Limpa qualquer conversão anterior
    synth.cancel();
    
    // Inicia a conversão de texto para áudio
    synth.speak(utterance);

    // Quando a conversão terminar, cria um blob do objeto utterance e define a URL do áudio gerado para reprodução
    utterance.onend = function() {
        var blob = new Blob([new XMLSerializer().serializeToString(utterance)], { type: "application/ssml+xml" });
        var url = URL.createObjectURL(blob);
        audioElement.src = url;
    };

    // Adiciona controles de pausar e adiantar à reprodução do áudio
    audioElement.addEventListener('pause', function() {
        synth.pause();
    });

    audioElement.addEventListener('play', function() {
        synth.resume();
    });

    // Controla a velocidade de reprodução do áudio de acordo com a velocidade de reprodução definida no elemento de áudio
    audioElement.addEventListener('timeupdate', function() {
        synth.rate = audioElement.playbackRate;
    });
}





// Função para alternar temas
function toggleTheme() {
  const switcher = document.querySelector('.btn-theme');
  let currentTheme = 'Light-Theme';

  const themeMap = {
    'Light-Theme': 'Dark-Theme',
    'Dark-Theme': 'Light-Office',
    'Light-Office': 'Dark-Office',
    'Dark-Office': 'Writing-Theme',
    'Writing-Theme': 'Light-Green',
    'Light-Green': 'underline-Theme',
    'underline-Theme': 'Light-Theme',
  };

  // Defina a classe inicial diretamente
  switcher.className = `btn-theme ${currentTheme}`;

  switcher.addEventListener('click', function () {
    // Remova a classe do tema atual
    document.body.classList.remove(currentTheme);

    // Atualize o tema atual usando o mapa de temas
    currentTheme = themeMap[currentTheme];

    // Atualize o texto do botão com base no tema atual
    switcher.textContent = `${currentTheme.charAt(0).toUpperCase()}${currentTheme.slice(1)} `;

    // Aplicar a classe do novo tema
    document.body.classList.add(currentTheme);

    console.log('Current theme: ' + currentTheme);
  });
}

// Função para formatar texto com cores
function formatText() {
  const inputElement = document.getElementById('inputText');
  const outputElement = document.getElementById('outputText');
  const inputText = inputElement.value;

  const colors = {
    ',\n': 'highlight-yellow',  // Vírgula seguida de quebra de linha
    ';\n': 'highlight-yellow',  // Ponto e vírgula seguido de quebra de linha
    '.\n': 'highlight-green',   // Ponto final seguido de quebra de linha
    '. \n': 'highlight-green',
    '!\n': 'highlight-green',   // Ponto de exclamação seguido de quebra de linha
    '! \n': 'highlight-green', 
    ':\n': 'highlight-green',   // Dois pontos seguido de quebra de linha
    '?\n': 'highlight-red',     // Ponto de interrogação seguido de quebra de linha
    '? \n': 'highlight-red',

    // Continuação de linha usando o caractere de escape '\'
    // ' \n': 'highlight-yellow',
    '"\n': 'highlight-yellow',
    '-\n': 'highlight-yellow',  // Traço seguido de quebra de linha
    '(\n': 'highlight-yellow',  // Parêntese aberto seguido de quebra de linha
    ')\n': 'highlight-yellow',  // Parêntese fechado seguido de quebra de linha
    '{\n': 'highlight-yellow',  // Chave aberta seguida de quebra de linha
    '}\n': 'highlight-yellow',  // Chave fechada seguida de quebra de linha

    // Quebra de linha (caracteres de retorno de carro ou avanço de linha) seguida por um espaço
    '/\r?\n |\r |\r\n /': function(previousColor) {
        return previousColor;
    },

    ',': 'highlight-yellow',
    '"': 'highlight-yellow',
    ';': 'highlight-yellow',
    '- ': 'highlight-yellow',
    '-': 'highlight-yellow',
    '': 'highlight-yellow',
    ' ). ': 'highlight-yellow',
    ').': 'highlight-yellow',
    ')': 'highlight-yellow',
    ' (': 'highlight-yellow',
    ',(': 'highlight-yellow',
    '.(': 'highlight-yellow',      
    '.': 'highlight-green',
    ':': 'highlight-green',
    '!': 'highlight-green',
    '?': 'highlight-red',
    ')?': 'highlight-red',
    '.?': 'highlight-red',
    ' ?.': 'highlight-red',
    '? .': 'highlight-green',
    '*': 'highlight-gray',

  };
  


// Função para remover espaços em branco desnecessários
function removerEspacosDesnecessarios(texto) {
  // Divide o texto em parágrafos
  let paragrafos = texto.split(/\n\s*\n/);

  // Para cada parágrafo, remove os espaços extras entre as palavras
  for (let i = 0; i < paragrafos.length; i++) {
    // Divide o parágrafo em linhas
    let linhas = paragrafos[i].split('\n');

    // Para cada linha, divide em palavras, remove espaços extras e junta as palavras de volta
    for (let j = 0; j < linhas.length; j++) {
      let palavras = linhas[j].split(/\s+/);
      for (let k = 0; k < palavras.length; k++) {
        palavras[k] = palavras[k].trim();
      }
      linhas[j] = palavras.join(' ');
    }

    // Junta as linhas novamente em um único parágrafo, preservando as quebras de linha originais
    paragrafos[i] = linhas.join('\n');
  }

  // Junta os parágrafos novamente em um único texto, preservando as quebras de linha originais
  return paragrafos.join('\n\n\n');
}



// Expressão regular para dividir o texto em parágrafos com diferentes formatos de quebra de linha
const paragraphs = removerEspacosDesnecessarios(inputText).split(/\r?\n|\r/);

let currentColor = 'highlight-green'; // Inicializa com a cor verde
let formattedText = '';

for (let i = 0; i < paragraphs.length; i++) {
  const paragraph = paragraphs[i];
  const words = paragraph.split(/\s+/);

  let lineText = '';

  for (let j = words.length - 1; j >= 0; j--) {
    const word = words[j].trim(); // Remove espaços em branco antes e depois da palavra
    const lastChar = word[word.length - 1];
    const colorClass = colors[lastChar];

    if (colorClass) {
      currentColor = colorClass; // Atualizar a cor atual se necessário
    }

    // Verificar se é a primeira palavra na linha antes de adicionar um espaço.
    if (lineText !== '') {
      lineText = `<span class="${currentColor}">&nbsp;</span>` + lineText;
    }

    lineText = `<span class="${currentColor}">${word}</span>` + lineText;
  }

  // Verificar se a última palavra termina com um ponto final seguido de uma quebra de linha
  if (paragraph.trim().endsWith('.\n') || paragraph.trim().endsWith('.\r')) {
    // Adicionar uma quebra de linha HTML após o ponto final seguido por uma quebra de linha
    lineText += '<br>';
  }

  // Adicionar o texto formatado do parágrafo ao texto final formatado
  formattedText += lineText;

  // Adicionar quebra de linha HTML após cada parágrafo, exceto para o último parágrafo
  if (i < paragraphs.length - 1) {
    formattedText += '<br>';
  }
}




  
  // Aplicar o estilo do textarea original ao elemento de saída
  outputElement.innerHTML = formattedText;
  outputElement.style.fontFamily = getComputedStyle(inputElement).fontFamily;
  outputElement.style.fontSize = getComputedStyle(inputElement).fontSize;
  outputElement.style.lineHeight = getComputedStyle(inputElement).lineHeight;
  outputElement.style.whiteSpace = 'pre-wrap'; // Manter a quebra de linha
  outputElement.style.wordWrap = 'break-word'; // Opção para quebrar palavras longas
  outputElement.style.padding = getComputedStyle(inputElement).padding;
  outputElement.style.border = getComputedStyle(inputElement).border;
}



function formatTextWithAsterisks(text) {
  return text.replace(/\*([^*]+)\*/g, '<span class="highlight-gray">$1</span>');
}

// Seu código para acessar o elemento <output>
const outputElement = document.getElementById("outputText");

// Aplica a formatação
outputElement.innerHTML = formatTextWithAsterisks(outputElement.innerHTML);


// Função para redefinir o texto
function resetText() {
  const inputElement = document.getElementById('inputText');
  const outputElement = document.getElementById('outputText');

  // Limpar o conteúdo da caixa de texto e do elemento de saída.
  inputElement.value = '';
  outputElement.innerHTML = '';
}

// Inicialize o Clipboard.js
new ClipboardJS('#copyButton');

// Lidar com os eventos de sucesso e erro
document.getElementById('copyButton').addEventListener('success', function(e) {
  alert("Texto formatado copiado para a área de transferência!");
});

document.getElementById('copyButton').addEventListener('error', function(e) {
  alert("Não foi possível copiar o texto formatado. Por favor, selecione manualmente e copie.");
});


// Função para carregar o PDF a partir de uma URL
async function loadPDF(url) {
  const loadingTask = pdfjsLib.getDocument(url);
  pdfInstance = await loadingTask.promise;
  renderPage(currentPage);
}



// Função para renderizar uma página específica do PDF
async function renderPage(pageNumber) {
  const page = await pdfInstance.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1.5 });

  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  const renderTask = page.render(renderContext);
  await renderTask.promise;
}

// Event listeners para navegar nas páginas do PDF
prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

nextPageButton.addEventListener('click', () => {
  if (currentPage < pdfInstance.numPages) {
    currentPage++;
    renderPage(currentPage);
  }
});

// Função para lidar com a seleção do tipo de arquivo (PDF ou web)
function handleFileTypeChange() {
  const fileTypeSelect = document.getElementById('fileType');
  const selectedFileType = fileTypeSelect.value;

  if (selectedFileType === 'web') {
    // Habilitar o código relevante para arquivos da web
    toggleTheme();
    formatText();
    resetText();
    copyFormattedText();
  } else if (selectedFileType === 'PDF') {
    // Habilitar o código relevante para arquivos PDF
    loadPDF('https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf');
  }
}

// Adicionar evento onchange ao elemento select
const fileTypeSelect = document.getElementById('fileType');
fileTypeSelect.addEventListener('change', handleFileTypeChange);

// Carregar um PDF de exemplo inicialmente
handleFileTypeChange(); // Isso irá carregar o PDF de exemplo quando a página for carregada

//====================login===============================
/*TRANSFORMANDO AUDIO EM VOZ* */

// Esta função será executada quando o documento HTML estiver completamente carregado
jQuery(document).ready(function(){
  // Cria um alias $ para o objeto jQuery para facilitar sua referência
  var $ = jQuery;
  
  // Declaração do objeto myRecorder para lidar com a gravação de áudio
  var myRecorder = {
    // Armazena diferentes propriedades relacionadas à gravação de áudio
    objects:{
      context: null, // Contexto de áudio
      stream: null, // Fluxo de áudio
      recorder: null // Objeto de gravação
    },

    // Método para inicializar o contexto de áudio
    init: function (){
      // Verifica se o contexto de áudio já está inicializado
      if(null === myRecorder.objects.context){
        // Cria um novo contexto de áudio usando AudioContext ou webkitAudioContext
        myRecorder.objects.context = new (
          window.AudioContext || window.webkitAudioContext
        )();
      }
    },

    // Método para iniciar a gravação de áudio
    start: function (){
      // Opções para aquisição de mídia (apenas áudio)
      var options = { audio: true, video: false };
      // Solicita acesso ao microfone do usuário
      navigator.mediaDevices.getUserMedia(options).then(function (stream) {
        // Armazena o fluxo de áudio
        myRecorder.objects.stream = stream;
        // Cria um objeto de gravação usando o contexto de áudio
        myRecorder.objects.recorder = new Recorder(
          myRecorder.objects.context.createMediaStreamSource(stream),
          { numChannels: 1 }
        );
        // Inicia a gravação de áudio
        myRecorder.objects.recorder.record();
        $('[data-role="controls"] > button').css({
          'background-color': '#ff2033',
          'background-image': 'linear-gradient(0deg, #ff2033 0%, #b30003 100%)'
        });
      }).catch(function (err) {});
    },

    // Método para parar a gravação de áudio
    stop: function(listObject){
      // Para o fluxo de áudio
      if(null !== myRecorder.objects.stream ){
        myRecorder.objects.stream.getAudioTracks()[0].stop();
      }
      // Para o objeto de gravação
      if(null !== myRecorder.objects.recorder){
        myRecorder.objects.recorder.stop();
        // Exporta o áudio gravado para um arquivo WAV
        if(null !== listObject
           && 'object' === typeof listObject
           && listObject.length > 0){
          myRecorder.objects.recorder.exportWAV(function (blob) {
            // Cria um URL para o arquivo WAV
            var url = (window.URL || window.webkitURL)
            .createObjectURL(blob);
            // Cria um elemento <audio> para reproduzir o áudio
            var audioObject = $('<audio controls></audio>')
            .attr('src', url);
            // Cria um elemento <a> para fazer o download do áudio
            var downloadObject = $('<a>&#9660;</a>')
            .attr('href', url)
            .attr('download', new Date().toLocaleString('pr-BR', { timeZone: 'UTC' }) + '-RicardoDeveloper' + '.mp3');
            // Cria um contêiner para os elementos de áudio e download e os adiciona à lista de objetos
            var holderObject = $('<div class="row"></div>')
            .append(audioObject)
            .append(downloadObject);
            listObject.append(holderObject);
          });
        }
      }
      // Remove a cor do botão quando a gravação é interrompida
  $('[data-role="controls"] > button').css({
    'background-color': '#ee7bee',
    'background-image': 'linear-gradient(0deg, #ee7bee 0%, #6fe1f5 100%)',
    'border': '20px solid #fff'
  });
    }
  };

  // Seleciona todos os elementos com o atributo data-role="recordings"
  var listObject = $('[data-role="recordings"]');
  // Adiciona um manipulador de evento de clique para os botões dentro dos elementos com o atributo data-role="controls"
  $('[data-role="controls"] > button').click(function (){
    
    // Inicializa o objeto myRecorder
    myRecorder.init();
    // Verifica o estado do botão (se está gravando ou não)
    var buttonState = !!$(this).attr('data-recording');
    // Se não estiver gravando, inicia a gravação
    if(!buttonState){
      // Adiciona o atributo data-recording ao botão para indicar que está gravando
      $(this).attr('data-recording', 'true');
      myRecorder.start();
    } else { // Caso contrário, para a gravação
      // Remove o atributo data-recording do botão para indicar que não está mais gravando
      $(this).attr('data-recording', '');
      myRecorder.stop(listObject);
    }
  });
});

/**CONVERSOR DE VOZ PARA TEXTO */
jQuery(document).ready(function(){
  var $ = jQuery;

  var myRecorder = {
    objects:{
      context: null,
      stream: null,
      recorder: null,
      recognition: null,
      isPaused: false,
      speechSynthesis: window.speechSynthesis,
      utterance: null
    },

    init: function (){
      if(null === myRecorder.objects.context){
        myRecorder.objects.context = new (
          window.AudioContext || window.webkitAudioContext
        )();
      }
    },

    start: function (){
      var options = { audio: true, video: false };
      navigator.mediaDevices.getUserMedia(options).then(function (stream) {
        myRecorder.objects.stream = stream;
        myRecorder.objects.recorder = new Recorder(
          myRecorder.objects.context.createMediaStreamSource(stream),
          { numChannels: 1 }
        );
        myRecorder.objects.recorder.record();
        $('[data-role="controls"] > button[data-role="start"]').text('Recording...').prop('disabled', true);
        $('[data-role="controls"] > button[data-role="pause"]').show();
      }).catch(function (err) {});
    },

    stop: function(listObject){
      if(null !== myRecorder.objects.stream ){
        myRecorder.objects.stream.getAudioTracks()[0].stop();
      }
      if(null !== myRecorder.objects.recorder){
        myRecorder.objects.recorder.stop();
        if(null !== listObject
           && 'object' === typeof listObject
           && listObject.length > 0){
          myRecorder.objects.recorder.exportWAV(function (blob) {
            var url = (window.URL || window.webkitURL).createObjectURL(blob);
            var audioObject = $('<audio controls></audio>').attr('src', url);
            listObject.append(audioObject);

            // Convert audio to text
            myRecorder.objects.recognition = new webkitSpeechRecognition();
            myRecorder.objects.recognition.lang = 'pt-BR'; // Defina o idioma como português
            myRecorder.objects.recognition.onresult = function(event) {
              var result = event.results[event.results.length - 1][0].transcript;
              $('#text').text(result);
              $('[data-role="controls"] > button[data-role="speak"]').show();
            };
            myRecorder.objects.recognition.start();
          });
        }
      }
      $('[data-role="controls"] > button[data-role="start"]').text('Start Recording').prop('disabled', false);
      $('[data-role="controls"] > button[data-role="pause"]').hide();
    },

    pause: function() {
      if (myRecorder.objects.recognition) {
        if (!myRecorder.objects.isPaused) {
          myRecorder.objects.recognition.stop();
          myRecorder.objects.isPaused = true;
          $('[data-role="controls"] > button[data-role="pause"]').text('Resume');
        } else {
          myRecorder.objects.recognition.start();
          myRecorder.objects.isPaused = false;
          $('[data-role="controls"] > button[data-role="pause"]').text('Pause');
        }
      }
    },

    speak: function() {
      var text = $('#text').text();
      if (text) {
        myRecorder.objects.utterance = new SpeechSynthesisUtterance(text);
        myRecorder.objects.utterance.lang = 'pt-BR'; // Defina o idioma como português
        myRecorder.objects.speechSynthesis.speak(myRecorder.objects.utterance);
      }
    }
  };

  var listObject = $('[data-role="recordings"]');
  $('[data-role="controls"] > button[data-role="start"]').click(function (){
    myRecorder.init();
    var buttonState = !!$(this).attr('data-recording');
    if(!buttonState){
      $(this).attr('data-recording', 'true');
      myRecorder.start();
    } else {
      $(this).attr('data-recording', '');
      myRecorder.stop(listObject);
    }
  });

  $('[data-role="controls"] > button[data-role="pause"]').click(function (){
    myRecorder.pause();
  });

  $('[data-role="controls"] > button[data-role="speak"]').click(function (){
    myRecorder.speak();
  });
});

var speechSynthesis = window.speechSynthesis;
var utterance;
var isPaused = false;

function converterParaAudio() {
  var text = document.getElementById('inputText').innerText;
  if (text) {
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; // Define o idioma como português

    // Exibe o botão de pausa e oculta o botão de converter
    document.getElementById('pauseButton').style.display = 'inline';
    document.getElementById('button').style.display = 'none';

    // Inicia a síntese de fala
    speechSynthesis.speak(utterance);
  }
}

function pausarAudio() {
  if (speechSynthesis.speaking) {
    if (isPaused) {
      speechSynthesis.resume();
      document.getElementById('pauseButton').innerText = 'Pausar';
    } else {
      speechSynthesis.pause();
      document.getElementById('pauseButton').innerText = 'Retomar';
    }
    isPaused = !isPaused;
  }
}

// Reinicia o estado quando a fala termina
speechSynthesis.onend = function(event) {
  document.getElementById('pauseButton').style.display = 'none';
  document.getElementById('button').style.display = 'inline';
  document.getElementById('pauseButton').innerText = 'Pausar';
  isPaused = false;
};
