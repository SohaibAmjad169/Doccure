import React, { useEffect } from "react";
import "./hero.css";
import { useDispatch } from 'react-redux';
import { setDoctors } from '../redux/action/doctorAction';
import Banner from "../components/layout/Banner";
import CardGrid from "../components/reuseComponent/gridCard";
import serviceData from "../database/servicesData.json";
import doctorList from "../database/doctorList.json";
import DoctorGrid from "../components/Doctor/DoctorGrid"

const Hero = () => {
    const specialities = [...new Set(doctorList.map((doctor) => doctor.specialty))];
    const locations = [...new Set(doctorList.map((doctor) => doctor.location))];
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setDoctors(doctorList));
    }, [dispatch]);
    return (
        <div>
            {/**Banner Component Code*/}
            <Banner specialities={specialities} locations={locations} />

            {/**Services Component Code */}
            <CardGrid data={serviceData} />

            {/**Doctor Component Code */}
            <DoctorGrid />
        </div>
    );
};

export default Hero;
