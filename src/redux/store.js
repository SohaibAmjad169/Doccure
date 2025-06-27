import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";  //  FIXED: Correct import
import doctorReducer from "./reducer/doctorReducer"; 
import bookingReducer from "./reducer/bookingReducer"; 

const rootReducer = combineReducers({
    doctors: doctorReducer,  //  Ensure this matches `useSelector((state) => state.doctors)`
    booking: bookingReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk)); //  Apply middleware correctly

export default store;
