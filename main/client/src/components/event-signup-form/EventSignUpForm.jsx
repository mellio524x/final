import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiService from "../../api/axios";
import { useSelector } from "react-redux";

const EventSignUpForm = ({ myEvent }) => {
  const { event } = useSelector((state) => state.event);
  const [count, setCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const eventId = event.id;
  const { handleSubmit } = useForm({ defaultValues: { ticketCount: 0 } });

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count === 0) return;
    setCount(count - 1);
  };

  const handleEventRegister = async () => {
    console.log(count);
    if (count === 0) {
      setError("Please add your ticket.");
      // console.log(error);
      return;
    }
    try {
      const response = await apiService.patch(`/events/${eventId}`, {
        ticketCount: count,
      });

      if (response.status !== 200) {
        setError("Failed to sign up for the event. Please try again later.");
        return;
      }
      setSubmitted(true);
    } catch (error) {
      setError(error.message);
    }
    console.log("event registered");
  };
  return !submitted ? (
    <form onSubmit={handleSubmit(handleEventRegister)}>
      <div className="flex items-center">
        <label htmlFor="ticket">Tickets: </label>
        <div onClick={decrement} className="px-3 cursor-pointer">
          <svg
            title="decrease"
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
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div data-testid="ticket-count" className="px-3 text-xl font-medium">
          {count}
        </div>
        <div onClick={increment} className="px-3 cursor-pointer">
          <svg
            title="increase"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm my-5">{error}</p>}
      {myEvent ? (
        <button className="w-[200px] py-2 text-black mt-5 mx-0 bg-orange-200 hover:bg-orange-300 hover:shadow-sm rounded-md select-none ">
          Edit
        </button>
      ) : (
        <button
          type="submit"
          className="w-[200px] py-2 text-black mt-5 mx-0 bg-orange-200 hover:bg-orange-300 hover:shadow-sm rounded-md select-none "
        >
          Register
        </button>
      )}
    </form>
  ) : (
    <p className="text-orange-400">
      Event registered successfully. A confirmation email has been sent.
    </p>
  );
};

export default EventSignUpForm;
