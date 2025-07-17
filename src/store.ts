import { configureStore } from '@reduxjs/toolkit';
import selectedAreaReducer from '~/features/area/slices/selectedAreaSlice';
import selectedCategoriesReducer from '~/features/category/slices/selectedCategoriesSlice';

export const store = configureStore({
    reducer: {
        selectedArea: selectedAreaReducer,
        selectedCategories: selectedCategoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
