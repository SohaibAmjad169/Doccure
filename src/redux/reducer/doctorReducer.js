import { SCROLL_TO_CARD_GRID,  RESET_SCROLL } from "../action/doctorAction";

const initialState = {
    allDoctors: [], // All doctors data
    filteredDoctors: [], // Doctors filtered based on search
    selectedDoctor: null, // Stores the selected doctor for details page
    scrollToCardGrid: false, // Default scroll state
};

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DOCTORS":
            return {
                ...state,
                allDoctors: action.payload,
                filteredDoctors: action.payload, // Initially, filteredDoctors is the same as allDoctors
            };

        case "FILTER_DOCTORS":
            return {
                ...state,
                filteredDoctors: action.payload,
            };

        case "FETCH_DOCTOR_BY_ID":
            return {
                ...state,
                selectedDoctor: action.payload, // Store the selected doctor
            };

        case SCROLL_TO_CARD_GRID:
            return {
                ...state,
                scrollToCardGrid: true, // Trigger scroll state
            };


        case RESET_SCROLL:
            return {
                ...state,
                scrollToCardGrid: false,  //  Reset scroll state after scrolling
            };


        default:
            return state;
    }
};

export default doctorReducer;
