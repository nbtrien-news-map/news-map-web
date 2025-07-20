import { configureStore } from '@reduxjs/toolkit';
import selectedAreaReducer from '~/features/area/slices/selectedAreaSlice';
import selectedCategoriesReducer from '~/features/category/slices/selectedCategoriesSlice';
import userPositionReducer from '~/features/user-geolocation/slices/userPositionSlice';

export const store = configureStore({
    reducer: {
        selectedArea: selectedAreaReducer,
        selectedCategories: selectedCategoriesReducer,
        userPosition: userPositionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
