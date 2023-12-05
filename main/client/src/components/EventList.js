import React from 'react';

const EventList = ({ events, onViewDescription }) => {
  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <button onClick={() => onViewDescription(event.id)}>
              {event.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
