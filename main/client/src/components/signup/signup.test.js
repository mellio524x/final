import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen
} from "@testing-library/react";
import Signup from "./Signup";
import "@testing-library/jest-dom/extend-expect";

describe("Signup Component", () => {
  // Mock the fetch function to simulate API requests
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
  });

  it("renders the Signup form", () => {
    const {
      getByText,
      getByLabelText,
      getByRole
    } = render( < Signup / > );

    // Check if elements are present in the rendered component
    expect(getByText("Register for the event App")).toBeInTheDocument();
    expect(getByRole("button", {
      name: "Submit"
    })).toBeInTheDocument();
  });

  it("validates and submits the form successfully", async () => {
    const {
      getByLabelText,
      getByRole
    } = render( < Signup / > );

    const submitButton = getByRole("button", {
      name: "Submit"
    });
    const emailInput = getByLabelText("Enter Email:");

    // Simulate user input
    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com"
      }
    });
    fireEvent.click(submitButton);

    // Wait for the success alert to appear
    await waitFor(() => {
      expect(screen.getByText("Verification email sent! Check your inbox.")).toBeInTheDocument();
    });
  });

  it("displays an error for invalid email format", async () => {
    const {
      getByLabelText,
      getByRole
    } = render( < Signup / > );
    const emailInput = getByLabelText("Enter Email:");
    const submitButton = getByRole("button", {
      name: "Submit"
    });

    // Simulate user input with an invalid email format
    fireEvent.change(emailInput, {
      target: {
        value: "invalidemail"
      }
    });
    fireEvent.click(submitButton);


  });

  it("displays an error if email sending fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const {
      getByLabelText,
      getByRole
    } = render( < Signup / > );
    const emailInput = getByLabelText("Enter Email:");
    const submitButton = getByRole("button", {
      name: "Submit"
    });

    // Simulate user input with a valid email format
    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com"
      }
    });
    fireEvent.click(submitButton);

    // Wait for the error alert to appear
    await waitFor(() => {
      expect(screen.getByText("Failed to send verification email. Please try again later.")).toBeInTheDocument();
    });
  });
});