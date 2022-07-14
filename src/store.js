import { configureStore, createSlice } from '@reduxjs/toolkit'

let themeColor = createSlice ({
    name: 'headerColor',
    initialState: "white",
    reducers: {
        changeColor(state, action) {
            // console.log(state, action.payload);
            return state = action.payload;
        }
    }
});

export let {changeColor} = themeColor.actions;

let projectIdx = createSlice ({
  name: 'projectIdx',
  initialState: 0,
  reducers: {
      changeIdx(state, action) {
          // console.log(state, action.payload);
          return state = action.payload;
      }
  }
});

export let {changeIdx} = projectIdx.actions;

export default configureStore({
  reducer: {
    themeColor: themeColor.reducer,
    projectIdx: projectIdx.reducer
  }
});