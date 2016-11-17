    //Filename: details.js

  //var showroom = 
 
 /* window.onload=function(place){
    placeMarker(place);
};*/

  var fb_url = '/' + showroom.placeId + '/';

  /*$(window).load(function() {
    $("#loading_capture").fadeOut("slow");
   })*/

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

        //var Block = '<div class="clearfix col-sm-5 col-md-4 " id="image"><a href='+ post["link"] +' target="_blank"><img src='+ post["full_picture"] +
        //            ' class="img-responsive img-fluid center-block" style="hight:100%; width:100%; background-position: center center"></a>';
        var Block = '<div class="card" id="image"> <a href='+ post["link"] +' target="_blank"><img class="card-img-top img-fluid" src=' + 
                    post["full_picture"] +' target="_blank" alt="Card image cap"></a>';
  
        if (post["message"]){
          var message_len_limit = 100;
          if (post["message"].length > message_len_limit){
            //Block += '<br class="">' + post["message"].slice(0,message_len_limit-1) +
            //'<a href='+ post["link"] +' target="_blank">...</a></div></div>';
            Block += '<div class="card-block"><p class="card-text">' + post["message"].slice(0,message_len_limit-1) +
                     '<a href='+ post["link"] +' target="_blank">...</a></div></div>';
          }
          else 
            //Block += '<br class="">'+ post["message"] +'</div></div>';
            Block += '<div class="card-block"><p class="card-text">' + post["message"] + '</div></div>';
        }
        //else Block += '<br class=""></div></div>';
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
  }
);
});



