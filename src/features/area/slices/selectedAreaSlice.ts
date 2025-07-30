import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AreaResponse } from '~/types/api/area';

interface SelectedArea {
    id: number;
    shortCode: string;
    name: string;
    latitude: number;
    longitude: number;
    osmId: number;
    osmType: string;
    boundingBox: number[];
}

interface SelectedAreaState {
    area: SelectedArea | null;
}

const initialState: SelectedAreaState = {
    area: null,
};

export const selectedAreaSlice = createSlice({
    name: 'selectedArea',
    initialState,
    reducers: {
        setSelectedArea: (state, action: PayloadAction<AreaResponse>) => {
            if (!state.area) {
                state.area = {} as SelectedArea;
            }
            state.area.id = action.payload.id;
            state.area.shortCode = action.payload.shortCode;
            state.area.name = action.payload.name;
            state.area.latitude = action.payload.latitude;
            state.area.longitude = action.payload.longitude;
            state.area.boundingBox = action.payload.boundingBox;
            state.area.osmId = action.payload.osmId;
            state.area.osmType = action.payload.osmType;
        },
        removeSelectedArea: (state) => {
            state.area = null;
        },
    },
});

export const { setSelectedArea, removeSelectedArea } = selectedAreaSlice.actions;
export default selectedAreaSlice.reducer;
