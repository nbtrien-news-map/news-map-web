export interface NewsCategory {
    id: number;
    name: string;
    nameEn: string;
    color?: string;
}
export const DEFAULT_CATEGORY_COLOR = '#9E9E9E';
export const NEWS_CATEGORIES: NewsCategory[] = [
    {
        id: 1,
        name: 'Thời sự',
        nameEn: 'Current Affairs',
        color: '#F44336', // red
    },
    {
        id: 2,
        name: 'Kinh tế',
        nameEn: 'Economy',
        color: '#FF9800', // orange
    },
    {
        id: 3,
        name: 'Thể thao',
        nameEn: 'Sports',
        color: '#4CAF50', // green
    },
    {
        id: 4,
        name: 'Giải trí',
        nameEn: 'Entertainment',
        color: '#9C27B0', // purple
    },
    {
        id: 5,
        name: 'Công nghệ',
        nameEn: 'Technology',
        color: '#2196F3', // blue
    },
    {
        id: 6,
        name: 'Giáo dục',
        nameEn: 'Education',
        color: '#3F51B5', // indigo
    },
    {
        id: 7,
        name: 'Sức khỏe',
        nameEn: 'Health',
        color: '#E91E63', // pink
    },
    {
        id: 8,
        name: 'Đời sống',
        nameEn: 'Lifestyle',
        color: '#FFEB3B', // yellow
    },
    {
        id: 9,
        name: 'Xã hội',
        nameEn: 'Society',
        color: '#00BCD4', // cyan
    },
    {
        id: 10,
        name: 'An ninh - trật tự',
        nameEn: 'Security & Order',
        color: '#8BC34A', // light green
    },
];

export const NEWS_CATEGORY_MAP = new Map(NEWS_CATEGORIES.map((c) => [c.id, c]));
export const getCategoryColorById = (id: number): string => NEWS_CATEGORY_MAP.get(id)?.color || DEFAULT_CATEGORY_COLOR;
