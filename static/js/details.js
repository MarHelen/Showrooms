    //Filename: details.js


  var fb_url = '/' + showroom.placeId + '/';


   /*window.onload=function(){
    
    placeMarker(showroom);
    };*/

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '314614308897367',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
    $(document).trigger('fbload'); 
  };
  
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

//var fb_url = '/{{ place.placeId }}/';

/*$(document).on(
    'fbload',  
    function(){
FB.api(
  fb_url,
  'GET',
  {"fields":"posts.limit(21){instagram_eligibility,full_picture,message,link}", 
   "access_token" : "314614308897367|pd6XzgFTKRFPb7kP_Zzu9v_0wbk" },
  function(response) {
    var posts_object = response["posts"]; 
    
    $.each( posts_object["data"], function(i,post){
      if (i === 0){
        var first = $("#carusel_first");
        first.find('img').attr("src", post["full_picture"]);
      }
      else {
        var Block = '<div class="item"><img src='+ post["full_picture"] +
                    ' alt="" class="img-fluid center-block" style="hight:100%; background-position: center center"></div>';
        //'<div class="carousel-caption" ><p class="lead well"><small>'+ post["message"] +'</small></p></div></div>';
        var carusel = $("#carusel-body");
        $("#carusel-body div:last").after(Block);
      }
    });
  }
);
});*/



/*
function start(){
    $(document).on(
      'gallery_load', 
      function(){
      $(".to_translate").each(function(i, elem) {
    gapi.client.init({
    'apiKey': 'AIzaSyDNscXpr1ldtN4LJvsEHAzrN8uGBy9972g',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
     }).then(function() {
          var text = elem.textContent || elem.innerText;
          text = text.slice(0,message_len_limit-1);
          return gapi.client.language.translations.list({
            q: text,
            //source: 'ru',
            target: 'en',
          });
        }).then(function(resp) {
          console.log(resp.result.data.translations[0].translatedText);

          var element = $(elem).next().filter('.google_translate_en');

            $(elem).css('display', 'none');
            $(element).css('display', 'block');

            //var p = $(element).find("p.card-text");
            var p_card = $(element).find("p.card-text");
            $(p_card).prepend(resp.result.data.translations[0].translatedText);
            //$(elem).find("a:first").clone().appendTo(p);
            //$('</p>').appendTo(p);
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      });
    });
  };


  gapi.load('client', start);
*/

var message_len_limit = 100;
/*
$(document).ready (function(){
      
      
      for (i in po){
           
      //var post = po[i];
      var post = po[i];
      post = JSON.parse(post);

        var Block = '<div class="card" id="image"> <a href='+ post["link"] +' target="_blank"><img class="card-img-top img-fluid" src=' +
                    post["full_picture"] +' target="_blank" alt="Card image cap"></a>';
  
        if ( post["message"] ){


          
          if (post["message"].length > message_len_limit){

            Block += //original text
                     '<div class="card-block" > <div class="to_translate"><p class="card-text">' + 
                      post["message"].slice(0,message_len_limit-1) +
                     '<a href='+ post["link"] + ' target="_blank">...</a></p>' +
                     '<p><a href="#" class="button_to_translatation small clickable">Show translation</a></p></div>' +
                     //translated text, hidden while composing
                     '<div class="google_translate_en" style="display:none"> <p class="card-text"> <a href='+ post["link"] + ' target="_blank">...</a> </p>' +
                     '<p><a href="#"  class="button_to_original small clickable">Show original</a></p> </div></div>';

         }
          else {

            Block += //original text
                     '<div class="card-block"> <div class="to_translate"><p class="card-text">' + post["message"] + 
                     '</p><p><a href="#" class="button_to_translatation small clickable">Show translation</a><p></div>' +
                     //translated text, hidden while composing
                     '<div class="google_translate_en" style="display:none"><p class="card-text"></p>' + 
                     '<p><a href="#"  class="button_to_original small clickable">Show original</a></p></div></div> ';

              }
        }
        
        else Block += '</div>';

        var gallery = $("#gallery-body");
        if (Number(i) === 0){
          $("#gallery-body").prepend(Block);
          
        }
        else  {
          $("#gallery-body #image:last").after(Block);
        }

    };

});
*/


