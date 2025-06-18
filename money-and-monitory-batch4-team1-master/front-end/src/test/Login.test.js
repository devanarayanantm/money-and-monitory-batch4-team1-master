import React from "react";
import { shallow } from "enzyme";
import Login from "../Components/Login/Login";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("Login Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("handles input changes", () => {
    const usernameInput = wrapper.find("#exampleInputEmail1");
    const passwordInput = wrapper.find("#exampleInputPassword1");

    usernameInput.simulate("change", { target: { value: "test@example.com" } });
    passwordInput.simulate("change", { target: { value: "password123" } });
    const updatedNameValue = wrapper.find("#exampleInputEmail1").prop("value");
    const updatedPwdValue = wrapper
      .find("#exampleInputPassword1")
      .prop("value");

    expect(updatedNameValue).toEqual("test@example.com");
    expect(updatedPwdValue).toEqual("password123");
  });

  it("it has Login Text", () => {
    const text = wrapper.find("h3").text();
    expect(text).toBe("Login");
  });

  // Add more test cases as needed
});
