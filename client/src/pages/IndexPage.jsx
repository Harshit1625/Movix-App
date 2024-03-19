import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    axios.get("/index-places").then((response) => {
      const { data } = response;
      console.log(data);
      setPlaces([...data]);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div
        id="places"
        className="mt-4 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
      >
        {loading && <h1>Loading....</h1>}
        {places.length > 0 &&
          places.map((place) => {
            const fLetter = place.address;
            const address = fLetter.charAt(0).toUpperCase() + fLetter.slice(1);
            return (
              <Link to={"/place/" + place._id}>
                <div className="bg-gray-500 rounded-2xl flex aspect-square object-cover">
                  {place.photos?.[0] && (
                    <img
                      src={
                        "https://travel-booking-app-so1m.onrender.com/uploads/" +
                        place.photos[0]
                      }
                      alt="preview-image"
                      className="rounded-2xl object-cover"
                    />
                  )}
                </div>
                <h2 className="mt-2 text-start text-sm truncate">
                  {place.title}"
                </h2>
                <h3 className="font-bold text-start text-gray-400">
                  {address}
                </h3>
                <div className="text-start">Rs.{place.price} / night</div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default IndexPage;