/*$(document).on(
    'fbload',  
    function(){
FB.api(
  fb_url,
  'GET',
  {"fields":"posts.limit(21){instagram_eligibility,full_picture,message,link}", 
   "access_token" : "314614308897367|pd6XzgFTKRFPb7kP_Zzu9v_0wbk" },
  function(response) {
    var posts_object = response["posts"]; 
    
    $.each( posts_object["data"], function(i,post){

        var Block = '<div class="card" id="image"> <a href='+ post["link"] +' target="_blank"><img class="card-img-top img-fluid" src=' + 
                    post["full_picture"] +' target="_blank" alt="Card image cap"></a>';
  
        if (post["message"]){


          
          if (post["message"].length > message_len_limit){

            Block += //original text
                     '<div class="card-block" > <div class="to_translate"><p class="card-text">' + 
                      post["message"].slice(0,message_len_limit-1) +
                     '<a href='+ post["link"] + ' target="_blank">...</a></p>' +
                     '<p><a href="#" class="button_to_translatation small clickable">Show translation</a></p></div>' +
                     //translated text, hidden while composing
                     '<div class="google_translate_en" style="display:none"> <p class="card-text"> <a href='+ post["link"] + ' target="_blank">...</a> </p>' +
                     '<p><a href="#"  class="button_to_original small clickable">Show original</a></p> </div></div>';

          }
          else {

            Block += //original text
                     '<div class="card-block"> <div class="to_translate"><p class="card-text">' + post["message"] + 
                     '</p><p><a href="#" class="button_to_translatation small clickable">Show translation</a><p></div>' +
                     //translated text, hidden while composing
                     '<div class="google_translate_en" style="display:none"><p class="card-text"></p>' + 
                     '<p><a href="#"  class="button_to_original small clickable">Show original</a></p></div></div> ';

         }
        }
        
        else Block += '</div>';

        var gallery = $("#gallery-body");
        if (i === 0){
          $("#gallery-body").prepend(Block);
          
        }
        else  {
          $("#gallery-body #image:last").after(Block);
        }
        
    });
    $("#loading_capture").fadeOut("slow");
    //trigger to start translation
    $(document).trigger('gallery_load'); 
  }
);
});*/

/*window.onload=function(){
$.each( posts, function(i,post){

        var Block = '<div class="card" id="image"> <a href='+ post["link"] +' target="_blank"><img class="card-img-top img-fluid" src=' + 
                    post["full_picture"] +' target="_blank" alt="Card image cap"></a>';
  
        if (post["message"]){


          
          if (post["message"].length > message_len_limit){

            Block += //original text
                     '<div class="card-block" > <div class="to_translate"><p class="card-text">' + 
                      post["message"].slice(0,message_len_limit-1) +
                     '<a href='+ post["link"] + ' target="_blank">...</a></p>' +
                     '<p><a href="#" class="button_to_translatation small clickable">Show translation</a></p></div>' +
                     //translated text, hidden while composing
                     '<div class="google_translate_en" style="display:none"> <p class="card-text"> <a href='+ post["link"] + ' target="_blank">...</a> </p>' +
                     '<p><a href="#"  class="button_to_original small clickable">Show original</a></p> </div></div>';

          }
          else {

            Block += //original text
                     '<div class="card-block"> <div class="to_translate"><p class="card-text">' + post["message"] + 
                     '</p><p><a href="#" class="button_to_translatation small clickable">Show translation</a><p></div>' +
                     //translated text, hidden while composing
                     '<div class="google_translate_en" style="display:none"><p class="card-text"></p>' + 
                     '<p><a href="#"  class="button_to_original small clickable">Show original</a></p></div></div> ';

         }
        }
        
        else Block += '</div>';

        var gallery = $("#gallery-body");
        if (i === 0){
          $("#gallery-body").prepend(Block);
          
        }
        else  {
          $("#gallery-body #image:last").after(Block);
        }
        
    });

};*/

$(document).on('click', 'a.button_to_translation', function(e){  
    //find parent div, make it hidden
    $(this).closest("div").css('display', 'none');
    //find translation block, make it visible
    var next = $(this).closest("div").next('.google_translate_en');
    $(next).css('display',null);
    $(next).css('display', 'block');
    return false;
  });

$(document).on('click', 'a.button_to_original', function(e){  
    //find parent div, make it hidden
    $(this).closest("div").css('display', 'none');
    //find original block, make it visible
    var prev = $(this).closest("div").prev('.to_translate');
    $(prev).css('display',null);
    $(prev).css('display', 'block');
    return false;
  });
/*
  $(document).on(
      'gallery_load',
      function(){
   gapi.client.init({
    'apiKey': 'AIzaSyDNscXpr1ldtN4LJvsEHAzrN8uGBy9972g',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
     }).then(function() {
          var text = $("p.description").html();

          return gapi.client.language.translations.list({
            q: text,
            //source: 'ru',
            target: 'en',
          });
        }).then(function(resp) {
          console.log(resp.result.data.translations[0].translatedText);

            $("p.description").after('<p class="description_en">' + resp.result.data.translations[0].translatedText + '</p>');
            $("p.description").css('display', 'none');
            $("p.description_en").css('display', 'block')

        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      });*/




