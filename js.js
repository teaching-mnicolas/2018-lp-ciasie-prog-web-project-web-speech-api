$('.switch').click(function(){

  if ($('.selected').find('input').val().length > 1){

    $('.interview').append('<p><span class="name">' + $('.selected').find('input').val()  + '</span></p>')
    $('#1').toggleClass('selected');
    $('#2').toggleClass('selected');

  }

});
  

  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    console.log("test");
  }