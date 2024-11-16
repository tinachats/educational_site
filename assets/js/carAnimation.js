// Car image
const whiteVan = 'assets/images/app/white_van.png';

// Business Logo
const businessLogo = 'assets/images/app/dr-tinaking-black-logo.png';

// My coordinations
const businessLocation = {
    lat: -17.7464668454956, 
    lng: 31.016642406010643
};

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: businessLocation,
        zoom: 14
    });

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    
    directionsRenderer.setMap(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const destination = businessLocation; 
            
            const request = {
                origin: userLocation,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            };
            
            directionsService.route(request, (result, status) => {
                businessMarker(businessLocation);
                if (status === 'OK') {
                    directionsRenderer.setDirections(result);
                    var route = result.routes[0].overview_path;
                    var distance = result.routes[0].legs[0].distance.text;
                    var duration = result.routes[0].legs[0].duration.text;
                    
                    // Display the distance and the duration on the map
                    document.getElementById('time-value').innerHTML = duration;
                    document.getElementById('distance-value').innerHTML = `(${distance})`;

                    // Add directions panel
                    const directionsPanel = document.getElementById('directions');
                    result.routes[0].legs[0].steps.forEach(step => {
                        const stepElement = document.createElement('div');
                        stepElement.innerHTML = `
                            <p>${step.instructions}</p>
                            <div class="collapse" id="collapse${step.index}">
                                <div class="card card-body">
                                <p>${step.html_instructions}</p>
                                </div>
                            </div>
                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${step.index}">
                                Show Details
                            </button>
                        `;
                    directionsPanel.appendChild(stepElement);
                    });
                    carMarker(userLocation);
                    animateCar(route);
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

function businessMarker(position) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Dr. TinaKing Business Address',
        icon: {
            url: businessLogo,
            scaledSize: new google.maps.Size(249, 50)
        }
    });
}

function carMarker(position) {
    var carMapMarker = new google.maps.Marker({ 
        position: position,
        map: map,
        title: 'Your current location',
        icon: {
            url: whiteVan, 
            scaledSize: new google.maps.Size(100, 100)
        }
    });
}

function animateCar(route) {
    
    line = new google.maps.Polyline({path: [route[0]], map: map});

    function moveCar() {
        step += 1;
        if (step >= route.length) return;
        var nextPosition = route[step];
        line.getPath().push(nextPosition);
        carMarker.setPosition({
            lat: nextPosition.lat(),
            lng: nextPosition.lng()
        });
        setTimeout(moveCar, delay);
    }

    moveCar();
} 