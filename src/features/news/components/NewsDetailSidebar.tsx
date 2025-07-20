import { Divider, Flex, Typography } from 'antd';
import React from 'react';
import { CgClose } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { IconButton } from '~/components/button/IconButton';
import type { RootState } from '~/store';
import type { NewsResponse } from '~/types/api/news';
import { formatDateTimeWithWeekday } from '~/utils/date-time.util';

type NewsDetailSidebarProps = {
    news: NewsResponse;
    onClose: () => void;
};

type InfoRowProps = {
    label: string;
    value: React.ReactNode;
};

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
    <Typography.Text className="text-sm  text-start">
        {label}: <Typography.Text className="text-sm text-gray-400 text-start">{value}</Typography.Text>
    </Typography.Text>
);

const NewsDetailSidebar: React.FC<NewsDetailSidebarProps> = ({ news, onClose }) => {
    const area = useSelector((state: RootState) => state.selectedArea.area?.name);
    return (
        <div className="p-4 h-full overflow-y-auto bg-gray-900 rounded-xl bg-opacity-90">
            <Flex justify="space-between" align="start">
                <Typography.Text className="text-base font-bold">{area || 'News Detail'}</Typography.Text>
                <IconButton size="small" icon={<CgClose />} onClick={onClose} />
            </Flex>
            <Divider className="border-t-1 border-gray-400" size="large" />
            <Flex vertical justify="start" align="start" gap={3}>
                <Typography.Text className="text-lg font-bold text-start">{news.title}</Typography.Text>
                <Typography.Text className="text-xs text-gray-400 font-extralight text-start">
                    {formatDateTimeWithWeekday(news.publishedAt)}
                </Typography.Text>
                <Typography.Text className="text-sm font-extralight text-start mt-2">
                    {news.description}
                </Typography.Text>

                <Flex vertical={true} gap={3} className="mt-3">
                    <InfoRow label="Category" value={news.category.name} />
                    <InfoRow label="Source" value={news.provider} />
                    <InfoRow label="Location" value={news.geocodingLocation.displayName} />
                    <InfoRow
                        label="Article Link"
                        value={
                            <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer">
                                {news.sourceUrl}
                            </a>
                        }
                    />
                </Flex>
            </Flex>
        </div>
    );
};

export default NewsDetailSidebar;
