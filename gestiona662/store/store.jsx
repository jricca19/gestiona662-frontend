import { legacy_createStore as createStore, combineReducers } from "@reduxjs/toolkit";
import usuarioReducer from "./slices/usuarioSlice"
import composeWithDevTools from "redux-devtools-expo-dev-plugin";

const rootReducer = combineReducers({
    usuario:usuarioReducer
});

export const store=createStore(rootReducer, composeWithDevTools());