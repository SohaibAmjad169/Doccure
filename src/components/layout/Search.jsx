import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { filterDoctors } from "../../redux/action/doctorAction";

import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { scrollToCardGrid } from "../../redux/action/doctorAction"; // Import scroll action


const SearchForm = ({ specialities = [], locations = [] }) => {
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs("2024-01-01"));
  const dispatch = useDispatch();

  useEffect(() => {
    const formattedDate = selectedDate ? selectedDate.format("DD-MM-YYYY") : "";

    const dayOfWeek = selectedDate ? selectedDate.format("ddd") : "";

    const bookingDetails = {
      bookingDetails: {
        selectedDay: dayOfWeek,
        selectedTime: "",
        selectedDate: formattedDate,
        doctorDetails: {
          name: "",
          speciality: selectedSpeciality,
          clinic: "",
          location: selectedLocation,
          contact: {},
          appointmentFee: "",
        },
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

    let bookingResults = JSON.parse(localStorage.getItem("bookingResults"));
    if (!bookingResults || bookingResults.length === 0) {
      window.bookingResults = [];
      localStorage.setItem(
        "bookingResults",
        JSON.stringify(window.bookingResults)
      );
    } else {
      window.bookingResults = bookingResults;
    }
  }, [selectedDate, selectedSpeciality, selectedLocation]);

  const handleSearch = () => {
    dispatch(
      filterDoctors({
        speciality: selectedSpeciality,
        location: selectedLocation,
      })
    );
  
    dispatch(scrollToCardGrid());  //  FIXED: Now it scrolls after search
  };
  

  const handleSpecialityChange = (e) => {
    setSelectedSpeciality(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-sm w-auto md:max-w-3xl block mt-6">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 pe-2 border-r border-gray-300 relative mb-4 sm:mb-0 sm:mr-4">
          <select
            value={selectedSpeciality}
            onChange={handleSpecialityChange}
            className="block appearance-none bg-white border-none text-[14px] p-3 rounded-md focus:outline-none focus:ring-0 w-full pl-10"
          >
            <option value="">Select Speciality</option>
            {specialities.map((specialty, index) => (
              <option
                key={index}
                value={
                  typeof specialty === "string" ? specialty : specialty.name
                }
              >
                {typeof specialty === "string" ? specialty : specialty.name}
              </option>
            ))}
          </select>
          <span className="absolute top-3 left-3 text-gray-400">
            <CiSearch />
          </span>
        </div>

        <div className="flex-1 px-2 border-r border-gray-300 relative mb-4 sm:mb-0 sm:mr-4">
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="block appearance-none bg-white border-none text-[14px] p-3 rounded-md focus:outline-none focus:ring-0 w-full pl-10"
          >
            <option value="">Select Location</option>
            {locations.map((location, index) => (
              <option
                key={index}
                value={typeof location === "string" ? location : location.name}
              >
                {typeof location === "string" ? location : location.name}
              </option>
            ))}
          </select>
          <span className="absolute top-3 left-3 text-gray-400">
            <IoLocationSharp />
          </span>
        </div>

        <div className="flex-1 px-2 text-[14px] relative mb-4 sm:mb-0 sm:mr-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label=""
              value={selectedDate}
              onChange={(date) => setSelectedDate(date ? dayjs(date) : dayjs())}  // Prevents null errors
              format="DD-MM-YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  InputProps: {
                    className: "custom-date-picker",
                  },
                  variant: "standard", 
                  inputProps: {
                    placeholder: "Select Date",
                    style: {
                      padding: "8px 0 8px 12px",
                      border: "none",
                      boxShadow: "none",
                      width: "150px",
                      cursor: "pointer",
                      background: "transparent",
                      display: "inline-flex",
                      alignItems: "center",
                    },
                  },
                },
                popper: {
                  className: "custom-calendar",
                },
              }}
            />
          </LocalizationProvider>
        </div>

        <div className="ps-2 sm:pt-0">
          <button
            onClick={handleSearch}
            className="bg-[#0e82fd] text-white py-3 px-6 rounded-md w-full sm:w-auto h-[48px] hover:bg-[#0e82fd]/80 transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
