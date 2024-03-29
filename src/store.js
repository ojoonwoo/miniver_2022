import { configureStore, createSlice } from '@reduxjs/toolkit'

let themeColor = createSlice ({
    name: 'themeColor',
    initialState: "white",
    reducers: {
        changeColor(state, action) {
            // console.log(state, action.payload);
            return state = action.payload;
        }
    }
});

export let {changeColor} = themeColor.actions;

let menuState = createSlice ({
  name: 'menuState',
  initialState: true,
  reducers: {
      menuToggle(state, action) {
          // console.log(state, action.payload);
          return state = action.payload;
      }
  }
});

export let {menuToggle} = menuState.actions;

let heroBoxColor = createSlice ({
  name: 'heroBoxColor',
  initialState: "",
  reducers: {
      heroBoxChangeColor(state, action) {
          // console.log(state, action.payload);
          return state = action.payload;
      }
  }
});

export let {heroBoxChangeColor} = heroBoxColor.actions;

let transitionState = createSlice ({
  name: 'transitionState',
  initialState: "site_landing",
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
    heroBoxColor: heroBoxColor.reducer,
    transitionState: transitionState.reducer,
    contactState: contactState.reducer,
    currentDevice: currentDevice.reducer,
    menuState: menuState.reducer
  }
});