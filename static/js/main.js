    //Filename: main.js

    

  function build_list(place, i){
    //map_list content building
    var Content = '<tr style="margin-bottom:0%; padding-bottom:0%;"><td style="padding-bottom:0px; margin-bottom:0%;">'+ 
    '<div class = "panel panel-default" id="'+ i + '"><div class = "panel-heading clickable panel-collapsed" id="panel-header">'+
    '<h4 class = "panel-title">'+place.title +'</h4><span class="pull-right clickable panel-collapsed" ><i class="glyphicon glyphicon-chevron-down"></i></span></div>'+
    '<div class="panel-body" style="display: none" >';
    Content += build_media(place) + '</td></tr>';
    
    //adding new record to the table
    $('#map_list tr:last').after(Content);
  };

  



  $(document).on('click', '#panel-header', function(e){
    var $this = $(this);
  if(!$this.hasClass('panel-collapsed')) {
    $this.parents('.panel').find('.panel-body').slideUp();
    $this.addClass('panel-collapsed');
    $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    //getting a number of appropriate marker
    var panel_id = $this.parents('.panel').attr('id');
    marker_animation(panel_id);

  } else {
    $this.parents('.panel').find('.panel-body').slideDown();
    $this.removeClass('panel-collapsed');
    $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');

    //getting a number of appropriate marker
    var panel_id = $this.parents('.panel').attr('id');
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
        temp.removeClass('col-md-1');
        temp.removeClass('col-sm-1');
        temp.addClass('col-md-5');
        temp.addClass('col-sm-5');
        
        temp.removeClass('hidden');
        temp.removeClass('collapsed');
        //resize map div
        temp2.removeClass('col-md-9');
        temp2.removeClass('col-sm-9');
        temp2.addClass('col-md-5');
        temp2.addClass('col-sm-5');
        //resize and recenter google map object
        google.maps.event.trigger(map, "resize");
        map.setCenter(Kiev_center);
        //var div_map = temp2.parents('div').find('.google-map-canvas');
        
      } else {
        //resize list div
        temp.removeClass('col-md-5');
        temp.removeClass('col-sm-5');
        temp.addClass('col-md-1');
        temp.addClass('col-sm-1');
        
        temp.addClass('hidden');
        temp.addClass('collapsed');
        //resize map div
        temp2.removeClass('col-md-5');
        temp2.removeClass('col-sm-5');
        temp2.addClass('col-md-9');
        temp2.addClass('col-sm-9');
        //resize and recenter google map object
        google.maps.event.trigger(map, "resize");
        map.setCenter(Kiev_center);
        //var div_map = temp2.parents('div').find('.google-map-canvas');
        
      }
    });



  