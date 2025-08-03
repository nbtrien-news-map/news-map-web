import { Flex } from 'antd';
import { useCallback, useState } from 'react';
import { MapControlBar } from '~/components/bar/MapControlBar';
import NewsDetailSidebar from '~/features/news/components/NewsDetailSidebar';
import NewsMap from '~/features/news/components/NewsMap';
import { MapFilterPanel } from '~/layouts/MapFilterPanel';
import type { NewsResponse } from '~/types/api/news';

export const LiveMapPage = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [selectedNews, setSelectedNews] = useState<NewsResponse | null>(null);

    const handleSelectNews = useCallback((news: NewsResponse | null) => {
        setSelectedNews(news);
        setShowSidebar(false);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Flex className="w-full h-full z-0" vertical>
                <NewsMap onSelectNews={handleSelectNews} />
            </Flex>

            <div className="absolute top-2 right-3 z-50">
                <Flex>
                    <MapControlBar
                        onToggleFilter={() => {
                            setSelectedNews(null);
                            setShowSidebar((prev) => !prev);
                        }}
                    />
                </Flex>
            </div>

            <div
                className={`
                    fixed top-0 right-0 w-full sm:w-[400px]
                    z-50 transition-all duration-300
                    sm:top-14 sm:h-[85%] sm:right-3
                    ${showSidebar && !selectedNews ? 'translate-y-0' : '-translate-y-full sm:translate-y-0 sm:hidden'}
                `}
            >
                {showSidebar && !selectedNews && <MapFilterPanel onCloseFilter={() => setShowSidebar(false)} />}
            </div>

            <div
                className={`
                    fixed bottom-0 right-0 w-full sm:w-[400px]
                    z-50 transition-all duration-300
                    sm:top-14 sm:h-[85%] sm:right-3
                    ${selectedNews && !showSidebar ? 'translate-y-0' : 'translate-y-full sm:translate-y-0 sm:hidden'}
                `}
            >
                {selectedNews && !showSidebar && (
                    <NewsDetailSidebar news={selectedNews} onClose={() => setSelectedNews(null)} />
                )}
            </div>
        </div>
    );
};

export default LiveMapPage;
