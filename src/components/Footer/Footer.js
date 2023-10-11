import React from "react";
import "../../styles/header.css";

function Head() {
  return (
    <>
      <footer>
        <div className="container-xxl p-3 mb-2 bg-dark text-white ">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="col-6 col-lg-3 text-decoration-none text-primar">
                  <a
                    className="link-light link-offset-2 link-underline link-underline-opacity-0"
                    href="#"
                  >
                    About Us
                  </a>
                </div>

                <div className="col-6 col-lg-3">
                  <a
                    className="link-light link-offset-2 link-underline link-underline-opacity-0"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </div>

                <div className="col-6 col-lg-3">
                  <a
                    className="link-light link-offset-2 link-underline link-underline-opacity-0"
                    href="#"
                  >
                    Terms of Service
                  </a>
                </div>

                <div className="col-6 col-lg-3">
                  <div className="row">
                    <div className="col-3 mx-auto">
                      <a
                        className="link-light"
                        href="https://www.facebook.com/SoundCloud/"
                      >
                        <i class="fab fa-facebook-f fontawesome-style"></i>
                      </a>
                    </div>
                    <div className="col-3 mx-auto">
                      <a
                        className="link-light"
                        href="https://www.instagram.com/soundcloud/?hl=en"
                      >
                        <i class="fab fa-instagram fontawesome-style"></i>
                      </a>
                    </div>
                    <div className="col-3 mx-auto">
                      <a
                        className="link-light"
                        href="https://www.youtube.com/c/SoundCloud"
                      >
                        <i class="fab fa-youtube fontawesome-style"></i>
                      </a>
                    </div>
                    <div className="col-3 mx-auto">
                      <a
                        className="link-light"
                        href="https://twitter.com/SoundCloud?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                      >
                        <i class="fab fa-twitter fontawesome-style"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="mt-5">
                <p className="main-hero-para text-center w-100">
                  Copyright @ 2023 Sound Cloud. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
    // <footer className="header-container">

    //   <div className="header" style={{ justifyContent: "space-evenly" , border: "none" }}>
    //     <div className="header-2" style={{ width: "max-content" }}>
    //       About us
    //     </div>
    //     <div className="header-2" style={{ width: "max-content" }}>
    //       Privacy policy
    //     </div>
    //     <div className="header-2" style={{ width: "max-content" }}>
    //       Terms of Service
    //     </div>
    //   </div>
    // </footer>
  );
}

export default Head;
