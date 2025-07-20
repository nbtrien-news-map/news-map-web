export interface NewsCategory {
    id: number;
    name: string;
    nameEn: string;
    color?: string;
}
export const DEFAULT_CATEGORY_COLOR = '#9E9E9E';
export const NEWS_CATEGORIES: NewsCategory[] = [
    { id: 1, name: 'Kinh tế', nameEn: 'Economy', color: '#4CAF50' },
    { id: 2, name: 'An ninh - trật tự', nameEn: 'Security & Order', color: '#F44336' },
    { id: 3, name: 'Xã hội', nameEn: 'Society', color: '#9C27B0' },
    { id: 4, name: 'Chính trị', nameEn: 'Politics', color: '#3F51B5' },
    { id: 5, name: 'Giáo dục', nameEn: 'Education', color: '#2196F3' },
    { id: 6, name: 'Y tế', nameEn: 'Health', color: '#E91E63' },
    { id: 7, name: 'Thể thao', nameEn: 'Sports', color: '#FF9800' },
    { id: 8, name: 'Văn hóa', nameEn: 'Culture', color: '#795548' },
    { id: 9, name: 'Giải trí', nameEn: 'Entertainment', color: '#FFC107' },
    { id: 10, name: 'Khoa học - Công nghệ', nameEn: 'Science - Technology', color: '#00BCD4' },
    { id: 11, name: 'Môi trường', nameEn: 'Environment', color: '#388E3C' },
    { id: 12, name: 'Giao thông', nameEn: 'Transportation', color: '#607D8B' },
    { id: 13, name: 'Du lịch', nameEn: 'Tourism', color: '#03A9F4' },
    { id: 14, name: 'Pháp luật', nameEn: 'Law', color: '#D32F2F' },
    { id: 15, name: 'Quốc tế', nameEn: 'World News', color: '#009688' },
    { id: 16, name: 'Nông nghiệp', nameEn: 'Agriculture', color: '#8BC34A' },
    { id: 17, name: 'Công nghiệp', nameEn: 'Industry', color: '#9E9E9E' },
    { id: 18, name: 'Bất động sản', nameEn: 'Real Estate', color: '#FF5722' },
    { id: 19, name: 'Thị trường', nameEn: 'Market', color: '#CDDC39' },
];

export const NEWS_CATEGORY_MAP = new Map(NEWS_CATEGORIES.map((c) => [c.id, c]));
export const getCategoryColorById = (id: number): string => NEWS_CATEGORY_MAP.get(id)?.color || DEFAULT_CATEGORY_COLOR;
