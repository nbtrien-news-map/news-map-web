import { type LatLngExpression } from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { createCustomMapMarkerIcon } from '~/components/icons/CustomMapMarkerIcon';
import { useNewsMap } from '../hooks/useNewsMap';

const MapUpdater = ({ center }: { center: LatLngExpression }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);

    return null;
};

const NewsMap = () => {
    const { state } = useNewsMap();
    const clusterOptions = {
        maxClusterRadius: 5,
        spiderfyOnMaxZoom: true,
        removeOutsideVisibleBounds: true,
        chunkedLoading: true,
    };

    return (
        <MapContainer
            center={[15.6425158, 108.0944116]}
            zoom={9}
            scrollWheelZoom={true}
            className="w-full h-[90vh] z-0"
            style={{ width: '100%', height: '100vh' }}
        >
            <MapUpdater center={state.center} />

            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <MarkerClusterGroup key={JSON.stringify(state.news)} {...clusterOptions}>
                {state?.news?.map((item) => (
                    <Marker
                        key={item.id}
                        position={[item.geocodingLocation.latitude, item.geocodingLocation.longitude]}
                        icon={createCustomMapMarkerIcon(item.category.id)}
                    >
                        <Popup>
                            <div>
                                <p>{item?.title}</p>
                                <p>{item?.address || item?.geocodingLocation.name}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
};
export default NewsMap;
