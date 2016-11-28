    //Filename: details.js


  var fb_url = '/' + showroom.placeId + '/';


   window.onload=function(){
    
    placeMarker(showroom);
    };

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

$(document).on(
    'fbload',  
    function(){
FB.api(
  fb_url,
  'GET',
  {"fields":"posts.limit(20){instagram_eligibility,full_picture,message,link}", 
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
});

var message_len_limit = 100;

$(document).on(
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
                     '<p><a href="#" class="button small">Show translation</a></p></div>' +
                     //translated text, hidden while composing
                     '<div class="google_translate_en hidden"><p class="card-text><a href='+ post["link"] + 
                     ' target="_blank">...</a></p> <a href="#" class="button small">Show original</a> </div></div>';

          }
          else {

            Block += //original text
                     '<div class="card-block"> <div class="to_translate"><p class="card-text">' + post["message"] + 
                     '</p><p><a href="#" class="button small">Show translation</a><p></div>' +
                     //translated text, hidden while composing
                     '<div class="google_translate_en hidden"><p class="card-text></p>' + 
                     '<p><a href="#" class="button small">Show original</a></p></div></div> ';

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
});



