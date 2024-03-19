import axios from "axios";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
    axios.get("/bookings").then((response) => {
      const { data } = response;
      setBookings(data);
    });
  }, []);

  function removeBooking(booking) {
    const data = booking._id;
    console.log(data);
    const response = axios.post("/delete-booking", { data });
    setRefresh(true);
  }

  if (refresh) {
    axios.get("/bookings").then((response) => {
      const { data } = response;
      setBookings(data);
    });
  }

  return (
    <div>
      <AccountNav />
      <div id="places">
        {bookings.length < 1 && (
          <div>
            <h1>There are no bookings registered yet.</h1>
          </div>
        )}
        {bookings?.length > 0 &&
          bookings?.map((booking) => (
            <div className="flex flex-col lg:flex-row gap-5 relative bg-gray-200 p-4 rounded-tr-2xl rounded-bl-2xl mb-2">
              {booking.place.photos.length > 0 && (
                <img
                  className="object-cover lg:w-64 lg:h-64"
                  src={
                    "https://travel-booking-app-so1m.onrender.com/uploads/" +
                    booking.place.photos[0]
                  }
                  alt="preview"
                />
              )}
              <div className="py-1 leading-10 text-lg">
                <h1 className="font-bold text-[15px] pb-2 pl-0">
                  {booking.place.title}
                </h1>
                <h1 className="text-start flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mt-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  {booking.checkIn.slice(0, 10)} &rarr;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mt-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  {booking.checkOut.slice(0, 10)}
                </h1>
                <h1 className="text-start pt-2">
                  Number Of Nights :-{" "}
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}{" "}
                </h1>
                <h1 className="text-start pt-2">
                  Total Cost :-Rs.{booking.price}
                </h1>
                <h1 className="text-start pt-2">
                  Booking Done by :- {booking.name}
                </h1>
              </div>
              <div>
                <button
                  onClick={() => removeBooking(booking)}
                  className="cursor-pointer transition ease-in-out flex absolute bottom-3 right-4 text-white bg-black bg-opacity-30 rounded-2xl hover:bg-red-500 py-2 px-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  <h1>Cancel</h1>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
