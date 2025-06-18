import React from "react";
import { shallow } from "enzyme";

import TransactionSucess from "../Components/Transactions/TransactionSucess";

describe("Transaction Success Page", () => {
  it("renders the provided text", () => {
    const text = " Transaction Successful ";
    const wrapper = shallow(<TransactionSucess />);

    // Perform assertions
    expect(wrapper.find("h1").text()).toBe(text);
  });

  // Write other test cases here...
});
