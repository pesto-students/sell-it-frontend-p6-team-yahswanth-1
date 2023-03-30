import React from "react";
import { render } from "@testing-library/react";
import Tab from "../components/reusable/VerticalTabs";

test("renders a tab with children", () => {
  const buttonText = "Click me";
  const { getByText } = render(<Tab text={buttonText} />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const button = getByText(buttonText);
  expect(button).toBeInTheDocument();
});
