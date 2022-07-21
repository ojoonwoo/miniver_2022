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

let transitionState = createSlice ({
  name: 'transitionState',
  initialState: "initial",
  reducers: {
    setTransitionState(state, action) {
          // console.log(state, action.payload);
          return state = action.payload;
      }
  }
});

export let {setTransitionState} = transitionState.actions;

export default configureStore({
  reducer: {
    themeColor: themeColor.reducer,
    transitionState: transitionState.reducer,
  }
});