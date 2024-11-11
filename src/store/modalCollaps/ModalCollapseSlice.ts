import { createSlice } from '@reduxjs/toolkit';




const modalaCollapsSlise = createSlice({
  name: 'camera',
  initialState: {
    ModalIsOpend: false, // Initial state is expanded (not collapsed)
  },
  reducers: {
    toggleModal(state) {
      state.ModalIsOpend = !state.ModalIsOpend; // Toggle the collapsed state
    },
  },
});

export default modalaCollapsSlise.reducer;
export const { toggleModal } = modalaCollapsSlise.actions;