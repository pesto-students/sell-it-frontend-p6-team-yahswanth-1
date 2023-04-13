import React from "react";
import { render } from "@testing-library/react";
import { Title } from "../components/reusable/Title";

test("renders title component without errors", () => {
  render(<Title text="Hello, World!" />);
});
