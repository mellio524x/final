import React, { useState } from 'react';

function EventCreation({ onCreateEvent }) {
  const [eventData, setEventData] = useState({
    partyName: '',
    activityDate: '',
    activitystartTime: '',
    activityendTime: '',
    selectedActivity: '',
    publicOrPrivate: '',
    location: '',
    startDate: '',
    endDate: '',
    capacity: '',
    signupdeadline: '',
    Description: '',
  });

  const handleCreateEvent = async () => {
    // Validate the fields
    if (eventData.partyName.trim() === '') {
      alert('Event Name is required');
      return;
    }


    if (eventData.activitystartTime === '') {
      alert('Start Time is required');
      return;
    }

    if (eventData.capacity.trim() === '') {
      alert('Capacity Limit is required');
      return;
    }

    if (eventData.signupdeadline === '') {
      alert('Signup Deadline is required');
      return;
    }

    if (eventData.Description.trim() === '') {
      alert('Description is required');
      return;
    }

    // Simulate the event creation process
    const response = await simulateEventCreation(eventData);

    if (response.success) {
      // Event creation successful
      alert('Event created successfully');
    } else {
      // Event creation failed
      alert('Event creation failed');
    }
  };

  // Stub function for event creation, always returns success
  const simulateEventCreation = async (eventData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000); // Simulating an API call delay
    });
  };

  return (
    <div className="event-creation">
      <h2>Create Your Next Event</h2>
      <form id="activity-form">
        {/* ... Other form groups */}
        <div className="form-group">
          <label htmlFor="partyName">party Name:</label>
          <input
            type="text"
            className="form-control"
            id="partyName"
            name="partyName"
            value={eventData.partyName}
            onChange={(e) => setEventData({ ...eventData, partyName: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="activitystartTime">Event Start Time:</label>
          <input
            type="time"
            className="form-control"
            id="activitystartTime"
            name="activitystartTime"
            value={eventData.activitystartTime}
            onChange={(e) => setEventData({ ...eventData, activitystartTime: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="activityendTime">Event End Time:</label>
          <input
            type="time"
            className="form-control"
            id="activityendTime"
            name="activityendTime"
            value={eventData.activityendTime}
            onChange={(e) => setEventData({ ...eventData, activityendTime: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="publicOrPrivate">Public or Private Event:</label>
          <select
            className="form-control"
            id="publicOrPrivate"
            name="publicOrPrivate"
            value={eventData.publicOrPrivate}
            onChange={(e) => setEventData({ ...eventData, publicOrPrivate: e.target.value })}
            required
          >
            <option value="">Select an option</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Description">Description:</label>
          <input
            type="text"
            className="form-control"
            id="Description"
            name="Description"
            value={eventData.Description}
            onChange={(e) => setEventData({ ...eventData, Description: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="text"
            className="form-control"
            id="capacity"
            name="capacity"
            value={eventData.capacity}
            onChange={(e) => setEventData({ ...eventData, capacity: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signupdeadline">Signup Deadline:</label>
          <input
            type="date"
            className="form-control"
            id="signupdeadline"
            name="signupdeadline"
            value={eventData.signupdeadline}
            onChange={(e) => setEventData({ ...eventData, signupdeadline: e.target.value })}
            required
          />
        </div>
        <button type="button" onClick={handleCreateEvent}>Create Event</button>
      </form>
    </div>
  );
}

export default EventCreation;
