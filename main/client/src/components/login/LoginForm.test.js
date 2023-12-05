import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router-dom";

const invalidEmails = [
  "johndoe.com",
  "john@doe@domain.com",
  " john@example.com",
  "john@example.com ",
  "john@exa#mple.com",
  "john@example",
  "john@example..com",
  "john@-example.com",
  "john@example-.com",
  "john@exam..ple.com",
  "ThisIsAnExtremelyLongEmailAddressThatExceedsTheMaximumCharacterLimit@example.com",
  "jo hn@ex ample.c om",
  "john.doe$@example.com",
  "@.com",
];

test.each(invalidEmails)("Validates email format %p", async (invalidEmail) => {
  // Given
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
  const emailInput = screen.getByLabelText("Email");
  const submitBtn = screen.getByText("Sign in");
  // When
  userEvent.type(emailInput, invalidEmail);
  fireEvent.click(submitBtn);
  // Then
  const errorMessage = await screen.findByText("Invalid email.");
  expect(errorMessage).toBeInTheDocument();
});

const invalidPasswords = [
  "1234",
  "noNUMBER",
  "1234567890123456789Abcdtoolong",
  "noupper1",
  "NOLOWER2",
];

test.each(invalidPasswords)(
  "Validates PASSWORD format %p",
  async (invalidPassword) => {
    // Given
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByText("Sign in");
    // When
    userEvent.type(emailInput, "stacy@gmail.com");
    userEvent.type(passwordInput, invalidPassword);
    fireEvent.click(submitBtn);
    // Then
    const errorMessage = await screen.findByText(
      "Password must has at least 8-20 characters, 1 uppercase, 1 lowercase, 1 number."
    );
    expect(errorMessage).toBeInTheDocument();
  }
);
