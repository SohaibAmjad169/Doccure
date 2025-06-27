import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDoctorById } from "../../redux/action/doctorAction";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { format, parse } from "date-fns";
import { TextField } from "@mui/material";

const DoctorDetails = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const selectedDoctor = useSelector((state) => state.doctors.selectedDoctor);

    const [selectedSlots, setSelectedSlots] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date(2024, 0, 1)); 
    const [currentDay, setCurrentDay] = useState(format(new Date(), "EEE"));

    useEffect(() => {
        if (!selectedDoctor || selectedDoctor.id !== id) {
            dispatch(fetchDoctorById(id));
        }
    }, [dispatch, id, selectedDoctor]);

    useEffect(() => {
        const savedBookingInfo = JSON.parse(localStorage.getItem("currentBookingInfo"));

        if (savedBookingInfo?.bookingDetails) {
            const { selectedDate, selectedDay, selectedTime } = savedBookingInfo.bookingDetails;

            if (selectedDate) {
                const parsedDate = parse(selectedDate, "dd-MM-yyyy", new Date());
                setSelectedDate(parsedDate);
            }

            if (selectedDay) {
                setCurrentDay(selectedDay);
            }

            if (selectedTime && selectedDay) {
                setSelectedSlots((prevState) => ({
                    ...prevState,
                    [selectedDay]: selectedTime,
                }));
            }
        }
        let bookingResults = JSON.parse(localStorage.getItem("bookingResults"));
        if (!bookingResults || bookingResults.length === 0) {
            window.bookingResults = [];
            localStorage.setItem("bookingResults", JSON.stringify(window.bookingResults));
        } else {
            window.bookingResults = bookingResults;
        }
    }, []);

    useEffect(() => {
        const bookingDetails = {
            bookingDetails: {
                selectedDay: currentDay,
                selectedTime: selectedSlots[currentDay] || "",
                selectedDate: format(selectedDate, "dd-MM-yyyy"),
                doctorDetails: selectedDoctor
                    ? {
                        name: selectedDoctor.doctorName || "",
                        speciality: selectedDoctor.specialty || "",
                        clinic: selectedDoctor.clinicName || "",
                        location: selectedDoctor.location || "",
                        contact: selectedDoctor.contact || "",
                        appointmentFee: selectedDoctor.appointmentFee || "",
                    }
                    : {},
            },
            userDetails: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
            },
            paymentDetails: {
                paymentMethod: "",
                cardName: "",
                cardNumber: "",
                expiryMonth: "",
                expiryYear: "",
                cvv: "",
            },
            isFinalPage: false,
        };

        window.currentBookingInfo = bookingDetails;
        localStorage.setItem("currentBookingInfo", JSON.stringify(bookingDetails));
    }, [selectedDate, currentDay, selectedSlots, selectedDoctor]);

    const getSlotsByDay = (slots) => {
        if (!slots || slots.length === 0) return {};
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const slotsByDay = {};
        const commonSlots = ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

        daysOfWeek.forEach((day) => {
            slotsByDay[day] = commonSlots;
        });

        return slotsByDay;
    };

    const handleSlotSelection = (day, slot) => {
        setSelectedSlots((prevState) => {
            const updatedSlots = {
                ...prevState,
                [day]: slot,
            };

            const currentBookingInfo = JSON.parse(localStorage.getItem("currentBookingInfo")) || {};
            currentBookingInfo.bookingDetails = {
                ...currentBookingInfo.bookingDetails,
                selectedTime: slot,
                selectedDay: day,
            };
            localStorage.setItem("currentBookingInfo", JSON.stringify(currentBookingInfo));
            window.currentBookingInfo = currentBookingInfo;

            return updatedSlots;
        });
    };

    const handleBookAppointment = () => {
        history("/checkout", {
            state: {
                doctorDetails: selectedDoctor,
                selectedDay: currentDay,
                selectedTime: selectedSlots[currentDay],
                selectedDate: format(selectedDate, "dd-MM-yyyy"),
            },
        });
    };

    const slotsByDay = getSlotsByDay(selectedDoctor?.availableSlots || []);

    if (!selectedDoctor) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    return (
        <div className="mx-[80px]">
            <div className="overflow-hidden my-24 p-5 sm:p-10 bg-white shadow-lg rounded-lg shadow-gray-200">
                <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3 mb-5 sm:mb-0">
                        <img
                            src={`/${selectedDoctor.image}`}
                            alt={selectedDoctor.doctorName}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    </div>
                    <div className="w-full sm:w-2/3 sm:pl-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{selectedDoctor.doctorName}</h2>
                        <p className="text-xl text-gray-600 mb-4">{selectedDoctor.specialty}</p>
                        <p className="text-base text-gray-700 mb-6">{selectedDoctor.doctorDetails}</p>
                        <div className="space-y-3">
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold">Clinic:</span> {selectedDoctor.clinicName}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold">Education:</span> {selectedDoctor.education}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold">Address:</span> {selectedDoctor.address}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold">Contact:</span> {selectedDoctor.contact.phone}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">Pick a Date</h3>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            value={dayjs(selectedDate)}
            onChange={(newValue) => {
                setSelectedDate(newValue.toDate());
            }}
            format="DD-MM-YYYY"
            renderInput={(params) => <TextField {...params} fullWidth />}
        />
    </LocalizationProvider>
</div>


                <div className="mt-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Slots</h3>
                    <div className="grid grid-cols-7 gap-4">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className={`text-center ${day !== currentDay ? "opacity-50" : ""}`}>
                                <div className="font-semibold text-lg text-gray-800">{day}</div>
                                <div className="mt-2 space-y-2">
                                    {slotsByDay[day] ? (
                                        slotsByDay[day].map((time, index) => (
                                            <div
                                                key={index}
                                                className={`text-sm text-gray-600 rounded p-3 cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-blue-400 hover:scale-105 ${selectedSlots[day] === time
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-blue-100"
                                                    } ${day !== currentDay ? "pointer-events-none" : ""}`}
                                                onClick={() => handleSlotSelection(day, time)}
                                            >
                                                {time}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-gray-500">No slots</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedSlots[currentDay] && (
                    <div className="mt-6">
                        <h4 className="text-xl font-semibold text-gray-800">Selected Appointment:</h4>
                        <p className="text-sm text-gray-600">Date: {format(selectedDate, "dd-MM-yyyy")}</p>
                        <p className="text-sm text-gray-600">Day: {currentDay}</p>
                        <p className="text-sm text-gray-600">Time: {selectedSlots[currentDay]}</p>
                    </div>
                )}

                {selectedSlots[currentDay] && selectedDate && (
                    <div className="mt-6 text-center">
                        <button
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
                            onClick={handleBookAppointment}
                        >
                            Book Appointment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDetails;
