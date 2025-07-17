import { getCategoryColorById } from '~/constants/newsCategories.constant';

type MarkerIconProps = {
    id: number;
    size?: number; // optional size
};

export const CategoryMarkerIcon: React.FC<MarkerIconProps> = ({ id, size = 160 }) => {
    const color = getCategoryColorById(id);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -65 512 600" width={size} height={size}>
            <path
                d="M256 0C167.6 0 96 71.6 96 160c0 27.2 8.4 52.4 22.6 73.2
         38.6 56.4 122.2 210 128.2 220 3.2 5 7.8 7 12.4 7s9.2-2
         12.4-7c6-10 89.6-163.6 128.2-220 14.2-20.8 22.6-46
         22.6-73.2 0-88.4-71.6-160-160-160z"
                fill={color}
                stroke="#000"
                strokeWidth="15"
            />
            <circle cx="256" cy="160" r="80" fill="#fff" stroke="#000" strokeWidth="25" />
        </svg>
    );
};
