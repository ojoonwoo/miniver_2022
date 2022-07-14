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
  initialState: '',
  reducers: {
      changeIdx(state, action) {
          // console.log(state, action.payload);
          return state = action.payload;
      }
  }
});

export let {changeIdx} = projectIdx.actions;

let transitionMode = createSlice ({
  name: 'transitionMode',
  initialState: {timeout: 3000, classNames: 'page'},
  reducers: {
      changeTransitionMode(state, action) {
          return state = action.payload;
      }
  }
});

export let {changeTransitionMode} = transitionMode.actions;

export default configureStore({
  reducer: {
    themeColor: themeColor.reducer,
    projectIdx: projectIdx.reducer,
    transitionMode: transitionMode.reducer
  }
});