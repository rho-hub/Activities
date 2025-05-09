export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }
  
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
  
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        }),
        (error) => {
          console.warn(`Geolocation error (${error.code}): ${error.message}`);
          // Fallback to IP-based location
          fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
              if (data.latitude && data.longitude) {
                resolve({
                  lat: parseFloat(data.latitude),
                  lng: parseFloat(data.longitude),
                  accuracy: 5000 // Approximate accuracy for IP-based location
                });
              } else {
                reject(error); // Fallback failed
              }
            })
            .catch(() => reject(error));
        },
        options
      );
    });
  };
  
  export const fetchNearbyPlaces = (map, location) => {
    return new Promise((resolve, reject) => {
      if (!map || !window.google) return reject("Map not loaded");
      
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: new window.google.maps.LatLng(location.lat, location.lng),
        radius: 5000,
        type: ['park', 'tourist_attraction', 'amusement_park']
      };
  
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  };