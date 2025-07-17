import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '~/store';
import { useAreaFilter } from '../hooks/useAreaFilter';
import { setSelectedArea } from '../slices/selectedAreaSlice';

export const AreaFilter = () => {
    const { state } = useAreaFilter();
    const selectedAreaId = useSelector((state: RootState) => state.selectedArea.id);
    const dispatch = useDispatch();
    return (
        <div className="flex flex-wrap gap-2">
            {state?.areas?.map((area) => {
                const isSelected = selectedAreaId === area?.id;
                return (
                    <Button
                        key={area?.id}
                        onClick={() => dispatch(setSelectedArea(area))}
                        type="text"
                        className={
                            'bg-transparent text-gray-300 text-sm font-light border-0 px-4 py-0 outline-none shadow-none rounded-3xl ' +
                            (isSelected
                                ? '!bg-gray-700 text-white hover:!text-white hover:!bg-gray-700'
                                : 'hover:!text-white hover:!bg-gray-800')
                        }
                    >
                        {area?.shortName}
                    </Button>
                );
            })}
        </div>
    );
};
