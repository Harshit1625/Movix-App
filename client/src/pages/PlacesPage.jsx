import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useGSAP(() => {
    gsap.fromTo(
      "#places",
      {
        x: -200,
        opacity: 0,
        lazy: false,
        stagger: {
          amount: 0.1,
        },
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "back",
      }
    );
  }, []);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      console.log(data);
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center ">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full  hover:bg-hover"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4" id="places">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link to={"/account/places/" + place._id}>
                <div className="p-4 rounded-2xl flex bg-gray-200 h-[20vh] md:h-[32vh] sm:h-[27vh] mt-4">
                  <div className="h-32  bg-gray-300  bg-gray-300 ">
                    {place.photos.length > 0 && (
                      <img
                        className="object-cover w-[80vw] lg:h-[30vh] lg:w-[30vw] lg:object-cover"
                        src={
                          "https://travel-booking-app-qa3o.onrender.com/uploads/" +
                          place.photos[0]
                        }
                        alt="preview"
                      />
                    )}
                  </div>
                  <div className="ml-6  text-start h-[16vh] lg:w-[80vw] w-[70vh] md:h-[35vh] overflow-hidden">
                    <h2 className="text-xl">{place.title}</h2>
                    <p className="mt-3">{place.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PlacesPage;
