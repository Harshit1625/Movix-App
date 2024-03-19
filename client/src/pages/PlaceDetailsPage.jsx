import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingWidget from "../BookingWidget";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PlaceDetailsPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [allPhotos, setAllPhotos] = useState(false);
  const [review, setReview] = useState("");

  if (!id) {
    return;
  }

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
    axios.get("/place/" + id).then((response) => {
      const { data } = response;
      console.log(data);
      setPlace(data);

      function generateReview() {
        const number = Math.random() * 5;
        const sValue = number.toString();
        console.log(sValue);

        if (sValue > 3 && sValue < 5) {
          const fValue = sValue.slice(0, 3);
          setReview(fValue);
        } else {
          setReview("3.0");
        }
      }

      generateReview();
    });
  }, [id]);

  if (!place) return "";

  if (allPhotos) {
    return (
      <div id="places" className="absolute inset-0 min-w-full min-h-screen">
        <button
          onClick={() => setAllPhotos(false)}
          className="fixed z-10 top-8 text-white right-[40px] text-[20px] bg-black rounded-lg opacity-60 shadow-md shadow-black transition ease-in-out hover:opacity-100 p-2"
        >
          Go Back
        </button>
        <div className="lg:grid lg:grid-cols-2">
          {place?.photos.length > 0 &&
            place?.photos.map((photo) => {
              return (
                <div className="p-4 ">
                  <img
                    className=" w-[100vw] h-[80vh] object-cover"
                    src={
                      "https://travel-booking-app-qa3o.onrender.com/uploads/" +
                      photo
                    }
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-8 p-3 bg-gray-100 rounded-2xl">
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mt-1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
            />
          </svg>
          <h1 className="text-2xl text-start">{place?.title}</h1>
        </div>
        <h2 className="text-start flex justify-between">
          <a
            className="font-bold underline flex gap-1 mt-2 italic"
            target="_blank"
            href={"http://maps.google.com/?q=" + place?.address}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            {place?.address}
          </a>
          <div className="flex gap-1 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            {review}
          </div>
        </h2>
        <div className="relative ">
          <div className="grid gap-2 grid-cols-[2fr_1fr] mt-3">
            <div>
              {place?.photos?.[0] && (
                <div>
                  <img
                    className="aspect-square object-cover mt-1 rounded-l-2xl lg:h-[127vh] w-[100vw]"
                    src={
                      "https://travel-booking-app-qa3o.onrender.com/uploads/" +
                      place?.photos?.[0]
                    }
                    alt=""
                  />
                </div>
              )}
            </div>
            <div>
              {place?.photos?.[1] && (
                <img
                  className="aspect-square object-cover rounded-tr-2xl"
                  src={
                    "https://travel-booking-app-qa3o.onrender.com/uploads/" +
                    place?.photos?.[1]
                  }
                  alt=""
                />
              )}
              {place?.photos?.[2] && (
                <img
                  className="mt-1 aspect-square object-cover rounded-br-2xl"
                  src={
                    "https://travel-booking-app-qa3o.onrender.com/uploads/" +
                    place?.photos?.[2]
                  }
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setAllPhotos(true)}
          className="bg-gray-200 h-[5vh] rounded-lg opacity-60 shadow-md shadow-black transition ease-in-out hover:opacity-100 p-2 absolute top-[67vh] right-[40px] lg:top-[145vh] lg:right-[7vw]"
        >
          + Show More Photos
        </button>
      </div>
      <div className="my-4">
        <h1 className="font-bold text-[20px] text-start mb-4 flex">
          Description
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mt-3 ml-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </h1>
        <h2 className="font-semibold text-start">"{place.description}"</h2>
      </div>
      <BookingWidget place={place} />
      <div className="mt-5">
        <h1 className="font-bold text-[20px] text-start mb-2 flex">
          Extra Info
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mt-3 ml-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </h1>
        <h1 className="text-start">{place?.extraInfo}</h1>
      </div>
    </div>
  );
};

export default PlaceDetailsPage;
