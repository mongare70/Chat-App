import React from "react";
import { render, screen } from "@testing-library/react";
import NewUser from "./components/forms/NewUser";

// NewUser component testing suite
describe("New User Component", () => {
  test("renders 'Username' label", () => {
    render(<NewUser />);

    const username = screen.getByText("Username", { exact: true });
    expect(username).toBeInTheDocument;
  });

  test("renders 'Submit' button", () => {
    render(<NewUser />);

    const username = screen.getByText("Submit", { exact: true });
    expect(username).toBeInTheDocument;
  });
});
