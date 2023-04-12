import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import BidManagmentCard from "./BidManagmentCard";

const MOCK_CARD_PROPS = {
  url: "https://example.com/image.png",
  title: "Example Title",
  type: "Example Type",
  description: "Example Description",
  id: "1234",
  createdAt: "2022-04-01",
};

describe("BidManagmentCard", () => {
  it("should render the card with the correct props", () => {
    render(<BidManagmentCard {...MOCK_CARD_PROPS} />, { wrapper: MemoryRouter });

    expect(screen.getByText(MOCK_CARD_PROPS.title)).toBeInTheDocument();
    expect(screen.getByText(MOCK_CARD_PROPS.type)).toBeInTheDocument();
    expect(screen.getByText(MOCK_CARD_PROPS.description)).toBeInTheDocument();
    expect(screen.getByAltText(MOCK_CARD_PROPS.title)).toHaveAttribute(
      "src",
      MOCK_CARD_PROPS.url
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/bid-details/${MOCK_CARD_PROPS.id}`
    );
    expect(screen.getByText(MOCK_CARD_PROPS.createdAt)).toBeInTheDocument();
  });

  it("should navigate to the correct link when clicked", () => {
    render(<BidManagmentCard {...MOCK_CARD_PROPS} />, { wrapper: MemoryRouter });

    const link = screen.getByRole("link");
    userEvent.click(link);

    expect(window.location.pathname).toEqual(`/bid-details/${MOCK_CARD_PROPS.id}`);
  });
});
