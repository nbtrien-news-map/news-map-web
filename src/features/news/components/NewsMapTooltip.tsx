import { Flex, Typography } from 'antd';
import React from 'react';

type NewsMapTooltipProps = {
    title: string;
    subtitle: {
        key: string;
        value: string;
    }[];
};

const NewsMapTooltip: React.FC<NewsMapTooltipProps> = ({ title, subtitle }) => {
    return (
        <Flex vertical={true} justify="start" gap={10} className="min-w-52 p-3 bg-gray-900 rounded-md">
            <Typography.Text className="text-md text-white text-start font-bold">{title}</Typography.Text>
            <Flex vertical={true} justify="start" gap={3}>
                {subtitle?.map((item, index) => (
                    <Flex justify="start" gap={3} key={index}>
                        <Typography.Text className="text-xs text-start text-gray-200 font-bold leading-tight">
                            {item.key}:
                        </Typography.Text>
                        <Typography.Text key={index} className="text-xs text-start text-gray-200 leading-tight">
                            {item.value}
                        </Typography.Text>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};

export default NewsMapTooltip;
