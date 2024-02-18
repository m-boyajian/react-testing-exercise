import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function() {
    render(<Card />);
});

TEST_IMAGES.forEach((photo, index) => {
  it("matches snapshot", function() {
    const {asFragment} = render(<Card src={photo.src} caption={photo.caption} />);
    expect(asFragment()).toMatchSnapshot();
  });
});