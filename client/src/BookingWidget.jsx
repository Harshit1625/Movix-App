import { useState, useCallback } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from './Modal'

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [modal , setModal] = useState(false)
  const navigate = useNavigate();
  let numberOfDays = 0;
  let total = "";

  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
    total = numberOfDays * place.price;
  }

  async function saveBookings(ev) {
    ev.preventDefault();
    const data = {
      place: place._id,
      checkIn,
      checkOut,
      guests,
      name,
      phone: mobile,
      price: total,
    };
    await axios.post("/booking", data).then((response) => {
      const { data } = response
      const bookingId = data._id;
      setModal(true)
    });
  }


  return (
    <>
    {modal && (
      <Modal onOpen={modal} title='Thank you for choosing us !!' button='Proceed' navigation='bookings' />
    )}
    <div className="grid grid-cols-1">
      <div className="text-start flex justify-between p-2 font-bold">
        <h1>Check-In :- {place.checkIn} </h1>
        <h1> Check-Out :- {place.checkOut} </h1>
        <h1> Max number of guests :- {place.maxGuests} </h1>
      </div>
      <div className="bg-gray-200 rounded-tr-2xl rounded-bl-2xl p-3 mt-2">
        <div className="bg-gray-200 font-bold p-2 text-[15px] rounded-2xl">
          Price :- Rs.{place.price} per night
        </div>
        <div className="flex mt-2 justify-between p-4">
          <div>
            <h1 className="text-start font-bold">Select Check-In :-</h1>
            <input
              className="bg-gray-200"
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h1 className="text-start font-bold">Select Check-Out :-</h1>
            <input
              className="bg-gray-200"
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="pl-2 pr-2">
          <h1 className="text-start font-bold">Provide Number of guests :-</h1>
          <input
            className="bg-white"
            value={guests}
            type="number"
            onChange={(ev) => setGuests(ev.target.value)}
          />
        </div>
        {!numberOfDays && <button className="primary mt-3">Book Now </button>}

        {numberOfDays > 0 && (
          <div className="pb-2">
            <div>
              <label>
                <h1 className="font-bold text-start pl-3">Your full name :-</h1>
              </label>
              <input
                type="text"
                value={name}
                placeholder="Enter your name here"
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>
                <h1 className="font-bold text-start pl-3">
                  Your Phone Number :-
                </h1>
              </label>
              <input
                type="tel"
                value={mobile}
                placeholder="Enter your phone number here"
                onChange={(ev) => setMobile(ev.target.value)}
              />
            </div>

            <button
              onClick={(ev) => saveBookings(ev)}
              className="primary mt-3 space-x-1"
            >
              <span>Book Now for</span>
              <span>{numberOfDays}</span>
              <span>days /</span>
              <span>Rs. {total}</span>
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default BookingWidget;
