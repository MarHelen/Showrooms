    //Filename: main.js

    

  function build_list(place, i){
    //map_list content building
    var Content = '<tr><td><div class = "card list-card" id="'+ i + '"><div class = "card-header clickable panel-collapsed" id="panel-header">'+
    '<h6 class = "card-header">'+place.title +'<i class="pull-right clickable panel-collapsed fa-chevron-down fa"></i></h6></div>'+
    '<div class="card-block" style="display: none" >';
    Content += build_media(place) + '</div></div></td></tr>';
    
    //adding new record to the table
    $('#map_list tr:last').after(Content);
  };

  



  $(document).on('click', '#panel-header', function(e){
    var $this = $(this);
  if(!$this.hasClass('panel-collapsed')) {
    $this.parents('.card').find('.card-body').slideUp();
    $this.addClass('panel-collapsed');
    $this.parents('.card').find('.card-block').css('display', 'none');
    $this.find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    //getting a number of appropriate marker
    var panel_id = $this.parents('.card').attr('id');
    marker_animation(panel_id);

  } else {
    $this.parents('.card').find('.card-body').slideDown();
    $this.removeClass('panel-collapsed');
    $this.parents('.card').find('.card-block').css('display', 'block');
    $this.find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');

    //getting a number of appropriate marker
    var panel_id = $this.parents('.card').attr('id');
    marker_animation(panel_id);
    
  }
})




  $(document).on('click', '#list-collapse', function(e){
      var $this = $(this);
      var temp = $this.parents('div').find('.wrapper');
      var temp2 = $this.parents('.div').find('.map');
      var t_body = temp.parents('.table').find('tbody .content');
      if (temp.hasClass('collapsed') ){
        //resize list div
        temp.addClass('col-md-5');
        temp.addClass('col-sm-5');
        temp.addClass('col-lg-5');
        temp.removeClass('col-md-1');
        temp.removeClass('col-sm-1');
        temp.removeClass('col-lg-1');
        
        temp.removeClass('hidden');
        temp.css('display','block');
        temp.removeClass('collapsed');
        //resize map div
        temp2.removeClass('col-md-9');
        temp2.removeClass('col-sm-9');
        temp2.removeClass('col-lg-9');
        temp2.addClass('col-md-5');
        temp2.addClass('col-sm-5');
        temp2.addClass('col-lg-5');
        //resize and recenter google map object
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
        //var div_map = temp2.parents('div').find('.google-map-canvas');
        
      } else {
        //resize list div
        temp.removeClass('col-md-5');
        temp.removeClass('col-sm-5');
        temp.removeClass('col-lg-5');
        temp.addClass('col-md-1');
        temp.addClass('col-sm-1');
        temp.addClass('col-lg-1');
        
        temp.addClass('hidden');
        temp.css('display', 'none');
        temp.addClass('collapsed');
        //resize map div
        temp2.removeClass('col-md-5');
        temp2.removeClass('col-sm-5');
        temp2.removeClass('col-lg-5');
        temp2.addClass('col-md-9');
        temp2.addClass('col-sm-9');
        temp2.addClass('col-lg-9');
        //resize and recenter google map object
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
        //var div_map = temp2.parents('div').find('.google-map-canvas');
        
      }
    });



  