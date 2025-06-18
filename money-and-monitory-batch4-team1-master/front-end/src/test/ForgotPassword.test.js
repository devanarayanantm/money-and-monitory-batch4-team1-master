import React from "react";
import { shallow } from "enzyme";

import ForgotPassword from "../Components/ForgotPassword/forgotpassword";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("ForgotPassword Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ForgotPassword />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("it has Forgot Password Text", () => {
    const text = wrapper.find("h3").text();
    expect(text).toBe("Forgot Password?");
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
