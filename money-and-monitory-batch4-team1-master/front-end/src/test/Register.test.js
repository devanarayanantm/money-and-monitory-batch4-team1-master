import React from "react";
import { shallow } from "enzyme";
import Register from "../Components/Register/Register";
import { useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("Register Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Register />);
  });

  it("renders without crashing", () => {
    //const navigateMock = jest.fn();
    //useNavigate.mockImplementation(() => navigateMock);
    //const wrapper = shallow(<Register />);

    expect(wrapper.exists()).toBe(true);
  });

  it("it has Registration Text", () => {
    const text = wrapper.find("h2").text();
    expect(text).toBe("Registration");
  });

  it("should update the name input value when changed", () => {
    const nameInput = wrapper.find('input[name="name"]');
    nameInput.simulate("change", { target: { name: "name", value: "John" } });
    const updatedNameValue = wrapper.find('input[name="name"]').prop("value");
    expect(updatedNameValue).toEqual("John");
  });

  it("should update the email input value when changed", () => {
    const nameInput = wrapper.find('input[name="email"]');
    nameInput.simulate("change", {
      target: { name: "email", value: "john@gmail.com" },
    });
    const updatedNameValue = wrapper.find('input[name="email"]').prop("value");
    expect(updatedNameValue).toEqual("john@gmail.com");
  });
});

// Add more test cases as needed
