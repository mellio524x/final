import React from "react";

const EventRegisterEmail = ({
  eventName,
  eventLocation,
  eventTime,
  signupDeadline,
  eventDescription,
}) => {
  return (
    <div>
      <h1>{eventName}</h1>
      <p>
        You're invited to join us for this {eventType} event, "{eventName}".
        Here are the event details:
      </p>
      <ul>
        <li>
          <strong>Event Type:</strong> {eventType}
        </li>
        <li>
          <strong>Location:</strong> {eventLocation}
        </li>
        <li>
          <strong>Date and Time:</strong> {eventTime}
        </li>
        <li>
          <strong>Signup Deadline:</strong> {signupDeadline}
        </li>
      </ul>
      <p>{eventDescription}</p>
      <p>We look forward to seeing you at the event!</p>
    </div>
  );
};

export default EventRegisterEmail;
