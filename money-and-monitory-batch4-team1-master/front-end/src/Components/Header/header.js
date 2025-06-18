import React from "react";

function HeaderBar() {
  return (
    <>
      <header
        style={{
          position: "fixed",
          zIndex: "1",
          width: "-webkit-fill-available",
        }}
      >
        <div
          class="px-3 py-2 text-white"
          style={{ backgroundColor: "#5a287d" }}
        >
          <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              >
                <div class="logo">
                  <img src="icon-removebg.png" alt="Product Icon" />
                  <h1 class="display-6">Coin Stash</h1>
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="display-6" style={{ height: "69px" }}>
        .
      </div>
    </>
  );
}
export default HeaderBar;
