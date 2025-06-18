import React from "react";
import { shallow } from "enzyme";
import HomePage from "../Components/Home/HomePage";

describe("HomePage Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.exists()).toBe(true);
  });

  it("Has text Welcome to Coin Stash", () => {
    const wrapper = shallow(<HomePage />);
    const text = wrapper.find("h1").text();
    expect(text).toBe("Welcome to Coin Stash!");
  });
});
