import React from 'react';
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetScroll } from "../../redux/action/doctorAction";  //  Import action

const CardGrid = ({ data }) => {
  const scrollToCardGrid = useSelector((state) => state.doctors?.scrollToCardGrid || false);
  const dispatch = useDispatch();
  const cardGridRef = useRef(null);

  useEffect(() => {  // Now inside the component
    if (scrollToCardGrid && cardGridRef.current) {
        cardGridRef.current.scrollIntoView({ behavior: "smooth" });

        //  Reset scroll state after scrolling
        setTimeout(() => {
          dispatch(resetScroll());  //  Dispatch resetScroll action to reset state
        }, 500);
    }
  }, [scrollToCardGrid, dispatch]);



  return (
    <div ref={cardGridRef} className="my-[70px] px-[80px]">  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6 w-full ">
        {data.map((item, index) => (
          <div
            key={index}
            className="py-6 px-8 rounded-lg shadow-md flex border flex-col items-center transition-all transform hover:scale-105"
            style={{
              // Default card background
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = item.hoverColor) // Change to hover color on hover
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '') // Reset background color on hover out
            }
          >
            <div
              className="h-16 w-16 rounded-full flex items-center justify-center mb-4"
              style={{
                backgroundColor: item.hoverColor, // Default white background for the image container
                transition: 'background-color 0.3s ease',
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-8 h-8"
              />
            </div>
            <h3 className="text-center text-1xl font-[500]">{item.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
