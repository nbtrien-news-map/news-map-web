export interface NewsCategory {
    id: number;
    name: string;
    nameEn: string;
    color?: string;
}
export const DEFAULT_CATEGORY_COLOR = '#212121';
export const NEWS_CATEGORIES: NewsCategory[] = [
    { id: 1, name: 'Kinh tế', nameEn: 'Economy', color: '#2E7D32' }, // Dark green – represents finance, growth
    { id: 2, name: 'An ninh - trật tự', nameEn: 'Security & Order', color: '#C62828' }, // Deep red – urgency, warning, safety
    { id: 3, name: 'Xã hội', nameEn: 'Society', color: '#6A1B9A' }, // Deep purple – community, diversity
    { id: 4, name: 'Chính trị', nameEn: 'Politics', color: '#283593' }, // Navy blue – authority, trust
    { id: 5, name: 'Giáo dục', nameEn: 'Education', color: '#1565C0' }, // Bright blue – knowledge, clarity
    { id: 6, name: 'Y tế', nameEn: 'Health', color: '#AD1457' }, // Deep pink – care, medical
    { id: 7, name: 'Thể thao', nameEn: 'Sports', color: '#EF6C00' }, // Bright orange – energy, action
    { id: 8, name: 'Văn hóa - Du lịch', nameEn: 'Culture & Tourism', color: '#4E342E' }, // Wood brown – tradition, exploration
    { id: 9, name: 'Giải trí', nameEn: 'Entertainment', color: '#F9A825' }, // Sun yellow – fun, attention
    { id: 10, name: 'Môi trường', nameEn: 'Environment', color: '#00897B' }, // Teal green – nature, sustainability
    { id: 11, name: 'Giao thông', nameEn: 'Transportation', color: '#455A64' }, // Slate gray – infrastructure, movement
    { id: 12, name: 'Bất động sản', nameEn: 'Real Estate', color: '#5D4037' }, // Earth brown – property, stability
];

export const NEWS_CATEGORY_MAP = new Map(NEWS_CATEGORIES.map((c) => [c.id, c]));
export const getCategoryColorById = (id: number): string => NEWS_CATEGORY_MAP.get(id)?.color || DEFAULT_CATEGORY_COLOR;
