import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// Smoke test for Carousel
it("renders without crashing", function() {
  render(<Carousel photos={TEST_IMAGES} />);
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

// Test to check if the left arrow is missing on the first image
it("hides the left arrow when on the first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // Check that the left arrow is not present
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).toBeNull();
});

it("hides the right arrow when on the last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  let rightArrow = container.querySelector(".bi-arrow-right-circle");
  while (rightArrow) {
    fireEvent.click(rightArrow);
    rightArrow = container.querySelector(".bi-arrow-right-circle");
  }

  // Check that the right arrow is not present after the last image
  const rightArrowAfterLastImage = container.querySelector(".bi-arrow-right-circle");
  expect(rightArrowAfterLastImage).toBeNull();
});
