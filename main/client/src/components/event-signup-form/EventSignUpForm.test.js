import EventSignUpForm from "./EventSignUpForm";
// import { setupServer } from "msw/node";
// import { rest } from "msw";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

test("test ticket button functionality", () => {
  render(<EventSignUpForm />);
  expect(screen.getByTestId("ticket-count").textContent).toBe("0");

  fireEvent.click(screen.getByTitle("increase"));
  expect(screen.getByTestId("ticket-count").textContent).toBe("1");
  fireEvent.click(screen.getByTitle("increase"));
  expect(screen.getByTestId("ticket-count").textContent).toBe("2");

  fireEvent.click(screen.getByTitle("decrease"));
  expect(screen.getByTestId("ticket-count").textContent).toBe("1");
  fireEvent.click(screen.getByTitle("decrease"));
  expect(screen.getByTestId("ticket-count").textContent).toBe("0");

  fireEvent.click(screen.getByTitle("decrease"));
  expect(screen.getByTestId("ticket-count").textContent).toBe("0");
});
