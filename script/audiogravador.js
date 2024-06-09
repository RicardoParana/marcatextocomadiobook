(() => {
  const btn = document.getElementById('btn');
  const inputText = document.getElementById('inputText'); // Alterado para selecionar pelo novo ID "resultado"
  let isRecognizing = false;
  let recognition = null; // Armazenar a instância do objeto de reconhecimento de fala

  btn.addEventListener('click', () => {
    if (!isRecognizing) {
      if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "pt-BR";
        
        recognition.addEventListener('result', onSpeech);

        try {
          recognition.start();
          isRecognizing = true;
          btn.style.color = 'red'; // Altera a cor do ícone do microfone para vermelho
        } catch (error) {
          alert("Erro: " + error.message);
        }
      } else {
        inputText.value = "Seu navegador não tem suporte";
      }
    } else {
      recognition.stop(); // Parar o reconhecimento quando o botão for clicado novamente
      isRecognizing = false;
      btn.style.color = ''; // Restaurar a cor padrão do ícone do microfone
    }
  });

  const onSpeech = (event) => {
    const text = event.results[0][0].transcript;
    inputText.value += text + ' '; // Adicionar uma quebra de espaço após cada frase
    // Adicionar lógica adicional aqui, como verificar se uma nova frase ou parágrafo foi reconhecido para pausar automaticamente
  };
})();
//aqui estava funcionando bem
//aqui estava funcionando bem