import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const SearchPage = () => {
  const { name } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/search-place/" + name).then((response) => {
      const data = response.data;

      setPlaces(data);
    });
  }, [name]);

  return (
    <>
      {places.length > 0 && (
        <h1 className="text-start text-[15px] m-4">
          Search Results for "{name}"
        </h1>
      )}
      {places.length === 0 && (
        <h1 className="mt-6">Sorry , no results found for your query...</h1>
      )}
      <div className="mt-4 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
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
                        "https://travel-booking-app-qa3o.onrender.com/uploads/" +
                        place.photos[0]
                      }
                      alt="preview-image"
                      className="rounded-2xl"
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

export default SearchPage;
