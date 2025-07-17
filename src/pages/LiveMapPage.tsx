import { Flex } from 'antd';
import { useState } from 'react';
import { MapControlBar } from '~/components/bar/MapControlBar';
import NewsMap from '~/features/news/components/NewsMap';
import { MapFilterPanel } from '~/layouts/MapFilterPanel';

export const LiveMapPage = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Flex className="w-full h-full z-0" vertical>
                <NewsMap />
            </Flex>

            <div className="absolute top-2 right-3 z-50 md:block">
                <Flex>
                    <MapControlBar onToggleFilter={() => setShowSidebar((prev) => !prev)} />
                </Flex>
            </div>

            {showSidebar && (
                <div className="absolute top-14 right-3 h-[85%] w-[400px] shadow-lg z-50 md:block hidden">
                    <MapFilterPanel onCloseFilter={() => setShowSidebar(false)} />
                </div>
            )}
        </div>
    );
};
