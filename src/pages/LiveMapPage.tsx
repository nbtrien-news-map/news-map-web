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

            <div className="absolute top-2 right-3 z-50 md:block">
                <Flex>
                    <MapControlBar
                        onToggleFilter={() => {
                            setSelectedNews(null);
                            setShowSidebar((prev) => !prev);
                        }}
                    />
                </Flex>
            </div>

            <div className="absolute top-14 right-3 h-[85%] w-[400px] z-50 md:block hidden">
                {showSidebar && !selectedNews && <MapFilterPanel onCloseFilter={() => setShowSidebar(false)} />}
                {selectedNews && !showSidebar && (
                    <NewsDetailSidebar news={selectedNews} onClose={() => setSelectedNews(null)} />
                )}
            </div>
        </div>
    );
};
