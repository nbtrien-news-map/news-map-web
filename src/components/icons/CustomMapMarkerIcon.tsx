import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { CategoryMarkerIcon } from './CategoryMarkerIcon';

interface MarkerIconConfig {
    circleRadius: number;
    circleFill: string;
    circleStroke: string;
    circleStrokeWidth: number;
    iconSize: number;
    stickFill: string;
    totalSize: [number, number];
    iconAnchor: [number, number];
    popupAnchor: [number, number];
}

const defaultConfig: MarkerIconConfig = {
    circleRadius: 14,
    circleFill: 'white',
    circleStroke: 'black',
    circleStrokeWidth: 2,
    iconSize: 24,
    stickFill: 'black',
    totalSize: [36, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
};

export const createCustomMapMarkerIcon = (categoryId: number, config: MarkerIconConfig = defaultConfig): L.Icon => {
    const svgString = renderToStaticMarkup(<CategoryMarkerIcon id={categoryId} size={config.iconSize} />);

    const svgDataUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;

    return new L.Icon({
        iconUrl: svgDataUrl,
        iconSize: config.totalSize,
        iconAnchor: config.iconAnchor,
        popupAnchor: config.popupAnchor,
        className: 'custom-pin-icon',
    });
};
