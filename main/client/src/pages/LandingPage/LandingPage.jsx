import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getEventsPublicAccess } from "../store/slices/eventSlice";
import EventCard from "../../components/EventCard";
import { getEventsPublicAccess } from "../../store/slices/eventSlice";
// import EventCard from "../components/EventCard";

const LandingPage = () => {
  const dispatch = useDispatch();

  const { allEvents } = useSelector((state) => state.event);
  useEffect(() => {
    dispatch(getEventsPublicAccess());
  }, []);
  return (
    <div className="w-full h-screen">
      <div className="relative w-full h-auto bg-red-300">
        <img
          src="https://images.pexels.com/photos/5638748/pexels-photo-5638748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="hero-image"
          className="w-full h-[300px] object-cover"
        />
        <h1 className="absolute bottom-0 text-6xl z-10 font-semibold text-white py-5 text-center w-full">
          Welcome to Event+
        </h1>
      </div>

      <h2 className="text-center m-10 text-2xl">
        Join us for exciting events!
      </h2>
      <div className="flex flex-wrap justify-evenly my-10">
        {allEvents && allEvents.map((event) => <EventCard event={event} />)}
      </div>
    </div>
  );
};

export default LandingPage;
