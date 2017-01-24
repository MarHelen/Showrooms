    //Filename: details.js


  var fb_url = '/' + showroom.placeId + '/';


   /*window.onload=function(){
    
    placeMarker(showroom);
    };*/


//var fb_url = '/{{ place.placeId }}/';


var message_len_limit = 100;

$(document).ready (function(){
      
      
      for (i in po){
          
      var post = po[i];
      post = JSON.parse(post);

        var Block = '<div class="card" id="image"> <a href='+ post["link"] +' target="_blank"><img class="card-img-top img-fluid" src=' +
                    post["full_picture"] +' target="_blank" alt="Card image cap"></a>';
  
        if ( post["message"] ){


          
          if (post["message"].length > message_len_limit){

            Block += //original text
                     '<div class="card-block" > <div class="to_translate invisible" ><p class="card-text">' + 
                      post["message"].slice(0,message_len_limit-1) +
                     '<a href='+ post["link"] + ' target="_blank">...</a></p></div>' +
                     //translated text, hidden while composing
                     '<div class="google_translate_en visible" > <p class="card-text">' + 
                     post["message_trans"].slice(0,message_len_limit-1) + 
                     '<a href='+ post["link"] + ' target="_blank">...</a></p></div>' +
                     '<p><a  href="#" class="translate small clickable">Show original</a></p></div>';

         }
          else {

            Block += //original text
                     '<div class="card-block"> <div class="to_translate invisible"><p class="card-text">' + 
                     post["message"] + '</p></div>' +
                     //translated text, hidden while composing
                     '<div class="google_translate_en visible"  ><p class="card-text">' + post["message_trans"] + 
                     '</p></div><p><a  href="#" class="translate small clickable">Show original</a></p></div> ';

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
    $("#loading_capture").fadeOut("slow");
});




$(document).on('click', 'a.translate', function(e){  
    //find parent div, make it hidden
    var parent_div = $(this).closest("div");
    var to_show = $(parent_div).find('div.invisible');
    var to_hide = $(parent_div).find('div.visible');
    $(to_show).removeClass('invisible');
    $(to_show).addClass('visible');
    $(to_show).show();
    $(to_hide).removeClass('visible');
    $(to_hide).addClass('invisible');
    $(to_hide).hide();
    
    var new_text;
    if ( $(to_hide).hasClass('to_translate') ){
      new_text = "Show original";
    }
    else new_text = "Show translation";

    $(this).text(new_text);
    return false;
  });

