import React, { useState } from 'react';
import DoctorLoop from './DoctorLoop'; // Component to display each doctor
import { useSelector } from 'react-redux'; // Use useSelector to access Redux state

const DoctorGrid = () => {
    const { filteredDoctors = [] } = useSelector((state) => state.doctors || {});  //  Prevents error // Access filteredDoctors from Redux store

    const [visibleDoctors, setVisibleDoctors] = useState(4); // Start with 3 doctors visible

    const handleLoadMore = () => {
        setVisibleDoctors((prevCount) => prevCount + 4); // Show 3 more doctors each time
    };

    return (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-10">
            <h2 className="text-center mb-8 text-3xl font-bold">Available Doctors</h2>

            {filteredDoctors.length === 0 ? (
                <div className="flex w-full items-center justify-center text-gray-600 text-xl mt-10">
                    No doctors found
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-6">
                        {/* Show only the number of doctors specified by visibleDoctors */}
                        {filteredDoctors.slice(0, visibleDoctors).map((doctor) => (
                            <DoctorLoop key={doctor.id} doctor={doctor} />
                        ))}
                    </div>

                    {visibleDoctors < filteredDoctors.length && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleLoadMore}
                                className="bg-[#0e82fd] text-white py-3 px-6 rounded-md hover:bg-[#0e82fd]/80 transition"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DoctorGrid;
