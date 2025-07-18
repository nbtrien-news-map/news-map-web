type NumberMarkerIconProps = {
    number: number;
    size?: number;
    color?: string;
};

export const NumberedMarkerIcon = ({ number, size = 40, color = '#ff1744' }: NumberMarkerIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -65 512 600" width={size} height={size}>
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="strongTextShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.6" />
                </filter>
            </defs>

            <path
                d="M256 0C167.6 0 96 71.6 96 160
                    c0 27.2 8.4 52.4 22.6 73.2
                    38.6 56.4 122.2 210 128.2 220
                    3.2 5 7.8 7 12.4 7s9.2-2 12.4-7
                    c6-10 89.6-163.6 128.2-220
                    14.2-20.8 22.6-46 22.6-73.2
                    0-88.4-71.6-160-160-160z"
                fill={color}
                stroke="#000"
                strokeWidth="18"
                filter="url(#glow)"
            />

            <circle cx="256" cy="160" r="100" fill="#222222" stroke="#000000" strokeWidth="15" />

            <text
                x="256"
                y="160"
                dy="0.3em"
                dx="-0.1em"
                textAnchor="middle"
                fontSize="130"
                fontWeight="900"
                fontFamily="Arial, sans-serif"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="10"
                paintOrder="stroke fill"
                filter="url(#strongTextShadow)"
            >
                +{number}
            </text>
        </svg>
    );
};
