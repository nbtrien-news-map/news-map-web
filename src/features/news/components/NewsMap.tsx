import L, { type LatLngExpression } from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, Polygon, TileLayer, Tooltip, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { createCustomMapMarkerIcon } from '~/components/icons/CustomMapMarkerIcon';
import { NumberedMarkerIcon } from '~/components/icons/NumberedMarkerIcon';
import type { NewsResponse } from '~/types/api/news';
import { formatDateTimeWithWeekday } from '~/utils/date-time.util';
import { useNewsMap } from '../hooks/useNewsMap';
import NewsMapTooltip from './NewsMapTooltip';
import { DEFAULT_CATEGORY_COLOR } from '~/constants/newsCategories.constant';

type NewsMapProps = {
    onSelectNews: (item: NewsResponse) => void;
};

const polygonStyle = {
    fillColor: 'rgba(30, 144, 255, 0.2)',
    fillOpacity: 0.4,
    weight: 1,
    color: '#1E90FF',
    opacity: 0.8,
};

const MapUpdater = ({ center }: { center: LatLngExpression }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.panTo(center, {
                animate: true,
                duration: 1.5,
            });
        }
    }, [center, map]);
    return null;
};

const NewsMap = ({ onSelectNews }: NewsMapProps) => {
    const { state } = useNewsMap();
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const clusterOptions = {
        maxClusterRadius: 5,
        spiderfyOnMaxZoom: true,
        removeOutsideVisibleBounds: true,
        chunkedLoading: true,
        iconCreateFunction: (cluster: any) => {
            const count = cluster.getChildCount();
            const svgString = renderToStaticMarkup(
                <NumberedMarkerIcon number={count} color={DEFAULT_CATEGORY_COLOR} />
            );
            const svgDataUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
            return new L.Icon({
                iconUrl: svgDataUrl,
                iconSize: [50, 70],
                iconAnchor: [30, 75],
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
                className="w-full h-full z-10"
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
                            {!isMobileDevice && (
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
                            )}
                        </Marker>
                    ))}
                </MarkerClusterGroup>
                {state?.areaPolygon?.length > 0 && <Polygon pathOptions={polygonStyle} positions={state.areaPolygon} />}
            </MapContainer>
        </div>
    );
};
export default React.memo(NewsMap);
