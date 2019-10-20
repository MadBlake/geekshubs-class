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
      //console.log(element)
      $('#selected-breed .alert').addClass('d-none');
      $('#selected-breed #img').html('');
      //$('#selected-breed alert').hide();
      $('#selected-breed .spinner-border').addClass('d-block');
      //$('#selected-breed spinner-border').show();
      var $this = $(this);
      console.log($this.data('ref'));
      randomImageBreed($this.data('ref'));
    });
  }

  function initBreeds() {
    $.ajax({
      //url: "http://query.yahooapis.com/v1/public/yql",
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
        console.log("success");
        //let html = response.message.keys()
        //console.log(response.message);
        let listBreeds = Object.keys(response.message);
        //listBreeds.map( value => {console.log('breed:',value)});
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
          console.log(response.message)
          $('#selected-breed .spinner-border').removeClass('d-block').addClass('d-none');
          $("#img").html(
            '<img src="' + response.message + '" />'
          ); //JSON.stringify(response.message)
        }, 1000);

        //console.log(response);
      },

      error: function(error) {
        console.log("error");
        console.log(error);
      }
    });
  }
})(jQuery);
