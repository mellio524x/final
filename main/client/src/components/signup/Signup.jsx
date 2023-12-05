import React, { useState } from "react";
import "../signup/Signup.css";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const isEmailValid = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isUsernameValid = (username) => /^[a-zA-Z0-9_]+$/.test(username);

  const isPasswordValid = (password) =>
    /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/.test(password);

  // Stub function for registration, always returns success
  const simulateRegistration = async (email, username, password) => {
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });
  
    return response.json();
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      setEmailError("Invalid email format");
    } else if (!isUsernameValid(username)) {
      setUsernameError("Invalid username");
    } else if (!isPasswordValid(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one number"
      );
    } else {
      try {
        // Clear any previous errors
        setEmailError(null);
        setUsernameError(null);
        setPasswordError(null);

        // Simulate the registration process
        const response = await simulateRegistration(email, username, password);

        if (response.success) {
          // Signup successful
          setSuccessMessage("Signup successful!");
        } else {
          // Signup failed
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        
        <h1>Register for the event App</h1>
        <label htmlFor="userEmail">Enter Email:</label>
        <input
          type="text"
          id="userEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <span className="error">{emailError}</span>}

        <label htmlFor="username">Enter Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <span className="error">{usernameError}</span>}

        <label htmlFor="password">Enter Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <span className="error">{passwordError}</span>}

        <input type="submit" />
        <br />
        {successMessage && (
          <span
            style={{
              fontWeight: "bold",
              color: "green",
            }}
          >
            {successMessage}
          </span>
        )}
      </form>
    </div>
  );
}
