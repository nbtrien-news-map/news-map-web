import L, { type LatLngExpression } from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import React, { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { createCustomMapMarkerIcon } from '~/components/icons/CustomMapMarkerIcon';
import { NumberedMarkerIcon } from '~/components/icons/NumberedMarkerIcon';
import type { NewsResponse } from '~/types/api/news';
import { formatDateTimeWithWeekday } from '~/utils/date-time.util';
import { useNewsMap } from '../hooks/useNewsMap';
import NewsMapTooltip from './NewsMapTooltip';

type NewsMapProps = {
    onSelectNews: (item: NewsResponse) => void;
};

const MapUpdater = ({ center }: { center: LatLngExpression }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, 9);
        }
    }, [center, map]);
    return null;
};

const NewsMap = ({ onSelectNews }: NewsMapProps) => {
    const { state } = useNewsMap();

    const clusterOptions = {
        maxClusterRadius: 5,
        spiderfyOnMaxZoom: true,
        removeOutsideVisibleBounds: true,
        chunkedLoading: true,
        iconCreateFunction: (cluster: any) => {
            const count = cluster.getChildCount();
            const svgString = renderToStaticMarkup(<NumberedMarkerIcon number={count} />);
            const svgDataUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
            return new L.Icon({
                iconUrl: svgDataUrl,
                iconSize: [50, 60],
                iconAnchor: [25, 60],
                popupAnchor: [0, -48],
            });
        },
    };

    return (
        <div className="flex h-[90vh]">
            <MapContainer
                center={state.center}
                zoom={9}
                scrollWheelZoom={true}
                className="w-full h-[90vh] z-0"
                style={{ width: '100%', height: '100vh' }}
            >
                <MapUpdater center={state.center} />

                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <MarkerClusterGroup key={JSON.stringify(state.news)} {...clusterOptions}>
                    {state?.news?.map((item) => (
                        <Marker
                            key={item.id}
                            position={[item.geocodingLocation.latitude, item.geocodingLocation.longitude]}
                            icon={createCustomMapMarkerIcon(item.category.id)}
                            eventHandlers={{
                                click: () => onSelectNews(item),
                            }}
                        >
                            <Tooltip direction="top" offset={[2, -42]} interactive opacity={1} permanent={false}>
                                <NewsMapTooltip
                                    title={item.title}
                                    subtitle={[
                                        {
                                            key: 'Published',
                                            value: formatDateTimeWithWeekday(item?.publishedAt),
                                        },
                                        {
                                            key: 'Source',
                                            value: item.provider,
                                        },
                                        {
                                            key: 'Location',
                                            value: item.geocodingLocation.displayName,
                                        },
                                    ]}
                                />
                            </Tooltip>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
};
export default React.memo(NewsMap);
