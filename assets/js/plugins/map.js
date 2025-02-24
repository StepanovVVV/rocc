// Function to dynamically load the Google Maps API script
function loadGoogleMapsScript(callback) {
    var script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapData.api_key}&callback=${callback}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Function to initialize the map
function initMap() {
    var geocoder = new google.maps.Geocoder();

    // Geocode the address that is transmitted from the customizer
    geocoder.geocode({ 'address': mapData.address }, function(results, status) {
        if (status === 'OK') {
            // Obtaining coordinates from geocoding results
            var mapCenter = results[0].geometry.location;

            // Map styling to change colors
            var mapStyles = [
                {
                    "featureType": "poi",  // Hide points of interest (POI)
                    "elementType": "labels",
                    "stylers": [{ "visibility": "off" }]
                },
                {
                    "featureType": "administrative",  // Hide administrative labels
                    "elementType": "labels",
                    "stylers": [{ "visibility": "off" }]
                },
                {
                    "featureType": "transit",  // Hide public transit labels
                    "elementType": "labels",
                    "stylers": [{ "visibility": "off" }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#525252" }] // Water color
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#333333" }] // Landscape color
                },
                {
                    "featureType": "landscape.natural",  // Change vegetation color
                    "elementType": "geometry",
                    "stylers": [{ "color": "#333333" }] // Vegetation color
                },
                {
                    "featureType": "landscape.park",  // Change park areas color
                    "elementType": "geometry",
                    "stylers": [{ "color": "#333333" }] // Park color
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#2b2b2b" }] // Road color
                },
                {
                    "featureType": "road",  // Change street name labels color
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#d0c2a4" }] // Street name color
                },
                {
                    "featureType": "administrative.locality",  // Change city name labels color
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#d0c2a4" }] // City name color
                }
            ];

            // Create the map
            var map = new google.maps.Map(document.getElementById('map'), {
                center: mapCenter, // Use geocoded coordinates as map center
                zoom: 18,
                styles: mapStyles // Apply map styles
            });

            // Add marker at the geocoded location
            var marker = new google.maps.Marker({
                map: map,
                position: mapCenter,
                title: mapData.title, // Use site title as marker title
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 20,
                    fillColor: "#c9ab80",
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "#c9ab80"
                }
            });

            // Set the map center to the geocoded location
            map.setCenter(mapCenter);
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// Load the Google Maps API and call initMap
loadGoogleMapsScript('initMap');
