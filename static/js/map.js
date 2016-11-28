    //Filename: map.js


    var map;
    var markers = [];
    var Kiev_center = {lat: 50.45, lng: 30.52};
    var LastinfoWindow;
    
    //var bounds = new google.maps.LatLngBounds();

    function initMap() {
  
        var styledMap = new google.maps.StyledMapType(stylesArray_2, {name: "Styled Map"});
  
        var mapOptions = {
          zoom: 12,
          mapTypeId: 'roadmap',
          center: new google.maps.LatLng(Kiev_center),
          mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
          }
        };
  
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
        
        $(window).resize(function() {
    // (the 'map' here is the result of the created 'var map = ...' above)
          google.maps.event.trigger(map, "resize");
        });

        
    };

    


    function get_details(request){

          $.getJSON('/db_details', {
            request : request
          }, function(data){
            console.log("Congrats!I'm inside json function!");
            
            //traversing each place in retrieved from backend list 
            var i;
            //var index=1;
            $.each( data['result'], function(i,place){ 
            //call for function to set a marker 
            if (place.address)
              placeMarker(place, i);
            else markers.push(-1);
            //call for function to extend place table
            build_list(place, i);
            });
          });  
          //map.fitBounds(bounds); 
        };

  function placeMarker(place){
    
    //customizing an icon image to make it compatible for pin
    var image = {
      url: "/static/shop.png",
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25),
    };
 
    //set GoogleMaps marker
    var marker = new google.maps.Marker({
                position: new google.maps.LatLng(place.location_lat,place.location_lng),
                title: place.title,
                map: map,
                icon: image
    });

    

    //bounds.extend(position);

    //add info window content
    var infoWindowContent = '<h5>'+ place.title + '</h5>' + build_media(place);
        

    var infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(infoWindowContent);

    
    //adding InfoWindow showing by click
    google.maps.event.addListener(marker, 'click', function() {
      //closed opened infoWindow
        if (LastinfoWindow){
            LastinfoWindow.close();}
      
      //close current infoWindow if it's opened or place if it isn't
        if(!marker.open){
          infoWindow.open(map,marker);
          marker.open = true;
          }
        else{
          infoWindow.close();
          marker.open = false;
          }

        LastinfoWindow = infoWindow;
      
    });


    //add marker to markers array to make it accessible later
    markers.push(marker);
    
    //add window closing while clickung outside the area
    google.maps.event.addListener(map, 'click', function() {
        infoWindow.close();
        marker.open = false;
    });
    
  };

  function build_media(place){
    var Content = '<div class="info_content" style="max-width:300px;">' +
        //title should be an internal link to details page
        '<div class="media"><div class="media-left media-middle">'+
        '<img src="//graph.facebook.com/' + place.placeId + '/picture?type=square" class="media-object" style="width:60px"></div>' +
        '<div class="media-body"><h5 class="media-heading"></h5>';
        Content += '<p class ="small"><i>'+ place.pourpose_type + '</i></p>';
        if (place.address) {
          Content += '<p class ="small"><strong>Address: </strong>'+ place.address + '</p>'+
                     '<p class ="small"><strong>Working hours: </strong>'+ place.open_h + '-' + place.close_h; + '</p>';
        }
        
        // social media block
        Content += '<div class="media-right" >';
 
        if (place.link_fb){
          Content +=
        '<a href='+ place.link_fb + ' target="_blank"><img src="/static/fb.jpg" alt="HTML tutorial" style="width:21px;height:21px;border:5px; margin-right:2px; margin-bottom:5px;">';
        }
        if (place.link_inst){
          Content +=
          '<a href='+ place.link_inst + ' target="_blank"><img src="/static/inst.png" alt="HTML tutorial" style="width:21px;height:21px;border:5px;margin-right:2px; margin-bottom:5px;">';
        }
        if (place.link_site){
          Content +=
          '<a href='+ place.link_site + ' target="_blank"><img src="/static/site.jpg" alt="HTML tutorial" style="width:21px;height:21px;border:5px; margin-bottom:5px;">';
        }

        Content += '</div>';

        //adding details link
        Content += '<p class ="small"><a href="/' + place.placeId + '">details...</a></p>' +
                           '</div></div></div>';
    return Content;
  }



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

  function marker_animation(id){
    var index = Number(id);
    var marker = markers[index];
    //set marker animation for one "jump cycle"
    if (marker != -1){
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ marker.setAnimation(null); }, 750);
    }
  };


  var stylesArray = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

var stylesArray_2 = [
  {
    featureType: "all",
    stylers: [
      { saturation: -80 }
    ]
  },{
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { hue: "#00ffee" },
      { saturation: 50 }
    ]
  },{
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

/*var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });*/


