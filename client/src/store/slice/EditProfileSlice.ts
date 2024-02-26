import { createSlice } from "@reduxjs/toolkit";

export interface IEditProfile {
    isProfileModalOpen: boolean
    isUploadModalOpen: boolean
}

const initialState: IEditProfile = {
    isProfileModalOpen: false,
    isUploadModalOpen: false,
};

export const EditProfileSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        openProfileModal: (state) => {
            state.isProfileModalOpen = true;
        },
        closeProfileModal: (state) => {
            state.isProfileModalOpen = false;
        },
        openUploadModal: (state) => {
            state.isUploadModalOpen = true;
        },
        closeUploadModal: (state) => {
            state.isUploadModalOpen = false;
        },
        resetState: () => initialState
    },
});

export const { openProfileModal, closeProfileModal, openUploadModal, closeUploadModal, resetState } = EditProfileSlice.actions;
export const EditProfileReducer = EditProfileSlice.reducer;