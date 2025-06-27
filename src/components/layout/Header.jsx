import React from "react";
import { Menu } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import menuItems from "../../database/menuItem.json";

const Navbar = () => {
  const location = useLocation();


  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-100 ease-in-out bg-[#f9fcff] text-[#1f2937] shadow-none">
      <div className="flex items-center justify-between py-4 px-4 sm:px-[10px] md:px-[10px] lg:px-[77px]">
        {/* Logo */}
        <div className="text-2xl font-[400] my-2 tracking-wider transition-all duration-100 ease-in-out">
          <img
            src="/images/logo-01.svg"
            className="w-full h-[36px] object-cover"
            alt="Logo"
          />
        </div>

        {/* Desktop Navbar Menu Items */}
        <div className="hidden md:flex items-center justify-center space-x-6 text-md font-[400] ml-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.url}
              className={`hover:text-[#0e82fd] px-1 hover:border-[#0e82fd] transition border-b-2 ${location.pathname === item.url
                ? "text-[#0e82fd] border-transparent"
                : "text-[#1f2937] border-transparent"
                }`}
            >
              {item.name}
            </Link>
          ))}
          {/* Desktop Buttons */}
          <button className="bg-white text-[black] py-2 px-6 rounded-md border border-gray hover:text-white hover:border-transparent hover:bg-[#0e82fd]">
            Login
          </button>
          <button className="bg-[#0e82fd] text-white py-2 px-6 rounded-md border border-transparent hover:text-[#0e82fd] hover:border-[#0e82fd] hover:bg-white">
            Register
          </button>
        </div>

        {/* Mobile Navbar Menu Items */}
        <div className="md:hidden">
          <Menu as="div" className="relative">
            <Menu.Button className="text-white p-2 rounded-md">
              <img
                src="/images/hamburger.svg"
                className="w-[14px] h-[14px] object-cover"
                alt="Hamburger menu icon"
              />
            </Menu.Button>
            <Menu.Items className="fixed top-[4rem] left-0 w-screen bg-[#f9fcff] text-gray-800 shadow-lg z-50">
              {menuItems.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link
                      to={item.url}
                      className={`block px-4 py-2 border-b border-gray-200 text-lg font-normal ${location.pathname === item.url
                        ? "bg-gray-100 text-[#0e82fd]"
                        : "text-gray-800"
                        }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
