import React, { useEffect, useState } from "react";
import EventSignUpForm from "../components/event-signup-form/EventSignUpForm";
// import apiService from "../api/axios";
import shareIcon from "../assets/images/share-icon.svg";
import { getGuestList, getSingleEvent } from "../store/slices/eventSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../auth/useAuth";

const EventSignupPage = () => {
  const { user } = useAuth();
  // const [share, setShare] = useState(true);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const eventId = params.id;
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.event);
  const { guestList } = useSelector((state) => state.event);
  useEffect(() => {
    dispatch(getSingleEvent({ eventId }));
    dispatch(getGuestList({ eventId: event.id }));
  }, [dispatch]);
  const [myEvent, setMyEvent] = useState(false);
  useEffect(() => {
    if (user && user.id == event.createdBy) {
      setMyEvent(true);
    } else {
      setMyEvent(false);
    }
  }, [user, event]);
  const handleGetList = () => {
    setOpen(!open);
  };
  return (
    event && (
      <div className="flex flex-col lg:flex-row w-[80%] h-full mx-auto  py-20 items-center">
        <div className="lg:w-[40%] w-full h-full lg:min-h-[70vh] m-10 flex items-center">
          <div className="w-full  ">
            <img
              src={event.imageURL}
              alt="event-photo-container"
              className="object-cover h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] mx-auto bg-slate-100"
            />
          </div>
        </div>
        <div className="w-full lg:w-[60%] pt-10 px-5 lg:pt-0 ">
          <div className="flex self-center">
            <h1 className="text-4xl  text-orange-400">{event.name}</h1>
            <img
              src={shareIcon}
              alt="share-icon"
              className="w-auto h-auto px-5"
            />
            {/* {share && (
              <div className="sticky p-3 self-center bg-gray-300 shadow-md">
                Copy link
              </div>
            )} */}
          </div>

          <p className="text-lg font-semibold my-5 text-slate-400">
            {event.dateTime}
          </p>
          <p className="text-base pt-7">{event.description}</p>
          <p className="text-base">Location: {event.location}</p>
          <p className="text-base">Event type: {event.type}</p>
          <p className="text-base">Deadline: {event.deadlineSignup}</p>
          <p className="text-base">Capacity: {event.capacityLimit}</p>

          <p className="w-full text-[3xl] text-orange-700 font-bold mt-5">
            Price: {event.price}
          </p>
          {myEvent && (
            <button
              onClick={handleGetList}
              className=" text-base font-semibold hover:text-orange-700"
            >
              Guest list
            </button>
          )}
          {open && (
            <div className="absolute z-10 bg-white shadow-md px-10 py-5  ">
              <ul>
                {guestList.map((guest) => (
                  <li className="py-2 m-0">
                    <div className="font-semibold text-slate-600">
                      {guest.name}
                    </div>
                    <div className="p-0 m-0">{guest.email}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="pt-5">
            <EventSignUpForm myEvent={myEvent} />
          </div>
        </div>
      </div>
    )
  );
};

export default EventSignupPage;
