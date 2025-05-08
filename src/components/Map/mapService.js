export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }),
          error => reject(error)
        );
      } else {
        reject(new Error("Geolocation is not supported"));
      }
    });
  };
  
  export const fetchNearbyPlaces = (map, location) => {
    return new Promise((resolve, reject) => {
      if (!map || !window.google) return reject("Map not loaded");
      
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: new window.google.maps.LatLng(location.lat, location.lng),
        radius: 5000,
        type: ['park', 'tourist_attraction']
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