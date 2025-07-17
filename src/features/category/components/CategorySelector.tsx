import { Button, Col, Flex, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryMarkerIcon } from '~/components/icons/CategoryMarkerIcon';
import type { RootState } from '~/store';
import { useCategorySelector } from '../hooks/useCategorySelector';
import { addCategory, removeCategory } from '../slices/selectedCategoriesSlice';

export const CategorySelector = () => {
    const { state } = useCategorySelector();
    const dispatch = useDispatch();

    const selectedCategories = useSelector((state: RootState) => state.selectedCategories.ids);

    const handleSelectAll = () => {
        state.categories?.forEach((item) => {
            dispatch(addCategory(item.id));
        });
    };
    return (
        <Row gutter={5}>
            {state?.categories?.map((category) => {
                const categoryId = category.id;
                const isSelected = selectedCategories.includes(categoryId);
                const isLastSelected = isSelected && selectedCategories.length === 1;
                return (
                    <Col span={12} key={categoryId}>
                        <Button
                            onClick={() => {
                                if (isSelected) {
                                    if (selectedCategories.length === 1) {
                                        return;
                                    }
                                    dispatch(removeCategory(categoryId));
                                } else {
                                    dispatch(addCategory(categoryId));
                                }
                            }}
                            type="text"
                            className={
                                'w-full p-0 hover:!bg-gray-700 text-gray-300 text-xs font-light border-0 outline-none shadow-none rounded-md ' +
                                (isSelected
                                    ? '!bg-gray-600 text-white hover:!text-white '
                                    : 'hover:!text-white bg-gray-800') +
                                (isLastSelected ? ' cursor-not-allowed hover:!bg-gray-600' : '')
                            }
                        >
                            <Flex className="w-full" gap={3} justify="start" align="center">
                                <CategoryMarkerIcon id={categoryId} size={30} />
                                {category?.name}
                            </Flex>
                        </Button>
                    </Col>
                );
            })}
            <Col span={24} className="flex justify-start">
                <Button
                    className="p-0 bg-transparent hover:!bg-transparent hover:!text-gray-100 text-gray-300 text-xs font-light border-0 outline-none shadow-none"
                    onClick={handleSelectAll}
                >
                    Select all
                </Button>
            </Col>
        </Row>
    );
};
