// src/actions/bookingActions.js

export const setCurrentBookingDetails = (bookingInfo) => {
    return {
        type: 'SET_CURRENT_BOOKING_INFO',
        payload: bookingInfo
    };
};

export const addBookingResult = (bookingResult) => {
    return {
        type: 'ADD_BOOKING_RESULT',
        payload: bookingResult
    };
};
