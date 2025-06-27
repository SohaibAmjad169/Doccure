const initialState = {
    currentBookingInfo: null,
    bookingResults: JSON.parse(localStorage.getItem('bookingResults')) || [] 
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_BOOKING_INFO':
            return {
                ...state,
                currentBookingInfo: action.payload
            };
            
        case 'ADD_BOOKING_RESULT': {
            const updatedBookingResults = [...state.bookingResults, action.payload];
            localStorage.setItem('bookingResults', JSON.stringify(updatedBookingResults)); 
            return {
                ...state,
                bookingResults: updatedBookingResults
            };
        }
        default:
            return state;
    }
};

export default bookingReducer;
