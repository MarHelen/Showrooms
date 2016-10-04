    //Filename: main.js

    var map;
    //var bounds = new google.maps.LatLngBounds();

    function initMap() {
  
        var Kiev_center = {lat: 50.45, lng: 30.52};
  
        var mapOptions = {
          zoom: 13,
          mapTypeId: 'roadmap',
          center: new google.maps.LatLng(Kiev_center)
        };
  
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        get_details("all");
    };


    function get_details(request){

          $.getJSON('/db_details', {
            request : request
          }, function(data){
            console.log("Congrats!I'm inside json function!");
            
            //traversing each place in retrieved from backend list 
            var i;
            $.each( data['result'], function(i,place){ 
            //call for function to set a marker 
            if (place.address)
              placeMarker(place);
            //call for function to extend place table
            build_list(place);
            });
          });  
          //map.fitBounds(bounds); 
        };

  function placeMarker(place){

    //var position = new google.maps.LatLng(place.location_lat,place.location_lng);

    //set GoogleMaps marker
    var marker = new google.maps.Marker({
                position: new google.maps.LatLng(place.location_lat,place.location_lng),
                title: place.title,
                map: map
    });

    //bounds.extend(position);

    //add info window content
    var infoWindowContent = 
        '<div class="info_content" class="panel panel-default">' +
        //title should be an internal link to details page
        '<h3>' + place.title + '</h3>' +
        '<p><b>Address: </b>' + place.address + '</p>' + 
        '<p><b>Working hours: </b>'+ place.open_h + '-' + place.close_h + '</p>' +
        //needs to add lenk to showroom own site: db, here
        //needs to handle case when links is absent
        '<a href='+ place.link_fb + ' target="_blank"><img src="/static/fb.jpg" alt="HTML tutorial" style="width:42px;height:42px;border:10;">' +
        '<a href='+ place.link_inst + ' target="_blank"><img src="/static/inst.jpg" alt="HTML tutorial" style="width:42px;height:42px;border:10;">' + 
        '<a href='+ place.link_vk + ' target="_blank"><img src="/static/site.jpg" alt="HTML tutorial" style="width:42px;height:42px;border:10;">';
        
    var infoWindow = new google.maps.InfoWindow();
    
    //adding InfoWindow showing by click
    google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                infoWindow.setContent(infoWindowContent);
                infoWindow.open(map, marker);
            }
        })(marker));
    //add window closing while clickung outside the area

  };


//async func for geocoding, might be used while saving data to db
  function geocode_address(callback){
    var geocoder = new google.maps.Geocoder();
    //var position;
      geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        position = results[0].geometry.location;      
        console.log('Geocode result is OK for' + address);
        console.log('position is ' + position);
        //return position;
        //callback()
      } else {
        console.log('Geocode was not successful for %s for the following reason: %s', place.title, status);
        //return position;
        }
  });
      //return position;
      
};


  function build_list(place){
    //map_list content building
    var Content = '<tr><td><div class = "panel panel-default"><div class = "panel-heading" >'+
    '<h4 class = "panel-title">'+place.title +'</h4><span class="pull-right clickable" ><i class="glyphicon glyphicon-chevron-down"></i></span></div>'+
    '<div class="panel-collapsed"><div class="panel-body" '+
                  '<i>'+ place.pourpose_type+'</i>';

    if (place.address) {
      Content += '<p>Address: '+ place.address + '</p>'+
                  '<p>Working hours: '+ place.open_h + '-' + place.close_h; }
    Content += '<p><a href="#">details...</a></p>' +
               '</p></div></div></div></td></tr>';
    //adding new record to the table
    $('#map_list tr:last').after(Content);
  };

  $(document).on('click', '.panel-heading span.clickable', function(e){
    var $this = $(this);
  if(!$this.hasClass('panel-collapsed')) {
    $this.parents('.panel').find('.panel-body').slideUp();
    $this.addClass('panel-collapsed');
    $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
  } else {
    $this.parents('.panel').find('.panel-body').slideDown();
    $this.removeClass('panel-collapsed');
    $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
  }
})



  /*var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });*/

