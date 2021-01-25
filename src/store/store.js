import { createStore, combineReducers } from 'redux';
import {filtrosAvanzadosReducer} from "../reducers/filtrosAvanzadosReducer";

const reducers = combineReducers({
    filtrosAvanzados: filtrosAvanzadosReducer
})

export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);