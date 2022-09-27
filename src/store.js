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

let contactState = createSlice ({
  name: 'contactState',
  initialState: {
    step: 1,
    category: [],
    description: "",
    schedule: {
      startDate: "",
      endDate: ""
    },
    budget: "",
    company: "",
    name: "",
    phone: "",
    email: ""
  },
  reducers: {
    setContactState(state, action) {
          // console.log(state, action.payload);
          return state = action.payload;
      }
  }
});

export let {setContactState} = contactState.actions;


let currentDevice = createSlice ({
    name: 'currentDevice',
    initialState: 'mobile',
    reducers: {
      setDevice(state, action) {
        return state = action.payload;
      }
    }
});

export let {setDevice} = currentDevice.actions;


export default configureStore({
  reducer: {
    themeColor: themeColor.reducer,
    transitionState: transitionState.reducer,
    contactState: contactState.reducer,
    currentDevice: currentDevice.reducer
  }
});