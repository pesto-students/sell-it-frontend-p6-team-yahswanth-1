import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageStpper from "../components/reusable/Stepper";

describe("ImageStpper", () => {
  const images = [
    {
      label: 'San Francisco – Oakland Bay Bridge, United States',
      imgPath:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Bird',
      imgPath:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Bali, Indonesia',
      imgPath:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
    {
      label: 'Goč, Serbia',
      imgPath:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
  ];

  it("displays the first image and label on initial render", () => {
    render(<ImageStpper images={images} />);
    const labelElement = screen.getByText(images[0].label);
    const imgElement = screen.getByAltText(images[0].label);
    expect(labelElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  it("displays the next image and label when the next button is clicked", () => {
    render(<ImageStpper images={images} />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    userEvent.click(nextButton);
    const labelElement = screen.getByText(images[1].label);
    const imgElement = screen.getByAltText(images[1].label);
    expect(labelElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  it("displays the previous image and label when the back button is clicked", () => {
    render(<ImageStpper images={images} />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    userEvent.click(nextButton);
    const backButton = screen.getByRole("button", { name: /back/i });
    userEvent.click(backButton);
    const labelElement = screen.getByText(images[0].label);
    const imgElement = screen.getByAltText(images[0].label);
    expect(labelElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  it("displays the correct image and label when clicking on the mobile stepper dots", () => {
    render(<ImageStpper images={images} />);
    const dots = screen.getAllByRole("button", { name: /go to slide/i });
    userEvent.click(dots[2]);
    const labelElement = screen.getByText(images[2].label);
    const imgElement = screen.getByAltText(images[2].label);
    expect(labelElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });
});
