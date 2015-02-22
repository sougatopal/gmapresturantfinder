var map,infowindow;
    var source   = document.getElementById("entrytemplate").innerHTML;
    var template = Handlebars.compile(source);
    var list_handle = document.getElementById("listing_wrapper")
    var list = document.createElement("ol");
    var html;
    var pyrmont;
      function geoFindMe() 
      {
      if (!navigator.geolocation){
        console.log("this feature is not supported");
        return;
      }
      var latitude,longitude;

      function success(position) {
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;
        pyrmont = new google.maps.LatLng(latitude, longitude);
        console.log(latitude,longitude,pyrmont);
        initialize();
      };

      function error() {
        console.log("Unable to retrieve your location");
      };
      navigator.geolocation.getCurrentPosition(success, error);
      
     }

     geoFindMe();
      function initialize() {

        //pyrmont = new google.maps.LatLng(12.9746, 77.6534);
        var mapOptions = {
          center: pyrmont,
          zoom: 15
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var request ={
                      location: pyrmont,
                      radius: 1000,
                      types: ['food']
                    };
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
      }

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log(results);
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i],i);
            html = template(results[i]);
            list.innerHTML += html;
          }
          list_handle.appendChild(list);
        }
      }

      function createMarker(place,i) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon:'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld='+(i+1)+'|FF776B|000000',
        });

        google.maps.event.addListener(marker, 'mouseover', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
      
      //google.maps.event.addDomListener(window, 'load', initialize);
