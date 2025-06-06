import { legacy_createStore as createStore, combineReducers } from "@reduxjs/toolkit";
import usuarioReducer from "./slices/usuarioSlice"

const rootReducer = combineReducers({
    usuario:usuarioReducer
});

export const store=createStore(rootReducer);