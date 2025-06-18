import React from "react";
import { shallow } from "enzyme";

import TransactionFail from "../Components/Transactions/TransactionFail";

describe("Transaction Failed Page", () => {
  it("renders the provided text", () => {
    const text = "Transaction Failed ";
    const wrapper = shallow(<TransactionFail />);

    // Perform assertions
    expect(wrapper.find("h1").text()).toBe(text);
  });
});
