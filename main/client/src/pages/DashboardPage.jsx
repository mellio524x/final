import React, { useEffect } from "react";
import EventCard from "../components/EventCard";
// import useAuth from "../auth/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../store/slices/eventSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { allEvents } = useSelector((state) => state.event);
  useEffect(() => {
    dispatch(getAllEvents());
    // console.log(eventsByUser);
  }, []);
  // if (allEvents) console.log(allEvents);
  return (
    <div className="w-[80%] mx-auto my-10">
      <div className="text-[36px] font-semibold text-center py-10 w-full">
        All Events
      </div>
      <div className="flex flex-wrap justify-evenly my-10">
        {allEvents && allEvents.map((event) => <EventCard event={event} />)}
      </div>
    </div>
  );
};

export default DashboardPage;
