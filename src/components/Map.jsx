import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import styles from './Map.module.css';
import { useState, useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeoLocation.js';
import Button from './Button';
import { useUrlPositions } from '../hooks/useUrlPositions.js';
function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeolocation();
  const [lat, lng] = useUrlPositions();

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <Button onclick={getPosition} type='position'>
        {isLoadingPosition ? 'Loading...' : 'My position'}
      </Button>
      <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />

        <DetectClick />
      </MapContainer>
    </div>
  );
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
