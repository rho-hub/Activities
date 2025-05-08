export const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };
  
  export const center = {
    lat: 0,
    lng: 0
  };
  
  export const defaultMapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  };