import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ListComponent from "../components/reusable/List";

describe("ListComponent", () => {
  const list = [
    { name: "Item 1", id: 1 },
    { name: "Item 2", id: 2 },
    { name: "Item 3", id: 3 },
  ];

  it("renders the component with the correct number of items", () => {
    render(<ListComponent list={list} />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(3);
  });

  it("renders the correct text for each item", () => {
    render(<ListComponent list={list} />);
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Item 1");
    expect(items[1]).toHaveTextContent("Item 2");
    expect(items[2]).toHaveTextContent("Item 3");
  });

  it("toggles the checkbox when an item is clicked", () => {
    render(<ListComponent list={list} />);
    const checkbox = screen.getByRole("checkbox", { name: "Item 1" });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
