import { BellOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { BiSearch } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';
import { TiLocationArrowOutline } from 'react-icons/ti';
import { CircleButton } from '../button/CircleButton';
import { IconButton } from '../button/IconButton';

export const MapControlBar = ({ onToggleFilter }: { onToggleFilter: () => void }) => {
    return (
        <Flex gap={10} justify="center" align="center">
            <CircleButton
                icon={<TiLocationArrowOutline size="25px" />}
                className="!bg-gray-800 backdrop-blur-sm border border-white/20 shadow-md"
                size="large"
            />
            <CircleButton
                icon={<BiSearch />}
                className="!bg-gray-800 backdrop-blur-sm border border-white/20 shadow-md"
                size="large"
            />
            <Flex
                align="center"
                gap={10}
                className="px-3 rounded-full bg-gray-800 backdrop-blur-sm border border-white/20 shadow-md"
            >
                <IconButton icon={<FiFilter />} size="large" onClick={onToggleFilter} />
                <IconButton icon={<BellOutlined />} size="large" />
                <IconButton icon={<InfoCircleOutlined />} size="large" />
            </Flex>
        </Flex>
    );
};
