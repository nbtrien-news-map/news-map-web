import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AreaResponse } from '~/types/api/area';

interface SelectedAreaState {
    id: number | null;
    shortCode: string | null;
    latitude: number | null;
    longitude: number | null;
    name: string | null;
    boundingBox: number[];
}

const initialState: SelectedAreaState = {
    id: null,
    shortCode: null,
    latitude: null,
    longitude: null,
    name: null,
    boundingBox: [],
};

export const selectedAreaSlice = createSlice({
    name: 'selectedArea',
    initialState,
    reducers: {
        setSelectedArea: (state, action: PayloadAction<AreaResponse>) => {
            state.id = action.payload.id;
            state.shortCode = action.payload.shortCode;
            state.name = action.payload.name;
            ((state.latitude = action.payload.geocodingLocation.latitude),
                (state.longitude = action.payload.geocodingLocation.longitude));
            state.boundingBox = action.payload.geocodingLocation.boundingBox;
        },
    },
});

export const { setSelectedArea } = selectedAreaSlice.actions;
export default selectedAreaSlice.reducer;
