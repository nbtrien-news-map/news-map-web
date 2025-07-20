import { BellOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Flex, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';
import { TiLocationArrowOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAreaByLocation } from '~/api/endpoints/area.api';
import { removeSelectedArea, setSelectedArea } from '~/features/area/slices/selectedAreaSlice';
import { GEOLOCATION_PERMISSION_STATE, useUserGeolocation } from '~/features/user-geolocation/hooks/useUserGeolocation';
import type { RootState } from '~/store';
import { CircleButton } from '../button/CircleButton';
import { IconButton } from '../button/IconButton';

export const MapControlBar = ({ onToggleFilter }: { onToggleFilter: () => void }) => {
    const { permissionState } = useUserGeolocation();
    const position = useSelector((state: RootState) => state.userPosition.position);
    const [isLocateDisabled, setIsLocateDisabled] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const isDenied = permissionState === GEOLOCATION_PERMISSION_STATE.DENIED;
        const isPromptWithoutPosition = permissionState === GEOLOCATION_PERMISSION_STATE.PROMPT && !position;
        const isUnsupported = permissionState === null;

        setIsLocateDisabled(isDenied || isPromptWithoutPosition || isUnsupported);
    }, [permissionState, position]);

    const handleLocate = async () => {
        if (position) {
            try {
                const area = await fetchAreaByLocation(position.latitude, position.longitude);
                if (area) {
                    dispatch(setSelectedArea(area));
                } else {
                    dispatch(removeSelectedArea());
                }
            } catch (error) {
                dispatch(removeSelectedArea());
            }
        }
    };

    return (
        <Flex gap={10} justify="center" align="center">
            {isLocateDisabled ? (
                <Tooltip
                    placement="bottom"
                    className="border-0 custom-tooltip"
                    styles={{
                        body: {
                            padding: '0px',
                        },
                    }}
                    overlay={
                        <Flex vertical={true} justify="start" gap={10} className="p-3 bg-gray-900 rounded-md border-0">
                            <Typography.Text className="text-base">
                                Please grant location access permission to use this feature.
                            </Typography.Text>
                        </Flex>
                    }
                >
                    <span>
                        <CircleButton
                            disabled
                            icon={<TiLocationArrowOutline size="25px" />}
                            className="!bg-gray-800 backdrop-blur-sm border border-white/20 shadow-md"
                            size="large"
                            onClick={handleLocate}
                        />
                    </span>
                </Tooltip>
            ) : (
                <CircleButton
                    icon={<TiLocationArrowOutline size="25px" />}
                    className="!bg-gray-800 backdrop-blur-sm border border-white/20 shadow-md"
                    size="large"
                    onClick={handleLocate}
                />
            )}

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
