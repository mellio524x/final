import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import useAuth from "../auth/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserEvents } from "../store/slices/eventSlice";

const UserEventPage = () => {
  const { user } = useAuth();
  // console.log(user);

  const dispatch = useDispatch();
  const { eventsByUser } = useSelector((state) => state.event);
  useEffect(() => {
    dispatch(getAllUserEvents({ userId: user.id }));
  }, [dispatch, user]);

  return (
    <div className="static w-[80%] mx-auto">
      <div className="text-[36px] font-semibold text-center py-10 w-full">
        My events
      </div>

      <div className="flex flex-wrap justify-evenly">
        {eventsByUser &&
          eventsByUser.map((event) => <EventCard event={event} />)}
      </div>
    </div>
  );
};

export default UserEventPage;
