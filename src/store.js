import { configureStore, createSlice } from '@reduxjs/toolkit'

let headerColor = createSlice ({
    name: 'headerColor',
    initialState: "white",
    reducers: {
        changeColor(state, action) {
            console.log(state, action.payload);
            return state = action.payload;
        }
    }
});

export let {changeColor} = headerColor.actions;

export default configureStore({
  reducer: {
      headerColor: headerColor.reducer
  }
});