    //Filename: main.js

    var map;
    var markers = [];
    //var bounds = new google.maps.LatLngBounds();

    function initMap() {
  
        var Kiev_center = {lat: 50.45, lng: 30.52};

        var styledMap = new google.maps.StyledMapType(stylesArray_2, {name: "Styled Map"});
  
        var mapOptions = {
          zoom: 13,
          mapTypeId: 'roadmap',
          center: new google.maps.LatLng(Kiev_center),
          mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
        };
  
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        
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
    var infoWindowContent = 
        '<div class="info_content" style="max-width:400px;">' +
        //title should be an internal link to details page
        '<div class="media"><div class="media-left media-middle">'+
        '<img src="//graph.facebook.com/' + place.placeId + '/picture?type=square" class="media-object" style="width:60px"></div>' +
        '<div class="media-body"><h5 class="media-heading">' + place.title + '</h5>' +
        '<p><b>Address: </b>' + place.address + '</p>';
        //'<p><b>Working hours: </b>'+ place.open_h + '-' + place.close_h + '</p>';
        //needs to add lenk to showroom own site: db, here
        //needs to handle case when links is absent
        if (place.link_fb){
          infoWindowContent +=
        '<a href='+ place.link_fb + ' target="_blank"><img src="/static/fb.jpg" alt="HTML tutorial" style="width:21px;height:21px;border:5px; margin-right:2px;">';
        }
        if (place.link_inst){
          infoWindowContent +=
          '<a href='+ place.link_inst + ' target="_blank"><img src="/static/inst.png" alt="HTML tutorial" style="width:21px;height:21px;border:5px;margin-right:2px;">';
        }
        if (place.link_vk){
          infoWindowContent +=
          '<a href='+ place.link_site + ' target="_blank"><img src="/static/site.jpg" alt="HTML tutorial" style="width:21px;height:21px;border:5px;"></div></div></div>';
        }

    var infoWindow = new google.maps.InfoWindow();
    
    //adding InfoWindow showing by click
    google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                infoWindow.setContent(infoWindowContent);
                infoWindow.open(map, marker);
            }
        })(marker));
    //add marker to markers array to make it accessible later
    markers.push(marker);
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


  function build_list(place, i){
    //map_list content building
    var Content = '<tr style="margin-bottom:0%; padding-bottom:0%;"><td style="padding-bottom:0px; margin-bottom:0%;">'+ 
    '<div class = "panel panel-default" id="'+ i + '"><div class = "panel-heading" >'+
    '<h4 class = "panel-title">'+place.title +'</h4><span class="pull-right clickable panel-collapsed" ><i class="glyphicon glyphicon-chevron-down"></i></span></div>'+
    '<div class="panel-body" '+
    '<div class="media" style="display: none"><div class="media-left media-middle">' +
    '<img src="//graph.facebook.com/' + place.placeId + '/picture?type=square" class="media-object" style="width:60px"></div>'
    '<div class="media-body"><h5 class="media-heading"></h5><p class="small">'+ place.pourpose_type+'</p>';

    //check if a brand has showroom and add the address if it has
    if (place.address) {
      Content += '<p class ="small"><strong>Address: </strong>'+ place.address + '</p>'+
                  '<p class ="small"><strong>Working hours: </strong>'+ place.open_h + '-' + place.close_h; + '</p>';}
    Content += '<p class ="small"><a href="/' + place.placeId + '">details...</a></p>' +
               '</div></div></div></td></tr>';

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

    //getting a number of appropriate marker
    var panel_id = $this.parent('.panel').attr('id');
    console.log('marker index is ' + panel_id);
    //var pos = panel_id.indexOf("-");
    var index = Number(panel_id);
    console.log('marker index is ' + index);
    var marker = markers[index];
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
})


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

