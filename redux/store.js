/*import { combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './reducers/example';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';


const createNoopStorage = () => {
    return {
      getItem(_key) {
        return Promise.resolve(null);
      },
      setItem(_key, value) {
        return Promise.resolve(value);
      },
      removeItem(_key) {
        return Promise.resolve();
      },
    };
  };
  
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();


const homeConfig = {
    key: 'homeSlide',
    storage,
  };


const reducers = combineReducers({
   example : counterSlice

});


const persistedReducer = persistReducer(homeConfig, reducers);

//export const store = 
const makeStore = () => configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export const wrapper = createWrapper(makeStore);*/


import { combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './reducers/example';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import  postSlice  from './reducers/authReducer';
import chatReducer from './reducers/chatReducer';
const rootReducer = combineReducers({
  example : counterSlice,
  post : postSlice,
  chat : chatReducer
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true,
    
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    // we need it only on client side
    const persistConfig = {
      key: "nextjs",
      whitelist: ["example", "post", "chat"], // make sure it does not clash with server keys
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store = configureStore({
      reducer: persistedReducer,
      middleware: [thunk],
    });
    store.__persistor = persistStore(store); // Nasty hack
    return store;
  }
};

// Previous codes 

export const wrapper = createWrapper(makeStore);