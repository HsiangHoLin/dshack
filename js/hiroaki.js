$(function(){
	$("#test").click(function(){
		var Pclass = $("#Pclass").val();
		var Sex = $("#Sex").val();
		var Age = $("#Age").val();
		var Fare = $("#Fare").val();

		var data = {
			"Pclass": Pclass, 
			"Sex": Sex, 
			"Age": Age,
			"Fare": Fare,
		};
		data = $(this).serialize() + "&" + $.param(data);
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost/ms/test_ajax.php", 
			data: data
			}).done(function(data) {
			  if( parseInt(data["Results"]["output1"]["value"]["Values"][0]) == 0 ) {
			    $('#result').text('You will die');
			  } else {
			    $('#result').text('You will survive');
			  }
			}).fail(function(data) {
			}).always(function() {
		});
	});

  //google maps
  $("#showMap").click(function(){
    searchInformation()
  });

  function searchInformation() {
    var lat = 40.809336;
    var lng = -73.959855;
    var radius = 500;
    var data = {
       "lat": lat, 
       "lng": lng,
       "radius":radius
    };
    data = $(this).serialize() + "&" + $.param(data);
    $.ajax({
	type: "POST",
	dataType: "json",
	data: data,
	url: "google_places.php"
	}).done(function(data) {
          setDataMap(data['results']);
	  
	}).fail(function(data) {
	}).always(function() {
    });
  }

  function setDataMap(data) {
    for (var i=0; i<data.length; i++) {
      places.push([ data[i]['name'], data[i]['geometry']['location']['lat'], data[i]['geometry']['location']['lng']]);
      infoWindowContent.push([data[i]['name']]);
    }
    //places  1:name 2:lat 3:lng
    //infoWindowContent 1:description
    setMarkers(map);
  }

  function setDataDanger(data) {
    var citymap = {
      chicago: {center: {lat: 41.878, lng: -87.629}, population: 2714856},
      newyork: {center: {lat: 40.714, lng: -74.005}, population: 8405837},
      losangeles: {center: {lat: 34.052, lng: -118.243}, population: 3857799},
      vancouver: {center: {lat: 49.25, lng: -123.1}, population: 603502}
    };
  }

});

// global value
var map;

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var places = [];

// i do not know why, but I have to set as follows
var infoWindowContent = [];

// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.
function initMap() {
  // Create an array of styles.
  var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 40.809336, lng: -73.959855},
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  });

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}


function setMarkers(map) {
  var image = {
    url: 'img/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };

  var infoWindow = new google.maps.InfoWindow(), marker, i;


  for (i = 0; i < places.length; i++) {
    var place = places[i];
    var marker = new google.maps.Marker({
      position: {lat: place[1], lng: place[2]},
      map: map,
      icon: image,
      shape: shape,
      title: place[0],
      zIndex: place[3]
    });
    
    
    // Allow each marker to have an info window    
	google.maps.event.addListener(marker, 'click', (function(marker, i) {
	    return function() {
	        infoWindow.setContent(infoWindowContent[i][0]);
	        infoWindow.open(map, marker);
	    }
	})(marker, i));

  }
}

$(document).ready(function () {
    $(".mlink").click(function(){
        var target = this.getAttribute('data-target');
        $('html, body').animate({
           scrollTop: $(target).offset().top-80
        }, 800, 'easeOutCubic');
    });

});
