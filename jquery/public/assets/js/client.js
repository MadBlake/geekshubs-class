(function($) {
  $(function() {
    console.log("ready!");
    initBreeds();
    //Doesn't work because the new DOM isn't load
    /*$('#breed-list ul li').click(function(element) {
      console.log(element);
    });*/
  });

  function clickBreedItem() {
    $("#breed-list ul li").click(function(element) {
      $('#selected-breed #img').html('');
      //$('#selected-breed .alert').addClass('d-none');
      $('#selected-breed .alert').hide(); //hide with jquery
      //$('#selected-breed .spinner-border').addClass('d-block');
      $('#selected-breed .spinner-border').show(500); //show with jquery
      var $this = $(this);
      randomImageBreed($this.data('ref'));
    });
  }

  function initBreeds() {
    $.ajax({
      url: "https://dog.ceo/api/breeds/list/all",
      // se agrega como parámetro el nombre de la función de devolución,
      // según se especifica en el servicio de YQL
      //jsonp: "callback",

      // se le indica a jQuery que se espera información en formato JSONP
      dataType: "json",

      // se le indica al servicio de YQL cual es la información
      // que se desea y que se la quiere en formato JSON
      data: {
        //q: 'select title,abstract,url from search.news where query="cat"',
        format: "json"
      },

      // se ejecuta una función al ser satisfactoria la petición
      success: function(response) {
        let listBreeds = Object.keys(response.message);
        let listBreedsTransform = listBreeds
          .map(
            breed =>
              '<li class="list-group-item" data-ref="https://dog.ceo/api/breed/' +
              breed +
              '/images/random">' +
              breed +
              "</li>"
          )
          .join(" ");
        setTimeout(function() {
          $("#spinners").addClass("d-none");
          $("#breed-list").html(
            '<ul class="list-group">' + listBreedsTransform + "</ul>"
          ); //JSON.stringify(response.message)
          clickBreedItem();
        }, 1000);

        //console.log(response);
      },

      error: function(error) {
        console.log("error");
        console.log(error);
      }
    });
  }

  function randomImageBreed(breed) {
    $.ajax({
      url: breed,
      // se agrega como parámetro el nombre de la función de devolución,
      // según se especifica en el servicio de YQL
      //jsonp: "callback",

      // se le indica a jQuery que se espera información en formato JSONP
      dataType: "json",

      // se le indica al servicio de YQL cual es la información
      // que se desea y que se la quiere en formato JSON
      data: {
        //q: 'select title,abstract,url from search.news where query="cat"',
        format: "json"
      },

      // se ejecuta una función al ser satisfactoria la petición
      success: function(response) {
        setTimeout(function() {
          $('#selected-breed .spinner-border').hide();
            //.removeClass('d-block')
            //.addClass('d-none');
          $("#img").html(
            '<img src="' + response.message + '" />'
          ); //JSON.stringify(response.message)
        }, 1000);
      },

      error: function(error) {
        console.log("error");
        console.log(error);
      }
    });
  }
})(jQuery);
