import { Divider, Flex, Typography } from 'antd';
import { CgClose } from 'react-icons/cg';
import { IconButton } from '~/components/button/IconButton';
import { AreaFilter } from '~/features/area/components/AreaFilter';
import { CategorySelector } from '~/features/category/components/CategorySelector';

export const MapFilterPanel = ({ onCloseFilter }: { onCloseFilter: () => void }) => {
    return (
        <div className="p-4 h-full overflow-y-auto bg-gray-900 rounded-xl bg-opacity-90">
            <Flex justify="space-between" align="start">
                <Typography.Text className="text-md font-bold">Filters</Typography.Text>
                <IconButton size="small" icon={<CgClose />} onClick={onCloseFilter} />
            </Flex>
            <Divider size="small" />
            <Flex vertical justify="start" align="start" gap={10}>
                <Typography.Text className="text-xs text-gray-400">Areas</Typography.Text>
                <AreaFilter />
                <Typography.Text className="text-xs text-gray-400">Categories</Typography.Text>
                <CategorySelector />
            </Flex>
        </div>
    );
};
