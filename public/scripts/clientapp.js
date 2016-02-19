$(document).ready(function() {

  //getData();

  $('#submit-animal').on('click', submitAnimal);


});

function submitAnimal(){
  //var animalNumber = {};

  postAnimal();
  $.ajax({
    type: 'GET',
    url: '/randomNumber',
    success: function (data) {
      $('#number-container').append('<div></div>');
      var $el = $('#number-container').children().last();
      $el.append('<p>' + data + '</p>');

      console.log('the data:: ' + data);
    }

  });
}

function postAnimal(){
  event.preventDefault();
  var values = {};

  $.each($('#animal-form').serializeArray(), function (i, field) {
    values[field.name] = field.value;
  });



  $.ajax({
    type: 'POST',
    url: '/zoo',
    data: values,
    success: function (data) {
      if(data) {
        $('#animal-container').empty();
        getData();
      } else {
        console.log('error');
      }
    }

  });



}


function getData(){
  $.ajax({
    type: 'GET',
    url: '/zoo',
    success: function(data) {

      console.log('Hellllo data!! ' + data);
      for (var i = 0; i < data.length; i++) {

        $('#animal-container').append('<div></div>');
        var $el = $('#animal-container').children().last();

        $el.append('<div>Animal Type: ' + data[i].animal_type + '</div><br>');
        console.log('oyyoyo:: ' + data[i].animal_type);


      }

    }

  });
}


var randomNumber = function (min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
};