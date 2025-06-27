import React from "react";
import SearchForm from "../../components/layout/Search";

const Banner = ({ specialities, locations }) => {
    return (
        <div>
            {/* Banner Image for Large Screens */}
            <img
                src="/images/download.png"
                alt="Doctor 1"
                className="absolute z-10 h-full w-full object-contain filter invert contrast-120 brightness-110 md:block sm:hidden"
            />
            <section
                className="bg-cover bg-center px-4 bg-[#f9fcff] sm:px-[10px] md:px-[10px] lg:px-[77px] h-[670px] mb-[20px] mt-[65px] py-5 relative overflow-hidden"
            >
                {/* Content Area */}
                <div className="flex items-center justify-between flex-col md:flex-row">
                    {/* Left Section - Text Content */}
                    <div className="text-center md:text-left md:w-[50%] w-full md:mr-10">
                        <h1 className="text-[42px] font-[500] tracking-wide mt-[0px]">
                            Consult <span className="text-[#0e82fd]">Best Doctors</span> <br />
                            Your Nearby Location.
                        </h1>

                        <p className="text-[18px] font-normal mt-4 opacity-[0.9]">
                            Embark on your healing journey with Doccure
                        </p>

                        <div className="flex items-center justify-center md:justify-start space-x-2 mt-7">
                            <button className="bg-[#0e82fd] text-white py-3 mt-[-11px] px-8 rounded-md border border-transparent hover:text-[#0e82fd] hover:border-[#0e82fd] hover:bg-white">
                                Start a Consult
                            </button>
                            <img
                                src="/images/down-arrow-img.png"
                                alt="down-arrow"
                                className="hidden md:block"
                            />

                        </div>

                        {/* SearchForm (Always visible) */}
                        <div className="z-40 absolute mt-[20px] w-full mx-auto">
                            <SearchForm specialities={specialities} locations={locations} />
                        </div>
                    </div>

                    {/* Right Section - Main Banner Image */}
                    <div className="relative z-30 w-full sm:w-[50%] md:block sm:mt-0 mt-5">
                        {/* Main Banner Image */}
                        <img
                            src="/images/banner-img.png"
                            className="h-[630px] w-[630px] object-contain mx-auto md:block  hidden"
                            alt="Doctor Consultation"
                        />

                        {/* Additional Images */}
                        <img
                            src="/images/header-icon.svg"
                            alt="Doctor 1"
                            className="absolute top-[160px] left-[-330px] h-[30px] w-full object-contain hidden md:block"
                        />
                        <img
                            src="/images/banner-img1.svg"
                            alt="Doctor 1"
                            className="absolute top-[230px] left-[-160px] h-[220px] w-full object-contain animate-move1 hidden md:block"
                        />
                        <img
                            src="/images/banner-img3.svg"
                            alt="Doctor 2"
                            className="absolute bottom-[-60px] left-[150px] h-[270px] w-full object-contain animate-move2 hidden md:block"
                        />
                        <img
                            src="/images/banner-img2.svg"
                            alt="Doctor 3"
                            className="absolute top-[170px] left-[170px] h-[300px] w-full object-contain animate-move3 hidden md:block"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;
