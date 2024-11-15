function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const mapDiv = document.getElementById('map');
    
    map = new google.maps.Map(mapDiv, {
        zoom: 14,
        center: { lat: myLatCoord, lng: myLonCoord } 
    });
    
    directionsRenderer.setMap(map);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const destination = { lat: myLatCoord, lng: myLonCoord }; 
            
            const request = {
                origin: userLocation,
                destination: destination,
                travelMode: 'DRIVING'
            };
            
            directionsService.route(request, (result, status) => {
                bussinessMarker(myLatCoord, myLonCoord);
                if (status == 'OK') {
                    directionsRenderer.setDirections(result);
                } else {
                    console.log('Directions request failed due to ' + status);
                }
            });
        }, () => {
            handleLocationError(true, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    console.log(browserHasGeolocation 
          ? 'Error: The Geolocation service failed.' 
          : 'Error: Your browser doesn\'t support geolocation.');
} 

// Showing the route to our site for user's or just a marker
// if there's no connecting route
function bussinessMarker(busLatCoord, busLngCoord) {
    const busLatLng = {lat: busLatCoord, lng: busLngCoord};

    var marker = new google.maps.Marker({
        position: busLatLng,
        map: map,
        title: 'Dr. TinaKing Business Address',
        icon: {
            url: 'assets/images/app/dr-tinaking-black-logo.png',
            scaledSize: new google.maps.Size(249, 50)
        }
    });
} 