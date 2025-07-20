import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface UserPosition {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude?: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
    timestamp: number;
}

interface UserPositionState {
    position: UserPosition | null;
}

const initialState: UserPositionState = {
    position: null,
};

export const userPositionSlice = createSlice({
    name: 'userPosition',
    initialState,
    reducers: {
        setUserPosition: (state, action: PayloadAction<UserPosition>) => {
            state.position = action.payload;
        },
        removeUserPosition: (state) => {
            state.position = null;
        },
    },
});

export const { setUserPosition, removeUserPosition } = userPositionSlice.actions;
export default userPositionSlice.reducer;
