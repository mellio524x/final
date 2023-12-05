import React from 'react';

const EventDescription = ({ event }) => {
  return (
    <div>
      <h2>{event.name}</h2>
      <p>Type: {event.type}</p>
      <p>Location: {event.location}</p>
      <p>Dates: {event.startDate} - {event.endDate}</p>
      <p>Capacity Limit: {event.capacity}</p>
      <p>Signup Deadline: {event.signupDeadline}</p>
      <p>Description: {event.description}</p>
    </div>
  );
};

export default EventDescription;
