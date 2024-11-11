import { createSlice } from '@reduxjs/toolkit';




const SidebarSlice = createSlice({
  name: 'subjects',
  initialState: {
    isExpended: false, // Initial state is expanded (not collapsed)
  },
  reducers: {
    toggleCollapse(state) {
      state.isExpended = !state.isExpended; // Toggle the collapsed state
    },
  },
});

export default SidebarSlice.reducer;
export const { toggleCollapse } = SidebarSlice.actions;