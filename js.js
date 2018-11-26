
let bouton = false;
let compteur = 1;


$('.switch').click(function(){

  if ($('.selected').find('input').val().length > 1 && bouton)  {

    $('.interview').append('<p><span class="name">' + $('.selected').find('input').val()  + '</span>' + '<span class="final" id="txt'+compteur+'">'+ final_transcript +'</span>' +'<span class="mic" onclick="speak('+ compteur +')"><i class="material-icons">headset_mic</i></span></p>')
    $('#1').toggleClass('selected');
    $('#2').toggleClass('selected');
    final_transcript = "";
    $('.switch').attr("disabled", "disabled");
    bouton = false;
    compteur ++;
  }

});


  var final_transcript = '';
  var recognizing = false;




  if ('webkitSpeechRecognition' in window) {

    var recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
      recognizing = true;
    };

    recognition.onerror = function(event) {
      console.log(event.error);
    };

    recognition.onend = function() {
      recognizing = false;
    };

    recognition.onresult = function(event) {
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
        $('.current').html(interim_transcript)
      }
      final_transcript = capitalize(final_transcript);
      console.log(final_transcript);
      bouton = true;
      
    };
  }

  var two_line = /\n\n/g;
  var one_line = /\n/g;
  function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
  }

  function capitalize(s) {
    return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
  }

  function startDictation(event) {

    final_transcript = '';
    recognition.lang = 'fr-FR';
    recognition.start();
  }

  startDictation();



function speak(id){



  let text = $('#txt' + id).html()

  console.log(id);

  let synth = window.speechSynthesis;

  let voiceSelect = "Microsoft Hortense Desktop - French (fr-FR)"


  let utterThis = new SpeechSynthesisUtterance(text);


  utterThis.pitch = 1
  utterThis.rate = 1
  synth.speak(utterThis);
}


