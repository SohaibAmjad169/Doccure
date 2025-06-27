import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDoctorById } from "../../redux/action/doctorAction";

const DoctorLoop = ({ doctor }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCardClick = () => {
        // Dispatch action to fetch doctor details
        dispatch(fetchDoctorById(doctor.id));
        navigate(`/doctor/${doctor.id}`); // Navigate to the doctor details page
    };

    return (
        <div
            className="bg-white p-4 rounded shadow-md hover:shadow-lg transition relative cursor-pointer"
            onClick={handleCardClick} // Attach the click handler
        >
            {/* Doctor Image Section */}
            <div className="w-full h-48 rounded overflow-hidden relative">
                {/* Image */}
                <img
                    src={doctor.image}
                    alt={doctor.doctorName}
                    className="w-full h-full object-cover"
                />
                {/* Appointment Fee */}
                <div className="absolute top-2 right-2 bg-[#0e82fd] text-white text-sm font-semibold px-2 py-1 rounded">
                    ${doctor.appointmentFee}
                </div>
                {/* Availability */}
                <div
                    className={`absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium ${doctor.available
                            ? "bg-green-100 text-green-600"
                            : "bg-green-100 text-green-600"
                        }`}
                >
                    {doctor.available ? "Available" : "Available"}
                </div>
            </div>

            {/* Doctor Details Section */}
            <div className="mt-4">
                {/* Doctor Name */}
                <h4 className="text-xl font-bold text-gray-800">{doctor.doctorName}</h4>

                {/* Specialty and Clinic Name */}
                <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium">Specialty:</span> {doctor.specialty}
                </p>
                <p className="text-gray-600 text-[11px] mt-1">
                    <span className="font-medium">Clinic:</span> {doctor.clinicName}
                </p>

                {/* Rating and Location */}
                <div className="flex justify-between items-center mt-4">
                    {/* Static Rating */}
                    <div className="flex items-center text-sm">
                        <span className="text-yellow-500 text-lg font-semibold">★ 4.5</span>
                        <span className="text-gray-500 ml-1">(35)</span>
                    </div>
                    {/* Location */}
                    <p className="text-gray-500 text-sm opacity-70">{doctor.location}</p>
                </div>
            </div>

        </div>
    );
};

export default DoctorLoop;
