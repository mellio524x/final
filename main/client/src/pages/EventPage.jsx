import React, { useState, useEffect } from "react";
import EventList from "../components/EventList";
import EventCreation from "../components/EventCreation";
import "./EventPage.css";
import Navbar from "../components/navigation/NavBar";

function EventPage() {
  const [events] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Fetch events here and update the 'events' state
    // we can use the 'fetch' API or a library like Axios
  }, []);

  const handleEventSelection = (event) => {
    setSelectedEvent(event);
  };

  const handleCreateEvent = (newEvent) => {
    // Send a request to the API to create the event
    // Update the 'events' state with the newly created event
  };

  return (
    <div className="event-page">
      {/* <Navbar /> */}
      <h1>Welcome to the Event Page</h1>
      <div className="event-container">
        <div className="event-list">
          <h2>Upcoming Events</h2>
          <EventList events={events} onEventSelect={handleEventSelection} />
        </div>
        <div className="event-creation">
          <h2>Create an Event</h2>
          <EventCreation onCreateEvent={handleCreateEvent} />
        </div>
      </div>
      <div className="event-details">
        {selectedEvent ? (
          <div>
            <h2>Event Details</h2>
            {/* Display selected event details here */}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default EventPage;
