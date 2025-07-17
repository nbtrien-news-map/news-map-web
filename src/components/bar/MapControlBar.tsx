import { BellOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { BiSearch } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';
import { CircleButton } from '../button/CircleButton';
import { IconButton } from '../button/IconButton';

export const MapControlBar = ({ onToggleFilter }: { onToggleFilter: () => void }) => {
    return (
        <Flex gap={10} justify="center" align="center">
            <CircleButton icon={<BiSearch />} className="bg-gray-800" />
            <Flex
                align="center"
                gap={10}
                className="px-3 rounded-full bg-gray-800 backdrop-blur-sm border border-white/20 shadow-md"
            >
                <IconButton icon={<FiFilter />} onClick={onToggleFilter} />
                <IconButton icon={<BellOutlined />} />
                <IconButton icon={<InfoCircleOutlined />} />
            </Flex>
        </Flex>
    );
};
