let compteur = 1; /* Compteur incrémenté avec le bouton switch*/
let final_transcript = '';  /* Variable contenant le résultat de la reconnaissance */
let recognizing = false;  /* Bool à true pendant la reconnaissance (dans notre cas elle sera toujours à true)*/


$('.switch').click(function(){

  /* Si les noms des deux parties sont renseignés*/
  if ($('.selected').find('input').val().length > 1)  {

    /* On ajoute une ligne avec le nom de l'orateur, le compteur, le résultat de la reconnaissance, et un bouton pour relire ce qu'il à dit*/
    $('.interview').append('<p><span class="name">' + $('.selected').find('input').val()  + '</span>' + '<span class="final" id="txt'+compteur+'">'+ final_transcript +'</span>' +'<span class="mic" onclick="speak('+ compteur +')"><i class="material-icons">headset_mic</i></span></p>')
    
    $('#1').toggleClass('selected');
    $('#2').toggleClass('selected');
    final_transcript = "";
    compteur ++;
  }

});

  


  /*
    Initialisation de la reconnaissance vocale
  */
  if ('webkitSpeechRecognition' in window) {

    var recognition = new webkitSpeechRecognition();

    recognition.continuous = true;  /* On indique que la reconnaissance est continue */
    recognition.interimResults = true;  /* On veut les résultats intermediaire */

    recognition.onstart = function() {
      recognizing = true;
    };

    recognition.onerror = function(event) {
      console.log(event.error);
    };

    recognition.onend = function() {
      recognizing = false;
    };

    /* 
      Fonction qui gère le résultat écrit 
      interim_Transcript est le résultat temporaire
      final_Transcript est le résultat qu'on obtient à la fin d'une "phrase"
    */
    recognition.onresult = function(event) {
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
        $('.current').html('<p>' + interim_transcript + '</p>')
      }
      final_transcript = capitalize(final_transcript);
    };
  }


  /*
    Fonction utiles à la gestion du résultat
  */
  var two_line = /\n\n/g;
  var one_line = /\n/g;
  function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
  }

  function capitalize(s) {
    return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
  }


  /* 
    Fonction qui lance la reconnaissance vocale
  */
  function startDictation(event) {

    recognition.lang = 'fr-FR'; /* On parle en français */
    recognition.start();
  }

  startDictation();



/*  
    Fonction permettant d'utiliser le tts 
    Ici on prend en paramètre l'id du champ texte à lire
*/

function speak(id){

  let text = $('#txt' + id).html()
  let synth = window.speechSynthesis;
  let utterThis = new SpeechSynthesisUtterance(text);

  /* 
    En fonction de l'interlocuteur on utilise des options différentes
  */
  if (id % 2 == 1){
    utterThis.pitch = 0.8
    utterThis.rate = 0.8
  }
  else {
    utterThis.pitch = 1.5
    utterThis.rate = 1.5
  }

  synth.speak(utterThis);
}

/* 
  Relis toute l'interview
*/

$('.micall').click(function(){
    $('.mic').each(function(){
      $(this).click();
    })
})