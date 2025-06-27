
// Action to filter doctors based on the search criteria
export const filterDoctors = (criteria) => (dispatch, getState) => {
    const { allDoctors } = getState().doctors;

    const filtered = allDoctors.filter((doctor) => {
        return (
            (!criteria.speciality || doctor.specialty === criteria.speciality) &&
            (!criteria.location || doctor.location === criteria.location)
        );
    });

    dispatch({
        type: "FILTER_DOCTORS",
        payload: filtered,
    });
};


// Action to set doctors in the Redux store
export const setDoctors = (doctors) => ({
    type: "SET_DOCTORS",
    payload: doctors,
});

// Action to fetch all doctors from the JSON file
export const fetchAllDoctors = () => async (dispatch) => {
    try {
        const response = await fetch("/doctorList.json"); 
        const doctors = await response.json();
        dispatch(setDoctors(doctors));
    } catch (error) {
        console.error("Error fetching doctors:", error);
    }
};


// Action to fetch doctor by ID from the JSON file
export const fetchDoctorById = (id) => async (dispatch, getState) => {
    const { allDoctors } = getState().doctors;

    // If doctors are not loaded, fetch them first
    if (!allDoctors || allDoctors.length === 0) {
        await dispatch(fetchAllDoctors());
    }

    // Re-fetch state after loading doctors
    const { allDoctors: updatedDoctors } = getState().doctors;
    const selectedDoctor = updatedDoctors.find((doctor) => doctor.id === parseInt(id, 10));

    if (selectedDoctor) {
        dispatch({
            type: "FETCH_DOCTOR_BY_ID",
            payload: selectedDoctor,
        });
    } else {
        console.error("Doctor not found for ID:", id);
    }
};



export const SCROLL_TO_CARD_GRID = "SCROLL_TO_CARD_GRID";

export const scrollToCardGrid = () => {
    return {
        type: SCROLL_TO_CARD_GRID,
    };
};

export const RESET_SCROLL = "RESET_SCROLL";


export const resetScroll = () => {
    return {
        type: RESET_SCROLL,
    };
};
