    //Filename: details.js


  var fb_url = '/' + showroom.placeId + '/';


   /*window.onload=function(){
    
    placeMarker(showroom);
    };*/


//var fb_url = '/{{ place.placeId }}/';


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




$(document).on('click', '#button_to_translation', function(e){  
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



