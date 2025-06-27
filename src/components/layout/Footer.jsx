import React from "react";
import menuItems from "../../database/menuItem.json";
import icons from "../../database/icons.json";

const Footer = () => {
    return (
        <footer className="bg-[#f9fcff] text-gray-800 py-10">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
                {/* Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">
                    {/* Logo Section */}
                    <div className="text-2xl font-[400] tracking-wider transition-all duration-100 ease-in-out mt-4">
                        <img
                            src="/images/logo-01.svg"
                            className="w-full h-[36px] object-cover"
                            alt="Logo"
                        />
                    </div>

                    {/* Menu and Social Icons */}
                    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
                        {/* Footer Links */}
                        <ul className="space-y-2 text-center md:text-left">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.url}
                                        className="hover:underline font-light" // Decreased font weight
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Icons */}
                    <div>
                        {/* Newsletter Section */}
                        <div className="">
                            <h2 className="text-lg font-medium mb-4">Newsletter</h2>
                            <form className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-2 w-full sm:w-44 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0e82fd] transition"
                                />
                                <button
                                    type="submit"
                                    className="px-3 py-2 bg-[#0e82fd] text-white rounded-md hover:bg-[#0e82fd]/80 transition"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                        <div className="flex space-x-4 justify-center md:justify-start py-8">
                            {icons.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300 transition"
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.alt || "Social Icon"}
                                        className="w-5 h-5"
                                    />
                                </a>
                            ))}
                        </div>

                    </div>

                </div>


                <hr />
                {/* Bottom Section */}
                <div className="mt-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Doccurre. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
