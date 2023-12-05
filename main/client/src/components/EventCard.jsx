import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getGuestList } from "../store/slices/eventSlice";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { guestList } = useSelector((state) => state.event);
  const [open, setOpen] = useState(false);
  const [myEvent, setMyEvent] = useState(false);
  useEffect(() => {
    if (user && user.id == event.createdBy) setMyEvent(true);
  }, [user]);
  // const userId = user.id;
  const handleClick = () => {
    if (user) {
      navigate(`/e/${event.id}/sign-up`);
    } else {
      navigate("/homepage");
    }
  };
  const handleGetList = () => {
    dispatch(getGuestList({ eventId: event.id }));
    setOpen(!open);
  };

  return (
    <div className="w-[300px] h-auto bg-slate-100 rounded-md m-4 p-5 hover:shadow-lg">
      <div className="my-2 px-auto">
        {event.imageURL ? (
          <img
            src={event.imageURL}
            className="w-full h-auto border-2 cover-full"
          />
        ) : (
          <img className="w-full h-36 border-2" />
        )}
        <h3
          onClick={handleClick}
          className="text-xl pb-2 text-orange-800 font-semibold mt-3 cursor-pointer"
        >
          {event.name}
        </h3>
        <div className="text-xs font-semibold text-slate-500">
          {event.location}
        </div>
        <div className="text-base mt-3">{event.description}</div>
        <div className="text-xs mt-10 text-orange-800">{event.dateTime}</div>
        <div className="text-lg mt-3 ">$ {event.price}</div>
        <div>
          {myEvent ? (
            <button
              onClick={handleClick}
              className="w-auto py-2 px-10 bg-orange-200 hover:bg-orange-300 hover:shadow-sm rounded-md mt-5 text-black"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="w-auto py-2 px-10 bg-orange-200 hover:bg-orange-300 hover:shadow-sm rounded-md mt-5 text-black"
            >
              Details
            </button>
          )}
          {myEvent && (
            <button
              onClick={handleGetList}
              className="m-2 text-sm hover:font-semibold text-orange-700"
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
        </div>
      </div>
    </div>
  );
};

export default EventCard;
