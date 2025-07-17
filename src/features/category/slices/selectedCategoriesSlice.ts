import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SelectedCategoriesState {
    ids: number[];
}

const initialState: SelectedCategoriesState = {
    ids: [],
};

export const selectedCategoriesSlice = createSlice({
    name: 'selectedCategories',
    initialState,
    reducers: {
        initializeSelectedCategories: (state, action: PayloadAction<number[]>) => {
            if (state.ids.length === 0) {
                state.ids = action.payload;
            }
        },
        setSelectedCategories: (state, action: PayloadAction<number[]>) => {
            state.ids = action.payload;
        },
        addCategory: (state, action: PayloadAction<number>) => {
            if (!state.ids.includes(action.payload)) {
                state.ids.push(action.payload);
            }
        },
        removeCategory: (state, action: PayloadAction<number>) => {
            state.ids = state.ids.filter((id) => id !== action.payload);
        },
        clearSelectedCategories: (state) => {
            state.ids = [];
        },
    },
});

export const {
    initializeSelectedCategories,
    setSelectedCategories,
    addCategory,
    removeCategory,
    clearSelectedCategories,
} = selectedCategoriesSlice.actions;
export default selectedCategoriesSlice.reducer;
